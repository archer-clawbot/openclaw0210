# ─── OpenClaw Sync to Droplet ─────────────────────────────────────────
# Syncs local OpenClaw system to DigitalOcean droplet at 165.227.116.157
# Usage: powershell -File sync-to-droplet.ps1 [-DryRun] [-SkipNpm] [-OnlyConfig]
#
# What it does:
#   1. Backs up existing droplet config
#   2. Syncs agent workspaces (brain files, specs, training, skills)
#   3. Syncs agents/ directory (agent configs)
#   4. Syncs main/ (Archer orchestrator workspace)
#   5. Syncs cron/ (dispatcher with exponential backoff)
#   6. Syncs tools/ (md-to-pdf)
#   7. Syncs hooks/ (mission-control events)
#   8. Syncs workspace/ (shared brain prompt)
#   9. Pushes droplet-specific openclaw.json and .env
#  10. Runs npm install on droplet
#  11. Restarts PM2 dispatcher
#
# Channel difference: Local=Telegram, Droplet=Slack
# ──────────────────────────────────────────────────────────────────────

param(
    [switch]$DryRun,
    [switch]$SkipNpm,
    [switch]$OnlyConfig
)

$ErrorActionPreference = "Stop"

# ── Config ───────────────────────────────────────────────────────────
$SSH = "C:\Windows\System32\OpenSSH\ssh.exe"
$SCP = "C:\Windows\System32\OpenSSH\scp.exe"
$LOCAL_ROOT = "C:\Users\spart\.openclaw"
$REMOTE_HOST = "root@165.227.116.157"
$REMOTE_ROOT = "/root/.openclaw"
$TIMESTAMP = Get-Date -Format "yyyyMMdd-HHmmss"
$BACKUP_DIR = "/root/openclaw-backups/$TIMESTAMP"

# Agent list
$AGENTS = @(
    "main", "silas", "scribe", "herald", "wrench", "citadel",
    "mozi", "ghost", "ledger", "canvas", "scout", "builder",
    "specs", "lookout", "razor", "blitz", "sentinel", "forge"
)

# Brain files that OpenClaw injects into agent system prompts
$BRAIN_FILES = @(
    "AGENTS.md", "SOUL.md", "TOOLS.md", "IDENTITY.md",
    "USER.md", "HEARTBEAT.md", "BOOTSTRAP.md", "MEMORY.md"
)

function Log($msg) {
    $ts = Get-Date -Format "HH:mm:ss"
    Write-Host "[$ts] $msg" -ForegroundColor Cyan
}

function LogOk($msg) {
    $ts = Get-Date -Format "HH:mm:ss"
    Write-Host "[$ts] OK: $msg" -ForegroundColor Green
}

function LogWarn($msg) {
    $ts = Get-Date -Format "HH:mm:ss"
    Write-Host "[$ts] WARN: $msg" -ForegroundColor Yellow
}

function LogError($msg) {
    $ts = Get-Date -Format "HH:mm:ss"
    Write-Host "[$ts] ERROR: $msg" -ForegroundColor Red
}

function RunSSH($cmd) {
    if ($DryRun) {
        Log "[DRY RUN] ssh: $cmd"
        return ""
    }
    $result = & $SSH -o ConnectTimeout=15 -o StrictHostKeyChecking=no $REMOTE_HOST $cmd 2>&1
    return $result
}

function RunSCP($local, $remote) {
    if ($DryRun) {
        Log "[DRY RUN] scp: $local -> $remote"
        return
    }
    & $SCP -o ConnectTimeout=15 -o StrictHostKeyChecking=no -r $local "${REMOTE_HOST}:${remote}" 2>&1
    if ($LASTEXITCODE -ne 0) {
        LogWarn "SCP failed for $local -> $remote (exit code $LASTEXITCODE)"
    }
}

# ── Pre-flight checks ───────────────────────────────────────────────
Log "=== OpenClaw Sync to Droplet ==="
Log "Local:  $LOCAL_ROOT"
Log "Remote: ${REMOTE_HOST}:${REMOTE_ROOT}"
Log "Backup: $BACKUP_DIR"
if ($DryRun) { LogWarn "DRY RUN MODE - no changes will be made" }

# Test SSH connectivity
if (-not $DryRun) {
    Log "Testing SSH connection..."
    $test = RunSSH "echo OK"
    if ($test -notmatch "OK") {
        LogError "Cannot connect to droplet. Check SSH key."
        exit 1
    }
    LogOk "SSH connection verified"
} else {
    Log "Skipping SSH test in dry run mode"
}

# ── Step 1: Backup existing config on droplet ────────────────────────
Log "Step 1: Backing up existing droplet config..."
RunSSH "mkdir -p $BACKUP_DIR && cp $REMOTE_ROOT/openclaw.json $BACKUP_DIR/ 2>/dev/null; cp $REMOTE_ROOT/.env $BACKUP_DIR/ 2>/dev/null; cp -r $REMOTE_ROOT/cron/jobs.json $BACKUP_DIR/ 2>/dev/null; echo 'backup done'"
LogOk "Backup saved to $BACKUP_DIR"

# ── Step 2: Stop PM2 dispatcher ──────────────────────────────────────
Log "Step 2: Stopping PM2 dispatcher..."
RunSSH "pm2 stop openclaw-dispatcher 2>/dev/null; echo 'stopped'"
LogOk "PM2 dispatcher stopped"

if (-not $OnlyConfig) {

# ── Step 3: Create directory structure on droplet ────────────────────
Log "Step 3: Creating directory structure on droplet..."
$mkdirCmd = "mkdir -p $REMOTE_ROOT/{workspace,tools,hooks,deliverables}"
foreach ($agent in $AGENTS) {
    $mkdirCmd += " $REMOTE_ROOT/$agent"
}
RunSSH $mkdirCmd
LogOk "Directory structure created"

# ── Step 4: Sync agent workspaces ────────────────────────────────────
Log "Step 4: Syncing agent workspaces..."

foreach ($agent in $AGENTS) {
    $localAgentDir = "$LOCAL_ROOT\$agent"
    if (-not (Test-Path $localAgentDir)) {
        LogWarn "Local workspace for '$agent' not found, skipping"
        continue
    }

    Log "  Syncing $agent workspace..."

    # Sync brain files first (most important)
    foreach ($brainFile in $BRAIN_FILES) {
        $localFile = "$localAgentDir\$brainFile"
        if (Test-Path $localFile) {
            RunSCP $localFile "$REMOTE_ROOT/$agent/$brainFile"
        }
    }

    # Sync LOGGING.md if it exists (Archer has this)
    $loggingFile = "$localAgentDir\LOGGING.md"
    if (Test-Path $loggingFile) {
        RunSCP $loggingFile "$REMOTE_ROOT/$agent/LOGGING.md"
    }

    # Sync subdirectories (specs, training, skills, audits)
    foreach ($subdir in @("specs", "training", "skills", "audits")) {
        $localSubdir = "$localAgentDir\$subdir"
        if (Test-Path $localSubdir) {
            # Create remote subdir first
            RunSSH "mkdir -p $REMOTE_ROOT/$agent/$subdir"
            RunSCP $localSubdir "$REMOTE_ROOT/$agent/"
        }
    }

    # Sync template files (Silas audit templates)
    $templates = Get-ChildItem -Path $localAgentDir -Filter "*TEMPLATE*" -ErrorAction SilentlyContinue
    foreach ($tpl in $templates) {
        RunSCP $tpl.FullName "$REMOTE_ROOT/$agent/$($tpl.Name)"
    }

    # Sync other important .md files (not WORKING.md - that's session-specific)
    $mdFiles = Get-ChildItem -Path $localAgentDir -Filter "*.md" -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -ne "WORKING.md" -and $_.Name -notin $BRAIN_FILES -and $_.Name -ne "LOGGING.md" }
    foreach ($md in $mdFiles) {
        RunSCP $md.FullName "$REMOTE_ROOT/$agent/$($md.Name)"
    }
}
LogOk "Agent workspaces synced"

# ── Step 5: Sync agents/ directory (agent configs) ───────────────────
Log "Step 5: Syncing agents/ directory..."
$localAgentsDir = "$LOCAL_ROOT\agents"
if (Test-Path $localAgentsDir) {
    RunSSH "mkdir -p $REMOTE_ROOT/agents"
    foreach ($agent in $AGENTS) {
        $localAgentConfig = "$localAgentsDir\$agent"
        if (Test-Path $localAgentConfig) {
            RunSSH "mkdir -p $REMOTE_ROOT/agents/$agent"
            RunSCP $localAgentConfig "$REMOTE_ROOT/agents/"
        }
    }
    LogOk "agents/ directory synced"
} else {
    LogWarn "No local agents/ directory found"
}

# ── Step 6: Sync cron/ directory ─────────────────────────────────────
Log "Step 6: Syncing cron/ directory..."
$localCron = "$LOCAL_ROOT\cron"
if (Test-Path $localCron) {
    # Sync core files (not node_modules, not logs, not runs)
    $cronFiles = @(
        "dispatcher.js", "package.json", "package-lock.json",
        "setup-client.js", "shield-scan.js", "memory-safety-net.mjs",
        "breaker-limits.json", "awareness-registry.json", "routing-config.json"
    )
    foreach ($f in $cronFiles) {
        $localFile = "$localCron\$f"
        if (Test-Path $localFile) {
            RunSCP $localFile "$REMOTE_ROOT/cron/$f"
        }
    }

    # Sync lib/ directory
    $localLib = "$localCron\lib"
    if (Test-Path $localLib) {
        RunSSH "mkdir -p $REMOTE_ROOT/cron/lib"
        $libFiles = Get-ChildItem -Path $localLib -Filter "*.js" -ErrorAction SilentlyContinue
        foreach ($lf in $libFiles) {
            RunSCP $lf.FullName "$REMOTE_ROOT/cron/lib/$($lf.Name)"
        }
    }

    # Sync clients/ directory
    $localClients = "$localCron\clients"
    if (Test-Path $localClients) {
        RunSSH "mkdir -p $REMOTE_ROOT/cron/clients"
        RunSCP $localClients "$REMOTE_ROOT/cron/"
    }

    # Sync manifests/ directory
    $localManifests = "$localCron\manifests"
    if (Test-Path $localManifests) {
        RunSSH "mkdir -p $REMOTE_ROOT/cron/manifests"
        RunSCP $localManifests "$REMOTE_ROOT/cron/"
    }

    # Sync data/ directory
    $localData = "$localCron\data"
    if (Test-Path $localData) {
        RunSSH "mkdir -p $REMOTE_ROOT/cron/data"
        RunSCP $localData "$REMOTE_ROOT/cron/"
    }

    # Create ecosystem.config.js for PM2 (pointing to new location)
    $ecosystemContent = @"
module.exports = {
  apps: [
    {
      name: 'openclaw-dispatcher',
      script: 'dispatcher.js',
      args: '--watch',
      cwd: '$REMOTE_ROOT/cron',
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: '$REMOTE_ROOT/cron/logs/pm2-error.log',
      out_file: '$REMOTE_ROOT/cron/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      restart_delay: 5000,
      max_restarts: 10,
    },
  ],
};
"@
    $ecosystemTmp = "$env:TEMP\ecosystem.config.js"
    Set-Content -Path $ecosystemTmp -Value $ecosystemContent -Encoding UTF8
    RunSCP $ecosystemTmp "$REMOTE_ROOT/cron/ecosystem.config.js"
    Remove-Item $ecosystemTmp -ErrorAction SilentlyContinue

    LogOk "cron/ directory synced"
} else {
    LogWarn "No local cron/ directory found"
}

# ── Step 7: Sync tools/ directory ────────────────────────────────────
Log "Step 7: Syncing tools/ directory..."
$localTools = "$LOCAL_ROOT\tools"
if (Test-Path $localTools) {
    RunSSH "mkdir -p $REMOTE_ROOT/tools"
    RunSCP $localTools "$REMOTE_ROOT/"
    LogOk "tools/ directory synced"
} else {
    LogWarn "No local tools/ directory found"
}

# ── Step 8: Sync hooks/ directory ────────────────────────────────────
Log "Step 8: Syncing hooks/ directory..."
$localHooks = "$LOCAL_ROOT\hooks"
if (Test-Path $localHooks) {
    RunSSH "mkdir -p $REMOTE_ROOT/hooks"
    RunSCP $localHooks "$REMOTE_ROOT/"
    LogOk "hooks/ directory synced"
} else {
    # Check if openclaw0210 has hooks we should copy
    LogWarn "No local hooks/ directory found - will use existing droplet hooks if available"
    RunSSH "if [ -d /root/openclaw0210/hooks ]; then cp -r /root/openclaw0210/hooks $REMOTE_ROOT/; echo 'copied from openclaw0210'; else echo 'no hooks anywhere'; fi"
}

# ── Step 9: Sync workspace/ (shared brain prompt) ────────────────────
Log "Step 9: Syncing workspace/ directory..."
$localWorkspace = "$LOCAL_ROOT\workspace"
if (Test-Path $localWorkspace) {
    foreach ($brainFile in $BRAIN_FILES) {
        $localFile = "$localWorkspace\$brainFile"
        if (Test-Path $localFile) {
            RunSCP $localFile "$REMOTE_ROOT/workspace/$brainFile"
        }
    }

    # Sync skills/
    $localSkills = "$localWorkspace\skills"
    if (Test-Path $localSkills) {
        RunSSH "mkdir -p $REMOTE_ROOT/workspace/skills"
        RunSCP $localSkills "$REMOTE_ROOT/workspace/"
    }

    LogOk "workspace/ directory synced"
} else {
    LogWarn "No local workspace/ directory found"
}

} # end if (-not $OnlyConfig)

# ── Step 10: Push config files ───────────────────────────────────────
Log "Step 10: Pushing openclaw.json and .env..."

# Push the droplet-specific openclaw.json
$dropletConfig = "$LOCAL_ROOT\droplet\openclaw.json"
if (Test-Path $dropletConfig) {
    RunSCP $dropletConfig "$REMOTE_ROOT/openclaw.json"
    LogOk "openclaw.json pushed"
} else {
    LogError "Droplet openclaw.json not found at $dropletConfig"
    exit 1
}

# Push the droplet .env
$dropletEnv = "$LOCAL_ROOT\droplet\dotenv"
if (Test-Path $dropletEnv) {
    RunSCP $dropletEnv "$REMOTE_ROOT/.env"
    # Secure the .env file
    RunSSH "chmod 600 $REMOTE_ROOT/.env"
    LogOk ".env pushed and secured"
} else {
    LogError "Droplet .env not found at $dropletEnv"
    exit 1
}

# ── Step 11: npm install on droplet ──────────────────────────────────
if (-not $SkipNpm) {
    Log "Step 11: Running npm install on droplet..."

    # cron/ npm install
    RunSSH "cd $REMOTE_ROOT/cron && npm install --production 2>&1 | tail -5"
    LogOk "npm install in cron/ complete"

    # Create logs directory for PM2
    RunSSH "mkdir -p $REMOTE_ROOT/cron/logs $REMOTE_ROOT/cron/runs $REMOTE_ROOT/cron/state"

    # tools/md-to-pdf npm install (if it has a package.json)
    $toolsPkg = RunSSH "test -f $REMOTE_ROOT/tools/md-to-pdf/package.json && echo 'yes' || echo 'no'"
    if ($toolsPkg -match "yes") {
        RunSSH "cd $REMOTE_ROOT/tools/md-to-pdf && npm install --production 2>&1 | tail -5"
        LogOk "npm install in tools/md-to-pdf/ complete"
    }
} else {
    LogWarn "Skipping npm install (--SkipNpm flag)"
}

# ── Step 12: Restart PM2 ────────────────────────────────────────────
Log "Step 12: Restarting PM2 dispatcher..."

# Delete old PM2 process and start from new location
RunSSH "pm2 delete openclaw-dispatcher 2>/dev/null; cd $REMOTE_ROOT/cron && pm2 start ecosystem.config.js && pm2 save"
LogOk "PM2 dispatcher restarted from $REMOTE_ROOT/cron"

# Verify it's running
Start-Sleep -Seconds 3
$status = RunSSH "pm2 list"
Log "PM2 Status:"
Write-Host $status

# ── Step 13: Verify ─────────────────────────────────────────────────
Log "Step 13: Verifying sync..."
$verify = RunSSH "echo '--- openclaw.json ---'; test -f $REMOTE_ROOT/openclaw.json && echo 'OK' || echo 'MISSING'; echo '--- .env ---'; test -f $REMOTE_ROOT/.env && echo 'OK' || echo 'MISSING'; echo '--- main/ ---'; test -d $REMOTE_ROOT/main && echo 'OK' || echo 'MISSING'; echo '--- cron/dispatcher.js ---'; test -f $REMOTE_ROOT/cron/dispatcher.js && echo 'OK' || echo 'MISSING'; echo '--- agents/ ---'; ls $REMOTE_ROOT/agents/ 2>/dev/null | wc -l; echo 'agents found'"
Write-Host $verify

Log ""
Log "=== Sync Complete ==="
Log "Backup at: $BACKUP_DIR"
Log "To verify: ssh root@165.227.116.157 'openclaw doctor'"
Log "To check logs: ssh root@165.227.116.157 'pm2 logs openclaw-dispatcher --lines 20'"
Log ""
Log "NOTE: The old /root/openclaw0210/ directory is preserved."
Log "Once verified, you can remove it: ssh root@165.227.116.157 'rm -rf /root/openclaw0210/'"

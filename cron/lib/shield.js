// Shield Security Scanner — scans files/directories for malicious patterns,
// exposed secrets, and suspicious dependencies before they touch the system.

const fs = require('fs');
const path = require('path');

// ── Pattern Definitions ────────────────────────────────────────────
// Each: { name, regex, severity, category, description, recommendation, fileTypes? }

const PATTERNS = [
  // ── API Theft ──
  {
    name: 'env_var_exfil',
    regex: /process\.env\[?['"]?(ANTHROPIC_API_KEY|OPENAI_API_KEY|GATEWAY_AUTH_TOKEN)['"]?\]?/gi,
    severity: 'critical',
    category: 'api_theft',
    description: 'Accesses sensitive API key environment variable',
    recommendation: 'Only config/loader modules should read API keys. Check if this is legitimate.',
  },
  {
    name: 'credential_in_url',
    regex: /(?:https?:\/\/[^?\s]*[?&](?:api_?key|token|secret|password)=)[^\s&'"]+/gi,
    severity: 'high',
    category: 'api_theft',
    description: 'Credential value embedded in URL',
    recommendation: 'Use headers for authentication, never URL parameters.',
  },
  {
    name: 'base64_env_send',
    regex: /(?:btoa|Buffer\.from)\s*\(\s*process\.env/gi,
    severity: 'critical',
    category: 'api_theft',
    description: 'Base64-encoding environment variables (potential exfiltration prep)',
    recommendation: 'Investigate why env vars are being encoded.',
  },

  // ── Data Exfiltration ──
  {
    name: 'http_post_env',
    regex: /(?:fetch|axios|request|https?\.request)\s*\([^)]*\)[\s\S]{0,200}process\.env/gi,
    severity: 'critical',
    category: 'data_exfil',
    description: 'HTTP request near env var access — possible exfiltration',
    recommendation: 'Verify the destination and payload of this request.',
  },
  {
    name: 'read_sensitive_files',
    regex: /(?:readFile|readFileSync)\s*\(\s*['"](?:\/etc\/passwd|~?\/?\.ssh|~?\/?\.aws|~?\/?\.env|\/etc\/shadow)/gi,
    severity: 'critical',
    category: 'data_exfil',
    description: 'Reading sensitive system files',
    recommendation: 'Block access to credential and system files.',
  },
  {
    name: 'hardcoded_ip_connection',
    regex: /(?:connect|request|fetch)\s*\(\s*['"]https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/gi,
    severity: 'high',
    category: 'data_exfil',
    description: 'Connection to hardcoded IP address',
    recommendation: 'Verify this IP is a known, trusted service.',
  },

  // ── Destructive Operations ──
  {
    name: 'recursive_delete',
    regex: /(?:rmSync|rmdirSync|rimraf|rm\s+-rf)\s*\(\s*['"]?\//gi,
    severity: 'critical',
    category: 'destructive',
    description: 'Recursive delete from root or system path',
    recommendation: 'Never allow recursive deletion from root paths.',
  },
  {
    name: 'drop_table',
    regex: /DROP\s+(?:TABLE|DATABASE|SCHEMA)\s+/gi,
    severity: 'high',
    category: 'destructive',
    description: 'SQL destructive operation (DROP TABLE/DATABASE)',
    recommendation: 'Verify this is an intentional migration, not injected SQL.',
  },
  {
    name: 'format_disk',
    regex: /(?:format\s+[A-Z]:|mkfs|dd\s+if=.*of=\/dev\/)/gi,
    severity: 'critical',
    category: 'destructive',
    description: 'Disk formatting command detected',
    recommendation: 'This should never appear in application code.',
  },

  // ── Persistence Mechanisms ──
  {
    name: 'crontab_modification',
    regex: /(?:crontab|\/etc\/cron)/gi,
    severity: 'high',
    category: 'persistence',
    description: 'Crontab access or modification',
    recommendation: 'Verify this is an intended scheduled task setup.',
  },
  {
    name: 'startup_modification',
    regex: /(?:\.bashrc|\.bash_profile|\.profile|\.zshrc|HKEY_|RegWrite|startup\s+folder)/gi,
    severity: 'high',
    category: 'persistence',
    description: 'Shell profile or startup modification',
    recommendation: 'Verify this is not planting a persistence mechanism.',
  },
  {
    name: 'service_creation',
    regex: /(?:systemctl\s+enable|sc\s+create|New-Service|launchctl\s+load)/gi,
    severity: 'high',
    category: 'persistence',
    description: 'System service creation',
    recommendation: 'Verify this is an intended service installation.',
  },

  // ── Network Backdoors ──
  {
    name: 'reverse_shell',
    regex: /(?:\/bin\/(?:ba)?sh\s+-i|nc\s+-[elp]|ncat\s+--exec|socat\s+exec)/gi,
    severity: 'critical',
    category: 'network',
    description: 'Reverse shell pattern detected',
    recommendation: 'This is almost certainly malicious. Do not run this code.',
  },
  {
    name: 'raw_socket_listener',
    regex: /(?:net\.createServer|dgram\.createSocket|\.listen\s*\(\s*\d{4,5})/gi,
    severity: 'medium',
    category: 'network',
    description: 'Socket server/listener creation',
    recommendation: 'Verify this is an expected server, not a backdoor.',
  },
  {
    name: 'dns_tunneling',
    regex: /(?:dns\.resolve|dns\.lookup)\s*\(\s*['"][^'"]*\.[^'"]*['"]\s*\+/gi,
    severity: 'high',
    category: 'network',
    description: 'Dynamic DNS query — possible DNS tunneling',
    recommendation: 'Verify DNS queries are for legitimate hostname resolution.',
  },

  // ── Code Obfuscation ──
  {
    name: 'eval_dynamic',
    regex: /(?:eval|Function)\s*\(\s*(?:atob|Buffer\.from|String\.fromCharCode)/gi,
    severity: 'critical',
    category: 'obfuscation',
    description: 'Dynamic code execution with encoded payload',
    recommendation: 'This is a common malware pattern. Investigate immediately.',
  },
  {
    name: 'char_code_assembly',
    regex: /String\.fromCharCode\s*\(\s*(?:\d+\s*,\s*){5,}/gi,
    severity: 'high',
    category: 'obfuscation',
    description: 'String assembly from character codes (obfuscation technique)',
    recommendation: 'Decode the string and check for malicious intent.',
  },
  {
    name: 'hex_escape_chain',
    regex: /(?:\\x[0-9a-f]{2}){10,}/gi,
    severity: 'medium',
    category: 'obfuscation',
    description: 'Long hex escape sequence (possible obfuscated payload)',
    recommendation: 'Decode and review the hidden content.',
  },

  // ── OpenClaw-Specific ──
  {
    name: 'prompt_injection_in_data',
    regex: /(?:ignore|disregard|forget)\s+(?:all\s+)?(?:previous|prior|above)\s+(?:instructions?|prompts?|rules?)/gi,
    severity: 'critical',
    category: 'openclaw_specific',
    description: 'Prompt injection payload in data file',
    recommendation: 'This content contains LLM manipulation. Do not ingest into agent context.',
  },
  {
    name: 'agent_impersonation',
    regex: /(?:\[system\]|\[admin\]|\[operator\]|message\s+from\s+(?:archer|silas|cody))/gi,
    severity: 'high',
    category: 'openclaw_specific',
    description: 'Agent/operator impersonation attempt',
    recommendation: 'Data files should not contain system-level directives.',
  },
  {
    name: 'telegram_token_access',
    regex: /TELEGRAM_BOT_TOKEN(?!_)/gi,
    severity: 'medium',
    category: 'openclaw_specific',
    description: 'Generic Telegram bot token reference (should use agent-specific token)',
    recommendation: 'Use TELEGRAM_BOT_TOKEN_<AGENT> instead of the generic key.',
  },
];

// ── Config Auditor Patterns ────────────────────────────────────────

const SECRET_PATTERNS = [
  { name: 'generic_secret', regex: /(?:api[_-]?key|secret|password|token|credential)\s*[=:]\s*["']?[A-Za-z0-9+/=]{20,}/gi, severity: 'high' },
  { name: 'anthropic_key', regex: /sk-ant-api\d{2}-[A-Za-z0-9_-]{80,}/g, severity: 'critical' },
  { name: 'openai_key', regex: /sk-proj-[A-Za-z0-9_-]{40,}/g, severity: 'critical' },
  { name: 'github_pat', regex: /ghp_[a-zA-Z0-9]{36}/g, severity: 'critical' },
  { name: 'telegram_token', regex: /\d{9,10}:[A-Za-z0-9_-]{35}/g, severity: 'critical' },
  { name: 'slack_token', regex: /xox[bpras]-[A-Za-z0-9-]+/g, severity: 'critical' },
  { name: 'aws_key', regex: /AKIA[0-9A-Z]{16}/g, severity: 'critical' },
  { name: 'private_key', regex: /-----BEGIN (?:RSA |EC |DSA )?PRIVATE KEY-----/g, severity: 'critical' },
];

// ── Known suspicious npm packages ──────────────────────────────────

const SUSPICIOUS_PACKAGES = new Set([
  'event-stream',      // known supply chain attack
  'flatmap-stream',    // backdoored package
  'ua-parser-js',      // compromised versions
  'coa',               // compromised versions
  'rc',                // compromised versions
  'colors',            // sabotaged by maintainer
  'faker',             // sabotaged by maintainer
]);

// File extensions to scan
const SCAN_EXTENSIONS = new Set([
  '.js', '.ts', '.mjs', '.cjs', '.jsx', '.tsx',
  '.py', '.sh', '.bash', '.bat', '.cmd', '.ps1',
  '.json', '.yaml', '.yml', '.toml', '.env',
  '.md', '.txt', '.html', '.xml',
]);

const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next',
  '__pycache__', '.venv', 'venv', '.cache',
]);

// ── Scanner Core ───────────────────────────────────────────────────

/**
 * Scan a file or directory for security issues.
 * @param {string} targetPath - file or directory to scan
 * @param {object} opts - { recursive, severity, maxFiles }
 * @returns {{ target, scanTime, totalFindings, severitySummary, findings, dependencyIssues, configIssues }}
 */
function scan(targetPath, opts = {}) {
  const { recursive = true, severity = null, maxFiles = 5000 } = opts;
  const startTime = Date.now();

  const report = {
    target: targetPath,
    scanTime: new Date().toISOString(),
    totalFindings: 0,
    severitySummary: { critical: 0, high: 0, medium: 0, low: 0 },
    findings: [],
    dependencyIssues: [],
    configIssues: [],
  };

  let stat;
  try {
    stat = fs.statSync(targetPath);
  } catch {
    report.findings.push({
      file: targetPath,
      line: 0,
      category: 'error',
      severity: 'low',
      description: `Target path does not exist: ${targetPath}`,
      recommendation: 'Verify the path is correct.',
    });
    report.totalFindings = 1;
    report.severitySummary.low = 1;
    return report;
  }

  const files = stat.isFile()
    ? [targetPath]
    : collectFiles(targetPath, recursive, maxFiles);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file).toLowerCase();

    // Dependency scanning
    if (basename === 'package.json') {
      const depIssues = scanDependencies(file);
      report.dependencyIssues.push(...depIssues);
    }

    // Config file auditing
    if (basename === '.env' || basename.startsWith('.env.') || ext === '.env') {
      const configIssues = auditConfig(file);
      report.configIssues.push(...configIssues);
    }

    // Pattern scanning
    let content;
    try {
      content = fs.readFileSync(file, 'utf8');
    } catch {
      continue; // binary or unreadable
    }

    // Skip very large files (likely bundled/minified)
    if (content.length > 500_000) continue;

    const fileFindings = scanFileContent(file, content);
    report.findings.push(...fileFindings);
  }

  // Apply severity filter
  if (severity) {
    const allowedSeverities = new Set(severity.split(',').map(s => s.trim().toLowerCase()));
    report.findings = report.findings.filter(f => allowedSeverities.has(f.severity));
    report.dependencyIssues = report.dependencyIssues.filter(f => allowedSeverities.has(f.severity));
    report.configIssues = report.configIssues.filter(f => allowedSeverities.has(f.severity));
  }

  // Tally
  for (const f of [...report.findings, ...report.dependencyIssues, ...report.configIssues]) {
    report.severitySummary[f.severity] = (report.severitySummary[f.severity] || 0) + 1;
  }
  report.totalFindings = report.findings.length + report.dependencyIssues.length + report.configIssues.length;
  report.durationMs = Date.now() - startTime;
  report.filesScanned = files.length;

  return report;
}

function collectFiles(dir, recursive, maxFiles) {
  const files = [];

  function walk(d) {
    if (files.length >= maxFiles) return;
    let entries;
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (files.length >= maxFiles) return;
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        if (recursive && !SKIP_DIRS.has(entry.name)) walk(full);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        const basename = entry.name.toLowerCase();
        if (SCAN_EXTENSIONS.has(ext) || basename === '.env' || basename.startsWith('.env.')) {
          files.push(full);
        }
      }
    }
  }

  walk(dir);
  return files;
}

function scanFileContent(file, content) {
  const findings = [];
  const lines = content.split('\n');

  for (const pat of PATTERNS) {
    // Check file type filter
    if (pat.fileTypes) {
      const ext = path.extname(file).toLowerCase();
      if (!pat.fileTypes.includes(ext)) continue;
    }

    // Reset regex state
    pat.regex.lastIndex = 0;
    let match;
    while ((match = pat.regex.exec(content)) !== null) {
      // Find line number
      const before = content.slice(0, match.index);
      const lineNum = (before.match(/\n/g) || []).length + 1;

      findings.push({
        file,
        line: lineNum,
        category: pat.category,
        severity: pat.severity,
        description: pat.description,
        matchedPattern: match[0].slice(0, 100),
        recommendation: pat.recommendation,
      });

      // Prevent infinite loops on zero-length matches
      if (match[0].length === 0) pat.regex.lastIndex++;
    }
  }

  // Also scan for secrets in non-.env files
  const ext = path.extname(file).toLowerCase();
  const basename = path.basename(file).toLowerCase();
  if (ext !== '.env' && !basename.startsWith('.env')) {
    for (const sp of SECRET_PATTERNS) {
      sp.regex.lastIndex = 0;
      let match;
      while ((match = sp.regex.exec(content)) !== null) {
        const before = content.slice(0, match.index);
        const lineNum = (before.match(/\n/g) || []).length + 1;
        findings.push({
          file,
          line: lineNum,
          category: 'exposed_secret',
          severity: sp.severity,
          description: `Exposed secret (${sp.name}) found in source file`,
          matchedPattern: match[0].slice(0, 20) + '...',
          recommendation: 'Move secrets to .env and add file to .gitignore.',
        });
        if (match[0].length === 0) sp.regex.lastIndex++;
      }
    }
  }

  return findings;
}

// ── Dependency Scanner ─────────────────────────────────────────────

function scanDependencies(packageJsonPath) {
  const issues = [];
  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  } catch {
    return issues;
  }

  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.optionalDependencies,
  };

  for (const [name, version] of Object.entries(allDeps)) {
    if (SUSPICIOUS_PACKAGES.has(name)) {
      issues.push({
        file: packageJsonPath,
        line: 0,
        category: 'suspicious_dependency',
        severity: 'critical',
        description: `Known-compromised package: ${name}@${version}`,
        recommendation: `Remove ${name} and find a safe alternative.`,
      });
    }

    // Flag git:// and URL dependencies (can point to malicious repos)
    if (typeof version === 'string' && (version.startsWith('git') || version.startsWith('http'))) {
      issues.push({
        file: packageJsonPath,
        line: 0,
        category: 'suspicious_dependency',
        severity: 'medium',
        description: `Git/URL dependency: ${name} → ${version}`,
        recommendation: 'Pin to a specific npm registry version instead of a git URL.',
      });
    }

    // Flag wildcard versions
    if (version === '*' || version === 'latest') {
      issues.push({
        file: packageJsonPath,
        line: 0,
        category: 'suspicious_dependency',
        severity: 'medium',
        description: `Unpinned dependency: ${name}@${version}`,
        recommendation: 'Pin to a specific version to prevent supply chain attacks.',
      });
    }
  }

  // Check for suspicious scripts
  if (pkg.scripts) {
    for (const [scriptName, cmd] of Object.entries(pkg.scripts)) {
      if (/curl\s|wget\s|nc\s|ncat\s|eval\s|base64/i.test(cmd)) {
        issues.push({
          file: packageJsonPath,
          line: 0,
          category: 'suspicious_dependency',
          severity: 'high',
          description: `Suspicious npm script "${scriptName}": ${cmd.slice(0, 80)}`,
          recommendation: 'Review this script for malicious behavior.',
        });
      }
    }
  }

  return issues;
}

// ── Config Auditor ─────────────────────────────────────────────────

function auditConfig(filePath) {
  const issues = [];
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch {
    return issues;
  }

  for (const sp of SECRET_PATTERNS) {
    sp.regex.lastIndex = 0;
    let match;
    while ((match = sp.regex.exec(content)) !== null) {
      const before = content.slice(0, match.index);
      const lineNum = (before.match(/\n/g) || []).length + 1;
      issues.push({
        file: filePath,
        line: lineNum,
        category: 'exposed_secret',
        severity: sp.severity,
        description: `Secret found in config: ${sp.name}`,
        matchedPattern: match[0].slice(0, 20) + '...',
        recommendation: 'Ensure this file is in .gitignore and not committed to version control.',
      });
      if (match[0].length === 0) sp.regex.lastIndex++;
    }
  }

  return issues;
}

// ── Report Formatting ──────────────────────────────────────────────

function formatReport(report) {
  const lines = [];
  lines.push('╔══════════════════════════════════════════╗');
  lines.push('║          SHIELD SECURITY SCAN            ║');
  lines.push('╚══════════════════════════════════════════╝');
  lines.push('');
  lines.push(`Target: ${report.target}`);
  lines.push(`Files scanned: ${report.filesScanned || '?'}`);
  lines.push(`Duration: ${report.durationMs || '?'}ms`);
  lines.push(`Total findings: ${report.totalFindings}`);
  lines.push('');

  const { severitySummary: s } = report;
  lines.push(`  CRITICAL: ${s.critical}  HIGH: ${s.high}  MEDIUM: ${s.medium}  LOW: ${s.low}`);

  if (report.totalFindings === 0) {
    lines.push('');
    lines.push('  No security issues found.');
    return lines.join('\n');
  }

  // Group findings by severity
  const allFindings = [...report.findings, ...report.dependencyIssues, ...report.configIssues];
  const bySeverity = { critical: [], high: [], medium: [], low: [] };
  for (const f of allFindings) {
    (bySeverity[f.severity] || bySeverity.low).push(f);
  }

  for (const sev of ['critical', 'high', 'medium', 'low']) {
    if (bySeverity[sev].length === 0) continue;
    lines.push('');
    lines.push(`── ${sev.toUpperCase()} ${'─'.repeat(50 - sev.length)}`);
    for (const f of bySeverity[sev]) {
      const loc = f.line ? `${path.relative(report.target, f.file)}:${f.line}` : path.relative(report.target, f.file);
      lines.push(`  [${f.category}] ${loc}`);
      lines.push(`    ${f.description}`);
      if (f.matchedPattern) lines.push(`    Match: ${f.matchedPattern}`);
      lines.push(`    Fix: ${f.recommendation}`);
    }
  }

  return lines.join('\n');
}

module.exports = {
  scan,
  formatReport,
  PATTERNS,
  SECRET_PATTERNS,
  SUSPICIOUS_PACKAGES,
};

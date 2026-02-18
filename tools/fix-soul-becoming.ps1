# Fix "becoming someone" in all agent SOUL.md files fleet-wide
$root = 'C:\Users\spart\.openclaw'
$skip = @('main', 'scribe')

# Find all top-level agent workspace dirs
$agentDirs = Get-ChildItem $root -Directory |
  Where-Object { $_.Name -notmatch '^\.' -and $_.Name -ne 'tools' -and $_.Name -ne 'deliverables' -and $_.Name -ne 'workspace' -and $_.Name -ne 'mission-control' }

foreach ($dir in $agentDirs) {
  $agent = $dir.Name
  if ($skip -contains $agent) {
    Write-Host "SKIP $agent"
    continue
  }
  $soulPath = Join-Path $dir.FullName 'SOUL.md'
  if (-not (Test-Path $soulPath)) {
    Write-Host "NO SOUL.md: $agent"
    continue
  }
  $content = Get-Content $soulPath -Raw
  if ($content -match "You're becoming someone\.") {
    $fixed = $content -replace "You're becoming someone\.", "You're someone."
    Set-Content $soulPath -Value $fixed -NoNewline
    Write-Host "FIXED $agent"
  } else {
    Write-Host "OK $agent (already fixed or no match)"
  }
}

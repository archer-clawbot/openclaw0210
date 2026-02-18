$innerPath = 'C:\Users\spart\.openclaw\.openclaw\openclaw.json'
$outerPath = 'C:\Users\spart\.openclaw\openclaw.json'

$inner = Get-Content $innerPath -Raw | ConvertFrom-Json
$outer = Get-Content $outerPath -Raw | ConvertFrom-Json

# Build a lookup of existing inner agents by id
$innerAgents = @{}
foreach ($a in $inner.agents.list) {
  $innerAgents[$a.id] = $a
}

# Build new list: start with outer list, merge inner overrides for forge (we set it to opus-4-6)
$newList = @()
foreach ($a in $outer.agents.list) {
  if ($innerAgents.ContainsKey($a.id)) {
    # Prefer inner config entry (e.g. forge with opus-4-6)
    $newList += $innerAgents[$a.id]
    Write-Host "KEPT inner: $($a.id)"
  } else {
    # Copy from outer
    $newList += $a
    Write-Host "ADDED from outer: $($a.id) (model: $($a.model))"
  }
}

# Also add any agents only in inner (shouldn't be any, but safety)
foreach ($a in $inner.agents.list) {
  $found = $false
  foreach ($b in $outer.agents.list) { if ($b.id -eq $a.id) { $found = $true; break } }
  if (-not $found) {
    $newList += $a
    Write-Host "ADDED inner-only: $($a.id)"
  }
}

$inner.agents.list = $newList

$json = $inner | ConvertTo-Json -Depth 20
Set-Content $innerPath -Value $json

Write-Host ""
Write-Host "Done. Inner config now has $($newList.Count) agents."

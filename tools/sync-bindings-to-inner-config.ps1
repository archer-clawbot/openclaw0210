$innerPath = 'C:\Users\spart\.openclaw\.openclaw\openclaw.json'
$outerPath = 'C:\Users\spart\.openclaw\openclaw.json'

$inner = Get-Content $innerPath -Raw | ConvertFrom-Json
$outer = Get-Content $outerPath -Raw | ConvertFrom-Json

# Copy bindings from outer to inner
$inner | Add-Member -MemberType NoteProperty -Name 'bindings' -Value $outer.bindings -Force

# Also fix main agent entry to include workspace/name/default from outer
$outerMain = $outer.agents.list | Where-Object { $_.id -eq 'main' }
$innerList = $inner.agents.list
for ($i = 0; $i -lt $innerList.Count; $i++) {
  if ($innerList[$i].id -eq 'main') {
    $innerList[$i] = $outerMain
    Write-Host "Fixed main agent entry (added workspace, name, default=true)"
    break
  }
}
$inner.agents.list = $innerList

$json = $inner | ConvertTo-Json -Depth 20
Set-Content $innerPath -Value $json

Write-Host "Done. Copied $($outer.bindings.Count) bindings to inner config."

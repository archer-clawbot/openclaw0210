$inner = Get-Content 'C:\Users\spart\.openclaw\.openclaw\openclaw.json' -Raw | ConvertFrom-Json

Write-Host "=== AGENTS LIST ==="
foreach ($a in $inner.agents.list) {
  $ws = if ($a.workspace) { $a.workspace } else { '(none)' }
  $model = if ($a.model) { $a.model } else { '(default)' }
  Write-Host "$($a.id) | name=$($a.name) | workspace=$ws | model=$model"
}

Write-Host ""
Write-Host "=== CHANNEL ACCOUNTS ==="
$accounts = $inner.channels.telegram.accounts.PSObject.Properties
foreach ($acct in $accounts) {
  $hasAgentId = if ($acct.Value.agentId) { "agentId=$($acct.Value.agentId)" } else { '(no agentId)' }
  Write-Host "$($acct.Name) | $hasAgentId"
}

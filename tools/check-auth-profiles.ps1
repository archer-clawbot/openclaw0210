$agents = Get-ChildItem 'C:\Users\spart\.openclaw\agents' -Filter 'auth-profiles.json' -Recurse
foreach ($f in $agents) {
  $content = Get-Content $f.FullName -Raw | ConvertFrom-Json
  $agent = $f.FullName -replace '.*\\agents\\([^\\]+)\\.*', '$1'
  $keyProp = $content.profiles.'anthropic:default'.key
  $key = if ($keyProp) { $keyProp.Substring(0, [Math]::Min(35, $keyProp.Length)) + '...' } else { '(no api key)' }
  $errCount = if ($content.usageStats.'anthropic:default'.errorCount) { $content.usageStats.'anthropic:default'.errorCount } else { 0 }
  Write-Host "$agent | $key | errors: $errCount"
}

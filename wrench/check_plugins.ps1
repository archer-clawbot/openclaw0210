$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'))
$headers = @{Authorization = "Basic $cred"}
$plugins = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/plugins' -Method GET -Headers $headers
foreach ($p in $plugins) {
    Write-Output "$($p.status): $($p.plugin) - $($p.name)"
}

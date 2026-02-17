 = 'Stop'
 = 'https://darkgreen-moose-683278.hostingersite.com'
 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'))
 = @{Authorization=('Basic ' + )}
try {
     = Invoke-RestMethod -Uri ( + '/wp-json/wp/v2/plugins') -Headers  -Method GET
     | ForEach-Object { Write-Output (extglob.plugin + ' | Status: ' + extglob.status) }
} catch {
    Write-Output ('Error: ' + extglob.Exception.Message)
}
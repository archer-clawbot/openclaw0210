$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'))
$headers = @{Authorization = "Basic $cred"}
$routes = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2' -Method GET -Headers $headers
$routes.routes.PSObject.Properties.Name | Where-Object { $_ -match 'theme|plugin|file|edit' }

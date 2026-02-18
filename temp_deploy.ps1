$ErrorActionPreference = \"Stop\"
$domain = \"https://darkgreen-moose-683278.hostingersite.com\"
$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(\"cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe\"))
$headers = @{Authorization=(\"Basic \" + $cred)}
try {
    $result = Invoke-RestMethod -Uri \"$domain/wp-json/wp/v2/plugins\" -Headers $headers -Method GET
    $result | ForEach-Object { Write-Output \"$($_.plugin) | Status: $($_.status)\" }
} catch {
    Write-Output \"Error: $($_.Exception.Message)\"
}

$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64"; 'Content-Type' = 'application/json' }

$cssContent = Get-Content -Path 'C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css' -Raw

# First check the structure of existing GP Elements to understand the meta fields
Write-Host "=== Inspect existing GP Element (ID 84) ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/gp_elements/84' -Headers $headers -Method GET
    Write-Host ($r | ConvertTo-Json -Depth 5)
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

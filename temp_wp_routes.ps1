$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64" }

# List ALL routes that contain theme, file, or edit
Write-Host "=== All theme/file/edit routes ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2' -Headers $headers -Method GET
    $r.routes.PSObject.Properties.Name | Where-Object { $_ -match 'theme|file|edit' }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Try the theme file edit endpoint directly (WordPress 5.9+)
Write-Host ""
Write-Host "=== Trying /wp/v2/themes/localcatalyst ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/themes/localcatalyst' -Headers $headers -Method GET
    Write-Host ($r | ConvertTo-Json -Depth 2)
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Check if there's an edit-theme-file endpoint
Write-Host ""
Write-Host "=== Trying theme file editing endpoint ==="
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/themes/localcatalyst/stylesheet' -Headers $headers -Method GET -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    Write-Host $r.Content
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

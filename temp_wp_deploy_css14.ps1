$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))

# Check global styles endpoint details (what can we write?)
Write-Host "=== Check global-styles endpoint schema ==="
$headers = @{ Authorization = "Basic $base64" }
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/global-styles/themes/localcatalyst' -Headers $headers -Method OPTIONS
    Write-Host ($r | ConvertTo-Json -Depth 2)
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Get the actual global styles post (it has an ID)
Write-Host ""
Write-Host "=== Get global styles with ID ==="
try {
    # First find the global styles post
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/global-styles?per_page=100' -Headers $headers -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    Write-Host $r.Content.Substring(0, [Math]::Min(1000, $r.Content.Length))
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# The global-styles endpoint for themes returns settings/styles but let's check if there's a writable ID
Write-Host ""
Write-Host "=== Try getting global-styles by theme with full response ==="
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/global-styles/themes/localcatalyst' -Headers $headers -UseBasicParsing
    Write-Host "Allow header: $($r.Headers['Allow'])"
    # Look for an ID in the response
    $json = $r.Content | ConvertFrom-Json
    if ($json.id) { Write-Host "Global styles ID: $($json.id)" }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

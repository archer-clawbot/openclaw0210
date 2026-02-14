$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64"; 'Content-Type' = 'application/json' }

# Approach: Check if we can edit plugin files via REST API
# WordPress 5.9+ has a file editing endpoint for plugins
Write-Host "=== Check plugin file editing ==="

# Try the WP REST API plugin file edit endpoint
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/plugins/openclaw-bridge/openclaw-bridge' -Headers $headers -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    Write-Host $r.Content.Substring(0, [Math]::Min(1000, $r.Content.Length))
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Try the official file edit endpoints
Write-Host ""
Write-Host "=== Try /wp/v2/plugins endpoint ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/plugins' -Headers $headers -Method GET
    $r | ForEach-Object { Write-Host "$($_.plugin) | $($_.status)" }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Try editing plugin file content via admin endpoint 
# wp-admin/plugin-editor.php?file=openclaw-bridge.php&plugin=openclaw-bridge%2Fopenclaw-bridge.php
Write-Host ""
Write-Host "=== Try wp/v2/plugins/{plugin} PUT ==="
try {
    # Try to get info about a specific plugin
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/plugins/insert-headers-and-footers/ihaf' -Headers $headers -Method GET
    Write-Host ($r | ConvertTo-Json -Depth 2)
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

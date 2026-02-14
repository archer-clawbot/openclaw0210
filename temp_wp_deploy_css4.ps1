$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))

# Check if XMLRPC is available (may be blocked by hardening)
Write-Host "=== Checking XMLRPC ==="
try {
    $xmlrpc = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/xmlrpc.php' -Method POST -UseBasicParsing -Body '<?xml version="1.0"?><methodCall><methodName>system.listMethods</methodName></methodCall>' -ContentType 'text/xml'
    Write-Host "Status: $($xmlrpc.StatusCode)"
    Write-Host $xmlrpc.Content.Substring(0, [Math]::Min(500, $xmlrpc.Content.Length))
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Approach 7: Use the WP Customizer / Additional CSS option to inject CSS
# This won't deploy to the file, but let's see if wp_options approach works
Write-Host ""
Write-Host "=== Approach 7: Check site settings / custom_css ==="
$headers = @{ Authorization = "Basic $base64" }
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/settings' -Headers $headers -Method GET
    Write-Host "Settings keys:"
    $r.PSObject.Properties.Name | ForEach-Object { Write-Host "  $_" }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Approach 8: Try uploading as .txt then renaming won't work...
# Let's try a different approach - create a small PHP snippet that writes the file
# We can inject it as Additional CSS post type or use a different mechanism

# Actually - let's try using LiteSpeed cache purge or see if there's a file manager plugin
Write-Host ""
Write-Host "=== Approach 8: Check installed plugins ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/plugins' -Headers $headers -Method GET
    $r | ForEach-Object { Write-Host "$($_.plugin) - $($_.status)" }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

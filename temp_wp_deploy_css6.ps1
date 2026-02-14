$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64" }

$cssContent = Get-Content -Path 'C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css' -Raw

# Approach 9: Check WPCode (Insert Headers and Footers) - it might have REST API endpoints
Write-Host "=== Approach 9: Check for WPCode/IHAF REST endpoints ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/' -Headers $headers -Method GET
    $routes = $r.routes.PSObject.Properties.Name | Where-Object { $_ -match 'wpcode|ihaf|header|footer|snippet' }
    Write-Host "WPCode routes:"
    $routes | ForEach-Object { Write-Host "  $_" }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Approach 10: Use the custom_css custom post type (WordPress Additional CSS)
# This is how the Customizer's Additional CSS feature stores CSS
Write-Host ""
Write-Host "=== Approach 10: Check custom_css post type ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/types' -Headers $headers -Method GET
    $r.PSObject.Properties.Name | ForEach-Object { Write-Host "  $_" }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Try to find existing custom_css post
Write-Host ""
Write-Host "=== Looking for custom_css posts ==="
try {
    # Custom CSS is stored as a post with post_type 'custom_css'
    # The REST API might not expose it, but let's check via the standard endpoint
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/posts?per_page=5&status=any&type=custom_css' -Headers $headers -UseBasicParsing
    Write-Host $r.Content.Substring(0, [Math]::Min(500, $r.Content.Length))
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Approach 11: Use WP options endpoint to store CSS
# We can store the CSS in a wp_option and then have the theme's functions.php load it
Write-Host ""
Write-Host "=== Approach 11: Check if we can update options ==="
try {
    $body = @{ title = 'test' } | ConvertTo-Json
    $postHeaders = @{ Authorization = "Basic $base64"; 'Content-Type' = 'application/json' }
    # Check available settings we can write to
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/settings' -Headers $postHeaders -Method OPTIONS
    Write-Host ($r | ConvertTo-Json -Depth 3)
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

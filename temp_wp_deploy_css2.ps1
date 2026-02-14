$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))

# Approach 4: Use wp-admin theme-editor.php (POST with nonce)
# First, login and get a session + nonce
Write-Host "=== Approach 4: WP Admin login + theme editor ==="

# Step 1: Get the login page to get cookies
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
try {
    $loginPage = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-login.php' -SessionVariable session -UseBasicParsing
    Write-Host "Login page status: $($loginPage.StatusCode)"
    
    # Step 2: Submit login form
    $loginBody = @{
        log = 'cody@spartandigital.co'
        pwd = 'lGHA dJtp iiFO 8Mor r8wh CyZe'
        'wp-submit' = 'Log In'
        redirect_to = '/wp-admin/theme-editor.php?file=css%2Flocalcatalyst_global-styles.css&theme=localcatalyst'
        testcookie = '1'
    }
    
    $loginResult = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-login.php' -Method POST -Body $loginBody -WebSession $session -UseBasicParsing -MaximumRedirection 0 -ErrorAction SilentlyContinue
    Write-Host "Login POST status: $($loginResult.StatusCode)"
    Write-Host "Location: $($loginResult.Headers.Location)"
    
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode)"
        Write-Host "Location: $($_.Exception.Response.Headers.Location)"
    }
}

# Approach 5: Check if openclaw bridge has a file deploy endpoint
Write-Host ""
Write-Host "=== Approach 5: OpenClaw bridge endpoints ==="
$headers = @{ Authorization = "Basic $base64" }
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/openclaw/v1' -Headers $headers -Method GET
    Write-Host ($r | ConvertTo-Json -Depth 3)
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Check bridge routes
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/' -Headers $headers -Method GET
    $routes = $r.routes.PSObject.Properties.Name | Where-Object { $_ -match 'openclaw' }
    Write-Host "OpenClaw routes:"
    $routes | ForEach-Object { Write-Host "  $_" }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

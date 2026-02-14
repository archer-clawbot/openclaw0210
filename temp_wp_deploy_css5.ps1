$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))

# Step 1: Login to WP admin with cookie-based auth
Write-Host "=== Step 1: Login to WP Admin ==="
$loginUri = 'https://darkgreen-moose-683278.hostingersite.com/wp-login.php'

# Create a session
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession

# First GET the login page to get any cookies
$loginGet = Invoke-WebRequest -Uri $loginUri -WebSession $session -UseBasicParsing
Write-Host "Login page cookies: $($session.Cookies.Count)"

# POST login credentials
$loginBody = "log=cody%40spartandigital.co&pwd=lGHA+dJtp+iiFO+8Mor+r8wh+CyZe&wp-submit=Log+In&redirect_to=%2Fwp-admin%2F&testcookie=1"

# Add testcookie
$session.Cookies.Add((New-Object System.Net.Cookie('wordpress_test_cookie', 'WP%20Cookie%20check', '/', 'darkgreen-moose-683278.hostingersite.com')))

try {
    $loginPost = Invoke-WebRequest -Uri $loginUri -Method POST -Body $loginBody -WebSession $session -UseBasicParsing -ContentType 'application/x-www-form-urlencoded' -MaximumRedirection 5
    Write-Host "Login POST status: $($loginPost.StatusCode)"
    Write-Host "Cookies after login: $($session.Cookies.GetCookies($loginUri).Count)"
    $session.Cookies.GetCookies('https://darkgreen-moose-683278.hostingersite.com/') | ForEach-Object { Write-Host "  Cookie: $($_.Name)" }
} catch {
    # 302 redirect is expected on successful login
    Write-Host "Response: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode)"
    }
    $session.Cookies.GetCookies('https://darkgreen-moose-683278.hostingersite.com/') | ForEach-Object { Write-Host "  Cookie: $($_.Name)" }
}

# Step 2: Get the theme editor page to find the nonce
Write-Host ""
Write-Host "=== Step 2: Get theme editor page ==="
try {
    $editorPage = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-admin/theme-editor.php?file=css%2Flocalcatalyst_global-styles.css&theme=localcatalyst' -WebSession $session -UseBasicParsing
    Write-Host "Editor page status: $($editorPage.StatusCode)"
    Write-Host "Page length: $($editorPage.Content.Length)"
    
    # Extract nonce
    if ($editorPage.Content -match '_wpnonce["\s]*(?:value="|:)["\s]*([a-f0-9]+)') {
        $nonce = $Matches[1]
        Write-Host "Found nonce: $nonce"
    }
    
    # Look for nonce in the form
    if ($editorPage.Content -match 'name="_wpnonce"\s+value="([^"]+)"') {
        $nonce = $Matches[1]
        Write-Host "Found form nonce: $nonce"
    }
    
    # Check if file is found or error
    if ($editorPage.Content -match 'error|not found|does not exist') {
        # Find relevant error text
        if ($editorPage.Content -match '<div[^>]*class="[^"]*error[^"]*"[^>]*>(.*?)</div>') {
            Write-Host "Error div: $($Matches[1])"
        }
    }
    
    # Check if we're actually logged in (look for admin bar or dashboard)
    if ($editorPage.Content -match 'wp-admin-bar|adminbar|dashboard') {
        Write-Host "Confirmed: Logged into admin"
    } elseif ($editorPage.Content -match 'wp-login') {
        Write-Host "NOT logged in - redirected to login"
    }
    
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

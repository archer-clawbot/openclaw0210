$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64" }

# Check GP Elements - this is GeneratePress's way of adding custom CSS/HTML
Write-Host "=== Check GP Elements ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/gp_elements?per_page=100' -Headers $headers -Method GET
    Write-Host "GP Elements count: $($r.Count)"
    $r | ForEach-Object { 
        Write-Host "  ID: $($_.id) | Title: $($_.title.rendered) | Status: $($_.status)"
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Check if the CSS file already exists on the server
Write-Host ""
Write-Host "=== Check if CSS file already accessible ==="
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-content/themes/localcatalyst/css/localcatalyst_global-styles.css' -UseBasicParsing -Method HEAD
    Write-Host "File exists! Status: $($r.StatusCode)"
    Write-Host "Content-Length: $($r.Headers['Content-Length'])"
    Write-Host "Last-Modified: $($r.Headers['Last-Modified'])"
} catch {
    Write-Host "File not found: $($_.Exception.Message)"
}

# Check if any CSS directory exists
Write-Host ""
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-content/themes/localcatalyst/style.css' -UseBasicParsing -Method HEAD
    Write-Host "style.css exists! Status: $($r.StatusCode)"
} catch {
    Write-Host "style.css: $($_.Exception.Message)"
}

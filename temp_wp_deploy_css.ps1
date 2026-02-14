$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64" }

# Approach 1: Try the theme file editor API (wp-admin/admin-ajax.php with edit-theme-plugin-file)
Write-Host "=== Approach 1: wp_edit_theme_plugin_file via REST ==="
$cssContent = Get-Content -Path 'C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css' -Raw
$body = @{
    file = 'css/localcatalyst_global-styles.css'
    theme = 'localcatalyst'
    newcontent = $cssContent
} | ConvertTo-Json
$headers2 = @{ 
    Authorization = "Basic $base64"
    'Content-Type' = 'application/json'
}
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/themes/localcatalyst' -Headers $headers2 -Method POST -Body $body -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    Write-Host $r.Content.Substring(0, [Math]::Min(500, $r.Content.Length))
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $body = $reader.ReadToEnd()
        Write-Host "Response: $($body.Substring(0, [Math]::Min(500, $body.Length)))"
    }
}

# Approach 2: Try file-edit endpoint
Write-Host ""
Write-Host "=== Approach 2: /wp/v2/file-edit/themes ==="
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/file-edit/themes' -Headers $headers -Method GET -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Approach 3: Check if the site has WP-CLI or custom endpoints
Write-Host ""
Write-Host "=== Approach 3: Check custom namespaces ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/' -Headers $headers -Method GET
    $r.namespaces | ForEach-Object { Write-Host $_ }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

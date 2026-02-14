$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64" }

# Check global-styles by numeric IDs (usually a low number)
Write-Host "=== Find global styles post ID ==="
foreach ($id in 1..100) {
    try {
        $r = Invoke-WebRequest -Uri "https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/global-styles/$id" -Headers $headers -UseBasicParsing -Method HEAD -ErrorAction Stop
        if ($r.StatusCode -eq 200) {
            Write-Host "Found global-styles at ID $id"
            $full = Invoke-RestMethod -Uri "https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/global-styles/$id" -Headers $headers
            Write-Host "Allow: $($r.Headers['Allow'])"
            Write-Host "Title: $($full.title)"
            # Check for custom CSS
            if ($full.styles.css) { Write-Host "Has custom CSS!" }
            break
        }
    } catch {
        # 404 - continue
    }
}

# Alternative approach: Use the WP Customizer API to set Additional CSS
# The custom CSS is stored in wp_posts with post_type='custom_css'
# Let's query by post type via a search
Write-Host ""
Write-Host "=== Search for custom_css posts via database-level query ==="
# We can't search by post_type via REST for custom_css, but we can check a known approach
# The customizer stores it at option 'custom_css_localcatalyst'
# Actually, let's check via the customize API
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/pages?search=custom_css&per_page=5' -Headers $headers -UseBasicParsing
    Write-Host $r.Content.Substring(0, [Math]::Min(200, $r.Content.Length))
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# GP Element approach with meta  
Write-Host ""
Write-Host "=== Create GP Element with hook meta ==="
$cssContent = [System.IO.File]::ReadAllText('C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css', [System.Text.Encoding]::UTF8)
$styleBlock = "<style id='lc-global-styles'>" + $cssContent + "</style>"

$elementBody = @{
    title = 'LC Global Styles'
    content = $styleBlock
    status = 'publish'
    meta = @{
        _generate_block_type = 'hook'
        _generate_hook = 'wp_head'
        _generate_hook_priority = '10'
    }
}

$jsonBody = $elementBody | ConvertTo-Json -Depth 3 -Compress
$jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonBody)
$postHeaders = @{ 
    Authorization = "Basic $base64"
    'Content-Type' = 'application/json; charset=utf-8'
}

try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/gp_elements' -Headers $postHeaders -Method POST -Body $jsonBytes -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    $json = $r.Content | ConvertFrom-Json
    Write-Host "Element ID: $($json.id)"
    Write-Host "Meta hook: $($json.meta._generate_hook)"
    Write-Host "Meta block_type: $($json.meta._generate_block_type)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errBody = $reader.ReadToEnd()
        Write-Host "Response: $($errBody.Substring(0, [Math]::Min(500, $errBody.Length)))"
    }
}

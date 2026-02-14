$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64"; 'Content-Type' = 'application/json' }

$cssContent = Get-Content -Path 'C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css' -Raw

# Strategy: Create a page with the CSS content stored as page content
# Then create a small PHP snippet in functions.php (if we can get the file there)
# OR: Use the WP Customizer additional CSS

# Let's try the Customizer additional CSS approach (custom_css post type)
Write-Host "=== Try creating custom_css post ==="
# The custom_css post type is linked to the active theme stylesheet
# In WordPress, the Additional CSS is stored as post_type=custom_css with post_name=theme_stylesheet

$body = @{
    title = 'localcatalyst'
    content = $cssContent
    status = 'publish'
    type = 'custom_css'
} | ConvertTo-Json -Depth 3

try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/posts' -Headers $headers -Method POST -Body $body -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    Write-Host $r.Content.Substring(0, [Math]::Min(500, $r.Content.Length))
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Response: $($reader.ReadToEnd())"
    }
}

# Alternative: Try the wp_global_styles endpoint to inject CSS
Write-Host ""
Write-Host "=== Check existing global styles ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/global-styles/themes/localcatalyst' -Headers $headers -Method GET
    Write-Host ($r | ConvertTo-Json -Depth 3)
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Let's try the WP customize changeset approach  
# Actually, the simplest working approach: create an HTML block (wp_block) that injects CSS
Write-Host ""
Write-Host "=== Try creating a reusable block with CSS ==="
$cssBlock = "<style id='lc-global-styles'>$cssContent</style>"
$blockBody = @{
    title = 'LC Global Styles CSS'
    content = "<!-- wp:html -->`n$cssBlock`n<!-- /wp:html -->"
    status = 'publish'
} | ConvertTo-Json -Depth 3

try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/blocks' -Headers $headers -Method POST -Body $blockBody -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    $json = $r.Content | ConvertFrom-Json
    Write-Host "Block ID: $($json.id)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Response: $($reader.ReadToEnd())"
    }
}

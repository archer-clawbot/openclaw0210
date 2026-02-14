$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))

# Read CSS file with explicit UTF8 encoding
$cssContent = [System.IO.File]::ReadAllText('C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css', [System.Text.Encoding]::UTF8)
Write-Host "CSS length: $($cssContent.Length)"
Write-Host "First 100 chars: $($cssContent.Substring(0, [Math]::Min(100, $cssContent.Length)))"

# Check for any non-ASCII characters that might cause JSON issues
$nonAscii = [regex]::Matches($cssContent, '[^\x00-\x7F]')
if ($nonAscii.Count -gt 0) {
    Write-Host "Found $($nonAscii.Count) non-ASCII characters"
    $nonAscii | Select-Object -First 5 | ForEach-Object { 
        Write-Host "  Position $($_.Index): '$($_.Value)' (U+$([int][char]$_.Value))"
    }
} else {
    Write-Host "No non-ASCII characters found"
}

# Try with proper JSON serialization
Write-Host ""
Write-Host "=== Attempt: Create reusable block with proper encoding ==="
$blockObj = @{
    title = 'LC Global Styles CSS'
    content = "<!-- wp:html --><style id='lc-global-styles'>$cssContent</style><!-- /wp:html -->"
    status = 'publish'
}
$jsonBody = $blockObj | ConvertTo-Json -Depth 3 -Compress
$jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonBody)

$headers = @{ 
    Authorization = "Basic $base64"
    'Content-Type' = 'application/json; charset=utf-8'
}

try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/blocks' -Headers $headers -Method POST -Body $jsonBytes -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    $json = $r.Content | ConvertFrom-Json
    Write-Host "Block ID: $($json.id)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errContent = $reader.ReadToEnd()
        Write-Host "Response: $($errContent.Substring(0, [Math]::Min(500, $errContent.Length)))"
    }
}

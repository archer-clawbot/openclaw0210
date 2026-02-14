$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64"; 'Content-Type' = 'application/json' }

$cssContent = Get-Content -Path 'C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css' -Raw

# Approach 6: Upload CSS content as a page/post custom field
# Actually let's try the simplest approach first - use WP media upload with a CSS file
Write-Host "=== Approach 6: Upload via media endpoint ==="
$boundary = [System.Guid]::NewGuid().ToString()
$filePath = 'C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css'
$fileName = 'localcatalyst_global-styles.css'
$fileBytes = [System.IO.File]::ReadAllBytes($filePath)
$encoding = [System.Text.Encoding]::GetEncoding('iso-8859-1')
$fileContent = $encoding.GetString($fileBytes)

$bodyLines = @(
    "--$boundary",
    "Content-Disposition: form-data; name=`"file`"; filename=`"$fileName`"",
    "Content-Type: text/css",
    "",
    $fileContent,
    "--$boundary--"
)
$body = $bodyLines -join "`r`n"

$mediaHeaders = @{
    Authorization = "Basic $base64"
    'Content-Type' = "multipart/form-data; boundary=$boundary"
    'Content-Disposition' = "attachment; filename=$fileName"
}

try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/media' -Headers $mediaHeaders -Method POST -Body $body -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    $json = $r.Content | ConvertFrom-Json
    Write-Host "Media ID: $($json.id)"
    Write-Host "Source URL: $($json.source_url)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $errBody = $reader.ReadToEnd()
        Write-Host "Response: $($errBody.Substring(0, [Math]::Min(500, $errBody.Length)))"
    }
}

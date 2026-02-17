$ErrorActionPreference = 'Stop'
$domain = 'https://darkgreen-moose-683278.hostingersite.com'
$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'))
$headers = @{Authorization=('Basic ' + $cred); 'Content-Type'='application/json'}

# Read and base64-encode the CSS file
$cssPath = 'C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css'
$b64 = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($cssPath))
Write-Output ('CSS base64 length: ' + $b64.Length)

# Build PHP snippet
$phpCode = '$b64 = ''' + $b64 + ''';' + [Environment]::NewLine +
'$css = base64_decode($b64);' + [Environment]::NewLine +
'$dir = ABSPATH . ''/wp-content/themes/localcatalyst/css'';' + [Environment]::NewLine +
'if (!is_dir($dir)) { mkdir($dir, 0775, true); }' + [Environment]::NewLine +
'$file = $dir . ''/localcatalyst_global-styles.css'';' + [Environment]::NewLine +
'file_put_contents($file, $css);' + [Environment]::NewLine +
'echo ''DEPLOYED:'' . strlen($css) . '' bytes to '' . $file;'

Write-Output ('PHP snippet built, length: ' + $phpCode.Length)

# Create snippet via Code Snippets REST API
$body = @}
{
  "name": "Deploy localcatalyst CSS",
  "desc": "Auto-deploy CSS file via OpenClaw",
  "code": "$($phpCode -replace '"', '\"' -replace '\', '\\')",
  "priority": 10,
  "scope": "global",
  "active": true
}
}@

Write-Output 'Sending snippet to Code Snippets API...'

try {
    $result = Invoke-RestMethod -Uri ($domain + '/wp-json/code-snippets/v1/snippets') -Headers $headers -Method POST -Body $body
    Write-Output ('Snippet created! ID: ' + $result.id + ' Active: ' + $result.active)
    $snippetId = $result.id
} catch {
    Write-Output ('Error creating snippet: ' + $_.Exception.Message)
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Output ('Response: ' + $reader.ReadToEnd())
    }
    exit 1
}
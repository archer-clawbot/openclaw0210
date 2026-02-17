try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/opcache_bust.php' -UseBasicParsing -ErrorAction Stop
    Write-Output "Status: $($r.StatusCode) - FILE STILL EXISTS"
} catch {
    $code = $_.Exception.Response.StatusCode.Value__
    if ($code -eq 404) {
        Write-Output "Status: 404 - FILE DELETED SUCCESSFULLY"
    } else {
        Write-Output "Status: $code"
    }
}

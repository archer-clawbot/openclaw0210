$content = Get-Content 'C:\Users\spart\.claude\projects\C--Users-spart--openclaw\824914b0-1648-4972-87f5-1007f6622750\tool-results\mcp-Claude_in_Chrome-read_network_requests-1771042135717.txt' -Raw
# Find all URL-like patterns with /api/
$matches = [regex]::Matches($content, '(GET|POST|PUT|DELETE)\s+(https?://[^\s"]+)')
foreach ($m in $matches) {
    Write-Output "$($m.Groups[1].Value) $($m.Groups[2].Value)"
}
if ($matches.Count -eq 0) {
    # Try finding api paths differently
    $apiMatches = [regex]::Matches($content, '/api/[^\s"\\]+')
    foreach ($m in $apiMatches) {
        Write-Output "API_PATH: $($m.Value)"
    }
}

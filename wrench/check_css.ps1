$resp = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/contact/' -UseBasicParsing
# Find all stylesheet link tags
$resp.Content | Select-String -Pattern '<link[^>]*stylesheet[^>]*>' -AllMatches | ForEach-Object {
    $_.Matches | ForEach-Object { Write-Output $_.Value }
}
Write-Output "---"
# Also check for localcatalyst in the page
$resp.Content | Select-String -Pattern 'localcatalyst' -AllMatches | ForEach-Object {
    $_.Matches | ForEach-Object { Write-Output "MATCH: $($_.Value)" }
}

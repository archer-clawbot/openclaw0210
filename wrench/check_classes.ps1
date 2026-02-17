$resp = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/contact/' -UseBasicParsing
$html = $resp.Content

# Find card-related classes
$cardMatches = [regex]::Matches($html, 'class="[^"]*card[^"]*"')
Write-Output "CARD CLASSES:"
foreach ($m in $cardMatches) {
    Write-Output "  $($m.Value)"
}

# Find grid-related classes
$gridMatches = [regex]::Matches($html, 'class="[^"]*grid[^"]*"')
Write-Output "`nGRID CLASSES:"
foreach ($m in $gridMatches) {
    Write-Output "  $($m.Value)"
}

# Find fit-related classes
$fitMatches = [regex]::Matches($html, 'class="[^"]*fit[^"]*"')
Write-Output "`nFIT CLASSES:"
foreach ($m in $fitMatches) {
    Write-Output "  $($m.Value)"
}

# Check if "What You'll Get" section has 2-column layout
if ($html -match 'What You') {
    Write-Output "`nWhat You'll Get section found"
}

# Look for the card wrapper
$wrapperMatches = [regex]::Matches($html, 'class="lc-[^"]*"')
Write-Output "`nLC- CLASSES (first 30):"
$seen = @{}
$count = 0
foreach ($m in $wrapperMatches) {
    $val = $m.Value
    if (-not $seen.ContainsKey($val) -and $count -lt 30) {
        Write-Output "  $val"
        $seen[$val] = $true
        $count++
    }
}

$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'))
$base = 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2'
$headers = @{ Authorization = 'Basic ' + $cred }

# Get all pages with content
$allPages = @()
$pg = 1
do {
    $batch = Invoke-RestMethod -Uri ($base + '/pages?per_page=100&page=' + $pg + '&_fields=id,slug,link,title,content') -Headers $headers
    $allPages += $batch
    $pg++
} while ($batch.Count -eq 100)

$learnPages = $allPages | Where-Object { $_.link -like '*/learn/*' -and $_.slug -ne 'learn' }

$stubPhrases = @('currently being written', 'check back soon', 'coming soon', 'under construction', 'placeholder', 'this page is', 'content is on its way', 'article will be', 'stay tuned', 'work in progress')

foreach ($p in $learnPages) {
    $content = $p.content.rendered
    # Strip HTML tags to get plain text
    $plainText = $content -replace '<[^>]+>', ' '
    $plainText = $plainText -replace '&nbsp;', ' '
    $plainText = $plainText -replace '&#8217;', "'"
    $plainText = $plainText -replace '&#8220;', '"'
    $plainText = $plainText -replace '&#8221;', '"'
    $plainText = $plainText -replace '\s+', ' '
    $plainText = $plainText.Trim()

    # Word count
    $words = ($plainText -split '\s+' | Where-Object { $_ -ne '' }).Count

    # Check for stub phrases
    $foundStubs = @()
    foreach ($phrase in $stubPhrases) {
        if ($plainText -match [regex]::Escape($phrase)) {
            $foundStubs += $phrase
        }
    }

    $status = 'OK'
    if ($words -lt 500) {
        $status = 'STUB-SHORT'
    }
    if ($foundStubs.Count -gt 0) {
        $status = 'STUB-PHRASE'
    }

    $title = if ($p.title.rendered) { $p.title.rendered } else { $p.title }
    Write-Host "$status|$($p.id)|$($p.slug)|$words|$($foundStubs -join ',')|$title"
}

$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'))
$base = 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2'
$headers = @{ Authorization = 'Basic ' + $cred }

# Check specific pages that had 'placeholder' but 2000+ words
$ids = @(308, 267, 235)
foreach ($id in $ids) {
    $page = Invoke-RestMethod -Uri ($base + '/pages/' + $id + '?_fields=id,slug,content') -Headers $headers
    $content = $page.content.rendered
    # Find the context of 'placeholder'
    $idx = $content.IndexOf('placeholder')
    if ($idx -ge 0) {
        $start = [Math]::Max(0, $idx - 100)
        $end = [Math]::Min($content.Length, $idx + 100)
        $snippet = $content.Substring($start, $end - $start)
        $snippet = $snippet -replace '<[^>]+>', ''
        Write-Host "ID $id ($($page.slug)): ...${snippet}..."
    }
}

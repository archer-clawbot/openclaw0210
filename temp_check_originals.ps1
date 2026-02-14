$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'))
$base = 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2'
$headers = @{ Authorization = 'Basic ' + $cred }

# Check the original batch pages
$ids = @(75, 100, 102, 104, 106, 108, 110, 112, 114)
foreach ($id in $ids) {
    $page = Invoke-RestMethod -Uri ($base + '/pages/' + $id + '?_fields=id,slug,content,title') -Headers $headers
    $content = $page.content.rendered
    $plain = $content -replace '<[^>]+>', ' '
    $plain = $plain -replace '&nbsp;', ' '
    $plain = $plain -replace '\s+', ' '
    $plain = $plain.Trim()
    $words = ($plain -split '\s+' | Where-Object { $_ -ne '' }).Count
    $first200 = if ($plain.Length -gt 300) { $plain.Substring(0, 300) } else { $plain }
    $title = if ($page.title.rendered) { $page.title.rendered } else { $page.title }
    Write-Host "=== ID $id | $($page.slug) | $words words ==="
    Write-Host $first200
    Write-Host ""
}

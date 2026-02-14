$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'))
$base = 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2'
$headers = @{ Authorization = 'Basic ' + $cred }

$allPosts = @()
$pg = 1
do {
    $batch = Invoke-RestMethod -Uri ($base + '/posts?per_page=100&page=' + $pg + '&_fields=id,slug,link,title') -Headers $headers
    $allPosts += $batch
    $pg++
} while ($batch.Count -eq 100)

Write-Host ('Found ' + $allPosts.Count + ' total posts')
foreach ($p in $allPosts) {
    $t = if ($p.title.rendered) { $p.title.rendered } else { $p.title }
    Write-Host ($p.id.ToString() + '|' + $p.slug + '|' + $t + '|' + $p.link)
}

$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'))
$base = 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2'
$headers = @{ Authorization = 'Basic ' + $cred }

$allPages = @()
$pg = 1
do {
    $batch = Invoke-RestMethod -Uri ($base + '/pages?per_page=100&page=' + $pg + '&_fields=id,slug,link,title') -Headers $headers
    $allPages += $batch
    $pg++
} while ($batch.Count -eq 100)

$learnPages = $allPages | Where-Object { $_.link -like '*/learn/*' }
Write-Host ('Found ' + $learnPages.Count + ' /learn/ pages')
foreach ($p in $learnPages) {
    $t = if ($p.title.rendered) { $p.title.rendered } else { $p.title }
    Write-Host ($p.id.ToString() + '|' + $p.slug + '|' + $t + '|' + $p.link)
}

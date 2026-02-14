$files = Get-ChildItem "C:\Users\spart\.openclaw\deliverables\localcatalyst\scribe\*blog-*.md" | Sort-Object Name
foreach ($f in $files) {
    $lines = Get-Content $f.FullName -TotalCount 15
    $slug = ''
    $url = ''
    $title = ''
    $wordcount = (Get-Content $f.FullName | Measure-Object -Word).Words
    foreach ($line in $lines) {
        if ($line -match 'slug:\s*(.+)') {
            $slug = $Matches[1].Trim()
        }
        if ($line -match 'url:\s*(.+)') {
            $url = $Matches[1].Trim()
        }
        if ($line -match '^#\s+(.+)') {
            if (-not $title) { $title = $Matches[1].Trim() }
        }
        if ($line -match 'title:\s*["\u2018]?(.+?)["\u2019]?\s*$') {
            $title = $Matches[1].Trim()
        }
    }
    # Derive slug from filename if not in metadata
    $fnSlug = $f.BaseName -replace '^\d{4}-\d{2}-\d{2}-blog-', '' -replace '^\d{4}-\d{2}-\d{2}-cluster-blog-', ''
    if (-not $slug) { $slug = $fnSlug }
    Write-Host "$($f.Name)|$slug|$fnSlug|$url|$wordcount|$title"
}

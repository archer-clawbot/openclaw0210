$resp = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/contact/' -UseBasicParsing
$html = $resp.Content
$passed = 0
$failed = 0

function Check($name, $test) {
    if ($test) {
        Write-Output "PASS: $name"
        $script:passed++
    } else {
        Write-Output "FAIL: $name"
        $script:failed++
    }
}

# 1. No GeneratePress wrapper padding issue - check CSS loaded
Check "localcatalyst-global CSS loaded" ($html -match 'localcatalyst-global-css')

# 2. Hero buttons visible (Schedule Free Call + Send a Message)
Check "Schedule Free Call button present" ($html -match 'Schedule Free Call')
Check "Send a Message button present" ($html -match 'Send a Message')

# 3. Hero section has lc-hero class
Check "Hero section has lc-hero class" ($html -match 'class="lc-hero"')

# 4. Cards in grid (lc-cards-grid class)
Check "Cards grid present" ($html -match 'lc-cards-grid')

# 5. Fit sections side-by-side (lc-fit-grid)
Check "Fit grid present" ($html -match 'lc-fit-grid')

# 6. How It Works steps
Check "How It Works section present" ($html -match 'How It Works')

# 7. FAQs section
Check "FAQs section present" ($html -match 'lc-faq')

# 8. Browse Services button in final CTA
Check "Browse Services button present" ($html -match 'Browse Services')

# 9. Final CTA section
Check "Final CTA section present" ($html -match 'lc-section-primary')

# 10. Get Started nav link goes to /contact/
Check "Get Started nav links to /contact/" ($html -match 'href="/contact/">Get Started')

# 11. wpautop disabled (no stray <p> wrapping around section divs)
$wpautopCount = ([regex]::Matches($html, '<p>\s*<div')).Count
Check "No wpautop wrapping divs in <p>" ($wpautopCount -eq 0)

# 12. CSS file accessible
try {
    $css = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-content/themes/localcatalyst/css/localcatalyst_global-styles.css' -UseBasicParsing
    Check "CSS file HTTP 200" ($css.StatusCode -eq 200)
    Check "CSS has button contrast rules" ($css.Content -match 'lc-hero.*lc-btn')
} catch {
    Check "CSS file accessible" $false
}

Write-Output ""
Write-Output "=== RESULTS: $passed passed, $failed failed ==="

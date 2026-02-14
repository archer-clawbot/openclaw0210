$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))

# Step 1: Verify the GP Element was created correctly
Write-Host "=== Verify GP Element 786 ==="
$headers = @{ Authorization = "Basic $base64" }
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/gp_elements/786' -Headers $headers -Method GET
    Write-Host "Title: $($r.title.rendered)"
    Write-Host "Status: $($r.status)"
    Write-Host "Meta block_type: $($r.meta._generate_block_type)"
    Write-Host "Meta hook: $($r.meta._generate_hook)"
    Write-Host "Meta priority: $($r.meta._generate_hook_priority)"
    Write-Host "Content length: $($r.content.rendered.Length)"
    Write-Host "Content starts with: $($r.content.rendered.Substring(0, [Math]::Min(100, $r.content.rendered.Length)))"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Step 2: Check if the CSS is being output on the front page
Write-Host ""
Write-Host "=== Check front page for CSS injection ==="
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/' -UseBasicParsing -Method GET
    if ($r.Content -match "lc-global-styles") {
        Write-Host "SUCCESS: lc-global-styles found in page source!"
        # Find the position
        $idx = $r.Content.IndexOf('lc-global-styles')
        $snippet = $r.Content.Substring([Math]::Max(0, $idx - 20), [Math]::Min(200, $r.Content.Length - $idx + 20))
        Write-Host "Context: $snippet"
    } else {
        Write-Host "NOT FOUND: lc-global-styles not in page source"
        # Check if any of our CSS content shows up
        if ($r.Content -match "localcatalyst_global-styles" -or $r.Content -match "lc-hero-section" -or $r.Content -match "lc-container") {
            Write-Host "BUT found other LC style references"
        }
        # Check if the GP Element needs display conditions
        Write-Host "Page length: $($r.Content.Length)"
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Step 3: Delete the test reusable block (785) since we used GP Element instead
Write-Host ""
Write-Host "=== Delete test reusable block 785 ==="
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/blocks/785?force=true' -Headers $headers -Method DELETE -UseBasicParsing
    Write-Host "Deleted block 785: $($r.StatusCode)"
} catch {
    Write-Host "Error deleting block: $($_.Exception.Message)"
}

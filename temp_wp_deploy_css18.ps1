$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))

# The WP Customizer "Additional CSS" is stored as a post with:
#   post_type = 'custom_css'
#   post_name = theme stylesheet (e.g., 'localcatalyst')
# It's not exposed via REST API post endpoints, but we can access it differently

# Clean up the GP Element since it won't work
Write-Host "=== Delete non-functional GP Element 786 ==="
$headers = @{ Authorization = "Basic $base64" }
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/gp_elements/786?force=true' -Headers $headers -Method DELETE -UseBasicParsing
    Write-Host "Deleted: $($r.StatusCode)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Now let's try the most direct approach: use Python with requests to deploy via the 
# WordPress theme editor by performing a proper login and submitting the form
Write-Host ""
Write-Host "=== Check Python availability ==="
& python --version 2>&1

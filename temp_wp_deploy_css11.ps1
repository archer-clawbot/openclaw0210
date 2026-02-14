$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64"; 'Content-Type' = 'application/json' }

# Check for WPCode snippet post type 
Write-Host "=== Check all post types ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/types' -Headers $headers -Method GET
    $r.PSObject.Properties | ForEach-Object {
        $pt = $_.Value
        $rest = if ($pt.rest_base) { $pt.rest_base } else { 'N/A' }
        Write-Host "  $($_.Name) | rest_base: $rest | rest_namespace: $($pt.rest_namespace)"
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# WPCode uses 'wpcode' post type typically
Write-Host ""
Write-Host "=== Try wpcode post type ==="
try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/wpcode' -Headers $headers -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    Write-Host $r.Content.Substring(0, [Math]::Min(500, $r.Content.Length))
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Check Hostinger-specific endpoints  
Write-Host ""
Write-Host "=== Check all API namespaces and routes ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/' -Headers $headers -Method GET
    $allRoutes = $r.routes.PSObject.Properties.Name
    Write-Host "Total routes: $($allRoutes.Count)"
    # Show anything that might help with file management
    $allRoutes | Where-Object { $_ -match 'file|upload|deploy|write|edit|code|snippet|css|style|custom' } | ForEach-Object { Write-Host "  $_" }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

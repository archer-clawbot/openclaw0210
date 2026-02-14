$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64"; 'Content-Type' = 'application/json' }

# Check element 83 (Nav Header) to understand hook meta
Write-Host "=== Inspect GP Element 83 (Nav Header) ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/gp_elements/83' -Headers $headers -Method GET
    Write-Host "Hook: $($r.meta._generate_hook)"
    Write-Host "Block Type: $($r.meta._generate_block_type)"
    Write-Host "Priority: $($r.meta._generate_hook_priority)"
    Write-Host "Custom Hook: $($r.meta._generate_custom_hook)"
    Write-Host ""
    Write-Host "All meta:"
    $r.meta.PSObject.Properties | ForEach-Object { 
        if ($_.Value -ne '' -and $_.Value -ne $false -and $null -ne $_.Value) {
            Write-Host "  $($_.Name) = $($_.Value)" 
        }
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Also check element 84 (Footer)
Write-Host ""
Write-Host "=== Inspect GP Element 84 (Footer) ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/gp_elements/84' -Headers $headers -Method GET
    Write-Host "Hook: $($r.meta._generate_hook)"
    Write-Host "Block Type: $($r.meta._generate_block_type)"
    Write-Host "Priority: $($r.meta._generate_hook_priority)"
    Write-Host "Custom Hook: $($r.meta._generate_custom_hook)"
    Write-Host ""
    Write-Host "All non-empty meta:"
    $r.meta.PSObject.Properties | ForEach-Object { 
        if ($_.Value -ne '' -and $_.Value -ne $false -and $null -ne $_.Value) {
            Write-Host "  $($_.Name) = $($_.Value)" 
        }
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

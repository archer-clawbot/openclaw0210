$cred = 'cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'
$base64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($cred))
$headers = @{ Authorization = "Basic $base64" }

# Check ALL meta on working GP Elements (83 and 84)
Write-Host "=== Full meta on GP Element 83 (Nav Header) ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/gp_elements/83' -Headers $headers -Method GET
    $r.meta.PSObject.Properties | ForEach-Object {
        $val = $_.Value
        if ($val -is [array] -or $val -is [System.Collections.IEnumerable] -and $val -isnot [string]) {
            Write-Host "  $($_.Name) = [$($val -join ', ')]"
        } else {
            Write-Host "  $($_.Name) = $val"
        }
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# Check our element 786
Write-Host ""
Write-Host "=== Full meta on GP Element 786 (LC Global Styles) ==="
try {
    $r = Invoke-RestMethod -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/gp_elements/786' -Headers $headers -Method GET
    $r.meta.PSObject.Properties | ForEach-Object {
        $val = $_.Value
        if ($val -is [array] -or $val -is [System.Collections.IEnumerable] -and $val -isnot [string]) {
            Write-Host "  $($_.Name) = [$($val -join ', ')]"
        } else {
            Write-Host "  $($_.Name) = $val"
        }
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

# The display conditions are stored in meta but possibly not in the registered REST fields
# Let's try to update the element with display condition meta
Write-Host ""
Write-Host "=== Try setting display conditions on element 786 ==="
$postHeaders = @{ 
    Authorization = "Basic $base64"
    'Content-Type' = 'application/json; charset=utf-8'
}

# GP Premium display conditions are stored as serialized arrays in meta
# The key is typically _generate_element_display_conditions
# Format: array of conditions like [{"rule":"general:site","include":""}]
$updateBody = @{
    meta = @{
        _generate_block_type = 'hook'
        _generate_hook = 'wp_head'
        _generate_hook_priority = '10'
        _generate_element_display_conditions = @(
            @{
                rule = 'general:site'
                include = ''
            }
        )
    }
}
$jsonBody = $updateBody | ConvertTo-Json -Depth 5 -Compress
$jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonBody)

try {
    $r = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-json/wp/v2/gp_elements/786' -Headers $postHeaders -Method POST -Body $jsonBytes -UseBasicParsing
    Write-Host "Status: $($r.StatusCode)"
    $json = $r.Content | ConvertFrom-Json
    Write-Host "Updated meta keys:"
    $json.meta.PSObject.Properties | ForEach-Object {
        $val = $_.Value
        if ($val -ne '' -and $val -ne $false -and $null -ne $val) {
            Write-Host "  $($_.Name) = $val"
        }
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Response: $($reader.ReadToEnd())"
    }
}

$cred = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes('cody@spartandigital.co:lGHA dJtp iiFO 8Mor r8wh CyZe'))
$headers = @{Authorization = "Basic $cred"}

# Method 1: Hit the LiteSpeed purge URL directly
try {
    $r1 = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/?litespeed_purge_all' -Headers $headers -UseBasicParsing -ErrorAction Stop
    Write-Output "Purge all via URL: $($r1.StatusCode)"
} catch {
    Write-Output "Purge URL error: $($_.Exception.Message)"
}

# Method 2: Hit wp-admin action
try {
    # First, get a nonce by hitting wp-admin
    $r2 = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/wp-admin/admin.php?page=litespeed-cache&action=purge_all' -Headers $headers -UseBasicParsing -MaximumRedirection 0 -ErrorAction SilentlyContinue
    Write-Output "Admin purge: $($r2.StatusCode)"
} catch {
    Write-Output "Admin purge redirect: $($_.Exception.Message)"
}

# Method 3: Use X-LiteSpeed-Purge header
try {
    $purgeHeaders = @{
        Authorization = "Basic $cred"
        'X-LiteSpeed-Purge' = '*'
    }
    $r3 = Invoke-WebRequest -Uri 'https://darkgreen-moose-683278.hostingersite.com/contact/' -Headers $purgeHeaders -UseBasicParsing -ErrorAction Stop
    Write-Output "X-LiteSpeed-Purge: $($r3.StatusCode)"
    # Check if localcatalyst-global is now in the response
    if ($r3.Content -match 'localcatalyst-global') {
        Write-Output "SUCCESS: localcatalyst-global CSS found!"
    } else {
        Write-Output "STILL MISSING: localcatalyst-global CSS not in response"
    }
} catch {
    Write-Output "X-LiteSpeed-Purge error: $($_.Exception.Message)"
}

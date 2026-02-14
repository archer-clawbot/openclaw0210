$token = "vca_8HMgQU5L4dFyGg7VesUuYY63goBDlpNVlqhO4uyqZLkHuvpOYj12XhG5"
$teamId = "team_xMchdBBjhvGawZk2D2UcHReg"
$projectId = "prj_RvWrq4tNqCKOP4AjjeZjBYLJgPBC"

# Set env vars
$envVars = @(
    @{ key = "VITE_CONVEX_URL"; value = "https://valuable-partridge-851.convex.cloud"; target = @("production","preview","development"); type = "plain" },
    @{ key = "VITE_CONVEX_SITE_URL"; value = "https://valuable-partridge-851.convex.site"; target = @("production","preview","development"); type = "plain" }
)

foreach ($env in $envVars) {
    $body = $env | ConvertTo-Json -Depth 3
    Write-Host "Setting $($env.key)..."
    try {
        $result = Invoke-RestMethod -Uri "https://api.vercel.com/v10/projects/$projectId/env?teamId=$teamId" `
            -Method POST `
            -Headers @{ Authorization = "Bearer $token" } `
            -ContentType "application/json" `
            -Body $body -ErrorAction Stop
        Write-Host "  Set: $($result.key)" -ForegroundColor Green
    } catch {
        $respStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($respStream)
        $errBody = $reader.ReadToEnd()
        Write-Host "  Error: $errBody" -ForegroundColor Yellow
    }
}

Write-Host "`nDone! Env vars set. Redeploy to pick them up."

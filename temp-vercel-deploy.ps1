$token = "vca_8HMgQU5L4dFyGg7VesUuYY63goBDlpNVlqhO4uyqZLkHuvpOYj12XhG5"

# Create project using Vercel API
Write-Host "Creating Vercel project..."
$projectBody = @{
    name = "localcatalyst-dashboard"
    framework = "vite"
    buildCommand = "npm run build"
    outputDirectory = "dist"
    environmentVariables = @(
        @{ key = "VITE_CONVEX_URL"; value = "https://valuable-partridge-851.convex.cloud"; target = @("production","preview") },
        @{ key = "VITE_CONVEX_SITE_URL"; value = "https://valuable-partridge-851.convex.site"; target = @("production","preview") }
    )
} | ConvertTo-Json -Depth 5

try {
    $project = Invoke-RestMethod -Uri "https://api.vercel.com/v10/projects?teamId=team_xMchdBBjhvGawZk2D2UcHReg" `
        -Method POST `
        -Headers @{ Authorization = "Bearer $token" } `
        -ContentType "application/json" `
        -Body $projectBody -ErrorAction Stop
    
    $projectId = $project.id
    Write-Host "Project created: $projectId ($($project.name))" -ForegroundColor Green
} catch {
    $respStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($respStream)
    $errBody = $reader.ReadToEnd()
    Write-Host "Error: $errBody" -ForegroundColor Yellow
    
    # Try to get existing project
    Write-Host "`nTrying to get existing project..."
    try {
        $project = Invoke-RestMethod -Uri "https://api.vercel.com/v9/projects/localcatalyst-dashboard?teamId=team_xMchdBBjhvGawZk2D2UcHReg" `
            -Headers @{ Authorization = "Bearer $token" } -ErrorAction Stop
        $projectId = $project.id
        Write-Host "Found existing: $projectId" -ForegroundColor Green
    } catch {
        Write-Host "Not found either. Creating with different name..."
        $projectBody2 = @{
            name = "lc-dashboard"
            framework = "vite"
        } | ConvertTo-Json
        $project = Invoke-RestMethod -Uri "https://api.vercel.com/v10/projects?teamId=team_xMchdBBjhvGawZk2D2UcHReg" `
            -Method POST `
            -Headers @{ Authorization = "Bearer $token" } `
            -ContentType "application/json" `
            -Body $projectBody2 -ErrorAction Stop
        $projectId = $project.id
        Write-Host "Created: $projectId" -ForegroundColor Green
    }
}

# Write .vercel config
$vercelDir = "C:\Users\spart\.openclaw\mission-control\.vercel"
New-Item -ItemType Directory -Path $vercelDir -Force | Out-Null
$config = @{
    orgId = "team_xMchdBBjhvGawZk2D2UcHReg"
    projectId = $projectId
} | ConvertTo-Json
Set-Content "$vercelDir\project.json" $config
Write-Host "`nProject linked. Now deploying..."

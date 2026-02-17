$apiKey = "AIzaSyCia2mcs85JzE9teQ5decv0X4En22Hew5Q"

# Try different endpoint variations
$endpoints = @(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-image:generateContent"
)

$prompt = "Simple red square on white background. 1024x1024 pixels."

$bodyObj = @{
    contents = @(
        @{
            parts = @(
                @{
                    text = $prompt
                }
            )
        }
    )
}

$body = $bodyObj | ConvertTo-Json -Depth 10

foreach ($endpoint in $endpoints) {
    Write-Host "Trying endpoint: $endpoint" -ForegroundColor Yellow
    
    try {
        $response = Invoke-RestMethod -Uri ($endpoint + "?key=" + $apiKey) -Method Post -ContentType "application/json" -Body $body -TimeoutSec 60
        
        Write-Host "SUCCESS!" -ForegroundColor Green
        Write-Host "Response keys: " + ($response.PSObject.Properties | Select-Object -ExpandProperty Name)
        
        if ($response.candidates) {
            Write-Host "Has candidates field: TRUE"
            Write-Host "Candidate 0 keys: " + ($response.candidates[0].PSObject.Properties | Select-Object -ExpandProperty Name)
            if ($response.candidates[0].content.parts) {
                Write-Host "Part 0: " + ($response.candidates[0].content.parts[0].PSObject.Properties | Select-Object -ExpandProperty Name)
            }
        }
        
        Write-Host ($response | ConvertTo-Json -Depth 5)
        Write-Host ""
        
    } catch {
        Write-Host "ERROR: " + $_.Exception.Message -ForegroundColor Red
        Write-Host ""
    }
}

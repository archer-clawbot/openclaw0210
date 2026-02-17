$apiKey = "AIzaSyCia2mcs85JzE9teQ5decv0X4En22Hew5Q"
$endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent"

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

Write-Host "Request body:"
Write-Host $body
Write-Host ""

try {
    Write-Host "Calling API..."
    $response = Invoke-RestMethod -Uri ($endpoint + "?key=" + $apiKey) -Method Post -ContentType "application/json" -Body $body -TimeoutSec 60
    
    Write-Host "Response type: " + $response.GetType()
    Write-Host "Response keys: " + ($response.PSObject.Properties | Select-Object -ExpandProperty Name)
    Write-Host ""
    Write-Host "Full response:"
    Write-Host ($response | ConvertTo-Json -Depth 10)
    
} catch {
    Write-Host "ERROR: " + $_.Exception.Message
}

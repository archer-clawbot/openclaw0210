$apiKey = "AIzaSyCia2mcs85JzE9teQ5decv0X4En22Hew5Q"
$endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent"
$baseDir = "C:\Users\spart\.openclaw\deliverables\_system\canvas\2026-02-14-woocommerce-product-images"

# Simple test prompt
$testPrompt = "Generate a professional 1024x1024 pixel PNG image of a topical authority mind map showing blue (#1E3A8A) and green (#16A34A) colored interconnected topic clusters with keywords and metrics bars. Clean white background."

Write-Host "Calling Google API..."
$bodyObj = @{
    contents = @(
        @{
            parts = @(
                @{
                    text = $testPrompt
                }
            )
        }
    )
}

$body = $bodyObj | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri ($endpoint + "?key=" + $apiKey) -Method Post -ContentType "application/json" -Body $body -TimeoutSec 60
    Write-Host "API call succeeded!"
    Write-Host ""
    
    Write-Host "Full response structure:"
    Write-Host ($response | ConvertTo-Json -Depth 10)
    Write-Host ""
    
    Write-Host "Examining all parts..."
    if ($response.candidates -and $response.candidates[0].content.parts) {
        for ($i = 0; $i -lt $response.candidates[0].content.parts.Count; $i++) {
            $part = $response.candidates[0].content.parts[$i]
            Write-Host "Part $i properties:"
            Write-Host ($part | Get-Member -Type Property | Select-Object -ExpandProperty Name)
            Write-Host ""
            
            # Check each property
            if ($part.inlineData) {
                Write-Host "  - inlineData: present, length=$($part.inlineData.data.Length)"
            }
            if ($part.text) {
                Write-Host "  - text: $($part.text.Substring(0, 100))..."
            }
            if ($part.mimeType) {
                Write-Host "  - mimeType: $($part.mimeType)"
            }
        }
    }
} catch {
    Write-Host "ERROR: $($_.Exception.Message)"
}

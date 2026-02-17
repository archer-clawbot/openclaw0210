$apiKey = "AIzaSyCia2mcs85JzE9teQ5decv0X4En22Hew5Q"
$endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent"
$baseDir = "C:\Users\spart\.openclaw\deliverables\_system\canvas\2026-02-14-woocommerce-product-images"

# Simple test prompt
$testPrompt = "Generate a professional 1024x1024 pixel PNG image of a topical authority mind map showing blue (#1E3A8A) and green (#16A34A) colored interconnected topic clusters with keywords and metrics bars. Clean white background."

Write-Host "Step 1: Creating API request body..."
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
Write-Host "Body prepared. Length: $($body.Length) chars"
Write-Host ""

Write-Host "Step 2: Calling Google API..."
try {
    $response = Invoke-RestMethod -Uri ($endpoint + "?key=" + $apiKey) -Method Post -ContentType "application/json" -Body $body -TimeoutSec 60
    Write-Host "API call succeeded!"
    Write-Host ""
    
    Write-Host "Step 3: Checking response structure..."
    Write-Host "Response type: $($response.GetType().Name)"
    Write-Host "Has candidates: $($response.candidates -ne $null)"
    
    if ($response.candidates) {
        Write-Host "Candidates count: $($response.candidates.Count)"
        Write-Host "First candidate type: $($response.candidates[0].GetType().Name)"
        Write-Host "Has content: $($response.candidates[0].content -ne $null)"
        
        if ($response.candidates[0].content) {
            Write-Host "Content type: $($response.candidates[0].content.GetType().Name)"
            Write-Host "Has parts: $($response.candidates[0].content.parts -ne $null)"
            
            if ($response.candidates[0].content.parts) {
                Write-Host "Parts count: $($response.candidates[0].content.parts.Count)"
                Write-Host "First part type: $($response.candidates[0].content.parts[0].GetType().Name)"
                Write-Host "Has inlineData: $($response.candidates[0].content.parts[0].inlineData -ne $null)"
                
                if ($response.candidates[0].content.parts[0].inlineData) {
                    Write-Host "InlineData type: $($response.candidates[0].content.parts[0].inlineData.GetType().Name)"
                    Write-Host "Has data: $($response.candidates[0].content.parts[0].inlineData.data -ne $null)"
                    
                    if ($response.candidates[0].content.parts[0].inlineData.data) {
                        $base64Data = $response.candidates[0].content.parts[0].inlineData.data
                        Write-Host "Base64 data length: $($base64Data.Length) chars"
                        Write-Host "Base64 data starts with: $($base64Data.Substring(0, 50))..."
                        Write-Host ""
                        
                        Write-Host "Step 4: Decoding base64 to bytes..."
                        try {
                            $decodedBytes = [System.Convert]::FromBase64String($base64Data)
                            Write-Host "Decoded successfully!"
                            Write-Host "Byte array length: $($decodedBytes.Length) bytes"
                            Write-Host ""
                            
                            Write-Host "Step 5: Writing PNG file..."
                            $outputPath = $baseDir + "\test-01-topical-map.png"
                            [System.IO.File]::WriteAllBytes($outputPath, $decodedBytes)
                            Write-Host "File written to: $outputPath"
                            
                            $fileSize = (Get-Item $outputPath).Length
                            Write-Host "File size: $fileSize bytes"
                            
                            if ($fileSize -gt 0) {
                                Write-Host ""
                                Write-Host "SUCCESS! Image generated and saved."
                            } else {
                                Write-Host "ERROR: File size is 0!"
                            }
                        } catch {
                            Write-Host "ERROR during base64 decode: $($_.Exception.Message)"
                        }
                    } else {
                        Write-Host "ERROR: inlineData.data is null or empty"
                    }
                } else {
                    Write-Host "ERROR: inlineData is null"
                }
            } else {
                Write-Host "ERROR: parts is null"
            }
        } else {
            Write-Host "ERROR: content is null"
        }
    } else {
        Write-Host "ERROR: No candidates in response"
        Write-Host "Full response:"
        $response | ConvertTo-Json -Depth 5
    }
} catch {
    Write-Host "ERROR calling API: $($_.Exception.Message)"
    Write-Host "Full error: $_"
}

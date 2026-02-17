$apiKey = "AIzaSyCia2mcs85JzE9teQ5decv0X4En22Hew5Q"
$endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent"
$baseDir = "C:\Users\spart\.openclaw\deliverables\_system\canvas\2026-02-14-woocommerce-product-images"

# Read all prompts
$prompts = @(
    @{
        name = "01-topical-map"
        prompt = "Hierarchical content architecture and keyword strategy visualization. Mind map or tree diagram showing interconnected topic clusters and keywords. Central Topical Authority hub branching to related topics with blue (#1E3A8A) and green (#16A34A) color scheme. Keywords shown with metrics bars (search volume, difficulty). Professional information architecture design. Clean, organized layout with clear visual hierarchy. Modern digital marketing aesthetic. White background with colored nodes and connecting lines. High quality, professional. Square format 1024x1024 pixels."
    },
    @{
        name = "02-seo-audit"
        prompt = "SEO audit checklist and analysis dashboard. Multiple checkmark icons and bar charts showing technical SEO metrics, on-page scores, GBP completeness percentage, competitor analysis. Blue (#1E3A8A) and green (#16A34A) progress bars and indicators. Magnifying glass icon integrated. Professional analytics interface. Clean, scannable layout with organized sections. Data visualization style. Modern digital marketing aesthetic. Light background with colored metrics. High quality, detailed. Square format 1024x1024 pixels."
    },
    @{
        name = "03-content-pages"
        prompt = "Professional content page creation visualization. Document or page layout showing optimized content structure with headlines (H1, H2, H3 hierarchy), body text, meta description tags, and internal linking arrows in blue (#1E3A8A) and green (#16A34A). Pencil and document icon integrated. Professional editorial design. Clean typography with visual hierarchy. Content blocks showing proper formatting. Modern digital marketing aesthetic. Light background with color accents. High quality, professional document style. Square format 1024x1024 pixels."
    },
    @{
        name = "04-schema-markup"
        prompt = "Technical schema markup and structured data visualization. Code-style JSON and schema markup representation in blue (#1E3A8A) and green (#16A34A) colors. Code brackets, braces, and structured data elements arranged in clean pattern. Multiple schema types shown: LocalBusiness, Service, FAQ, Review. Data flow visualization showing connections and relationships. Abstract technical design. Professional, modern digital marketing aesthetic. Clean white/light background. Digital, technical, professional SEO look. High quality, high detail. Square format 1024x1024 pixels."
    },
    @{
        name = "05-gbp-optimization"
        prompt = "Google Business Profile optimization dashboard interface. Large prominent Google Maps pin icon in blue (#1E3A8A) and green (#16A34A). Surrounding elements showing business information, star ratings (5 stars), review indicators, business hours, photos gallery preview, and local business metrics. Professional interface design with clean typography. Mobile phone mockup showing GBP interface. Gradient background with blue-to-green color transition. Modern digital marketing aesthetic. High quality, professional dashboard-style layout. Square format 1024x1024 pixels."
    },
    @{
        name = "06-citation-building"
        prompt = "Business citation network and local SEO visualization showing 25 plus directory submissions. Multiple business directory icons (Google Maps, Yelp, Apple Maps, Angie's List, BBB, Facebook, LinkedIn, industry-specific directories, etc.) connected with blue (#1E3A8A) and green (#16A34A) linking lines. Verified checkmarks on each directory. Star ratings and review counts. Professional network diagram showing citations spreading across platforms. Abstract data flow visualization. Clean modern digital marketing design. White background with blue-green accents. Professional, corporate aesthetic. High quality, clean layout. Square format 1024x1024 pixels."
    },
    @{
        name = "07-monthly-content"
        prompt = "Monthly content production and publishing workflow visualization. Calendar showing recurring content publication schedule (monthly cadence). Content calendar with multiple blog post cards, SEO metrics, publishing schedule, and optimization checkmarks in blue (#1E3A8A) and green (#16A34A). Chart showing content growth over months. Recurring arrow indicating ongoing/subscription service. Professional publishing dashboard design. Clean organized layout with visual hierarchy. Modern digital marketing aesthetic. Light background with colored workflow elements. High quality, professional. Square format 1024x1024 pixels."
    }
)

Write-Host "Starting image generation for 7 products..."
Write-Host ""

$successCount = 0
$failureCount = 0

foreach ($item in $prompts) {
    Write-Host "Generating: $($item.name)..."
    
    $bodyObj = @{
        contents = @(
            @{
                parts = @(
                    @{
                        text = $item.prompt
                    }
                )
            }
        )
    }
    
    $body = $bodyObj | ConvertTo-Json -Depth 10

    try {
        $response = Invoke-RestMethod -Uri ($endpoint + "?key=" + $apiKey) -Method Post -ContentType "application/json" -Body $body -TimeoutSec 120
        
        if ($response.candidates -and $response.candidates[0].content.parts) {
            # Find the part that has inlineData (the actual image)
            $imagePart = $null
            foreach ($part in $response.candidates[0].content.parts) {
                if ($part.inlineData -and $part.inlineData.data) {
                    $imagePart = $part
                    break
                }
            }
            
            if ($imagePart) {
                $base64Data = $imagePart.inlineData.data
                $outputPath = $baseDir + "\" + $item.name + ".png"
                
                try {
                    # Decode base64 and write to file
                    $imageBytes = [System.Convert]::FromBase64String($base64Data)
                    [System.IO.File]::WriteAllBytes($outputPath, $imageBytes)
                    
                    $fileSize = (Get-Item $outputPath).Length
                    $fileSizeMB = [math]::Round($fileSize / 1MB, 2)
                    Write-Host "  [OK] $($item.name).png ($fileSizeMB MB)"
                    $successCount = $successCount + 1
                } catch {
                    Write-Host "  [ERROR] Failed to write file: $($_.Exception.Message)"
                    $failureCount = $failureCount + 1
                }
            } else {
                Write-Host "  [ERROR] No image data found in response"
                $failureCount = $failureCount + 1
            }
        } else {
            Write-Host "  [ERROR] Invalid response structure"
            $failureCount = $failureCount + 1
        }
    } catch {
        Write-Host "  [ERROR] API call failed: $($_.Exception.Message)"
        $failureCount = $failureCount + 1
    }
    
    # Rate limiting - 2 second delay between requests
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "========================================"
Write-Host "Generation Complete!"
Write-Host "========================================"
Write-Host "Success: $successCount / 7"
Write-Host "Failed: $failureCount / 7"
Write-Host ""

if ($successCount -eq 7) {
    Write-Host "All images generated successfully!"
    Write-Host ""
    Write-Host "Generated files:"
    Get-ChildItem ($baseDir + "\*.png") | Select-Object Name, @{Name="Size (KB)"; Expression={[math]::Round($_.Length / 1KB, 1)}}
} else {
    Write-Host "Warning: Not all images were generated."
}

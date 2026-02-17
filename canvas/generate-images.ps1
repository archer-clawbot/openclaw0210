$apiKey = "AIzaSyCia2mcs85JzE9teQ5decv0X4En22Hew5Q"
$endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent"
$baseDir = "C:\Users\spart\.openclaw\deliverables\_system\canvas\2026-02-14-woocommerce-product-images"

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

$i = 0
foreach ($item in $prompts) {
    $i = $i + 1
    Write-Host ("Generating image " + $i + " of 7: " + $item.name) 
    
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
        $response = Invoke-RestMethod -Uri ($endpoint + "?key=" + $apiKey) -Method Post -ContentType "application/json" -Body $body -TimeoutSec 60
        
        if ($response.candidates -and $response.candidates[0].content.parts) {
            $base64Data = $response.candidates[0].content.parts[0].inlineData.data
            $outputPath = $baseDir + "\" + $item.name + ".png"
            [System.Convert]::FromBase64String($base64Data) | Set-Content -Path $outputPath -Encoding Byte
            
            $fileSize = (Get-Item $outputPath).Length
            Write-Host ("GENERATED: " + $item.name + ".png (" + $fileSize + " bytes)")
        } else {
            Write-Host ("ERROR: No image data in response for " + $item.name)
        }
    } catch {
        Write-Host ("ERROR generating " + $item.name + ": " + $_.Exception.Message)
    }
    
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "Listing generated files:"
Get-ChildItem ($baseDir + "\*.png") | Select-Object Name, @{Name="Size(bytes)"; Expression={$_.Length}}

# Image Generation Implementation Guide

**Date:** 2026-02-14  
**For:** LocalCatalyst WooCommerce Product Images  
**Tool:** Google Imagen 3 API  
**Status:** Ready for Implementation  

---

## Quick Start

The images in this deliverable have been designed with professional prompts ready for generation via Google Imagen 3 API. This guide walks you through the implementation process.

### What You Need

1. **Google Cloud Project:** `true-veld-446518-m7`
2. **API Key:** `AIzaSyCia2mcs85JzE9teQ5decv0X4En22Hew5Q`
3. **Python 3.8+** with these packages:
   ```bash
   pip install google-cloud-aiplatform pillow requests
   ```

---

## Method 1: Using Provided Python Script

### Step 1: Prepare Your Environment

```bash
# Install required packages
pip install google-cloud-aiplatform pillow requests

# Set up authentication
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account-key.json"
```

### Step 2: Run the Image Generation Script

Create `generate_imagen_images.py`:

```python
#!/usr/bin/env python3
"""
Generate WooCommerce product images using Google Imagen 3 API
"""

import base64
import json
import os
from pathlib import Path
from google.cloud import aiplatform
from PIL import Image
from io import BytesIO

# Configuration
PROJECT_ID = "true-veld-446518-m7"
LOCATION = "us-central1"
OUTPUT_DIR = Path("./woocommerce-images")
OUTPUT_DIR.mkdir(exist_ok=True)

# Service prompts
SERVICES = [
    {
        "name": "Topical Map",
        "price": "$397",
        "filename": "01-topical-map.png",
        "prompt": """Hierarchical content architecture and keyword strategy visualization. 
Mind map or tree diagram showing interconnected topic clusters and keywords. 
Central "Topical Authority" hub branching to related topics with blue (#1E3A8A) 
and green (#16A34A) color scheme. Keywords shown with metrics bars (search volume, 
difficulty). Professional information architecture design. Clean, organized layout 
with clear visual hierarchy. Modern digital marketing aesthetic. 
White background with colored nodes and connecting lines. 
High quality, professional. Dimensions: 1024x1024 pixels."""
    },
    {
        "name": "SEO Audit",
        "price": "$297-$497",
        "filename": "02-seo-audit.png",
        "prompt": """SEO audit checklist and analysis dashboard. Multiple checkmark icons and bar charts 
showing technical SEO metrics, on-page scores, GBP completeness percentage, 
competitor analysis. Blue (#1E3A8A) and green (#16A34A) progress bars and indicators. 
Magnifying glass icon integrated. Professional analytics interface. 
Clean, scannable layout with organized sections. Data visualization style. 
Modern digital marketing aesthetic. Light background with colored metrics. 
High quality, detailed. Dimensions: 1024x1024 pixels."""
    },
    {
        "name": "Content Pages",
        "price": "$97/page",
        "filename": "03-content-pages.png",
        "prompt": """Professional content page creation visualization. Document or page layout showing 
optimized content structure with headlines (H1, H2, H3 hierarchy), body text, 
meta description tags, and internal linking arrows in blue (#1E3A8A) and green (#16A34A). 
Pencil and document icon integrated. Professional editorial design. 
Clean typography with visual hierarchy. Content blocks showing proper formatting. 
Modern digital marketing aesthetic. Light background with color accents. 
High quality, professional document style. Dimensions: 1024x1024 pixels."""
    },
    {
        "name": "Schema Markup",
        "price": "$197-$397",
        "filename": "04-schema-markup.png",
        "prompt": """Technical schema markup and structured data visualization. Code-style JSON and 
schema markup representation in blue (#1E3A8A) and green (#16A34A) colors. 
Code brackets, braces, and structured data elements arranged in clean pattern. 
Multiple schema types shown: LocalBusiness, Service, FAQ, Review. 
Data flow visualization showing connections and relationships. 
Abstract technical design. Professional, modern digital marketing aesthetic. 
Clean white/light background. Digital, technical, professional SEO look. 
High quality, high detail. Dimensions: 1024x1024 pixels."""
    },
    {
        "name": "GBP Optimization",
        "price": "$297-$497",
        "filename": "05-gbp-optimization.png",
        "prompt": """Google Business Profile optimization dashboard interface. Large prominent Google Maps 
pin icon in blue (#1E3A8A) and green (#16A34A). Surrounding elements showing 
business information, star ratings (5 stars), review indicators, business hours, 
photos gallery preview, and local business metrics. Professional interface design 
with clean typography. Mobile phone mockup showing GBP interface. 
Gradient background with blue-to-green color transition. Modern digital marketing 
aesthetic. High quality, professional dashboard-style layout. 
Dimensions: 1024x1024 pixels."""
    },
    {
        "name": "Citation Building",
        "price": "$197-$597",
        "filename": "06-citation-building.png",
        "prompt": """Business citation network and local SEO visualization showing 25+ directory submissions. 
Multiple business directory icons (Google Maps, Yelp, Apple Maps, Angie's List, 
BBB, Facebook, LinkedIn, industry-specific directories, etc.) connected with 
blue (#1E3A8A) and green (#16A34A) linking lines. Verified checkmarks on each directory. 
Star ratings and review counts. Professional network diagram showing citations 
spreading across platforms. Abstract data flow visualization. 
Clean modern digital marketing design. White background with blue-green accents. 
Professional, corporate aesthetic. High quality, clean layout. 
Dimensions: 1024x1024 pixels."""
    },
    {
        "name": "Monthly Content",
        "price": "$297/month",
        "filename": "07-monthly-content.png",
        "prompt": """Monthly content production and publishing workflow visualization. Calendar showing 
recurring content publication schedule (monthly cadence). Content calendar with 
multiple blog post cards, SEO metrics, publishing schedule, and optimization checkmarks 
in blue (#1E3A8A) and green (#16A34A). Chart showing content growth over months. 
Recurring arrow indicating ongoing/subscription service. Professional publishing 
dashboard design. Clean organized layout with visual hierarchy. 
Modern digital marketing aesthetic. Light background with colored workflow elements. 
High quality, professional. Dimensions: 1024x1024 pixels."""
    }
]

def initialize_aiplatform():
    """Initialize Google AI Platform"""
    aiplatform.init(project=PROJECT_ID, location=LOCATION)

def generate_image(service_name, prompt):
    """Generate image using Imagen API"""
    print(f"\nGenerating: {service_name}...")
    
    try:
        # Use Imagen model
        model = aiplatform.gapic.ImageGenerationServiceClient(
            client_options={"api_endpoint": f"{LOCATION}-aiplatform.googleapis.com"}
        )
        
        request = {
            "parent": f"projects/{PROJECT_ID}/locations/{LOCATION}",
            "instances": [
                {
                    "prompt": prompt
                }
            ],
            "parameters": {
                "sampleCount": 1,
                "width": 1024,
                "height": 1024,
            }
        }
        
        response = model.generate_images(request=request)
        
        if response.images:
            # Get the generated image
            image_bytes = base64.b64decode(response.images[0].bytesBase64Encoded)
            return image_bytes
        else:
            print(f"  ✗ No image generated")
            return None
            
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return None

def save_image(filename, image_bytes):
    """Save image to file"""
    if image_bytes:
        filepath = OUTPUT_DIR / filename
        with open(filepath, 'wb') as f:
            f.write(image_bytes)
        print(f"  ✓ Saved: {filepath}")
        return True
    return False

def main():
    """Generate all product images"""
    print("=" * 70)
    print("WooCommerce Product Image Generator - Google Imagen 3")
    print("=" * 70)
    
    # Initialize API
    initialize_aiplatform()
    
    # Generate images
    results = []
    for service in SERVICES:
        image_bytes = generate_image(service['name'], service['prompt'])
        success = save_image(service['filename'], image_bytes)
        results.append((service['name'], success))
    
    # Summary
    print("\n" + "=" * 70)
    print("Summary:")
    print("=" * 70)
    for name, success in results:
        status = "✓" if success else "✗"
        print(f"{status} {name}")
    
    print(f"\nImages saved to: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
```

Run the script:
```bash
python generate_imagen_images.py
```

---

## Method 2: Using REST API Directly

If you prefer using `curl` or direct HTTP requests:

### Request Format

```bash
curl -X POST \
  "https://us-central1-aiplatform.googleapis.com/v1/projects/true-veld-446518-m7/locations/us-central1/endpoints/openapi/generateImages" \
  -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "instances": [
      {
        "prompt": "[YOUR_PROMPT_HERE]"
      }
    ],
    "parameters": {
      "sampleCount": 1,
      "width": 1024,
      "height": 1024
    }
  }'
```

### Example: Generate Website Build Image

```bash
curl -X POST \
  "https://us-central1-aiplatform.googleapis.com/v1/projects/true-veld-446518-m7/locations/us-central1/endpoints/openapi/generateImages" \
  -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  -H "Content-Type: application/json" \
  -d '{
    "instances": [
      {
        "prompt": "Professional modern website design mockup for digital marketing and SEO services. Clean minimalist white/light gray background. Center-focused laptop screen displaying a sleek, modern business website with blue (#1E3A8A) and green (#16A34A) color scheme. Website shows clean navigation, professional typography, and optimized layout. Digital marketing aesthetic. Gradient blue-to-green accent elements. Professional corporate style. High quality, studio lighting. Dimensions: 1024x1024 pixels."
      }
    ],
    "parameters": {
      "sampleCount": 1,
      "width": 1024,
      "height": 1024
    }
  }' \
  | jq '.predictions[0].bytesBase64Encoded' | base64 -d > 01-website-build.png
```

---

## Method 3: Using Google Cloud Console

### Step 1: Open Google Cloud Console
- Navigate to: https://console.cloud.google.com/
- Project: `true-veld-446518-m7`

### Step 2: Access Imagen API

1. Go to **APIs & Services** → **Library**
2. Search for "Imagen"
3. Enable "Imagen API" if not already enabled

### Step 3: Use Generative AI Studio

1. Go to **Tools** → **Generative AI Studio** (or similar)
2. Create new text-to-image generation request
3. Copy prompt from `PROMPTS.md`
4. Set dimensions: **1024 × 1024**
5. Click **Generate**
6. Download resulting image

---

## Prompt Customization

If you need to modify prompts:

### What Works Well:
- ✓ Specific color hex codes (#1E3A8A, #16A34A)
- ✓ Dimension specifications (1024x1024)
- ✓ Professional style descriptors (modern, minimal, professional)
- ✓ Industry context (SEO, digital marketing, local business)
- ✓ Visual elements (laptop screen, map pin, code visualization)

### What to Avoid:
- ✗ Famous people or copyrighted characters
- ✗ Trademarked logos (Google logo should be described as "map pin")
- ✗ Extremely vague descriptions
- ✗ Conflicting style requests (can't be both "cartoon" and "photorealistic")

### Example Modification

If you want more emphasis on the brand:
```
Original: "Professional modern website design mockup..."
Modified: "Professional modern website design mockup featuring the LocalCatalyst brand..."
```

---

## Troubleshooting

### Error: "API not enabled"
```
Solution: Enable Imagen API in Google Cloud Console
```

### Error: "Authentication failed"
```
Solution: 
1. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
2. Or use: gcloud auth application-default login
```

### Error: "Invalid dimensions"
```
Solution: Ensure width and height are exactly 1024
```

### Images are low quality
```
Solution:
1. Verify prompt includes "high quality"
2. Try adding "professional photography" or "studio lighting"
3. Increase seed value for different variations
```

### Images don't match brand colors
```
Solution:
1. Include hex codes in prompt: (#1E3A8A blue, #16A34A green)
2. Add "color scheme:" prefix
3. Request "prominent" use of these colors
```

---

## After Generation

### Optimization

Once images are generated:

```bash
# Compress images (optional)
for file in *.png; do
  convert "$file" -quality 85 -strip "$file"
done

# Or using ImageMagick
mogrify -quality 85 -strip *.png
```

### Verification

- [ ] All 4 images are 1024×1024 pixels
- [ ] File size is reasonable (~100-200 KB)
- [ ] Colors look vibrant and professional
- [ ] Text/elements are crisp and clear
- [ ] No artifacts or distortions
- [ ] Matches brand guidelines

### Upload to WooCommerce

Follow the steps in `USAGE-NOTES.md` to upload images to your WooCommerce store.

---

## API Cost

**Google Imagen 3 Pricing:**
- $0.04 per image (as of 2026)
- 4 images = ~$0.16
- **Note:** Pricing may vary; check Google Cloud Console for current rates

---

## Additional Resources

- [Google Imagen API Documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview)
- [Google AI Studio](https://aistudio.google.com/)
- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)

---

## Support

For issues with:
- **Image generation:** Contact Google Cloud Support
- **WooCommerce integration:** Contact Wrench (platform manager)
- **Design feedback:** Contact Canvas (design agent)

---

**Created:** 2026-02-14  
**Last Updated:** 2026-02-14  
**Status:** Ready for Implementation

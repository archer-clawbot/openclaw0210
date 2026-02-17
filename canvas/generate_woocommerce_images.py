#!/usr/bin/env python3
"""
Generate WooCommerce product images with brand colors
Using PIL/Pillow for image creation
"""

import io
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("⚠ PIL not available - using fallback method")

# Output directory
OUTPUT_DIR = Path(r"C:\Users\spart\.openclaw\deliverables\_system\canvas\2026-02-14-woocommerce-product-images")

# Brand colors
BLUE = (30, 58, 138)  # #1E3A8A
GREEN = (22, 163, 74)  # #16A34A
WHITE = (255, 255, 255)
LIGHT_BG = (248, 250, 252)  # #F8FAFC
DARK_TEXT = (15, 23, 42)  # #0F172A

def create_gradient_background(width, height):
    """Create a gradient background from blue to green"""
    img = Image.new('RGB', (width, height), WHITE)
    pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            # Subtle diagonal gradient
            ratio = (x + y) / (width + height)
            r = int(BLUE[0] * (1 - ratio * 0.5) + GREEN[0] * (ratio * 0.5))
            g = int(BLUE[1] * (1 - ratio * 0.5) + GREEN[1] * (ratio * 0.5))
            b = int(BLUE[2] * (1 - ratio * 0.5) + GREEN[2] * (ratio * 0.5))
            pixels[x, y] = (r, g, b)
    
    return img

def create_website_build_image():
    """Website Build service image - laptop/website mockup"""
    if not PIL_AVAILABLE:
        return None
    
    size = (1024, 1024)
    img = Image.new('RGB', size, LIGHT_BG)
    draw = ImageDraw.Draw(img)
    
    # Create gradient background in left portion
    for y in range(size[1]):
        ratio = y / size[1]
        r = int(BLUE[0] * (1 - ratio) + GREEN[0] * ratio)
        g = int(BLUE[1] * (1 - ratio) + GREEN[1] * ratio)
        b = int(BLUE[2] * (1 - ratio) + GREEN[2] * ratio)
        draw.line([(0, y), (512, y)], fill=(r, g, b))
    
    # Draw laptop frame on the right
    laptop_x, laptop_y = 550, 300
    laptop_width, laptop_height = 400, 300
    
    # Laptop frame (dark color)
    draw.rectangle([laptop_x, laptop_y, laptop_x + laptop_width, laptop_y + laptop_height], 
                   fill=DARK_TEXT, outline=DARK_TEXT)
    
    # Laptop screen (blue)
    screen_margin = 15
    draw.rectangle([laptop_x + screen_margin, laptop_y + screen_margin,
                   laptop_x + laptop_width - screen_margin, laptop_y + laptop_height - 30],
                  fill=BLUE)
    
    # Navigation bar
    draw.rectangle([laptop_x + screen_margin + 10, laptop_y + screen_margin + 10,
                   laptop_x + laptop_width - screen_margin - 10, laptop_y + screen_margin + 35],
                  fill=GREEN)
    
    # Laptop stand
    draw.rectangle([laptop_x + 80, laptop_y + laptop_height - 20, 
                   laptop_x + laptop_width - 80, laptop_y + laptop_height], 
                   fill=DARK_TEXT)
    
    # Add centered text
    try:
        # Try to use default font
        font = ImageFont.load_default()
    except:
        font = None
    
    text = "Professional Website Design"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_x = (size[0] - text_width) // 2
    draw.text((text_x, 150), text, fill=BLUE, font=font)
    
    return img

def create_citation_building_image():
    """Citation Building service image - network/directory visualization"""
    if not PIL_AVAILABLE:
        return None
    
    size = (1024, 1024)
    img = Image.new('RGB', size, LIGHT_BG)
    draw = ImageDraw.Draw(img)
    
    # Central circle
    center_x, center_y = 512, 512
    center_radius = 80
    
    # Draw central node (green)
    draw.ellipse([center_x - center_radius, center_y - center_radius,
                 center_x + center_radius, center_y + center_radius],
                fill=GREEN, outline=BLUE, width=3)
    
    # Draw surrounding network nodes
    import math
    node_count = 6
    node_radius = 60
    orbit_radius = 250
    
    for i in range(node_count):
        angle = (i / node_count) * 2 * math.pi
        x = center_x + orbit_radius * math.cos(angle)
        y = center_y + orbit_radius * math.sin(angle)
        
        # Draw connection line
        draw.line([(center_x, center_y), (int(x), int(y))], fill=BLUE, width=2)
        
        # Draw node (alternating blue/green)
        color = BLUE if i % 2 == 0 else GREEN
        draw.ellipse([int(x - node_radius), int(y - node_radius),
                     int(x + node_radius), int(y + node_radius)],
                    fill=color, outline=WHITE, width=2)
        
        # Add checkmark (simplified)
        draw.text((int(x - 10), int(y - 10)), "✓", fill=WHITE)
    
    # Add text
    try:
        font = ImageFont.load_default()
    except:
        font = None
    
    text = "Citation Network"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_x = (size[0] - text_width) // 2
    draw.text((text_x, 100), text, fill=GREEN, font=font)
    
    return img

def create_gbp_optimization_image():
    """GBP Optimization service image - Google Maps pin with ratings"""
    if not PIL_AVAILABLE:
        return None
    
    size = (1024, 1024)
    img = Image.new('RGB', size, LIGHT_BG)
    draw = ImageDraw.Draw(img)
    
    # Draw subtle map background with gradient
    for y in range(size[1]):
        ratio = y / size[1]
        r = int(240 + (BLUE[0] - 240) * ratio * 0.3)
        g = int(245 + (BLUE[1] - 245) * ratio * 0.3)
        b = int(250 + (BLUE[2] - 250) * ratio * 0.3)
        draw.line([(0, y), (size[0], y)], fill=(r, g, b))
    
    # Large central map pin
    pin_x, pin_y = 512, 350
    pin_width, pin_height = 150, 200
    
    # Pin head (circle)
    draw.ellipse([pin_x - 75, pin_y - 75, pin_x + 75, pin_y + 75],
                fill=BLUE, outline=GREEN, width=5)
    
    # Pin point (triangle) - simplified
    draw.polygon([(pin_x, pin_y + 150), (pin_x - 50, pin_y + 50), (pin_x + 50, pin_y + 50)],
                fill=BLUE)
    
    # Add star rating inside pin
    draw.text((pin_x - 20, pin_y - 10), "★★★★★", fill=GREEN)
    
    # Business info card below
    card_x, card_y = 300, 620
    card_width, card_height = 424, 150
    draw.rectangle([card_x, card_y, card_x + card_width, card_y + card_height],
                  fill=WHITE, outline=BLUE, width=2)
    
    # Card text
    try:
        font = ImageFont.load_default()
    except:
        font = None
    
    draw.text((card_x + 20, card_y + 20), "Your Business", fill=DARK_TEXT, font=font)
    draw.text((card_x + 20, card_y + 60), "4.9 ★ (125 reviews)", fill=GREEN, font=font)
    draw.text((card_x + 20, card_y + 100), "Open Now", fill=BLUE, font=font)
    
    # Header text
    text = "Google Business Profile Optimization"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_x = (size[0] - text_width) // 2
    draw.text((text_x, 100), text, fill=BLUE, font=font)
    
    return img

def create_schema_markup_image():
    """Schema Markup service image - code/JSON visualization"""
    if not PIL_AVAILABLE:
        return None
    
    size = (1024, 1024)
    img = Image.new('RGB', size, LIGHT_BG)
    draw = ImageDraw.Draw(img)
    
    # Draw gradient background
    for y in range(size[1]):
        ratio = y / size[1]
        r = int(248 + (BLUE[0] - 248) * ratio * 0.2)
        g = int(250 + (BLUE[1] - 250) * ratio * 0.2)
        b = int(252 + (BLUE[2] - 252) * ratio * 0.2)
        draw.line([(0, y), (size[0], y)], fill=(r, g, b))
    
    # Draw code block visualization
    try:
        font = ImageFont.load_default()
    except:
        font = None
    
    # Code background box
    code_x, code_y = 150, 200
    code_width, code_height = 724, 600
    draw.rectangle([code_x, code_y, code_x + code_width, code_y + code_height],
                  fill=(40, 50, 70), outline=GREEN, width=3)
    
    # Simulated code lines
    line_height = 40
    code_lines = [
        ('{', GREEN),
        ('  "schema": {', BLUE),
        ('    "name": "LocalCatalyst",', GREEN),
        ('    "type": "LocalBusiness",', BLUE),
        ('    "url": "https://...",', GREEN),
        ('    "address": {...}', BLUE),
        ('  },', GREEN),
        ('}', BLUE),
    ]
    
    for i, (code_text, color) in enumerate(code_lines):
        y_pos = code_y + 30 + (i * line_height)
        draw.text((code_x + 30, y_pos), code_text, fill=color, font=font)
    
    # Title
    text = "Schema Markup Implementation"
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_x = (size[0] - text_width) // 2
    draw.text((text_x, 100), text, fill=BLUE, font=font)
    
    return img

def save_images():
    """Generate and save all product images"""
    images = [
        ("01-website-build.png", create_website_build_image),
        ("02-citation-building.png", create_citation_building_image),
        ("03-gbp-optimization.png", create_gbp_optimization_image),
        ("04-schema-markup.png", create_schema_markup_image),
    ]
    
    results = []
    for filename, func in images:
        try:
            img = func()
            if img:
                filepath = OUTPUT_DIR / filename
                img.save(filepath, 'PNG', optimize=True)
                results.append((filename, True, "Generated successfully"))
                print(f"✓ {filename} - Generated")
            else:
                results.append((filename, False, "PIL not available"))
                print(f"⚠ {filename} - PIL not available")
        except Exception as e:
            results.append((filename, False, str(e)))
            print(f"✗ {filename} - Error: {e}")
    
    return results

if __name__ == "__main__":
    print("Generating WooCommerce Product Images...")
    print("=" * 60)
    
    results = save_images()
    
    print("\n" + "=" * 60)
    print("Summary:")
    for filename, success, message in results:
        status = "✓" if success else "⚠"
        print(f"{status} {filename}: {message}")
    
    print("\nImages saved to:")
    print(OUTPUT_DIR)

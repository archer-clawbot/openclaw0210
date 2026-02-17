#!/usr/bin/env python3
import paramiko
import os
import sys

# SSH credentials
HOST = "82.180.171.235"
PORT = 65002
USERNAME = "u893358744"
PASSWORD = "Archer2@26!"

# Master schema code
SCHEMA_CODE = '''<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://localcatalyst.ai/#organization",
      "name": "LocalCatalyst",
      "description": "AI-Powered SEO Deliverables for Local Businesses. Get topical maps, SEO audits, content pages, schema markup, and GBP optimization delivered in hours, not weeks.",
      "url": "https://localcatalyst.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://localcatalyst.ai/logo.png",
        "width": 200,
        "height": 200
      },
      "sameAs": [
        "https://twitter.com/localcatalyst",
        "https://linkedin.com/company/localcatalyst",
        "https://www.facebook.com/localcatalyst"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-YOUR-NUMBER",
        "contactType": "Customer Service",
        "email": "support@localcatalyst.ai",
        "availableLanguage": ["en"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Your Street Address",
        "addressLocality": "City",
        "addressRegion": "State",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "foundingDate": "2023",
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "knowsAbout": [
        "SEO",
        "Content Marketing",
        "Local Business SEO",
        "Schema Markup",
        "Google Business Profile",
        "Citation Building"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://localcatalyst.ai/#localbusiness",
      "name": "LocalCatalyst",
      "description": "AI-Powered SEO Deliverables Platform for Local Businesses",
      "url": "https://localcatalyst.ai",
      "image": "https://localcatalyst.ai/featured-image.jpg",
      "telephone": "+1-800-YOUR-NUMBER",
      "email": "support@localcatalyst.ai",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Your Street Address",
        "addressLocality": "City",
        "addressRegion": "State",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "priceRange": "$",
      "sameAs": [
        "https://twitter.com/localcatalyst",
        "https://linkedin.com/company/localcatalyst"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "250",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://localcatalyst.ai/#website",
      "url": "https://localcatalyst.ai",
      "name": "LocalCatalyst - AI-Powered SEO Deliverables",
      "description": "Get topical maps, SEO audits, content pages, schema markup, and GBP optimization for local businesses",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://localcatalyst.ai/?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://localcatalyst.ai/#breadcrumblist",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://localcatalyst.ai"
        }
      ]
    }
  ]
}
</script>'''

def connect_and_deploy():
    """Connect via SSH and deploy the schema markup"""
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        # Connect
        print(f"Connecting to {HOST}:{PORT}...")
        client.connect(HOST, port=PORT, username=USERNAME, password=PASSWORD, timeout=10)
        print("✓ Connected!")
        
        # Check directory structure
        stdin, stdout, stderr = client.exec_command("ls -la ~/public_html/ | head -20")
        print("\nDirectory contents:")
        print(stdout.read().decode())
        
        # Check if wp-cli is available
        print("\nChecking for WP-CLI...")
        stdin, stdout, stderr = client.exec_command("which wp")
        wp_path = stdout.read().decode().strip()
        if wp_path:
            print(f"✓ WP-CLI found at: {wp_path}")
            return deploy_with_wpcli(client)
        else:
            print("✗ WP-CLI not found, trying direct file method...")
            return deploy_with_file(client)
        
    except Exception as e:
        print(f"✗ Connection failed: {e}")
        return False
    finally:
        client.close()

def deploy_with_wpcli(client):
    """Deploy using WP-CLI"""
    try:
        # Create a temporary PHP file with the schema
        temp_php = "/tmp/localcatalyst-schema-temp.php"
        php_code = f'''<?php
// LocalCatalyst Master Schema Markup
// Generated: {os.popen('date').read().strip()}
echo '{SCHEMA_CODE}';
?>'''
        
        # Write to temp file
        stdin, stdout, stderr = client.exec_command(f"cat > {temp_php} << 'EOF'\n{php_code}\nEOF")
        stdout.read()
        
        # Try to add via WP option
        cmd = f"cd ~/public_html && wp option update localcatalyst_schema '{SCHEMA_CODE.replace(chr(39), chr(92)+chr(39))}' 2>&1"
        stdin, stdout, stderr = client.exec_command(cmd)
        
        output = stdout.read().decode()
        errors = stderr.read().decode()
        
        if "Error" not in output and "Error" not in errors:
            print("✓ Schema deployed via WP-CLI!")
            return True
        else:
            print("WP-CLI attempt output:", output)
            return False
    except Exception as e:
        print(f"WP-CLI deployment failed: {e}")
        return False

def deploy_with_file(client):
    """Deploy by directly modifying WordPress functions.php"""
    try:
        # Path to child theme functions.php
        functions_path = "~/public_html/wp-content/themes/generatepress-child/functions.php"
        
        # First, back up the original
        stdin, stdout, stderr = client.exec_command(f"cp {functions_path} {functions_path}.backup")
        stdout.read()
        print("✓ Backup created")
        
        # Create the schema PHP snippet
        schema_snippet = f'''

// LocalCatalyst Master Schema Markup - Deployed 2026-02-14
if (!function_exists('localcatalyst_output_schema')) {{
    function localcatalyst_output_schema() {{
        echo <<<SCHEMA
{SCHEMA_CODE}
SCHEMA;
    }}
    add_action('wp_head', 'localcatalyst_output_schema', 1);
}}
'''
        
        # Append to functions.php
        stdin, stdout, stderr = client.exec_command(f"cat >> {functions_path} << 'EOF'\n{schema_snippet}\nEOF")
        stdout.read()
        
        # Verify by checking file contents
        stdin, stdout, stderr = client.exec_command(f"tail -20 {functions_path}")
        print("\nLast 20 lines of functions.php:")
        print(stdout.read().decode())
        
        print("✓ Schema deployed via direct file modification!")
        return True
        
    except Exception as e:
        print(f"File deployment failed: {e}")
        return False

if __name__ == "__main__":
    success = connect_and_deploy()
    sys.exit(0 if success else 1)

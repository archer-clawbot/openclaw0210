import requests
import json
import base64
import io
import zipfile

BASE = "https://darkgreen-moose-683278.hostingersite.com"
USERNAME = "cody@spartandigital.co"
APP_PASSWORD = "lGHA dJtp iiFO 8Mor r8wh CyZe"

auth = (USERNAME, APP_PASSWORD)

# Read the CSS file
with open(r"C:\Users\spart\.openclaw\wrench\localcatalyst_global-styles.css", "r", encoding="utf-8") as f:
    css_content = f.read()

print(f"CSS content: {len(css_content)} bytes")

# Strategy: Create a temporary plugin that writes the CSS file, then deactivate/delete it
# The plugin will:
# 1. On activation, write the CSS file to the theme directory
# 2. Register a REST endpoint to confirm success

# Build the plugin PHP
plugin_php = '''<?php
/**
 * Plugin Name: OpenClaw CSS Deployer
 * Description: Temporary plugin to deploy CSS files. Delete after use.
 * Version: 1.0.0
 */

// On every admin load, write the CSS file
add_action('admin_init', 'openclaw_deploy_css');
add_action('rest_api_init', function() {
    register_rest_route('openclaw-deployer/v1', '/status', array(
        'methods' => 'GET',
        'callback' => 'openclaw_deployer_status',
        'permission_callback' => function() {
            return current_user_can('manage_options');
        }
    ));
    register_rest_route('openclaw-deployer/v1', '/deploy', array(
        'methods' => 'POST',
        'callback' => 'openclaw_deploy_from_option',
        'permission_callback' => function() {
            return current_user_can('manage_options');
        }
    ));
});

function openclaw_deployer_status() {
    $theme_dir = get_stylesheet_directory();
    $css_path = $theme_dir . '/css/localcatalyst_global-styles.css';
    return array(
        'theme_dir' => $theme_dir,
        'css_path' => $css_path,
        'css_exists' => file_exists($css_path),
        'css_size' => file_exists($css_path) ? filesize($css_path) : 0,
        'css_dir_exists' => is_dir($theme_dir . '/css'),
        'theme_writable' => is_writable($theme_dir),
    );
}

function openclaw_deploy_from_option($request) {
    $css_content = $request->get_param('css_content');
    if (empty($css_content)) {
        return new WP_Error('no_content', 'No CSS content provided', array('status' => 400));
    }
    
    $theme_dir = get_stylesheet_directory();
    $css_dir = $theme_dir . '/css';
    $css_path = $css_dir . '/localcatalyst_global-styles.css';
    
    // Create css directory if it doesn't exist
    if (!is_dir($css_dir)) {
        $mkdir_result = wp_mkdir_p($css_dir);
        if (!$mkdir_result) {
            return new WP_Error('mkdir_failed', 'Failed to create css directory', array('status' => 500));
        }
    }
    
    // Write the CSS file
    $result = file_put_contents($css_path, $css_content);
    if ($result === false) {
        return new WP_Error('write_failed', 'Failed to write CSS file', array('status' => 500));
    }
    
    return array(
        'success' => true,
        'bytes_written' => $result,
        'path' => $css_path,
        'url' => get_stylesheet_directory_uri() . '/css/localcatalyst_global-styles.css',
    );
}
'''

# Create a ZIP file containing the plugin
print("\n=== Creating plugin ZIP ===")
zip_buffer = io.BytesIO()
with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
    zf.writestr('openclaw-css-deployer/openclaw-css-deployer.php', plugin_php)

zip_buffer.seek(0)
zip_data = zip_buffer.read()
print(f"ZIP size: {len(zip_data)} bytes")

# Upload the plugin via REST API
print("\n=== Uploading plugin via REST API ===")
# The WP REST API doesn't have a plugin upload endpoint directly
# But we can try the plugin install endpoint
# Actually, we need to upload a file first

# Try uploading as media (zip might be allowed)
files = {
    'file': ('openclaw-css-deployer.zip', io.BytesIO(zip_data), 'application/zip')
}
r = requests.post(
    f"{BASE}/wp-json/wp/v2/media",
    auth=auth,
    files=files,
    headers={'Content-Disposition': 'attachment; filename=openclaw-css-deployer.zip'}
)
print(f"Media upload status: {r.status_code}")
if r.status_code in (200, 201):
    media = r.json()
    print(f"Media ID: {media.get('id')}")
    print(f"Source URL: {media.get('source_url')}")
else:
    print(f"Response: {r.text[:500]}")

# Alternative: Try the plugin install endpoint
print("\n=== Try plugin install via REST API ===")
r = requests.post(
    f"{BASE}/wp-json/wp/v2/plugins",
    auth=auth,
    json={"slug": "openclaw-css-deployer", "status": "active"},
    headers={"Content-Type": "application/json"}
)
print(f"Plugin install status: {r.status_code}")
print(f"Response: {r.text[:500]}")

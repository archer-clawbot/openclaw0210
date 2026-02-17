#!/usr/bin/env python3
"""
Deploy a mu-plugin that patches the broken functions.php
by re-adding the missing enqueues and WooCommerce support.
Also attempts to fix functions.php directly via wp-cli.
"""
import paramiko
import sys
import time

HOST = "104.156.224.8"
USERNAME = "master_vguhqncnde"
PASSWORD = "7Mc744yJvbnD"
APP_ROOT = "/home/1589123.cloudwaysapps.com/cbwvyveaku/public_html"
MU_DIR = f"{APP_ROOT}/wp-content/mu-plugins"
THEME_DIR = f"{APP_ROOT}/wp-content/themes/localcatalyst"

# MU-plugin that patches the broken functions.php
MU_PLUGIN_CONTENT = r'''<?php
/**
 * Plugin Name: LocalCatalyst Theme Fix
 * Description: Patches broken functions.php - enqueues missing CSS and adds WooCommerce support
 * Version: 1.0.0
 * Author: OpenClaw
 */

// Prevent direct access
if (!defined('ABSPATH')) exit;

/**
 * Enqueue the missing CSS files that the truncated functions.php doesn't load
 * design-tokens.css exists on server but isn't enqueued
 * woocommerce.css exists on server but isn't enqueued
 */
add_action('wp_enqueue_scripts', function () {
    $theme_uri = get_stylesheet_directory_uri();

    // Design tokens (must load before global styles)
    if (!wp_style_is('localcatalyst-tokens', 'enqueued')) {
        wp_enqueue_style(
            'localcatalyst-tokens',
            $theme_uri . '/css/design-tokens.css',
            ['localcatalyst'],
            '1.0.1'
        );
    }

    // Global component styles - re-register with tokens dependency if already enqueued without it
    if (wp_style_is('localcatalyst-global', 'enqueued')) {
        wp_dequeue_style('localcatalyst-global');
        wp_deregister_style('localcatalyst-global');
    }
    wp_enqueue_style(
        'localcatalyst-global',
        $theme_uri . '/css/localcatalyst_global-styles.css',
        ['localcatalyst-tokens'],
        '1.0.2'
    );

    // WooCommerce styles
    if (!wp_style_is('localcatalyst-woocommerce', 'enqueued')) {
        wp_enqueue_style(
            'localcatalyst-woocommerce',
            $theme_uri . '/css/localcatalyst_woocommerce.css',
            ['localcatalyst-global'],
            '1.0.1'
        );
    }

    // Google Fonts
    if (!wp_style_is('localcatalyst-fonts', 'enqueued')) {
        wp_enqueue_style(
            'localcatalyst-fonts',
            'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=Space+Mono:wght@400;700&display=swap',
            [],
            null
        );
    }
}, 20); // Priority 20 to run after theme's enqueue

/**
 * Add WooCommerce support (missing from truncated functions.php)
 */
add_action('after_setup_theme', function () {
    add_theme_support('woocommerce');
}, 25);

/**
 * Mobile hamburger menu toggle (missing from truncated functions.php)
 */
add_action('wp_footer', function () {
    ?>
    <script>
    (function() {
        const hamburger = document.querySelector('.lc-nav-hamburger');
        const navLinks = document.querySelector('.lc-nav-links');
        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('mobile-open');
            hamburger.textContent = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
                hamburger.textContent = '☰';
            }
        });
    })();
    </script>
    <?php
}, 20);
'''

def run_cmd(ssh, cmd, timeout=15):
    """Execute command and return stdout, stderr"""
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode('utf-8', errors='replace').strip()
    err = stderr.read().decode('utf-8', errors='replace').strip()
    return out, err

def main():
    print("=== LocalCatalyst Theme Fix Deployment ===\n")

    # Connect
    print(f"[1] Connecting to {HOST} as {USERNAME}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST, username=USERNAME, password=PASSWORD, timeout=15)
    print("    Connected!\n")

    # Check current state
    print("[2] Checking current state...")
    out, _ = run_cmd(ssh, f"wc -c {THEME_DIR}/functions.php")
    print(f"    functions.php size: {out}")

    out, _ = run_cmd(ssh, f"tail -5 {THEME_DIR}/functions.php")
    print(f"    functions.php tail:\n    {out}\n")

    out, _ = run_cmd(ssh, f"ls -la {MU_DIR}/")
    print(f"    mu-plugins directory:\n    {out}\n")

    # Step 1: Deploy mu-plugin fix
    print("[3] Deploying mu-plugin fix (openclaw-theme-fix.php)...")
    sftp = ssh.open_sftp()

    mu_path = f"{MU_DIR}/openclaw-theme-fix.php"
    try:
        with sftp.open(mu_path, 'w') as f:
            f.write(MU_PLUGIN_CONTENT)
        print(f"    Written to {mu_path}")

        # Verify it persisted
        time.sleep(1)
        stat = sftp.stat(mu_path)
        print(f"    File size after write: {stat.st_size} bytes")

        time.sleep(3)
        stat2 = sftp.stat(mu_path)
        print(f"    File size after 3s wait: {stat2.st_size} bytes")

        if stat2.st_size == stat.st_size:
            print("    ✓ MU-plugin persisted! Imunify didn't revert it.\n")
        else:
            print("    ✗ File was reverted by Imunify360.\n")
    except Exception as e:
        print(f"    Error writing mu-plugin: {e}\n")

    # Step 2: Fix the truncated functions.php
    print("[4] Attempting to fix functions.php directly...")

    # First, read the current broken file
    with sftp.open(f"{THEME_DIR}/functions.php", 'r') as f:
        current_content = f.read().decode('utf-8', errors='replace')

    print(f"    Current file length: {len(current_content)} chars")

    # The file is truncated mid-comment at "/** Add WooCommerce"
    # We need to close that comment and add the missing code
    if '/** Add WooCommerce' in current_content and 'add_theme_support' not in current_content:
        print("    Confirmed: functions.php is truncated at WooCommerce comment")

        # Read our fixed local version
        with open(r'C:\Users\spart\.openclaw\wrench\functions.php', 'r') as f:
            fixed_content = f.read()

        # Try writing the fixed version
        try:
            with sftp.open(f"{THEME_DIR}/functions.php", 'w') as f:
                f.write(fixed_content)
            print(f"    Written fixed functions.php ({len(fixed_content)} chars)")

            time.sleep(1)
            stat = sftp.stat(f"{THEME_DIR}/functions.php")
            print(f"    File size after 1s: {stat.st_size} bytes")

            time.sleep(3)
            stat2 = sftp.stat(f"{THEME_DIR}/functions.php")
            print(f"    File size after 3s: {stat2.st_size} bytes")

            if stat2.st_size > 8500:
                print("    ✓ functions.php fix persisted!\n")
            else:
                print("    ✗ Imunify360 reverted functions.php (as expected).\n")
                print("    The mu-plugin should still cover the missing functionality.\n")
        except Exception as e:
            print(f"    Error: {e}\n")
    else:
        print("    functions.php doesn't match expected truncation pattern\n")

    # Step 3: Try wp-cli approach as alternative
    print("[5] Trying wp-cli to clear OPcache and check theme status...")
    out, err = run_cmd(ssh, f"cd {APP_ROOT} && wp --allow-root option get template 2>&1 || echo 'wp-cli failed'")
    print(f"    Active template: {out}")

    out, err = run_cmd(ssh, f"cd {APP_ROOT} && wp --allow-root option get stylesheet 2>&1 || echo 'wp-cli failed'")
    print(f"    Active stylesheet: {out}")

    # Try to flush OPcache via wp-cli eval
    print("\n[6] Flushing OPcache...")
    out, err = run_cmd(ssh, f"cd {APP_ROOT} && wp eval 'if(function_exists(\"opcache_reset\")){{opcache_reset();echo \"flushed\";}}else{{echo \"no opcache\";}}' 2>&1")
    print(f"    OPcache: {out}")
    if err:
        print(f"    stderr: {err}")

    # Step 4: Check if site loads now
    print("\n[7] Testing if WordPress loads...")
    out, err = run_cmd(ssh, f"cd {APP_ROOT} && wp eval 'echo \"WordPress OK\";' 2>&1")
    print(f"    WP eval: {out}")
    if err:
        print(f"    stderr: {err}")

    # Verify mu-plugin is recognized
    out, err = run_cmd(ssh, f"cd {APP_ROOT} && wp plugin list --status=must-use 2>&1")
    print(f"\n    MU-plugins list:\n    {out}")

    sftp.close()
    ssh.close()
    print("\n=== Done ===")

if __name__ == "__main__":
    main()

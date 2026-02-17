#!/usr/bin/env python3
"""
Deploy a mu-plugin fix using SSH exec_command with heredoc (no SFTP).
"""
import paramiko
import time

HOST = "104.156.224.8"
USERNAME = "master_vguhqncnde"
PASSWORD = "7Mc744yJvbnD"
APP_ROOT = "/home/1589123.cloudwaysapps.com/cbwvyveaku/public_html"
MU_DIR = f"{APP_ROOT}/wp-content/mu-plugins"
THEME_DIR = f"{APP_ROOT}/wp-content/themes/localcatalyst"

def run_cmd(ssh, cmd, timeout=30):
    """Execute command and return stdout, stderr"""
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode('utf-8', errors='replace').strip()
    err = stderr.read().decode('utf-8', errors='replace').strip()
    return out, err

def main():
    print("=== LocalCatalyst Theme Fix Deployment v2 ===\n")

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST, username=USERNAME, password=PASSWORD, timeout=15)
    print("[1] Connected!\n")

    # Check state
    out, _ = run_cmd(ssh, f"wc -c {THEME_DIR}/functions.php && tail -3 {THEME_DIR}/functions.php")
    print(f"[2] Current functions.php:\n    {out}\n")

    # Deploy mu-plugin via cat heredoc
    print("[3] Writing mu-plugin via heredoc...")

    mu_plugin_code = r"""<?php
/**
 * Plugin Name: LocalCatalyst Theme Fix
 * Description: Patches broken functions.php - enqueues missing CSS and adds WooCommerce support
 * Version: 1.0.0
 */
if (!defined('ABSPATH')) exit;

// Enqueue missing CSS files
add_action('wp_enqueue_scripts', function () {
    $theme_uri = get_stylesheet_directory_uri();

    // Design tokens
    if (!wp_style_is('localcatalyst-tokens', 'enqueued')) {
        wp_enqueue_style('localcatalyst-tokens',
            $theme_uri . '/css/design-tokens.css',
            ['localcatalyst'], '1.0.1');
    }

    // Re-register global styles with tokens dependency
    if (wp_style_is('localcatalyst-global', 'enqueued')) {
        wp_dequeue_style('localcatalyst-global');
        wp_deregister_style('localcatalyst-global');
    }
    wp_enqueue_style('localcatalyst-global',
        $theme_uri . '/css/localcatalyst_global-styles.css',
        ['localcatalyst-tokens'], '1.0.2');

    // WooCommerce styles
    if (!wp_style_is('localcatalyst-woocommerce', 'enqueued')) {
        wp_enqueue_style('localcatalyst-woocommerce',
            $theme_uri . '/css/localcatalyst_woocommerce.css',
            ['localcatalyst-global'], '1.0.1');
    }

    // Google Fonts
    if (!wp_style_is('localcatalyst-fonts', 'enqueued')) {
        wp_enqueue_style('localcatalyst-fonts',
            'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=Space+Mono:wght@400;700&display=swap',
            [], null);
    }
}, 20);

// WooCommerce support
add_action('after_setup_theme', function () {
    add_theme_support('woocommerce');
}, 25);

// Mobile hamburger menu
add_action('wp_footer', function () {
    echo '<script>
    (function() {
        var hamburger = document.querySelector(".lc-nav-hamburger");
        var navLinks = document.querySelector(".lc-nav-links");
        if (!hamburger || !navLinks) return;
        hamburger.addEventListener("click", function(e) {
            e.stopPropagation();
            navLinks.classList.toggle("mobile-open");
            hamburger.textContent = navLinks.classList.contains("mobile-open") ? "\u2715" : "\u2630";
        });
        document.addEventListener("click", function(e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove("mobile-open");
                hamburger.textContent = "\u2630";
            }
        });
    })();
    </script>';
}, 20);
"""

    # Write using tee which handles permissions well
    # Use base64 to avoid heredoc escaping issues
    import base64
    encoded = base64.b64encode(mu_plugin_code.encode()).decode()

    mu_path = f"{MU_DIR}/openclaw-theme-fix.php"
    cmd = f'echo "{encoded}" | base64 -d > {mu_path}'
    out, err = run_cmd(ssh, cmd)
    if err:
        print(f"    Error: {err}")
    else:
        print(f"    Written to {mu_path}")

    # Verify
    time.sleep(1)
    out, _ = run_cmd(ssh, f"wc -c {mu_path} && head -5 {mu_path}")
    print(f"    After 1s: {out}")

    time.sleep(3)
    out, _ = run_cmd(ssh, f"wc -c {mu_path}")
    print(f"    After 3s: {out}")

    time.sleep(3)
    out, _ = run_cmd(ssh, f"wc -c {mu_path}")
    print(f"    After 6s: {out}\n")

    # Now try to fix functions.php
    print("[4] Fixing functions.php...")

    # Read the local fixed file
    with open(r'C:\Users\spart\.openclaw\wrench\functions.php', 'r') as f:
        fixed_php = f.read()

    encoded_php = base64.b64encode(fixed_php.encode()).decode()
    php_path = f"{THEME_DIR}/functions.php"

    cmd = f'echo "{encoded_php}" | base64 -d > {php_path}'
    out, err = run_cmd(ssh, cmd)
    if err:
        print(f"    Error: {err}")
    else:
        print(f"    Written fixed functions.php")

    time.sleep(1)
    out, _ = run_cmd(ssh, f"wc -c {php_path}")
    print(f"    After 1s: {out}")

    time.sleep(3)
    out, _ = run_cmd(ssh, f"wc -c {php_path}")
    print(f"    After 3s: {out}")

    time.sleep(3)
    out, _ = run_cmd(ssh, f"wc -c {php_path}")
    print(f"    After 6s: {out}")

    # Check if Imunify reverted it
    out, _ = run_cmd(ssh, f"tail -3 {php_path}")
    print(f"    Tail: {out}\n")

    # Step 5: Flush OPcache
    print("[5] Flushing OPcache...")
    out, err = run_cmd(ssh, f"cd {APP_ROOT} && php -r 'if(function_exists(\"opcache_reset\")){{opcache_reset();echo \"flushed\\n\";}}else{{echo \"no cli opcache\\n\";}}'")
    print(f"    PHP CLI opcache: {out}")

    # Create a quick opcache flush via HTTP
    flush_code = '<?php opcache_reset(); echo "flushed"; unlink(__FILE__);'
    encoded_flush = base64.b64encode(flush_code.encode()).decode()
    run_cmd(ssh, f'echo "{encoded_flush}" | base64 -d > {APP_ROOT}/opcache-flush-now.php')
    print("    Created opcache-flush-now.php")

    # Step 6: Check WP status
    print("\n[6] Checking WordPress status...")
    out, err = run_cmd(ssh, f"cd {APP_ROOT} && php wp-cli.phar eval 'echo \"WP OK\";' 2>&1 || wp eval 'echo \"WP OK\";' 2>&1 || echo 'wp-cli unavailable'")
    print(f"    WP eval: {out}")
    if err:
        print(f"    stderr: {err}")

    # List MU plugins
    out, _ = run_cmd(ssh, f"ls -la {MU_DIR}/*.php")
    print(f"\n    Active mu-plugins:\n    {out}")

    ssh.close()
    print("\n=== Done ===")

if __name__ == "__main__":
    main()

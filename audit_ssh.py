import paramiko
import sys

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('104.156.224.8', username='master_vguhqncnde', password='7Mc744yJvbnD')

def run(label, cmd):
    print(f"\n{'='*60}")
    print(f"=== {label} ===")
    print(f"{'='*60}")
    stdin, stdout, stderr = ssh.exec_command(cmd)
    out = stdout.read().decode()
    err = stderr.read().decode()
    if out.strip():
        print(out)
    else:
        print("[NO OUTPUT]")
    if err.strip():
        print(f"STDERR: {err}")
    return out

# 1. Theme directory listing
run("THEME DIRECTORY", "ls -laR /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/")

# 2. Find all JS files in child theme
run("JS FILES IN CHILD THEME", "find /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/ -type f -name '*.js' -exec ls -la {} + 2>/dev/null || echo 'NO JS FILES FOUND'")

# 3. Get content of any JS files
run("JS FILE CONTENTS", "find /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/ -type f -name '*.js' -exec sh -c 'echo \"=== {} ===\"; cat {}' \\; 2>/dev/null || echo 'NO JS FILES'")

# 4. Check inline scripts in functions.php
run("INLINE SCRIPTS IN FUNCTIONS.PHP", "grep -n 'wp_add_inline_script\\|<script\\|wp_localize_script' /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/functions.php 2>/dev/null || echo 'NO MATCHES or FILE NOT FOUND'")

# 5. Total number of plugins
run("PLUGIN COUNT", "ls /home/master/applications/cbwvyveaku/public_html/wp-content/plugins/ | wc -l")

# 6. List all plugins with sizes
run("PLUGIN SIZES", "du -sh /home/master/applications/cbwvyveaku/public_html/wp-content/plugins/* 2>/dev/null")

# 7. All wp_enqueue calls in functions.php
run("ENQUEUE CALLS IN FUNCTIONS.PHP", "grep -n 'wp_enqueue_style\\|wp_enqueue_script\\|wp_register_style\\|wp_register_script\\|wp_dequeue\\|wp_deregister' /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/functions.php 2>/dev/null || echo 'NO MATCHES'")

# 8. Full functions.php content (for comprehensive review)
run("FUNCTIONS.PHP FULL CONTENT", "cat /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/functions.php 2>/dev/null || echo 'FILE NOT FOUND'")

# 9. Database table sizes
run("DATABASE TABLE SIZES (TOP 20)", "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb FROM information_schema.tables WHERE table_schema='cbwvyveaku' ORDER BY (data_length + index_length) DESC LIMIT 20\" 2>/dev/null")

# 10. Transients bloat
run("TRANSIENTS BLOAT", "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT COUNT(*) as count, SUM(LENGTH(option_value)) as total_bytes FROM wp_options WHERE option_name LIKE '%_transient_%'\" 2>/dev/null")

# 11. wp_options autoload size
run("WP_OPTIONS AUTOLOAD SIZE", "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT SUM(LENGTH(option_value)) as total_bytes FROM wp_options WHERE autoload='yes'\" 2>/dev/null")

# 12. Post revisions count
run("POST REVISIONS COUNT", "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT COUNT(*) FROM wp_posts WHERE post_type='revision'\" 2>/dev/null")

# 13. Check wp-config for debug settings
run("WP-CONFIG DEBUG SETTINGS", "grep -n 'WP_DEBUG\\|SCRIPT_DEBUG\\|CONCATENATE_SCRIPTS\\|COMPRESS' /home/master/applications/cbwvyveaku/public_html/wp-config.php 2>/dev/null || echo 'NOT FOUND'")

# 14. Check .htaccess for caching/compression rules
run("HTACCESS RULES", "cat /home/master/applications/cbwvyveaku/public_html/.htaccess 2>/dev/null || echo 'NOT FOUND'")

# 15. Check for caching plugin configs
run("LITESPEED CACHE CONFIG", "ls -la /home/master/applications/cbwvyveaku/public_html/wp-content/plugins/litespeed-cache/ 2>/dev/null || echo 'NOT FOUND'")

# 16. PHP version
run("PHP VERSION", "php -v 2>/dev/null | head -1")

# 17. Check active theme
run("ACTIVE THEME CHECK", "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT option_value FROM wp_options WHERE option_name IN ('template', 'stylesheet', 'current_theme')\" 2>/dev/null")

# 18. Check all .css files in theme
run("CSS FILES IN CHILD THEME", "find /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/ -type f -name '*.css' -exec ls -la {} + 2>/dev/null || echo 'NO CSS FILES'")

ssh.close()
print("\n\n=== SSH AUDIT COMPLETE ===")

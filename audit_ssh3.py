import paramiko
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('104.156.224.8', username='master_vguhqncnde', password='7Mc744yJvbnD')

def run(label, cmd):
    print(f"\n{'='*60}")
    print(f"=== {label} ===")
    print(f"{'='*60}")
    stdin, stdout, stderr = ssh.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    if out.strip():
        print(out)
    else:
        print("[NO OUTPUT]")
    if err.strip():
        # Filter mysql password warning
        err_lines = [l for l in err.split('\n') if 'Using a password on the command line' not in l]
        filtered = '\n'.join(err_lines).strip()
        if filtered:
            print(f"STDERR: {filtered}")
    return out

# Database queries
run("DATABASE TABLE SIZES (TOP 20)",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb FROM information_schema.tables WHERE table_schema='cbwvyveaku' ORDER BY (data_length + index_length) DESC LIMIT 20\"")

run("TRANSIENTS BLOAT",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT COUNT(*) as count, SUM(LENGTH(option_value)) as total_bytes FROM wp_options WHERE option_name LIKE '%_transient_%'\"")

run("WP_OPTIONS AUTOLOAD SIZE",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT SUM(LENGTH(option_value)) as total_bytes FROM wp_options WHERE autoload='yes'\"")

run("POST REVISIONS COUNT",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT COUNT(*) FROM wp_posts WHERE post_type='revision'\"")

# Additional: largest autoload options
run("TOP 15 LARGEST AUTOLOADED OPTIONS",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT option_name, LENGTH(option_value) as bytes FROM wp_options WHERE autoload='yes' ORDER BY LENGTH(option_value) DESC LIMIT 15\"")

# Additional: total wp_options rows
run("TOTAL WP_OPTIONS ROWS",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT COUNT(*) FROM wp_options\"")

# Check wp-config debug
run("WP-CONFIG DEBUG SETTINGS",
    "grep -n 'WP_DEBUG\\|SCRIPT_DEBUG\\|CONCATENATE_SCRIPTS\\|COMPRESS' /home/master/applications/cbwvyveaku/public_html/wp-config.php 2>/dev/null || echo 'NOT FOUND'")

# Check .htaccess
run("HTACCESS FILE",
    "cat /home/master/applications/cbwvyveaku/public_html/.htaccess 2>/dev/null || echo 'NOT FOUND'")

# PHP version
run("PHP VERSION",
    "php -v 2>/dev/null | head -1")

# Active theme
run("ACTIVE THEME",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT option_name, option_value FROM wp_options WHERE option_name IN ('template', 'stylesheet', 'current_theme')\"")

# Check includes dir
run("INCLUDES DIRECTORY",
    "ls -la /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/includes/")

# Get scripts.php content
run("SCRIPTS.PHP CONTENT",
    "cat /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/includes/scripts.php 2>/dev/null || echo 'NOT FOUND'")

# Get schema-markup.php content
run("SCHEMA-MARKUP.PHP CONTENT",
    "cat /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/includes/schema-markup.php 2>/dev/null || echo 'NOT FOUND'")

# CSS files in child theme
run("CSS FILES IN CHILD THEME",
    "find /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/ -type f -name '*.css' -exec ls -la {} +")

# Active plugins list
run("ACTIVE PLUGINS",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT option_value FROM wp_options WHERE option_name='active_plugins'\"")

# Check mu-plugins
run("MU-PLUGINS",
    "ls -la /home/master/applications/cbwvyveaku/public_html/wp-content/mu-plugins/ 2>/dev/null || echo 'NOT FOUND'")

ssh.close()
print("\n\n=== SSH AUDIT PART 3 COMPLETE ===")

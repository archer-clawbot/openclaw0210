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
    return out

# autoload='yes' or autoload='on' (WP 6.6+ uses 'on')
run("WP_OPTIONS AUTOLOAD (both yes and on)",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT autoload, COUNT(*) as cnt, SUM(LENGTH(option_value)) as bytes FROM wp_options GROUP BY autoload\"")

run("TOP 20 LARGEST AUTOLOADED OPTIONS",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT option_name, LENGTH(option_value) as bytes, autoload FROM wp_options WHERE autoload IN ('yes','on') ORDER BY LENGTH(option_value) DESC LIMIT 20\"")

# Check WP version
run("WP VERSION",
    "grep 'wp_version ' /home/master/applications/cbwvyveaku/public_html/wp-includes/version.php")

# Check for object cache
run("OBJECT CACHE CHECK",
    "ls -la /home/master/applications/cbwvyveaku/public_html/wp-content/object-cache.php 2>/dev/null || echo 'NO OBJECT CACHE DROP-IN'")

# Check breeze (caching) config
run("BREEZE CACHE STATUS",
    "ls -la /home/master/applications/cbwvyveaku/public_html/wp-content/plugins/breeze/ 2>/dev/null | head -5; echo '---'; mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT option_value FROM wp_options WHERE option_name='breeze_basic_settings'\" 2>/dev/null")

# LiteSpeed cache settings
run("LITESPEED CACHE SETTINGS",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT option_name, LEFT(option_value, 200) FROM wp_options WHERE option_name LIKE 'litespeed%' LIMIT 10\"")

# Check for WC sessions in DB
run("WOOCOMMERCE SESSIONS",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT COUNT(*), SUM(LENGTH(session_value)) FROM wp_woocommerce_sessions\" 2>/dev/null")

# Check total DB size
run("TOTAL DATABASE SIZE",
    "mysql -u cbwvyveaku -pTUENbXpXn2 cbwvyveaku -N -e \"SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS total_mb FROM information_schema.tables WHERE table_schema='cbwvyveaku'\"")

# Check for unused CSS/stale data
run("ENQUEUE.PHP CONTENT",
    "cat /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/includes/enqueue.php 2>/dev/null")

ssh.close()
print("\n\n=== SSH AUDIT PART 4 COMPLETE ===")

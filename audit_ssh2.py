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
        print(f"STDERR: {err}")
    return out

# Full functions.php
run("FUNCTIONS.PHP FULL CONTENT", "cat /home/master/applications/cbwvyveaku/public_html/wp-content/themes/localcatalyst/functions.php 2>/dev/null || echo 'FILE NOT FOUND'")

ssh.close()

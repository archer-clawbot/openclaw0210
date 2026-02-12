# OAuth Credentials Setup — Google Analytics & Tag Manager APIs

This guide walks through creating OAuth 2.0 credentials for the analytics provisioning pipeline.

---

## One-Time Setup (10 minutes)

### Step 1: Create or Select Google Cloud Project

1. Go to https://console.cloud.google.com
2. Click project dropdown (top left)
3. **Option A:** Create new project
   - Click "New Project"
   - Name: "LocalCatalyst Analytics Automation"
   - Click "Create"
4. **Option B:** Use existing project
   - Select it from the list

### Step 2: Enable Required APIs

1. Go to **APIs & Services → Library**
2. Search and enable:
   - **Google Analytics Admin API**
     - Click "Enable"
   - **Tag Manager API**
     - Click "Enable"

### Step 3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials** → **OAuth client ID**
3. If prompted to configure consent screen:
   - User type: **External** (unless you have Workspace org)
   - App name: "LocalCatalyst Analytics Setup"
   - Support email: your email
   - Scopes: leave default (will be requested at runtime)
   - Test users: add your email
   - Click through to finish
4. Back to Create OAuth client ID:
   - Application type: **Desktop app**
   - Name: "Analytics Setup Script"
   - Click **Create**
5. Download the credentials JSON:
   - Click the download icon (⬇️) next to your new OAuth 2.0 Client ID
   - Save as: `credentials.json`

### Step 4: Install Credentials

Copy the downloaded `credentials.json` to:
```
C:\Users\spart\.openclaw\agents\wrench\workspace\tools\credentials.json
```

### Step 5: Install Python Dependencies

Open PowerShell and run:
```bash
pip install google-analytics-admin google-api-python-client google-auth-oauthlib
```

### Step 6: Run First OAuth Flow

```bash
cd C:\Users\spart\.openclaw\agents\wrench\workspace\tools
python setup_analytics.py
```

**What happens:**
1. Browser opens with Google OAuth consent screen
2. Sign in with your Google account (the one with GA/GTM access)
3. Click "Allow" to grant permissions:
   - View and manage your Google Analytics data
   - Manage your Google Tag Manager containers
4. Browser shows "The authentication flow has completed."
5. Script caches your token in `token.json` (same directory)
6. Future runs use the cached token (no browser popup)

---

## Token Expiry

The OAuth token expires after a few weeks. If you see:
```
google.auth.exceptions.RefreshError: invalid_grant
```

**Fix:**
```bash
rm token.json
python setup_analytics.py  # Re-run OAuth flow
```

---

## Multi-User Setup

If multiple people need to run analytics provisioning:
- Each person needs their own `credentials.json` + `token.json`
- OR: Share one service account JSON (more complex, requires domain-wide delegation)

For agency use with multiple operators, service accounts are better long-term. OAuth is fine for solo/small team.

---

## Security Notes

- **credentials.json** contains your OAuth client ID/secret — treat like a password
- **token.json** contains access/refresh tokens — treat like a session cookie
- Both are gitignored by default (do NOT commit to public repos)
- If leaked, revoke the OAuth client in Google Cloud Console → Credentials

---

## Troubleshooting

**Error: "Access blocked: This app's request is invalid"**
- Consent screen not configured properly
- Go to APIs & Services → OAuth consent screen
- Add your email to Test users
- Try again

**Error: "The caller does not have permission"**
- Your Google account doesn't have GA/GTM admin access
- Use an account that owns the GA property and GTM container

**Error: "API has not been used in project before"**
- Go back to Step 2 and enable both APIs
- Wait 1-2 minutes for propagation

**Error: "Invalid grant" during token refresh**
- Token expired or revoked
- Delete token.json and re-run OAuth flow

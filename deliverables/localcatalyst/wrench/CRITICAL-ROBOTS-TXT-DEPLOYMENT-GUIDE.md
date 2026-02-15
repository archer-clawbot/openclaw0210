# CRITICAL: robots.txt Deployment Guide
**Priority:** 🔴 CRITICAL - Blocks all Google indexing  
**Impact:** Complete search visibility loss  
**Fix Timeline:** 15-30 minutes  
**Date Created:** February 14, 2026  

---

## PROBLEM SUMMARY

The current robots.txt explicitly blocks Google's crawler from accessing any content:

```
User-agent: Googlebot
Disallow: /
```

This prevents Google from indexing the site entirely, making all SEO efforts invisible to search engines.

---

## SOLUTION: 3 DEPLOYMENT OPTIONS

Pick ONE of the three methods below based on your available access:

---

## OPTION 1: RankMath Pro Plugin (EASIEST) ⭐ RECOMMENDED

**Requirements:** WordPress admin access  
**Time:** 10-15 minutes  
**Difficulty:** Easy  
**Cost:** $199/year (one-time, covers entire site)  

### Steps:

1. **Log into WordPress Admin**
   - Navigate to: `https://darkgreen-moose-683278.hostingersite.com/wp-admin`
   - Use your WordPress credentials

2. **Install RankMath Pro**
   - Go to **Plugins → Add New**
   - Search for "Rank Math"
   - Click **Install Now**, then **Activate**
   - (Or if already installed, activate the free version first, then upgrade)

3. **Configure RankMath**
   - After activation, RankMath will show setup wizard
   - Choose your license type (free for now, upgrade to Pro later)
   - Go to **RankMath → Settings → General**

4. **Access Robots.txt Settings**
   - Go to **RankMath → Tools → Robots.txt Generator**
   - Click **Enable Custom Robots.txt**

5. **Apply Corrected Robots.txt**
   - Replace content with:
   ```
   User-agent: *
   Allow: /
   
   # Disallow access to WordPress admin and sensitive areas
   Disallow: /wp-admin/
   Disallow: /wp-login.php
   Disallow: /wp-includes/
   Disallow: /*?s=
   Disallow: /*?p=*&cpage
   Disallow: /feed/
   Disallow: /trackback/
   Disallow: /xmlrpc.php
   
   # Allow sitemap
   Sitemap: https://darkgreen-moose-683278.hostingersite.com/sitemap.xml
   ```

6. **Save and Verify**
   - Click **Save Changes**
   - Open new browser tab and visit: `https://darkgreen-moose-683278.hostingersite.com/robots.txt`
   - Confirm the new content displays (may take 5 minutes for server cache)

**Verification:**
```bash
curl https://darkgreen-moose-683278.hostingersite.com/robots.txt
```

Should output the new robots.txt without the Googlebot disallow.

---

## OPTION 2: Hostinger File Manager (MANUAL)

**Requirements:** Hostinger account access  
**Time:** 5-10 minutes  
**Difficulty:** Easy  
**Cost:** $0  

### Steps:

1. **Log into Hostinger Control Panel**
   - Go to: https://www.hostinger.com/cpanel-login
   - Enter your credentials

2. **Access File Manager**
   - Look for **File Manager** in the control panel menu
   - Navigate to the root directory (`/` or `public_html/`)

3. **Locate robots.txt**
   - Find the existing `robots.txt` file
   - Right-click → **Edit**

4. **Replace Content**
   - Delete all current content
   - Paste the corrected robots.txt:
   ```
   User-agent: *
   Allow: /
   
   # Disallow access to WordPress admin and sensitive areas
   Disallow: /wp-admin/
   Disallow: /wp-login.php
   Disallow: /wp-includes/
   Disallow: /*?s=
   Disallow: /*?p=*&cpage
   Disallow: /feed/
   Disallow: /trackback/
   Disallow: /xmlrpc.php
   
   # Allow sitemap
   Sitemap: https://darkgreen-moose-683278.hostingersite.com/sitemap.xml
   ```

5. **Save File**
   - Click **Save** or **Upload**
   - Close the editor

6. **Verify**
   - Open browser to: `https://darkgreen-moose-683278.hostingersite.com/robots.txt`
   - Confirm new content displays

---

## OPTION 3: SFTP Upload (TECHNICAL)

**Requirements:** SFTP credentials from Hostinger  
**Time:** 5-10 minutes  
**Difficulty:** Technical  
**Cost:** $0  

### Steps:

1. **Get SFTP Credentials**
   - Log into Hostinger Control Panel
   - Go to **SFTP/SSH**
   - Copy: Username, Host, Password, Port

2. **Connect via SFTP Client**
   - Use FileZilla, WinSCP, or similar
   - Enter credentials from step 1
   - Navigate to root directory (`/` or `public_html/`)

3. **Upload New robots.txt**
   - Create local file with corrected content (see file attached)
   - Upload to server root, overwriting existing `robots.txt`
   - Set file permissions to 644 (readable by all)

4. **Verify**
   ```bash
   curl https://darkgreen-moose-683278.hostingersite.com/robots.txt
   ```

---

## VERIFICATION CHECKLIST

After deploying robots.txt via any method above:

### ✅ Immediate Verification (5 minutes)
```bash
# Test 1: Check that file exists and is readable
curl -I https://darkgreen-moose-683278.hostingersite.com/robots.txt
# Should return: HTTP/1.1 200 OK

# Test 2: Verify content
curl https://darkgreen-moose-683278.hostingersite.com/robots.txt
# Should show the NEW robots.txt (no Googlebot disallow)

# Test 3: Verify Googlebot is NOT disallowed
curl https://darkgreen-moose-683278.hostingersite.com/robots.txt | grep "Googlebot"
# Should return NOTHING (empty result)
```

### ✅ Medium-Term Verification (24-48 hours)
1. Go to Google Search Console
2. Select property: `https://darkgreen-moose-683278.hostingersite.com`
3. Go to **Settings → Crawl stats**
4. Check that Google has re-crawled the site (may take 24-48 hours)
5. Verify NO crawl errors related to robots.txt

### ✅ Long-Term Verification (7 days)
1. In Google Search Console, go to **Coverage** report
2. Verify pages are now being indexed (not blocked by robots.txt)
3. Check **Performance** for impressions indicating Google is finding pages

---

## WHAT THE FIX DOES

| Before | After |
|--------|-------|
| ❌ Google blocked from crawling | ✅ Google can crawl entire site |
| ❌ No pages indexed | ✅ Pages become indexable |
| ❌ Zero SEO visibility | ✅ SEO strategy becomes possible |
| ❌ Site invisible in search | ✅ Site can appear in results |

---

## IF YOU GET STUCK

### "I don't have WordPress admin credentials"
→ Contact your IT/hosting provider for credentials, OR  
→ Use Option 2 (Hostinger File Manager) instead

### "I don't have Hostinger account access"
→ Contact your domain/hosting provider  
→ Request robots.txt modification via their support

### "robots.txt still shows old content"
→ Browser cache - open in **Incognito/Private mode**  
→ Cloudflare cache - may take 5-15 minutes to clear  
→ Check with: `curl https://darkgreen-moose-683278.hostingersite.com/robots.txt`

### "I get 404 when trying to access robots.txt"
→ File may not have uploaded correctly  
→ Verify upload via Hostinger File Manager or SFTP
→ Confirm file is in root directory (`/robots.txt`, not `/wp-content/robots.txt`)

---

## POST-DEPLOYMENT ACTIONS

Once robots.txt is fixed:

1. **Request Google Re-Crawl**
   - Go to Google Search Console
   - Use **URL Inspection** tool
   - Click **Request Indexing** for homepage
   - This signals to Google that robots.txt has changed

2. **Monitor indexing**
   - Check GSC Coverage report daily for 7 days
   - Expect pages to start appearing within 24-72 hours

3. **Next Phase: Meta Tags & Schema**
   - Once robots.txt is fixed, move to Phase 2 (title tags, meta descriptions, schema markup)
   - These changes will now be crawled and indexed by Google

---

## SUMMARY

**Action Required:** Pick ONE option above and deploy new robots.txt  
**Estimated Time:** 15 minutes  
**Success Indicator:** `curl robots.txt` shows new content without Googlebot disallow  
**Impact:** Immediately removes critical SEO blocker  
**Next Step:** Notify Wrench team once deployed for verification and next phase  

---

**Critical Issue Tracking:**  
- Status: 🔴 BLOCKING SITE INDEXING
- Severity: CRITICAL
- Fix Window: 15-30 minutes
- Owner: Client / Hostinger Account Holder
- Escalation: This MUST be fixed before proceeding with any other SEO work


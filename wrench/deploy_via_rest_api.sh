#!/bin/bash
# LocalCatalyst Page 297 Fix - REST API Deployment Script
# 
# Prerequisites:
# - WordPress username and password
# - curl installed
# - jq installed (optional, for pretty output)
#
# Usage:
#   chmod +x deploy_via_rest_api.sh
#   ./deploy_via_rest_api.sh <username> <password>
#

set -e

SITE_URL="https://darkgreen-moose-683278.hostingersite.com"
PAGE_ID="297"
USERNAME="${1:-}"
PASSWORD="${2:-}"

if [ -z "$USERNAME" ] || [ -z "$PASSWORD" ]; then
    echo "ERROR: WordPress credentials required"
    echo "Usage: $0 <username> <password>"
    echo ""
    echo "Example:"
    echo "  $0 admin MyPassword123"
    exit 1
fi

echo "[*] LocalCatalyst Page 297 Fix - REST API Deployment"
echo "[*] Site: $SITE_URL"
echo "[*] Page ID: $PAGE_ID"
echo "[*] User: $USERNAME"
echo ""

# Step 1: Get JWT token
echo "[1/3] Authenticating..."
TOKEN_RESPONSE=$(curl -s -X POST \
    "$SITE_URL/wp-json/jwt-auth/v1/token" \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "[ERROR] Authentication failed. Check credentials."
    echo "Response: $TOKEN_RESPONSE"
    exit 1
fi

echo "[OK] Authenticated successfully"
echo ""

# Step 2: Read fixed content
echo "[2/3] Loading fixed page content..."
if [ ! -f "page_297_fixed.json" ]; then
    echo "[ERROR] page_297_fixed.json not found"
    exit 1
fi

FIXED_CONTENT=$(cat page_297_fixed.json)
echo "[OK] Loaded fixed content"
echo ""

# Step 3: Deploy via REST API
echo "[3/3] Deploying fix..."
DEPLOY_RESPONSE=$(curl -s -X POST \
    "$SITE_URL/wp-json/wp/v2/pages/$PAGE_ID" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$FIXED_CONTENT")

# Check if update was successful
if echo "$DEPLOY_RESPONSE" | grep -q '"id":297'; then
    echo "[OK] Fix deployed successfully!"
    echo ""
    echo "Results:"
    echo "  - Sidebar will now appear on right"
    echo "  - Footer will now appear at bottom"
    echo "  - Page layout will render correctly"
    echo ""
    echo "[ACTION] Clear WordPress cache and browser cache"
    echo "[ACTION] Test page: $SITE_URL/learn/schema-markup-guide/"
else
    echo "[ERROR] Deployment failed"
    echo "Response: $DEPLOY_RESPONSE"
    exit 1
fi

echo ""
echo "[OK] Deployment complete!"

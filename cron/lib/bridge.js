require('dotenv').config({ path: require('path').resolve(__dirname, '../..', '.env') });

// Fleet ↔ WordPress HMAC-signed bridge client (IMPL-003).
// Signs each request with HMAC-SHA256 over: timestamp:METHOD:path:sha256(body)
// WordPress bridge plugin verifies the signature before processing.

const crypto = require('crypto');

const BRIDGE_SECRET = process.env.OPENCLAW_BRIDGE_SECRET;
const HTTP_TIMEOUT_MS = 15_000;

if (!BRIDGE_SECRET) {
  console.warn('[bridge] WARNING: OPENCLAW_BRIDGE_SECRET not set — bridge requests will fail');
}

/**
 * Make an HMAC-signed request to a WordPress bridge endpoint.
 * @param {string} baseUrl - e.g., "https://darkgreen-moose-683278.hostingersite.com"
 * @param {string} method - "GET" or "POST"
 * @param {string} path - e.g., "/wp-json/openclaw/v1/subscription/status"
 * @param {object|null} body - JSON body for POST, null for GET
 * @param {object} queryParams - URL query params for GET
 * @returns {Promise<object>} parsed JSON response
 */
async function bridgeRequest(baseUrl, method, path, body = null, queryParams = {}) {
  if (!BRIDGE_SECRET) {
    throw new Error('OPENCLAW_BRIDGE_SECRET not configured');
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const bodyStr = body ? JSON.stringify(body) : '';
  const bodyHash = crypto.createHash('sha256').update(bodyStr).digest('hex');

  // Sign: timestamp:METHOD:/wp-json/openclaw/v1/...:sha256(body)
  // Note: signature covers the REST route path, NOT the full URL with query params.
  // Query params are validated by WordPress input sanitization.
  const signPayload = `${timestamp}:${method}:${path}:${bodyHash}`;
  const signature = crypto.createHmac('sha256', BRIDGE_SECRET).update(signPayload).digest('hex');

  // Build URL with query params
  const url = new URL(path, baseUrl);
  for (const [k, v] of Object.entries(queryParams)) {
    url.searchParams.set(k, v);
  }

  const fetchOpts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-OpenClaw-Timestamp': timestamp,
      'X-OpenClaw-Signature': signature,
    },
  };

  // Only include body for POST requests
  if (method === 'POST' && bodyStr) {
    fetchOpts.body = bodyStr;
  }

  fetchOpts.signal = AbortSignal.timeout(HTTP_TIMEOUT_MS);
  const res = await fetch(url.toString(), fetchOpts);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bridge ${method} ${path} → ${res.status}: ${text.slice(0, 300)}`);
  }

  return res.json();
}

/**
 * Get subscription status for a customer by email.
 * @param {string} siteUrl - WordPress site URL
 * @param {string} email - Customer email
 */
async function getSubscriptionStatus(siteUrl, email) {
  return bridgeRequest(siteUrl, 'GET', '/wp-json/openclaw/v1/subscription/status', null, { email });
}

/**
 * Get all active subscriptions (used on dispatcher startup to build customer access map).
 * @param {string} siteUrl - WordPress site URL
 */
async function getAllActiveSubscriptions(siteUrl) {
  return bridgeRequest(siteUrl, 'GET', '/wp-json/openclaw/v1/subscription/all-active');
}

/**
 * Send fleet health report to WordPress (for customer dashboard).
 * @param {string} siteUrl - WordPress site URL
 * @param {object} healthData - { agents_active, agents_total, tasks_pending, fleet_cost_today, breakers_tripped }
 */
async function reportFleetHealth(siteUrl, healthData) {
  return bridgeRequest(siteUrl, 'POST', '/wp-json/openclaw/v1/fleet/health', healthData);
}

/**
 * Verify bridge plugin is active and HMAC auth works.
 * @param {string} siteUrl - WordPress site URL
 */
async function verifyBridge(siteUrl) {
  return bridgeRequest(siteUrl, 'GET', '/wp-json/openclaw/v1/bridge/verify');
}

/**
 * Mark a WooCommerce order as fulfilled with a deliverable URL.
 * Called by the fulfillment system after an agent produces output.
 * @param {string} siteUrl - WordPress site URL
 * @param {number} wcOrderId - WooCommerce order ID
 * @param {string} deliverableUrl - URL to the deliverable file/page
 */
async function fulfillOrder(siteUrl, wcOrderId, deliverableUrl) {
  return bridgeRequest(siteUrl, 'POST', '/wp-json/openclaw/v1/orders/fulfill', {
    wcOrderId,
    deliverableUrl,
  });
}

module.exports = {
  bridgeRequest,
  getSubscriptionStatus,
  getAllActiveSubscriptions,
  reportFleetHealth,
  verifyBridge,
  fulfillOrder,
};

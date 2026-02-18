import { readFileSync } from 'fs';
import { createHmac } from 'crypto';

const env = readFileSync('C:/Users/spart/.openclaw/.env', 'utf8')
  .split('\n').reduce((a, l) => {
    const m = l.match(/^([^#=]+)=(.*)/);
    if (m) a[m[1].trim()] = m[2].trim();
    return a;
  }, {});

const WC_AUTH   = Buffer.from(env.WC_CONSUMER_KEY + ':' + env.WC_CONSUMER_SECRET).toString('base64');
const WH_SECRET = env.WC_WEBHOOK_SECRET;
const CONVEX    = 'https://valuable-partridge-851.convex.site/woo/webhook';

// Fetch the real order payload from WooCommerce
console.log('Fetching order #824 from WooCommerce...');
const wcRes = await fetch('https://localcatalyst.ai/wp-json/wc/v3/orders/824', {
  headers: { 'Authorization': 'Basic ' + WC_AUTH }
});
const order = await wcRes.json();
const body = JSON.stringify(order);

// Compute HMAC-SHA256 signature (base64) — same as WooCommerce does
const sig = createHmac('sha256', WH_SECRET).update(body).digest('base64');

console.log(`Sending signed webhook to Convex...`);
console.log(`  SKU on line item: ${order.line_items?.[0]?.sku}`);
console.log(`  Domain meta: ${order.meta_data?.find(m => m.key === 'domain')?.value}`);

const res = await fetch(CONVEX, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-WC-Webhook-Topic': 'order.created',
    'X-WC-Webhook-Signature': sig,
    'X-WC-Webhook-Source': 'https://localcatalyst.ai',
    'X-WC-Webhook-ID': '6',
    'X-WC-Webhook-Delivery-ID': '999',
  },
  body,
});

const result = await res.json();
console.log(`\nConvex response (${res.status}):`, JSON.stringify(result, null, 2));

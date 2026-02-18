import { readFileSync } from 'fs';

const env = readFileSync('C:/Users/spart/.openclaw/.env', 'utf8')
  .split('\n').reduce((a, l) => {
    const m = l.match(/^([^#=]+)=(.*)/);
    if (m) a[m[1].trim()] = m[2].trim();
    return a;
  }, {});

const auth = Buffer.from(env.WC_CONSUMER_KEY + ':' + env.WC_CONSUMER_SECRET).toString('base64');
const BASE = 'https://localcatalyst.ai/wp-json/wc/v3';

// Check order #824
console.log('Checking order #824...');
const orderRes = await fetch(`${BASE}/orders/824`, {
  headers: { 'Authorization': 'Basic ' + auth }
});
const order = await orderRes.json();
console.log(`Status: ${order.status}`);
console.log(`Line items:`);
for (const li of order.line_items || []) {
  console.log(`  - ${li.name} | product_id: ${li.product_id} | variation_id: ${li.variation_id} | SKU: "${li.sku || 'EMPTY'}"`);
}
console.log(`Meta data (domain):`, order.meta_data?.find(m => m.key === 'domain')?.value || 'not found');

// List all webhooks
console.log('\nAll webhooks:');
const whRes = await fetch(`${BASE}/webhooks?per_page=20`, {
  headers: { 'Authorization': 'Basic ' + auth }
});
const webhooks = await whRes.json();
for (const wh of webhooks) {
  console.log(`  #${wh.id} [${wh.status}] ${wh.topic} → ${wh.delivery_url} | pending=${wh.pending_delivery_count}`);
}

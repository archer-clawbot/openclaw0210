// Test whether Convex's signature verification logic matches Node's
// by sending a known body + signature we compute ourselves.
import { createHmac } from 'crypto';

const SECRET = 'whsec_fbe6494686cc7e9062eb0ff2be05426c01994906cb04fff79a191591d87615b9';
const body = JSON.stringify({ id: 824, status: 'processing', number: 824, line_items: [] });

// Node HMAC-SHA256 base64
const nodeSig = createHmac('sha256', SECRET).update(body).digest('base64');
console.log('Node sig   :', nodeSig);

// Replicate Convex's btoa approach
const { subtle, getRandomValues } = await import('node:crypto').then(m => m.webcrypto);
const encoder = new TextEncoder();
const key = await subtle.importKey('raw', encoder.encode(SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
const signed = await subtle.sign('HMAC', key, encoder.encode(body));
const convexSig = btoa(String.fromCharCode(...new Uint8Array(signed)));
console.log('Convex sig :', convexSig);
console.log('Match:', nodeSig === convexSig);

// Send to Convex with the Node-computed signature
console.log('\nSending to Convex with Node-computed sig...');
const res = await fetch('https://valuable-partridge-851.convex.site/woo/webhook', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-WC-Webhook-Topic': 'order.created',
    'X-WC-Webhook-Signature': nodeSig,
  },
  body,
});
const result = await res.json();
console.log(`Response (${res.status}):`, JSON.stringify(result));

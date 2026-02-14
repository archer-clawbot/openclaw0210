require('dotenv').config({ path: require('path').resolve(__dirname, '../..', '.env') });

// Client registry — one JSON config per client in cron/clients/.

const fs = require('fs');
const path = require('path');

const CLIENTS_DIR = path.join(__dirname, '..', 'clients');

/** Recursively replace ${ENV_VAR} patterns in string values with process.env values. */
function resolveEnvVars(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/\$\{([^}]+)\}/g, (_, key) => process.env[key] || '');
  }
  if (Array.isArray(obj)) return obj.map(resolveEnvVars);
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = resolveEnvVars(v);
    }
    return result;
  }
  return obj;
}

function ensureDir() {
  fs.mkdirSync(CLIENTS_DIR, { recursive: true });
}

/** "Foo's Plumbing" → "foos-plumbing" */
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Validate required fields on a client config. Returns array of errors (empty = valid). */
function validate(config, slug) {
  const errors = [];
  const required = ['name', 'domain', 'tenantId', 'status'];
  for (const key of required) {
    if (!config[key]) errors.push(`missing required field "${key}"`);
  }
  if (config.access?.wordpress) {
    const wp = config.access.wordpress;
    const wpRequired = ['url', 'restApi', 'user', 'appPassword'];
    for (const key of wpRequired) {
      if (!wp[key]) errors.push(`access.wordpress missing "${key}"`);
    }
  }
  if (config.maxConcurrent != null && (typeof config.maxConcurrent !== 'number' || config.maxConcurrent < 1)) {
    errors.push('maxConcurrent must be a positive number');
  }
  return errors;
}

/** Read a single client config. Returns null if not found. */
function load(slug) {
  const file = path.join(CLIENTS_DIR, `${slug}.json`);
  try {
    return resolveEnvVars(JSON.parse(fs.readFileSync(file, 'utf8')));
  } catch {
    return null;
  }
}

/** Write a client config to disk. */
function save(slug, config) {
  ensureDir();
  const file = path.join(CLIENTS_DIR, `${slug}.json`);
  fs.writeFileSync(file, JSON.stringify(config, null, 2));
}

/** Validate + write a new client config. Throws if slug already exists. */
function register(config) {
  ensureDir();
  const slug = config.slug || slugify(config.name);
  if (load(slug)) {
    throw new Error(`Client "${slug}" already registered`);
  }
  const full = {
    name: config.name,
    slug,
    domain: config.domain,
    tenantId: config.tenantId || slug,
    registeredAt: new Date().toISOString(),
    status: 'active',
    maxConcurrent: config.maxConcurrent || 3,
  };
  if (config.access) full.access = config.access;
  if (config.autoApprove) full.autoApprove = config.autoApprove;
  save(slug, full);
  return full;
}

/** Return all client configs with status:"active". Warns on invalid configs. */
function listActive() {
  ensureDir();
  const files = fs.readdirSync(CLIENTS_DIR).filter(f => f.endsWith('.json'));
  const clients = [];
  for (const f of files) {
    try {
      const data = resolveEnvVars(JSON.parse(fs.readFileSync(path.join(CLIENTS_DIR, f), 'utf8')));
      if (data.status !== 'active') continue;
      const errors = validate(data, f);
      if (errors.length > 0) {
        console.warn(`[clients] WARNING: ${f} has config errors: ${errors.join('; ')} — skipping`);
        continue;
      }
      clients.push(data);
    } catch {
      // skip malformed JSON
    }
  }
  return clients;
}

module.exports = { slugify, load, save, register, listActive, validate, CLIENTS_DIR };

require('dotenv').config({ path: require('path').resolve(__dirname, '../..', '.env') });

// Convex HTTP client — wraps Mission Control dispatcher routes.
// Replaces trello.js as the task state backend.
// All requests are authenticated with a Bearer API token (IMPL-003).

const CONVEX_SITE_URL = process.env.CONVEX_SITE_URL;
const CONVEX_API_TOKEN = process.env.CONVEX_API_TOKEN;

if (!CONVEX_SITE_URL) {
  console.warn('[convex] WARNING: CONVEX_SITE_URL not set — dispatcher will fail');
}

if (!CONVEX_API_TOKEN) {
  console.warn('[convex] WARNING: CONVEX_API_TOKEN not set — dispatcher auth will fail');
}

async function convexFetch(path, body) {
  const url = `${CONVEX_SITE_URL}${path}`;
  const headers = { 'Content-Type': 'application/json' };

  if (CONVEX_API_TOKEN) {
    headers['Authorization'] = `Bearer ${CONVEX_API_TOKEN}`;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  // Get response text first for better error diagnostics
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Convex POST ${path} → ${res.status}: ${text}`);
  }

  // Parse JSON and detect Convex error responses
  let result;
  try {
    result = JSON.parse(text);
  } catch (parseErr) {
    throw new Error(`Convex POST ${path} → invalid JSON: ${text.slice(0, 200)}`);
  }

  // Convex sometimes returns {error: ...} with 200 status
  if (result && typeof result === 'object' && result.error) {
    throw new Error(`Convex POST ${path} → backend error: ${result.error}`);
  }

  return result;
}

/** Fetch tasks by tenant + status. Returns array of task objects. */
async function queryTasks(tenantId, status) {
  const result = await convexFetch('/dispatcher/tasks/query', { tenantId, status });
  if (!Array.isArray(result)) {
    throw new Error(`queryTasks: expected array, got ${typeof result}: ${JSON.stringify(result).slice(0, 200)}`);
  }
  return result;
}

/** Mark a task as dispatched (in_progress) with an OpenClaw runId. */
async function markDispatched(taskId, tenantId, openclawRunId) {
  return convexFetch('/dispatcher/tasks/dispatch', { taskId, tenantId, openclawRunId });
}

/** Mark a task as completed (done or review). */
async function markCompleted(taskId, tenantId, needsReview = false) {
  return convexFetch('/dispatcher/tasks/complete', { taskId, tenantId, needsReview });
}

/** Mark a task as failed. Convex handles attempt counting + blocking. */
async function markFailed(taskId, tenantId, error) {
  return convexFetch('/dispatcher/tasks/fail', { taskId, tenantId, error });
}

/** Create a new task (for chaining or setup scripts). */
async function createTask(opts) {
  return convexFetch('/dispatcher/tasks/create', opts);
}

/** Record token usage + cost for a completed task. */
async function recordUsage(taskId, tenantId, usage) {
  return convexFetch('/dispatcher/tasks/usage', {
    taskId,
    tenantId,
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    cacheReadTokens: usage.cacheReadTokens || 0,
    cacheWriteTokens: usage.cacheWriteTokens || 0,
    totalCost: usage.totalCost,
  });
}

/** Promote tasks from one status to another (backfill). */
async function promoteTasks(tenantId, fromStatus, toStatus, limit) {
  return convexFetch('/dispatcher/tasks/promote', { tenantId, fromStatus, toStatus, limit });
}

module.exports = {
  queryTasks,
  markDispatched,
  markCompleted,
  markFailed,
  createTask,
  promoteTasks,
  recordUsage,
};

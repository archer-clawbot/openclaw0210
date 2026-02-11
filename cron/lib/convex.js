require('dotenv').config({ path: require('path').resolve(__dirname, '../..', '.env') });

// Convex HTTP client — wraps Mission Control dispatcher routes.
// Replaces trello.js as the task state backend.

const CONVEX_SITE_URL = process.env.CONVEX_SITE_URL;

if (!CONVEX_SITE_URL) {
  console.warn('[convex] WARNING: CONVEX_SITE_URL not set — dispatcher will fail');
}

async function convexFetch(path, body) {
  const url = `${CONVEX_SITE_URL}${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Convex POST ${path} → ${res.status}: ${text}`);
  }
  return res.json();
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

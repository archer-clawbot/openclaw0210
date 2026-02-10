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
  return convexFetch('/dispatcher/tasks/query', { tenantId, status });
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
};

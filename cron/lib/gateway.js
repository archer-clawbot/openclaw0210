require('dotenv').config({ path: require('path').resolve(__dirname, '../..', '.env') });

// Gateway WebSocket client — persistent connection with auto-reconnect.

const WebSocket = require('ws');
const crypto = require('crypto');

const GATEWAY_URL = 'ws://127.0.0.1:18789';
const AUTH_TOKEN = process.env.GATEWAY_AUTH_TOKEN;
const RECONNECT_DELAY = 5000;

function uuid() {
  return crypto.randomUUID();
}

class GatewayClient {
  constructor({ log = console.log } = {}) {
    this._log = log;
    this._ws = null;
    this._connected = false;
    this._pendingRequests = new Map();   // id → { resolve, reject, responses[] }
    this._reconnectTimer = null;
    this._closing = false;
  }

  // ── lifecycle ───────────────────────────────────────────────────────

  connect() {
    if (this._ws) return Promise.resolve();
    return new Promise((resolve, reject) => {
      this._log('[gw] connecting…');
      const ws = new WebSocket(GATEWAY_URL);
      this._ws = ws;

      ws.on('open', () => {
        this._log('[gw] socket open, sending handshake');
        const id = uuid();
        this._sendRaw(ws, {
          type: 'req',
          id,
          method: 'connect',
          params: {
            minProtocol: 3,
            maxProtocol: 3,
            client: {
              id: 'gateway-client',
              displayName: 'Mission Control Dispatcher',
              version: '1.0.0',
              platform: 'win32',
              mode: 'backend',
            },
            role: 'operator',
            scopes: ['operator.admin'],
            auth: { token: AUTH_TOKEN },
          },
        });
        // Wait for hello-ok
        this._pendingRequests.set(id, {
          resolve: (payload) => {
            this._connected = true;
            this._log('[gw] connected (protocol v' + (payload?.protocol ?? '?') + ')');
            resolve();
          },
          reject: (err) => reject(err),
          responses: [],
          expectFinal: false,
        });
      });

      ws.on('message', (data) => this._onMessage(data));

      ws.on('close', (code, reason) => {
        this._connected = false;
        this._ws = null;
        const msg = `[gw] disconnected (${code} ${reason || ''})`.trim();
        this._log(msg);
        // Reject all pending
        for (const [, req] of this._pendingRequests) {
          req.reject(new Error('WebSocket closed'));
        }
        this._pendingRequests.clear();
        if (!this._closing) this._scheduleReconnect();
      });

      ws.on('error', (err) => {
        this._log(`[gw] error: ${err.message}`);
        // Will trigger close
      });
    });
  }

  close() {
    this._closing = true;
    clearTimeout(this._reconnectTimer);
    if (this._ws) {
      this._ws.close(1000, 'dispatcher shutdown');
      this._ws = null;
    }
    this._connected = false;
  }

  isConnected() {
    return this._connected;
  }

  // ── agent dispatch ──────────────────────────────────────────────────

  /**
   * Dispatch a task to an agent.
   * Returns { runId, status: "accepted", acceptedAt }.
   * Does NOT wait for completion — use waitForAgent() for that.
   */
  async dispatchAgent({ agentId, message, taskId }) {
    await this._ensureConnected();
    const id = uuid();
    const idem = uuid();
    const params = {
      message,
      idempotencyKey: idem,
      agentId,
      deliver: false,
    };
    return this._request(id, {
      type: 'req',
      id,
      method: 'agent',
      params,
    }, { expectFinal: false });
  }

  /**
   * Wait for an agent job to finish (or timeout).
   * Returns { runId, status: "ok"|"timeout"|"error", ... }.
   */
  async waitForAgent(runId, timeoutMs = 5000) {
    await this._ensureConnected();
    const id = uuid();
    return this._request(id, {
      type: 'req',
      id,
      method: 'agent.wait',
      params: { runId, timeoutMs },
    }, { expectFinal: false });
  }

  // ── internals ───────────────────────────────────────────────────────

  async _ensureConnected() {
    if (!this._connected) await this.connect();
  }

  _sendRaw(ws, frame) {
    ws.send(JSON.stringify(frame));
  }

  _request(id, frame, { expectFinal = false, timeoutMs = 30_000 } = {}) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this._pendingRequests.delete(id);
        reject(new Error(`Gateway request ${id} timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      this._pendingRequests.set(id, {
        resolve: (val) => { clearTimeout(timer); resolve(val); },
        reject: (err) => { clearTimeout(timer); reject(err); },
        responses: [],
        expectFinal,
      });
      this._sendRaw(this._ws, frame);
    });
  }

  _onMessage(data) {
    let frame;
    try {
      frame = JSON.parse(data.toString());
    } catch {
      return;
    }

    // Response frames
    if (frame.type === 'res') {
      const pending = this._pendingRequests.get(frame.id);
      if (!pending) return; // Stale or duplicate

      if (!frame.ok) {
        this._pendingRequests.delete(frame.id);
        pending.reject(new Error(frame.error?.message ?? JSON.stringify(frame.error ?? frame.payload)));
        return;
      }

      // For agent method: first response is "accepted", second is final.
      // For agent.wait / connect: single response.
      if (pending.expectFinal && pending.responses.length === 0) {
        // First (accepted) response — store it but keep waiting
        pending.responses.push(frame.payload);
      } else {
        this._pendingRequests.delete(frame.id);
        pending.resolve(frame.payload);
      }
      return;
    }

    // Events (tick, etc.) — ignore for now
  }

  _scheduleReconnect() {
    if (this._reconnectTimer) return;
    this._log(`[gw] reconnecting in ${RECONNECT_DELAY / 1000}s…`);
    this._reconnectTimer = setTimeout(() => {
      this._reconnectTimer = null;
      this.connect().catch((err) => {
        this._log(`[gw] reconnect failed: ${err.message}`);
      });
    }, RECONNECT_DELAY);
  }
}

module.exports = { GatewayClient };

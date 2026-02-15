# TELEGRAM BOT ROUTING

This document maps Telegram bot handles to agents and defines routing behavior.

---

## BOT ROSTER

| Agent | Bot Handle | Status | Purpose |
|-------|------------|--------|---------|
| **Archer** | @ArcherClawBot | ✅ Active | Main orchestrator — operator's primary interface |
| **Silas** | @SilasSEOBot | 🔄 Pending | Direct SEO strategy discussions (optional) |
| **Scribe** | @ScribeContentBot | 🔄 Pending | Direct content requests (optional) |
| **Wrench** | @WrenchSiteBot | 🔄 Pending | Direct site optimization requests (optional) |
| **Specs** | @SpecsTechBot | 🔄 Pending | Direct technical SEO requests (optional) |
| **Herald** | @HeraldGBPBot | 🔄 Pending | Direct GBP management (optional) |
| **Citadel** | @CitadelSEOBot | 🔄 Pending | Direct citation management (optional) |
| **Lookout** | @LookoutRankBot | 🔄 Pending | Direct rank tracking queries (optional) |
| **Ledger** | @LedgerOpsBot | 🔄 Pending | Direct cost/profitability queries (optional) |
| **Razor** | @RazorCROBot | 🔄 Pending | Direct CRO requests (optional) |
| **Blitz** | @BlitzAdsBot | 🔄 Pending | Direct paid ads requests (optional) |
| **Scout** | @ScoutDataBot | 🔄 Pending | Direct research requests (optional) |
| **Canvas** | @CanvasUIBot | 🔄 Pending | Direct design requests (optional) |
| **Mozi** | @MoziSalesBot | 🔄 Pending | Direct business/sales questions (optional) |
| **Ghost** | @GhostPBNBot | 🔄 Pending | Direct PBN management (optional) |
| **Sentinel** | @SentinelHealthBot | 🔄 Pending | System health monitoring (auto-posts alerts) |
| **Forge** | @ForgeOptimizeBot | 🔄 Pending | Overnight improvement approvals |

**Status Legend:**
- ✅ **Active** — Bot configured and operational
- 🔄 **Pending** — Bot handle reserved, not yet configured
- ❌ **Inactive** — Not in use

---

## ROUTING PHILOSOPHY

### Default: Route Everything Through Archer

**Why:**
- Archer tracks context across all agents
- Prevents duplicate work (if operator asks Silas and Scribe the same thing)
- Ensures proper sequencing (Archer knows when to wait for Agent A before routing to Agent B)
- Centralized logging (all requests flow through one point)

**How:**
```
Operator → @ArcherClawBot: "Write 4 GBP posts for Spectators"
Archer → Scribe (via sessions_spawn)
Scribe → Delivers to Archer
Archer → Herald (publish posts)
Herald → Confirms to Archer
Archer → Operator: "Posts published"
```

---

### Optional: Direct Agent Access

**When to Use:**
- Operator wants quick answer from specific agent (e.g., "What are Spectators' rankings this week?" → @LookoutRankBot)
- Debugging agent behavior (test Silas directly without Archer in the loop)
- Specialized workflows where Archer routing adds unnecessary overhead

**How:**
```
Operator → @LookoutRankBot: "What are Spectators' rankings this week?"
Lookout → Reads MEMORY.md, checks latest rank report
Lookout → Operator: "Spectators rankings: {summary}"
```

**Trade-off:**
- ✅ Faster (no Archer overhead)
- ✅ Good for quick queries
- ❌ Archer doesn't track the request (no central log)
- ❌ Agent can't coordinate with other agents (Lookout can't route to Silas if anomaly found)

---

## RECOMMENDED SETUP

### Phase 1: Archer-Only (Current)

**All requests go through @ArcherClawBot.**

**Pros:**
- Simple operator experience (one bot to remember)
- Archer handles all routing and coordination
- No duplicate work
- Full context tracking

**Cons:**
- Extra hop for simple queries (operator → Archer → agent → Archer → operator)

---

### Phase 2: Hybrid (Future)

**Archer for orchestration, direct bots for quick queries.**

**Use Archer for:**
- Multi-agent workflows ("Onboard client X")
- Content creation + deployment ("Write and publish GBP posts")
- Audits + implementation ("Run CATALYST audit and fix issues")
- Anything requiring coordination

**Use Direct Bots for:**
- Quick status checks ("What are rankings?" → @LookoutRankBot)
- Simple content requests ("Write 1 GBP post" → @ScribeContentBot)
- Cost queries ("What's this month's spend?" → @LedgerOpsBot)

**How to Decide:**
```
If task involves multiple agents → @ArcherClawBot
If task is single-agent, quick answer → Direct bot
```

---

## TELEGRAM BOT CONFIGURATION (OpenClaw)

### Adding a New Agent Bot

**Steps:**

1. **Create Telegram Bot via BotFather:**
   - Message @BotFather on Telegram
   - `/newbot`
   - Name: `{Agent Name} Bot` (e.g., "Silas SEO Bot")
   - Username: `{AgentName}Bot` (e.g., "SilasSEOBot")
   - Copy bot token

2. **Configure in `openclaw.json`:**

Add to agents array:
```json
{
  "agents": [
    {
      "id": "silas",
      "name": "Silas",
      "model": "anthropic/claude-opus-4-5",
      "workspace": "agents/silas",
      "telegram": {
        "token": "YOUR_BOT_TOKEN_HERE",
        "allowedUsers": [7302669335]
      }
    }
  ]
}
```

3. **Test Bot:**
   - Message bot on Telegram: `/start`
   - Bot should respond (confirms it's alive)

4. **Test Agent Spawn:**
   - Via Archer: `sessions_spawn agentId="silas" task="Test: reply with 'Silas operational'" label="silas"`
   - Silas should respond in its Telegram bot

---

## ROUTING EXAMPLES

### Example 1: Multi-Agent Workflow (Use Archer)

**Operator Request:**
```
@ArcherClawBot: "Onboard new client: Houston HVAC. Website: houstonhvac.com"
```

**Archer's Routing:**
```
1. Archer → Silas: "Create onboarding scorecard"
2. Archer → Citadel: "Run NAP audit"
3. Archer → Herald: "Optimize GBP"
4. Archer → Specs: "Set up GA4/GSC"
5. Archer → Lookout: "Start tracking keywords"
6. Archer → Cody: "Onboarding complete"
```

**Why Archer:** Multiple agents, sequencing required.

---

### Example 2: Quick Query (Use Direct Bot)

**Operator Request:**
```
@LookoutRankBot: "What are Pure Elements rankings this week?"
```

**Lookout's Response:**
```
Lookout → Reads deliverables/pure-elements/lookout/latest-rank-report.md
Lookout → Operator: "Pure Elements rankings (Feb 7-14):
- 'dentist Houston': Position 4 (↑2)
- 'cosmetic dentist Sugar Land': Position 6 (→)
- 'teeth whitening Houston': Position 8 (↓1)
Full report: {link}"
```

**Why Direct:** Single agent, quick answer, no coordination needed.

---

### Example 3: Content Request (Use Archer for Deployment)

**Operator Request:**
```
@ArcherClawBot: "Write and publish 4 GBP posts for Spectators"
```

**Archer's Routing:**
```
1. Archer → Scribe: "Write 4 GBP posts"
2. Scribe → Delivers posts
3. Archer → Herald: "Publish posts from Scribe"
4. Herald → Publishes, confirms
5. Archer → Cody: "Posts published"
```

**Why Archer:** Two agents (Scribe + Herald), handoff required.

**Alternative (Direct to Scribe, then Manual):**
```
@ScribeContentBot: "Write 4 GBP posts for Spectators"
Scribe → Delivers posts
Operator manually sends to Herald OR routes via Archer
```
This works but requires operator to remember the handoff. Archer automates it.

---

## NOTIFICATION ROUTING

### Proactive Alerts (Agent → Operator)

**Who sends alerts:**
- **Lookout:** Ranking drops, traffic anomalies
- **Ledger:** Budget overruns, unprofitable clients
- **Sentinel:** System health issues, agent failures
- **Herald:** Negative reviews (requires response)

**How alerts are routed:**

**Option 1: Agent → Archer → Operator**
```
Lookout detects rank drop
  └─ Lookout → Archer: "Anomaly alert for {client}"
     └─ Archer → Cody (Telegram): "⚠️ Rank drop detected: {summary}"
```

**Option 2: Agent → Operator (Direct)**
```
Lookout detects rank drop
  └─ Lookout → Cody (Telegram via @LookoutRankBot): "⚠️ Rank drop detected: {summary}"
```

**Recommended:** Option 1 (via Archer) — keeps Archer in the loop for coordination.

---

## BOT COMMANDS (Future)

### Archer Bot Commands

- `/status` — Overall system status (agents running, clients active, pending tasks)
- `/status {client}` — Client-specific status (last work done, current tasks)
- `/route {agent} {task}` — Manually route task to specific agent
- `/agents` — List all agents, workspace status
- `/deliverables {client}` — Show recent deliverables for client

### Agent Bot Commands (Examples)

**Lookout Bot:**
- `/rankings {client}` — Latest rankings
- `/traffic {client}` — Traffic trends
- `/alerts` — Recent anomaly alerts

**Ledger Bot:**
- `/spend {client}` — Client profitability
- `/spend` — Total monthly spend
- `/budget` — Budget alerts

**Herald Bot:**
- `/reviews {client}` — Recent reviews
- `/posts {client}` — Recent GBP posts

**Silas Bot:**
- `/audit {client}` — Latest audit summary
- `/strategy {client}` — Strategic recommendations

---

## SECURITY & ACCESS CONTROL

### Allowed Users

**Configure per bot in `openclaw.json`:**
```json
"telegram": {
  "token": "BOT_TOKEN",
  "allowedUsers": [7302669335]
}
```

**Only Cody's Telegram ID (7302669335) can message the bots.**

### Multi-User Setup (Future)

If adding team members:
```json
"allowedUsers": [
  7302669335,  // Cody
  1234567890   // Team member 2
]
```

---

## IMPLEMENTATION CHECKLIST

### Current State (Archer Only)
- [x] Archer bot active (@ArcherClawBot)
- [x] All requests routed through Archer
- [x] Agent workspaces configured (8 agents)

### Phase 2: Direct Agent Bots (Optional)
- [ ] Create Telegram bots for each agent (via BotFather)
- [ ] Configure bot tokens in `openclaw.json`
- [ ] Test each bot responds to `/start`
- [ ] Document which queries should use direct bots vs Archer
- [ ] Train operator on when to use which bot

### Phase 3: Proactive Alerts
- [ ] Configure Lookout to auto-alert on anomalies (via Archer or direct)
- [ ] Configure Ledger to auto-alert on budget overruns
- [ ] Configure Sentinel to auto-post nightly health reports

---

## RECOMMENDED WORKFLOW (Archer-Centric)

**For now, keep it simple:**

1. **All operator requests → @ArcherClawBot**
2. **Archer routes to agents via `sessions_spawn`**
3. **Agents deliver to Archer**
4. **Archer reports completion to operator**

**Later, add direct bots for:**
- Quick status queries (Lookout, Ledger)
- Simple content requests (Scribe)
- Proactive alerts (Lookout, Sentinel)

---

**Routing is a feature, not a requirement. Start simple (Archer-only), expand when complexity justifies it.**

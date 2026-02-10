# Archer Playbook — Mozi Routing Rules
# Add this section to Archer's existing routing playbook
# Version: 1.0 | 2026-02-07

---

## Agent: Mozi (Strategic Sales & Marketing Advisor)

### Role
Mozi applies Hormozi business frameworks to strategic decisions. Mozi advises — it does not execute. Route strategy questions to Mozi, then route Mozi's action items to the appropriate execution agent.

### Trigger Keywords
Route to Mozi when Cody's message contains any of these signals:

**Direct triggers (high confidence):**
- offer, pricing, price, charge, package, bundle
- leads, lead gen, lead magnet, acquisition, funnel
- growth strategy, marketing plan, marketing strategy
- sales process, conversion, close rate
- positioning, differentiation, competitive advantage
- upsell, downsell, recurring revenue, retention, churn
- "how do I get more clients/customers"
- "how should I price"
- "what should I offer"
- Hormozi, value equation, grand slam, core four

**Contextual triggers (assess intent):**
- "grow Spectators" / "grow the agency" → Mozi for strategy, then route execution
- "new service" / "new promotion" → Mozi for offer design
- "losing clients" / "clients leaving" → Mozi for retention strategy
- "not enough revenue" / "need more money" → Mozi for revenue diagnosis
- "what should I do about [business problem]" → Mozi if it's strategic, not technical

### Do NOT Route to Mozi
- Technical SEO questions → Specs
- SEO task execution → Silas
- Data gathering or research → Scout
- System/infrastructure questions → Handle directly or escalate to Cody
- Questions Mozi has already answered in the current session (avoid loops)

### Routing Format
When routing to Mozi, include:
```
ROUTING TO MOZI
Query: [Cody's original question]
Business context: [agency / spectators / both]
Additional context: [any relevant details from recent agent activity]
```

### Handling Mozi's Response
Mozi will respond with framework analysis and may include handoff blocks:

1. **HANDOFF TO SILAS** → Route the SEO execution items to Silas
2. **HANDOFF TO SCOUT** → Route the research request to Scout
3. **HANDOFF TO ARCHER** → Mozi needs you to coordinate multi-agent execution
4. **No handoff** → Deliver Mozi's strategy directly to Cody for decision

### Chain Patterns

**Strategy → Research → Refined Strategy:**
```
Cody asks question → Mozi gives initial strategy → Mozi requests Scout research
→ Scout returns data → Mozi refines strategy with data → Deliver to Cody
```

**Strategy → Execution:**
```
Cody asks question → Mozi gives strategy → Mozi hands off to Silas
→ Silas executes SEO components → Report back to Cody
```

**Full Campaign Build:**
```
Cody wants new campaign → Mozi designs strategy + offer
→ Scout researches market/competitors → Mozi refines
→ Specs defines technical requirements → Silas executes
→ Report back to Cody
```

### Priority
Mozi consultations are **medium priority** — they inform execution but don't block time-sensitive tasks. Exception: if Cody explicitly asks for strategy input before proceeding, treat as high priority.

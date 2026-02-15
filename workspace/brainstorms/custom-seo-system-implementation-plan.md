# LocalCatalyst SEO Automation Platform — Complete Implementation Plan

**Target Audience:** Claude Code (AI coding assistant)  
**Mission:** Build a production-ready, fully automated SEO agency operations platform designed for 100+ clients and exit-ready within 12-24 months  
**Timeline:** 8 weeks to MVP, 16 weeks to exit-ready  
**Tech Stack:** Python (FastAPI), PostgreSQL, React, Anthropic Claude API, OpenRouter fallback  

---

## 🎯 STRATEGIC VISION: Why This System Sells

### **The Problem We're Solving**

SEO agencies fail to scale because:
1. **Manual labor doesn't scale** — Every new client = proportional increase in human hours
2. **Quality degrades with scale** — More clients = less attention per client = worse results
3. **No proprietary systems** — Agency is just "people who do SEO" → low valuation
4. **High churn** — Clients leave when quality drops or prices rise

### **Our Solution: The Automated SEO Factory**

**LocalCatalyst Platform = SEO Agency in a Box**

**What makes it sellable:**
1. **Proprietary software** — Not just "people," it's a defensible asset
2. **Scalable without linear cost growth** — 100 clients costs 2x to serve as 50 clients (not 4x)
3. **Consistent quality** — AI agents never have bad days, always follow best practices
4. **Predictable margins** — Track cost per client, optimize profitability
5. **Turnkey operation** — Buyer can run it without deep SEO expertise
6. **Recurring revenue** — SaaS-style MRR from retainer clients

**Valuation drivers for buyers:**
- **3-5x MRR multiple** for service businesses
- **10-20x MRR multiple** for SaaS with proven unit economics
- **We're a hybrid:** Service business with SaaS-level automation

**Example exit scenario:**
- 50 clients @ $2,000/month MRR = $100k MRR = $1.2M ARR
- Traditional agency valuation: 3x MRR = $300k
- **With proprietary automation platform:** 8x MRR = $800k - $1.2M
- **Delta: +$500k-900k from software alone**

### **What Buyers Look For**

1. **Automated customer acquisition** — Lead gen, sales pipeline, onboarding without human touch
2. **Automated service delivery** — SEO work happens without manual intervention
3. **Client retention systems** — Proactive monitoring, reporting, communication
4. **Unit economics** — CAC, LTV, margin per client clearly tracked
5. **Documentation** — Any competent operator can run it (not dependent on you)
6. **Scalability proof** — Show it works with 50 clients, will work with 500

**Our build will hit all 6.**

---

## 🏗️ ARCHITECTURE OVERVIEW

### **System Components**

```
┌───────────────────────────────────────────────────────────────┐
│                    CUSTOMER PORTAL                            │
│  (Client-facing: view reports, approve content, support)     │
└────────────────────────────┬──────────────────────────────────┘
                             │
┌────────────────────────────┴──────────────────────────────────┐
│                    ADMIN DASHBOARD                            │
│  (Internal: manage clients, tasks, agents, financials)       │
└────────────────────────────┬──────────────────────────────────┘
                             │
┌────────────────────────────┴──────────────────────────────────┐
│                   ORCHESTRATION LAYER                         │
│  ┌─────────────────┬──────────────────┬────────────────────┐ │
│  │ Workflow Engine │ Task Scheduler   │ Agent Coordinator │ │
│  │ (Multi-step     │ (Cron jobs,      │ (Spawn, monitor,  │ │
│  │  processes)     │  triggers)       │  retry agents)    │ │
│  └─────────────────┴──────────────────┴────────────────────┘ │
└────────────────────────────┬──────────────────────────────────┘
                             │
┌────────────────────────────┴──────────────────────────────────┐
│                      AGENT LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 18 Specialized AI Agents (existing brains)              ││
│  │ Silas │ Scribe │ Scout │ Herald │ Wrench │ Citadel ...  ││
│  └──────────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────────────────┐│
│  │ Agent Runner: Load brain → Call LLM → Parse → Save      ││
│  └──────────────────────────────────────────────────────────┘│
└────────────────────────────┬──────────────────────────────────┘
                             │
┌────────────────────────────┴──────────────────────────────────┐
│                     DATA LAYER                                │
│  ┌────────────┬─────────────┬──────────────┬───────────────┐ │
│  │ PostgreSQL │ Redis       │ S3/Storage   │ Analytics     │ │
│  │ (clients,  │ (cache,     │ (deliverables│ (metrics,     │ │
│  │  tasks)    │  sessions)  │  files)      │  dashboards)  │ │
│  └────────────┴─────────────┴──────────────┴───────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

### **Core Principles**

1. **Automation First** — If a human does it more than twice, automate it
2. **Agent Specialization** — Each agent has ONE job, does it expertly
3. **Workflow-Driven** — All work flows through predefined workflows (not ad-hoc requests)
4. **Client-Centric** — All data organized by client (easy to see "everything for Client X")
5. **Observable** — Every action logged, dashboards for health, cost, quality
6. **Fail-Safe** — Retries, fallbacks, human approval gates when needed
7. **Exit-Ready** — Documentation, clean code, transferable to new owner

---

## 📋 PHASE-BY-PHASE BUILD PLAN

### **PHASE 0: Foundation (Week 0 — Pre-Build)**

**Objective:** Set up project structure, dependencies, development environment

**Tasks:**
1. Initialize Git repository
2. Set up Python virtual environment
3. Create project structure:
   ```
   localcatalyst-platform/
   ├── backend/
   │   ├── app/
   │   │   ├── __init__.py
   │   │   ├── main.py                # FastAPI app
   │   │   ├── config.py              # Environment variables
   │   │   ├── database.py            # PostgreSQL connection
   │   │   ├── models.py              # SQLAlchemy models
   │   │   ├── schemas.py             # Pydantic schemas
   │   │   ├── crud.py                # Database operations
   │   │   ├── api/
   │   │   │   ├── clients.py         # Client endpoints
   │   │   │   ├── tasks.py           # Task endpoints
   │   │   │   ├── workflows.py       # Workflow endpoints
   │   │   │   ├── agents.py          # Agent endpoints
   │   │   │   └── auth.py            # Authentication
   │   │   ├── agents/
   │   │   │   ├── runner.py          # Agent execution engine
   │   │   │   ├── loader.py          # Load agent brains
   │   │   │   └── registry.py        # Agent registry
   │   │   ├── workflows/
   │   │   │   ├── engine.py          # Workflow execution
   │   │   │   ├── definitions.py     # Workflow specs
   │   │   │   └── scheduler.py       # Cron scheduling
   │   │   └── utils/
   │   │       ├── llm.py             # LLM API calls
   │   │       ├── memory.py          # Memory system
   │   │       └── notifications.py   # Telegram, email
   │   ├── migrations/                # Database migrations
   │   ├── tests/
   │   └── requirements.txt
   ├── frontend/
   │   ├── src/
   │   │   ├── components/
   │   │   ├── pages/
   │   │   ├── api/
   │   │   └── App.tsx
   │   ├── public/
   │   └── package.json
   ├── agents/                        # Copy existing agent brains
   │   ├── silas/
   │   ├── scribe/
   │   └── ...
   ├── docs/
   │   ├── api.md                     # API documentation
   │   ├── workflows.md               # Workflow definitions
   │   └── deployment.md              # How to deploy
   ├── docker-compose.yml
   ├── Dockerfile
   └── README.md
   ```

4. Install dependencies:
   - FastAPI, SQLAlchemy, Pydantic, PostgreSQL driver
   - Anthropic SDK, OpenRouter client
   - Redis, Celery (for background jobs)
   - React, TypeScript, Tailwind CSS

5. Set up local PostgreSQL database
6. Create `.env` file with API keys (Claude, OpenRouter, database URL)

**Deliverable:** Empty project structure with dependencies installed

**Hand to Claude Code:**
> "Initialize a FastAPI + React project with the structure above. Set up PostgreSQL database connection. Install all dependencies. Create empty files for each module. Verify it runs with `uvicorn app.main:app --reload`."

---

### **PHASE 1: Database & Models (Week 1)**

**Objective:** Design and implement database schema for all entities

**Database Schema:**

#### **clients**
```sql
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    gbp_url VARCHAR(500),
    
    -- Contact info
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    
    -- Business details
    industry VARCHAR(100),
    location VARCHAR(255),
    target_audience TEXT,
    
    -- Service configuration
    billing_tier VARCHAR(50) DEFAULT 'standard', -- 'basic', 'standard', 'premium', 'enterprise'
    services JSONB DEFAULT '[]', -- ['seo', 'content', 'gbp', 'citations', 'ads']
    monthly_rate DECIMAL(10,2),
    
    -- Status
    status VARCHAR(50) DEFAULT 'active', -- 'prospect', 'onboarding', 'active', 'paused', 'churned'
    onboarded_at TIMESTAMP,
    churned_at TIMESTAMP,
    churn_reason TEXT,
    
    -- Automation settings
    auto_approve_content BOOLEAN DEFAULT false,
    auto_approve_gbp_posts BOOLEAN DEFAULT false,
    auto_approve_citations BOOLEAN DEFAULT false,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_slug ON clients(slug);
```

#### **tasks**
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    
    -- Task definition
    agent VARCHAR(50) NOT NULL, -- 'silas', 'scribe', etc.
    task_type VARCHAR(100) NOT NULL, -- 'audit', 'content-brief', 'gbp-post'
    
    -- Execution
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'failed', 'needs_review', 'approved', 'cancelled'
    priority INTEGER DEFAULT 2, -- 1=low, 2=normal, 3=high, 4=urgent
    
    -- Data
    inputs JSONB DEFAULT '{}',
    outputs JSONB DEFAULT '{}',
    
    -- Dependencies
    depends_on INTEGER REFERENCES tasks(id),
    workflow_run_id INTEGER, -- FK to workflow_runs
    
    -- Scheduling
    scheduled_at TIMESTAMP,
    
    -- Cost tracking
    model_used VARCHAR(100),
    tokens_used INTEGER,
    cost_usd DECIMAL(10,4),
    
    -- Execution tracking
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    retries INTEGER DEFAULT 0,
    error_message TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_client ON tasks(client_id);
CREATE INDEX idx_tasks_agent ON tasks(agent);
CREATE INDEX idx_tasks_scheduled ON tasks(scheduled_at);
```

#### **deliverables**
```sql
CREATE TABLE deliverables (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    task_id INTEGER REFERENCES tasks(id) ON DELETE SET NULL,
    
    -- Deliverable info
    agent VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    deliverable_type VARCHAR(100), -- 'audit', 'content-brief', 'blog-post', 'gbp-post', 'report'
    
    -- Content
    content TEXT, -- Full markdown content
    file_path VARCHAR(500), -- Path to file in storage
    summary TEXT, -- Brief summary for client
    
    -- Status
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'needs_review', 'approved', 'sent_to_client', 'rejected'
    
    -- Approval
    reviewed_by VARCHAR(255),
    reviewed_at TIMESTAMP,
    approval_notes TEXT,
    
    -- Client delivery
    sent_to_client_at TIMESTAMP,
    client_viewed_at TIMESTAMP,
    client_feedback TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_deliverables_client ON deliverables(client_id);
CREATE INDEX idx_deliverables_status ON deliverables(status);
CREATE INDEX idx_deliverables_type ON deliverables(deliverable_type);
```

#### **workflows**
```sql
CREATE TABLE workflows (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    
    -- Workflow definition (JSON)
    definition JSONB NOT NULL,
    
    -- Settings
    enabled BOOLEAN DEFAULT true,
    auto_start BOOLEAN DEFAULT false, -- Auto-trigger based on conditions
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **workflow_runs**
```sql
CREATE TABLE workflow_runs (
    id SERIAL PRIMARY KEY,
    workflow_id INTEGER REFERENCES workflows(id),
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    
    -- Execution
    status VARCHAR(50) DEFAULT 'running', -- 'running', 'completed', 'failed', 'paused', 'cancelled'
    
    -- Progress
    current_step INTEGER DEFAULT 0,
    total_steps INTEGER,
    
    -- Timing
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    
    -- Error handling
    error_message TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workflow_runs_status ON workflow_runs(status);
CREATE INDEX idx_workflow_runs_client ON workflow_runs(client_id);
```

#### **agent_executions**
```sql
CREATE TABLE agent_executions (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    
    -- Agent info
    agent VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    
    -- LLM interaction
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    total_tokens INTEGER,
    cost_usd DECIMAL(10,4),
    
    -- Performance
    duration_seconds DECIMAL(10,2),
    
    -- Result
    success BOOLEAN,
    error_message TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_agent_executions_agent ON agent_executions(agent);
CREATE INDEX idx_agent_executions_created ON agent_executions(created_at);
```

#### **analytics**
```sql
CREATE TABLE analytics_daily (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    
    -- Task metrics
    tasks_completed INTEGER DEFAULT 0,
    tasks_failed INTEGER DEFAULT 0,
    
    -- Cost metrics
    total_cost_usd DECIMAL(10,2) DEFAULT 0,
    api_calls INTEGER DEFAULT 0,
    
    -- Agent usage
    agent_usage JSONB DEFAULT '{}', -- {"silas": 5, "scribe": 10}
    
    -- Deliverables
    deliverables_created INTEGER DEFAULT 0,
    deliverables_approved INTEGER DEFAULT 0,
    
    UNIQUE(date, client_id)
);

CREATE INDEX idx_analytics_date ON analytics_daily(date);
CREATE INDEX idx_analytics_client ON analytics_daily(client_id);
```

#### **users** (for admin dashboard)
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    role VARCHAR(50) DEFAULT 'user', -- 'admin', 'user', 'client'
    client_id INTEGER REFERENCES clients(id), -- If role=client
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
```

**SQLAlchemy Models:**

Create `app/models.py` with SQLAlchemy ORM models for all tables above.

**Pydantic Schemas:**

Create `app/schemas.py` with Pydantic schemas for:
- ClientCreate, ClientUpdate, ClientResponse
- TaskCreate, TaskUpdate, TaskResponse
- DeliverableCreate, DeliverableUpdate, DeliverableResponse
- WorkflowCreate, WorkflowResponse
- WorkflowRunResponse
- UserCreate, UserLogin, UserResponse

**Database Migrations:**

Use Alembic for migrations:
```bash
alembic init migrations
alembic revision --autogenerate -m "Initial schema"
alembic upgrade head
```

**Deliverable:** Fully functional database with all tables, models, schemas

**Hand to Claude Code:**
> "Implement the database schema above using SQLAlchemy. Create models.py with all ORM models. Create schemas.py with all Pydantic schemas. Set up Alembic for migrations. Run migration to create all tables. Verify tables exist in PostgreSQL."

---

### **PHASE 2: Core API (Week 2)**

**Objective:** Build REST API for CRUD operations on all entities

**API Endpoints:**

#### **Authentication**
```
POST /auth/register — Create new user
POST /auth/login — Login (returns JWT token)
POST /auth/logout — Logout
GET /auth/me — Get current user
```

#### **Clients**
```
POST /clients — Create new client
GET /clients — List all clients (with filters, pagination)
GET /clients/:id — Get client details
PUT /clients/:id — Update client
DELETE /clients/:id — Soft delete client
GET /clients/:id/tasks — Get all tasks for client
GET /clients/:id/deliverables — Get all deliverables
GET /clients/:id/analytics — Get metrics for client
GET /clients/:id/cost — Get total cost and profitability
```

#### **Tasks**
```
POST /tasks — Create new task
GET /tasks — List all tasks (filters: client_id, agent, status, priority)
GET /tasks/:id — Get task details
PUT /tasks/:id — Update task
DELETE /tasks/:id — Cancel task
POST /tasks/:id/retry — Retry failed task
POST /tasks/:id/approve — Approve task waiting for review
```

#### **Deliverables**
```
GET /deliverables — List all deliverables (filters: client_id, status, type)
GET /deliverables/:id — Get deliverable details
PUT /deliverables/:id — Update deliverable
POST /deliverables/:id/approve — Approve deliverable
POST /deliverables/:id/reject — Reject deliverable (with feedback)
POST /deliverables/:id/send — Send to client
```

#### **Workflows**
```
POST /workflows — Create workflow definition
GET /workflows — List all workflows
GET /workflows/:id — Get workflow details
PUT /workflows/:id — Update workflow
POST /workflows/:id/run — Start workflow for a client
GET /workflow-runs — List all workflow runs
GET /workflow-runs/:id — Get workflow run status
POST /workflow-runs/:id/pause — Pause running workflow
POST /workflow-runs/:id/cancel — Cancel workflow
```

#### **Agents**
```
GET /agents — List all available agents
GET /agents/:name — Get agent details (brain, skills, model)
GET /agents/:name/executions — Get execution history
```

#### **Analytics**
```
GET /analytics/dashboard — Overview metrics
GET /analytics/clients/:id — Client-specific metrics
GET /analytics/costs — Cost breakdown by client, agent, time period
GET /analytics/performance — Agent performance metrics
```

**Implementation:**

Create route handlers in `app/api/`:
- `clients.py` — Client CRUD
- `tasks.py` — Task CRUD
- `workflows.py` — Workflow CRUD and execution
- `deliverables.py` — Deliverable CRUD and approval
- `agents.py` — Agent registry and execution history
- `analytics.py` — Metrics and reporting
- `auth.py` — Authentication and authorization

**Authentication:**

Use JWT tokens:
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = get_user_by_id(user_id)
    if user is None:
        raise credentials_exception
    return user
```

**Deliverable:** Fully functional REST API with authentication

**Hand to Claude Code:**
> "Implement all API endpoints listed above. Use FastAPI with SQLAlchemy for database operations. Implement JWT authentication. Add input validation with Pydantic. Test all endpoints with `pytest`. Document API with OpenAPI/Swagger (auto-generated by FastAPI)."

---

### **PHASE 3: Agent Runner (Week 3)**

**Objective:** Build system to execute agents with existing brains

**Agent Runner Architecture:**

```python
# app/agents/runner.py

import os
import json
from anthropic import Anthropic
from app.models import Task, AgentExecution
from app.agents.loader import load_agent_brain
from app.utils.llm import call_llm_with_fallback
from app.utils.memory import load_client_memory

def execute_task(task_id: int):
    """
    Execute a task by spawning the appropriate agent.
    
    Steps:
    1. Load task from database
    2. Load agent brain (AGENTS.md, SOUL.md, skills)
    3. Load client memory
    4. Construct prompt
    5. Call LLM API (with fallback)
    6. Parse response
    7. Save deliverable
    8. Update task status
    9. Track cost
    """
    
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise ValueError(f"Task {task_id} not found")
    
    # Update status
    task.status = "in_progress"
    task.started_at = datetime.now()
    db.commit()
    
    try:
        # Load agent brain
        brain = load_agent_brain(task.agent)
        
        # Load client memory
        client_memory = load_client_memory(task.client_id)
        
        # Load task template (skill file)
        task_template = load_task_template(task.agent, task.task_type)
        
        # Construct prompt
        prompt = construct_prompt(
            brain=brain,
            memory=client_memory,
            template=task_template,
            inputs=task.inputs
        )
        
        # Call LLM API (with fallback to OpenRouter if Claude fails)
        response = call_llm_with_fallback(
            model=brain["model"],
            prompt=prompt,
            fallback_models=brain.get("fallback_models", [])
        )
        
        # Parse response
        deliverable = parse_response(response, task.task_type)
        
        # Save deliverable
        deliverable_record = save_deliverable(
            client_id=task.client_id,
            task_id=task.id,
            agent=task.agent,
            deliverable_type=task.task_type,
            content=deliverable["content"],
            summary=deliverable.get("summary")
        )
        
        # Update task
        task.status = "needs_review" if not is_auto_approved(task) else "completed"
        task.completed_at = datetime.now()
        task.outputs = {"deliverable_id": deliverable_record.id}
        task.model_used = response.model
        task.tokens_used = response.usage.total_tokens
        task.cost_usd = calculate_cost(response.usage, response.model)
        
        # Track execution
        track_agent_execution(
            task_id=task.id,
            agent=task.agent,
            model=response.model,
            tokens=response.usage.total_tokens,
            cost=task.cost_usd,
            duration=(datetime.now() - task.started_at).total_seconds(),
            success=True
        )
        
        db.commit()
        
        # Trigger next step in workflow if applicable
        check_and_spawn_next_step(task)
        
        return deliverable_record
        
    except Exception as e:
        # Mark task as failed
        task.status = "failed"
        task.error_message = str(e)
        task.retries += 1
        
        # Track failed execution
        track_agent_execution(
            task_id=task.id,
            agent=task.agent,
            model=None,
            tokens=0,
            cost=0,
            duration=(datetime.now() - task.started_at).total_seconds(),
            success=False,
            error_message=str(e)
        )
        
        db.commit()
        
        # Retry if under retry limit
        if task.retries < 3:
            schedule_retry(task)
        
        raise


def load_agent_brain(agent_name: str):
    """
    Load agent brain files (AGENTS.md, SOUL.md, IDENTITY.md, etc.)
    """
    agent_dir = f"agents/{agent_name}"
    
    brain = {
        "name": agent_name,
        "agents_md": read_file(f"{agent_dir}/AGENTS.md"),
        "soul_md": read_file(f"{agent_dir}/SOUL.md"),
        "identity_md": read_file(f"{agent_dir}/IDENTITY.md"),
        "tools_md": read_file(f"{agent_dir}/TOOLS.md"),
        "model": get_default_model(agent_name),
        "fallback_models": get_fallback_models(agent_name)
    }
    
    return brain


def load_task_template(agent_name: str, task_type: str):
    """
    Load skill file for specific task type.
    
    Example: agents/silas/skills/audit.md
    """
    template_path = f"agents/{agent_name}/skills/{task_type}.md"
    if os.path.exists(template_path):
        return read_file(template_path)
    else:
        raise FileNotFoundError(f"No skill template found for {agent_name}/{task_type}")


def construct_prompt(brain, memory, template, inputs):
    """
    Construct full prompt for LLM.
    
    Structure:
    1. Agent brain (AGENTS.md, SOUL.md, etc.)
    2. Client memory
    3. Task template (skill)
    4. Inputs (task-specific data)
    """
    
    prompt_parts = [
        "# AGENT BRAIN",
        brain["agents_md"],
        "",
        "# AGENT SOUL",
        brain["soul_md"],
        "",
        "# CLIENT CONTEXT",
        memory,
        "",
        "# TASK INSTRUCTIONS",
        template,
        "",
        "# TASK INPUTS",
        json.dumps(inputs, indent=2)
    ]
    
    return "\n".join(prompt_parts)


def parse_response(response, task_type):
    """
    Parse LLM response into structured deliverable.
    
    Different task types may have different parsing logic.
    """
    
    content = response.content[0].text if isinstance(response.content, list) else response.content
    
    # Extract summary (first paragraph or ## Summary section)
    summary = extract_summary(content)
    
    return {
        "content": content,
        "summary": summary
    }


def is_auto_approved(task):
    """
    Check if task should be auto-approved based on client settings.
    """
    client = db.query(Client).filter(Client.id == task.client_id).first()
    
    auto_approve_map = {
        "content-brief": client.auto_approve_content,
        "gbp-post": client.auto_approve_gbp_posts,
        "citation-audit": client.auto_approve_citations
    }
    
    return auto_approve_map.get(task.task_type, False)
```

**LLM API with Fallback:**

```python
# app/utils/llm.py

from anthropic import Anthropic
import httpx

def call_llm_with_fallback(model: str, prompt: str, fallback_models: list):
    """
    Call LLM API with automatic fallback to alternative models.
    
    Try:
    1. Primary model (e.g., claude-sonnet-4-5)
    2. Fallback 1 (e.g., openrouter/gpt-4o)
    3. Fallback 2 (e.g., openrouter/gemini-2.0-pro)
    """
    
    models_to_try = [model] + fallback_models
    
    for m in models_to_try:
        try:
            if m.startswith("openrouter/"):
                return call_openrouter(m.replace("openrouter/", ""), prompt)
            else:
                return call_anthropic(m, prompt)
        except Exception as e:
            if e.status_code in [403, 429, 503]:
                # Rate limit, ban, or service unavailable → try next model
                continue
            else:
                raise
    
    raise Exception(f"All models failed for task")


def call_anthropic(model: str, prompt: str):
    client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    response = client.messages.create(
        model=model,
        max_tokens=8192,
        messages=[{"role": "user", "content": prompt}]
    )
    return response


def call_openrouter(model: str, prompt: str):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
        "HTTP-Referer": "https://localcatalyst.ai",
        "X-Title": "LocalCatalyst SEO Platform"
    }
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}]
    }
    
    response = httpx.post(url, json=payload, headers=headers, timeout=60)
    response.raise_for_status()
    data = response.json()
    
    # Convert OpenRouter response to Anthropic-like format
    class Response:
        def __init__(self, data):
            self.content = data["choices"][0]["message"]["content"]
            self.model = data["model"]
            self.usage = type('obj', (object,), {
                'total_tokens': data["usage"]["total_tokens"],
                'prompt_tokens': data["usage"]["prompt_tokens"],
                'completion_tokens': data["usage"]["completion_tokens"]
            })()
    
    return Response(data)


def calculate_cost(usage, model):
    """
    Calculate cost in USD based on token usage and model.
    """
    
    pricing = {
        "claude-opus-4-5": {"input": 75, "output": 15},
        "claude-sonnet-4-5": {"input": 15, "output": 3},
        "claude-haiku-4-5": {"input": 1.5, "output": 0.8},
        "gpt-4o": {"input": 5, "output": 15},
        "gpt-4o-mini": {"input": 0.3, "output": 0.6},
        "gemini-2.0-pro": {"input": 1.25, "output": 5}
    }
    
    rates = pricing.get(model, {"input": 15, "output": 3})  # Default to Sonnet pricing
    
    input_cost = (usage.prompt_tokens / 1_000_000) * rates["input"]
    output_cost = (usage.completion_tokens / 1_000_000) * rates["output"]
    
    return round(input_cost + output_cost, 4)
```

**Background Task Runner:**

Use Celery for async task execution:

```python
# app/workers/task_worker.py

from celery import Celery
from app.agents.runner import execute_task

celery = Celery("localcatalyst", broker="redis://localhost:6379/0")

@celery.task
def run_agent_task(task_id: int):
    """
    Background worker to execute agent tasks.
    """
    execute_task(task_id)
```

**Task Polling Loop:**

```python
# app/workers/task_scheduler.py

import time
from app.models import Task

def task_scheduler_loop():
    """
    Poll for pending tasks and spawn background workers.
    """
    while True:
        pending_tasks = db.query(Task).filter(
            Task.status == "pending",
            # Only tasks with no dependencies or dependencies already completed
            (Task.depends_on == None) | (Task.depends_on.in_(
                db.query(Task.id).filter(Task.status == "completed")
            ))
        ).order_by(Task.priority.desc(), Task.created_at.asc()).limit(10).all()
        
        for task in pending_tasks:
            # Spawn background worker
            run_agent_task.delay(task.id)
        
        time.sleep(30)  # Poll every 30 seconds
```

**Deliverable:** Agent runner that executes tasks using existing agent brains

**Hand to Claude Code:**
> "Implement the agent runner system. Create `app/agents/runner.py` with `execute_task()` function. Implement `load_agent_brain()` to read agent brain files from `agents/` directory. Implement `call_llm_with_fallback()` with Anthropic + OpenRouter support. Set up Celery for background task execution. Create task scheduler loop. Test by manually creating a task and verifying it executes."

---

### **PHASE 4: Workflow Engine (Week 4)**

**Objective:** Build system to orchestrate multi-step SEO processes

**Workflow Definition Format:**

```yaml
# workflows/onboarding.yaml

name: onboarding
description: Full client onboarding workflow (audit → content → GBP → tracking)

steps:
  - id: audit
    agent: silas
    task_type: audit
    inputs:
      website: "{{client.website}}"
    auto_approve: false  # Human review required
    
  - id: competitive_analysis
    agent: scout
    task_type: competitive-analysis
    inputs:
      website: "{{client.website}}"
      competitors: "{{client.competitors}}"
    depends_on: null  # Can run in parallel with audit
    auto_approve: true  # Auto-approve
    
  - id: content_strategy
    agent: scribe
    task_type: content-brief
    inputs:
      audit_results: "{{audit.outputs.deliverable_id}}"
      competitive_analysis: "{{competitive_analysis.outputs.deliverable_id}}"
    depends_on: [audit, competitive_analysis]
    auto_approve: false
    
  - id: gbp_posts
    agent: herald
    task_type: gbp-posts
    inputs:
      content_strategy: "{{content_strategy.outputs.deliverable_id}}"
      count: 4
    depends_on: content_strategy
    auto_approve: false
    
  - id: citation_audit
    agent: citadel
    task_type: citation-audit
    inputs:
      business_name: "{{client.name}}"
      address: "{{client.location}}"
      phone: "{{client.contact_phone}}"
    depends_on: audit
    auto_approve: true
    
  - id: rank_tracking_setup
    agent: lookout
    task_type: setup-tracking
    inputs:
      website: "{{client.website}}"
      keywords: "{{content_strategy.outputs.keywords}}"
    depends_on: content_strategy
    auto_approve: true
    
  - id: technical_seo_setup
    agent: specs
    task_type: technical-setup
    inputs:
      audit_results: "{{audit.outputs.deliverable_id}}"
      website: "{{client.website}}"
    depends_on: audit
    auto_approve: true
    
  - id: onboarding_summary
    agent: archer
    task_type: summary-report
    inputs:
      deliverables: [
        "{{audit.outputs.deliverable_id}}",
        "{{content_strategy.outputs.deliverable_id}}",
        "{{gbp_posts.outputs.deliverable_id}}",
        "{{citation_audit.outputs.deliverable_id}}"
      ]
    depends_on: [audit, content_strategy, gbp_posts, citation_audit]
    auto_approve: false
```

**Workflow Engine:**

```python
# app/workflows/engine.py

import yaml
from app.models import Workflow, WorkflowRun, Task, Client
from datetime import datetime

def load_workflow_definition(workflow_name: str):
    """
    Load workflow definition from YAML file.
    """
    with open(f"workflows/{workflow_name}.yaml", "r") as f:
        return yaml.safe_load(f)


def start_workflow(workflow_id: int, client_id: int):
    """
    Start a workflow for a client.
    
    Steps:
    1. Load workflow definition
    2. Create workflow_run record
    3. Create tasks for all steps
    4. Set up dependencies
    """
    
    workflow = db.query(Workflow).filter(Workflow.id == workflow_id).first()
    if not workflow:
        raise ValueError(f"Workflow {workflow_id} not found")
    
    client = db.query(Client).filter(Client.id == client_id).first()
    if not client:
        raise ValueError(f"Client {client_id} not found")
    
    definition = workflow.definition
    
    # Create workflow run
    run = WorkflowRun(
        workflow_id=workflow_id,
        client_id=client_id,
        status="running",
        total_steps=len(definition["steps"]),
        started_at=datetime.now()
    )
    db.add(run)
    db.commit()
    
    # Create tasks for all steps
    step_task_ids = {}
    for step in definition["steps"]:
        # Resolve inputs from client data or previous step outputs
        inputs = resolve_inputs(step["inputs"], client, step_task_ids)
        
        # Determine dependencies
        depends_on = None
        if step.get("depends_on"):
            if isinstance(step["depends_on"], list):
                # Wait for all dependencies
                depends_on = [step_task_ids[dep] for dep in step["depends_on"]]
            else:
                depends_on = step_task_ids[step["depends_on"]]
        
        # Create task
        task = Task(
            client_id=client_id,
            agent=step["agent"],
            task_type=step["task_type"],
            inputs=inputs,
            depends_on=depends_on[0] if isinstance(depends_on, list) and len(depends_on) == 1 else depends_on,
            workflow_run_id=run.id,
            status="pending"
        )
        db.add(task)
        db.commit()
        
        step_task_ids[step["id"]] = task.id
    
    return run


def resolve_inputs(input_template: dict, client: Client, step_task_ids: dict):
    """
    Resolve input template variables with actual values.
    
    Supports:
    - {{client.field}} → client data
    - {{step_id.outputs.field}} → output from previous step
    """
    
    resolved = {}
    for key, value in input_template.items():
        if isinstance(value, str) and value.startswith("{{") and value.endswith("}}"):
            # Template variable
            var = value[2:-2].strip()
            
            if var.startswith("client."):
                # Client data
                field = var.split(".")[1]
                resolved[key] = getattr(client, field)
            
            elif "." in var and var.split(".")[0] in step_task_ids:
                # Previous step output
                step_id = var.split(".")[0]
                task_id = step_task_ids[step_id]
                task = db.query(Task).filter(Task.id == task_id).first()
                
                # Wait for task to complete
                if task.status != "completed":
                    raise ValueError(f"Cannot resolve {var}: task {task_id} not completed")
                
                # Extract output field
                output_path = var.split(".")[1:]  # ["outputs", "deliverable_id"]
                output_value = task.outputs
                for field in output_path:
                    output_value = output_value.get(field)
                
                resolved[key] = output_value
            else:
                resolved[key] = value
        else:
            resolved[key] = value
    
    return resolved


def check_and_spawn_next_step(completed_task: Task):
    """
    When a task completes, check if any dependent tasks can now start.
    """
    
    # Find tasks waiting for this task
    dependent_tasks = db.query(Task).filter(
        Task.depends_on == completed_task.id,
        Task.status == "pending"
    ).all()
    
    for task in dependent_tasks:
        # Check if all dependencies are completed
        if task.depends_on and not is_dependency_met(task):
            continue  # Wait for other dependencies
        
        # Spawn task (will be picked up by task scheduler)
        task.status = "pending"
        db.commit()
    
    # Check if workflow is complete
    run = db.query(WorkflowRun).filter(WorkflowRun.id == completed_task.workflow_run_id).first()
    if run:
        remaining_tasks = db.query(Task).filter(
            Task.workflow_run_id == run.id,
            Task.status.in_(["pending", "in_progress"])
        ).count()
        
        if remaining_tasks == 0:
            # Workflow complete
            run.status = "completed"
            run.completed_at = datetime.now()
            db.commit()
            
            # Send notification
            send_workflow_complete_notification(run)


def is_dependency_met(task: Task):
    """
    Check if all dependencies for a task are completed.
    """
    if not task.depends_on:
        return True
    
    dependencies = task.depends_on if isinstance(task.depends_on, list) else [task.depends_on]
    
    for dep_id in dependencies:
        dep_task = db.query(Task).filter(Task.id == dep_id).first()
        if dep_task.status != "completed":
            return False
    
    return True
```

**Workflow Scheduler:**

```python
# app/workflows/scheduler.py

import schedule
import time
from app.workflows.engine import start_workflow

def schedule_recurring_workflows():
    """
    Set up scheduled workflows (e.g., monthly reports, content pipeline).
    """
    
    # Monthly reports (1st of every month)
    schedule.every().month.at("09:00").do(run_monthly_reports)
    
    # Content pipeline (every Monday)
    schedule.every().monday.at("08:00").do(run_content_pipeline)
    
    # Rank tracking updates (every Sunday)
    schedule.every().sunday.at("18:00").do(run_rank_updates)
    
    while True:
        schedule.run_pending()
        time.sleep(3600)  # Check every hour


def run_monthly_reports():
    """
    Trigger monthly report workflow for all active clients.
    """
    clients = db.query(Client).filter(Client.status == "active").all()
    monthly_report_workflow = db.query(Workflow).filter(Workflow.name == "monthly-report").first()
    
    for client in clients:
        start_workflow(monthly_report_workflow.id, client.id)


def run_content_pipeline():
    """
    Trigger content pipeline workflow for retainer clients.
    """
    clients = db.query(Client).filter(
        Client.status == "active",
        Client.services.contains(["content"])
    ).all()
    content_workflow = db.query(Workflow).filter(Workflow.name == "content-pipeline").first()
    
    for client in clients:
        start_workflow(content_workflow.id, client.id)
```

**Deliverable:** Workflow engine that orchestrates multi-step processes

**Hand to Claude Code:**
> "Implement workflow engine. Create `app/workflows/engine.py` with functions to load YAML workflow definitions, create tasks for all steps, resolve dependencies, and spawn next steps when tasks complete. Implement `app/workflows/scheduler.py` for recurring workflows. Create 3 workflow definitions: onboarding, content-pipeline, monthly-report. Test by starting onboarding workflow for a test client."

---

### **PHASE 5: Admin Dashboard (Week 5-6)**

**Objective:** Build web UI for managing clients, tasks, workflows

**Tech Stack:**
- React + TypeScript
- Tailwind CSS for styling
- React Query for data fetching
- React Router for navigation
- Chart.js for analytics graphs

**Pages:**

#### **1. Dashboard (Homepage)**
```typescript
// src/pages/Dashboard.tsx

import { useQuery } from 'react-query';
import { api } from '../api/client';

export default function Dashboard() {
  const { data: stats } = useQuery('dashboard-stats', () => api.get('/analytics/dashboard'));
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">LocalCatalyst Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Active Clients" 
          value={stats?.active_clients || 0} 
          icon="👥"
        />
        <MetricCard 
          title="Pending Tasks" 
          value={stats?.pending_tasks || 0} 
          icon="📋"
        />
        <MetricCard 
          title="Cost This Month" 
          value={`$${stats?.monthly_cost || 0}`} 
          icon="💰"
        />
        <MetricCard 
          title="MRR" 
          value={`$${stats?.mrr || 0}`} 
          icon="📈"
        />
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-6">
        <RecentTasks />
        <RecentDeliverables />
      </div>
    </div>
  );
}
```

#### **2. Clients List**
```typescript
// src/pages/Clients.tsx

export default function Clients() {
  const { data: clients } = useQuery('clients', () => api.get('/clients'));
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Clients</h1>
        <button 
          onClick={() => navigate('/clients/new')}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          + Add Client
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="border rounded px-4 py-2">
          <option>All Status</option>
          <option>Active</option>
          <option>Onboarding</option>
          <option>Paused</option>
          <option>Churned</option>
        </select>
        <select className="border rounded px-4 py-2">
          <option>All Tiers</option>
          <option>Basic</option>
          <option>Standard</option>
          <option>Premium</option>
        </select>
        <input 
          type="search" 
          placeholder="Search clients..." 
          className="border rounded px-4 py-2 flex-1"
        />
      </div>
      
      {/* Clients Table */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">Client</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Services</th>
            <th className="px-6 py-3 text-left">MRR</th>
            <th className="px-6 py-3 text-left">Cost</th>
            <th className="px-6 py-3 text-left">Margin</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients?.map(client => (
            <tr key={client.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="font-medium">{client.name}</div>
                <div className="text-sm text-gray-500">{client.website}</div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={client.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  {client.services.map(s => (
                    <span key={s} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">${client.monthly_rate}</td>
              <td className="px-6 py-4">${client.monthly_cost}</td>
              <td className="px-6 py-4">
                <span className={client.margin > 50 ? 'text-green-600' : 'text-red-600'}>
                  {client.margin}%
                </span>
              </td>
              <td className="px-6 py-4">
                <button 
                  onClick={() => navigate(`/clients/${client.id}`)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

#### **3. Client Detail Page**
```typescript
// src/pages/ClientDetail.tsx

export default function ClientDetail({ clientId }: { clientId: number }) {
  const { data: client } = useQuery(['client', clientId], () => api.get(`/clients/${clientId}`));
  const { data: tasks } = useQuery(['client-tasks', clientId], () => api.get(`/clients/${clientId}/tasks`));
  const { data: deliverables } = useQuery(['client-deliverables', clientId], () => api.get(`/clients/${clientId}/deliverables`));
  
  return (
    <div className="p-8">
      {/* Client Header */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{client?.name}</h1>
            <p className="text-gray-600">{client?.website}</p>
            <StatusBadge status={client?.status} className="mt-2" />
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              ▶️ Run Workflow
            </button>
            <button className="border px-4 py-2 rounded">
              ⚙️ Settings
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <StatCard label="MRR" value={`$${client?.monthly_rate}`} />
          <StatCard label="Cost (30d)" value={`$${client?.monthly_cost}`} />
          <StatCard label="Margin" value={`${client?.margin}%`} />
          <StatCard label="Pending Tasks" value={tasks?.filter(t => t.status === 'pending').length || 0} />
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs>
        <Tab label="Tasks">
          <TasksList tasks={tasks} />
        </Tab>
        <Tab label="Deliverables">
          <DeliverablesList deliverables={deliverables} />
        </Tab>
        <Tab label="Analytics">
          <ClientAnalytics clientId={clientId} />
        </Tab>
        <Tab label="Settings">
          <ClientSettings client={client} />
        </Tab>
      </Tabs>
    </div>
  );
}
```

#### **4. Tasks Page**
```typescript
// src/pages/Tasks.tsx

export default function Tasks() {
  const { data: tasks } = useQuery('tasks', () => api.get('/tasks'));
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">All Tasks</h1>
      
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="border rounded px-4 py-2">
          <option>All Status</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Failed</option>
          <option>Needs Review</option>
        </select>
        <select className="border rounded px-4 py-2">
          <option>All Agents</option>
          <option>Silas</option>
          <option>Scribe</option>
          <option>Herald</option>
          {/* ... */}
        </select>
        <select className="border rounded px-4 py-2">
          <option>All Priority</option>
          <option>Urgent</option>
          <option>High</option>
          <option>Normal</option>
          <option>Low</option>
        </select>
      </div>
      
      {/* Tasks Table */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">Client</th>
            <th className="px-6 py-3 text-left">Agent</th>
            <th className="px-6 py-3 text-left">Task</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Priority</th>
            <th className="px-6 py-3 text-left">Created</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map(task => (
            <tr key={task.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-4">{task.client.name}</td>
              <td className="px-6 py-4">
                <AgentBadge agent={task.agent} />
              </td>
              <td className="px-6 py-4">{task.task_type}</td>
              <td className="px-6 py-4">
                <StatusBadge status={task.status} />
              </td>
              <td className="px-6 py-4">
                <PriorityBadge priority={task.priority} />
              </td>
              <td className="px-6 py-4">{formatDate(task.created_at)}</td>
              <td className="px-6 py-4">
                {task.status === 'failed' && (
                  <button onClick={() => retryTask(task.id)} className="text-blue-600">
                    🔄 Retry
                  </button>
                )}
                {task.status === 'needs_review' && (
                  <button onClick={() => reviewTask(task.id)} className="text-green-600">
                    ✅ Review
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

#### **5. Deliverables Review Page**
```typescript
// src/pages/Deliverables.tsx

export default function Deliverables() {
  const { data: deliverables } = useQuery('deliverables', () => 
    api.get('/deliverables?status=needs_review')
  );
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Deliverables Review</h1>
      
      {/* Pending Review Count */}
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
        <p className="text-yellow-800">
          ⚠️ {deliverables?.length || 0} deliverables need your review before sending to clients
        </p>
      </div>
      
      {/* Deliverables Grid */}
      <div className="grid gap-6">
        {deliverables?.map(deliverable => (
          <DeliverableCard 
            key={deliverable.id}
            deliverable={deliverable}
            onApprove={() => approveDeliverable(deliverable.id)}
            onReject={() => rejectDeliverable(deliverable.id)}
          />
        ))}
      </div>
    </div>
  );
}

function DeliverableCard({ deliverable, onApprove, onReject }) {
  return (
    <div className="bg-white shadow rounded p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{deliverable.title}</h3>
          <p className="text-gray-600">
            {deliverable.client.name} • {deliverable.agent} • {deliverable.deliverable_type}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onApprove}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            ✅ Approve & Send
          </button>
          <button 
            onClick={onReject}
            className="border px-4 py-2 rounded"
          >
            ❌ Reject
          </button>
        </div>
      </div>
      
      {/* Deliverable Preview */}
      <div className="border rounded p-4 bg-gray-50 max-h-96 overflow-y-auto">
        <ReactMarkdown>{deliverable.content}</ReactMarkdown>
      </div>
    </div>
  );
}
```

#### **6. Analytics Page**
```typescript
// src/pages/Analytics.tsx

export default function Analytics() {
  const { data: costData } = useQuery('analytics-cost', () => api.get('/analytics/costs'));
  const { data: performanceData } = useQuery('analytics-performance', () => api.get('/analytics/performance'));
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      
      {/* Cost Breakdown */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Cost Analysis</h2>
        <Line 
          data={costData?.chart_data}
          options={{
            scales: {
              y: { beginAtZero: true }
            }
          }}
        />
        
        {/* Cost by Client Table */}
        <table className="w-full mt-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Client</th>
              <th className="text-left py-2">API Cost (30d)</th>
              <th className="text-left py-2">MRR</th>
              <th className="text-left py-2">Margin</th>
            </tr>
          </thead>
          <tbody>
            {costData?.by_client.map(row => (
              <tr key={row.client_id} className="border-b">
                <td className="py-2">{row.client_name}</td>
                <td className="py-2">${row.cost}</td>
                <td className="py-2">${row.mrr}</td>
                <td className="py-2">
                  <span className={row.margin > 50 ? 'text-green-600' : 'text-red-600'}>
                    {row.margin}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Agent Performance */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Agent Performance</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Agent</th>
              <th className="text-left py-2">Tasks (30d)</th>
              <th className="text-left py-2">Success Rate</th>
              <th className="text-left py-2">Avg Duration</th>
              <th className="text-left py-2">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {performanceData?.by_agent.map(agent => (
              <tr key={agent.name} className="border-b">
                <td className="py-2">{agent.name}</td>
                <td className="py-2">{agent.tasks_completed}</td>
                <td className="py-2">{agent.success_rate}%</td>
                <td className="py-2">{agent.avg_duration}s</td>
                <td className="py-2">${agent.total_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

**Deliverable:** Fully functional admin dashboard for managing operations

**Hand to Claude Code:**
> "Build React admin dashboard with the pages above. Use Tailwind CSS for styling. Implement React Query for data fetching. Create reusable components (MetricCard, StatusBadge, AgentBadge, etc.). Add authentication (JWT stored in localStorage). Deploy to Vercel or Netlify. Connect to backend API."

---

### **PHASE 6: Client Portal (Week 7)**

**Objective:** Build customer-facing portal for clients to view reports, approve content

**Features:**

1. **Login** — Clients log in with email + password
2. **Dashboard** — View recent deliverables, pending approvals, current rankings
3. **Deliverables** — View all reports, content, audits delivered
4. **Approve Content** — Approve blog posts, GBP posts before publishing
5. **Support** — Submit questions/requests
6. **Billing** — View invoices, payment history

**Pages:**

#### **Client Dashboard**
```typescript
// src/pages/client-portal/Dashboard.tsx

export default function ClientDashboard() {
  const { user } = useAuth(); // user.client_id
  const { data: client } = useQuery(['client', user.client_id], () => 
    api.get(`/clients/${user.client_id}`)
  );
  const { data: recentDeliverables } = useQuery(['recent-deliverables', user.client_id], () =>
    api.get(`/clients/${user.client_id}/deliverables?limit=5`)
  );
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {client?.name}</h1>
      
      {/* Pending Approvals Alert */}
      {client?.pending_approvals > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
          <p className="text-blue-800">
            📋 You have {client.pending_approvals} items waiting for your approval
          </p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
            Review Now
          </button>
        </div>
      )}
      
      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <MetricCard 
          title="Deliverables This Month" 
          value={client?.deliverables_this_month || 0} 
        />
        <MetricCard 
          title="Keywords Tracked" 
          value={client?.keywords_tracked || 0} 
        />
        <MetricCard 
          title="Avg. Ranking Change" 
          value={`+${client?.avg_ranking_change || 0}`} 
          trend="up"
        />
      </div>
      
      {/* Recent Deliverables */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Recent Deliverables</h2>
        <div className="space-y-4">
          {recentDeliverables?.map(d => (
            <DeliverableSummary key={d.id} deliverable={d} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

#### **Approvals Page**
```typescript
// src/pages/client-portal/Approvals.tsx

export default function Approvals() {
  const { user } = useAuth();
  const { data: pendingApprovals } = useQuery(['approvals', user.client_id], () =>
    api.get(`/clients/${user.client_id}/deliverables?status=needs_client_approval`)
  );
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Pending Approvals</h1>
      
      {pendingApprovals?.length === 0 ? (
        <div className="bg-gray-50 border rounded p-8 text-center">
          <p className="text-gray-600">✅ No pending approvals — you're all caught up!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {pendingApprovals?.map(item => (
            <ApprovalCard 
              key={item.id}
              item={item}
              onApprove={() => approveItem(item.id)}
              onRequestChanges={(feedback) => requestChanges(item.id, feedback)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

**Auto-Send Approved Deliverables:**

When client approves content, automatically publish it (for blog posts) or schedule it (for GBP posts):

```python
# app/api/deliverables.py

@app.post("/deliverables/{deliverable_id}/client-approve")
def client_approve_deliverable(deliverable_id: int, user: User = Depends(get_current_user)):
    deliverable = db.query(Deliverable).filter(Deliverable.id == deliverable_id).first()
    
    # Verify user is authorized (belongs to this client)
    if user.client_id != deliverable.client_id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Mark as approved
    deliverable.status = "approved"
    deliverable.reviewed_at = datetime.now()
    deliverable.reviewed_by = user.email
    db.commit()
    
    # Auto-publish if applicable
    if deliverable.deliverable_type == "blog-post":
        # Trigger Wrench to publish to WordPress
        publish_task = Task(
            client_id=deliverable.client_id,
            agent="wrench",
            task_type="publish-blog-post",
            inputs={"deliverable_id": deliverable.id},
            priority=3  # High priority
        )
        db.add(publish_task)
        db.commit()
    
    elif deliverable.deliverable_type == "gbp-post":
        # Trigger Herald to post to GBP
        publish_task = Task(
            client_id=deliverable.client_id,
            agent="herald",
            task_type="publish-gbp-post",
            inputs={"deliverable_id": deliverable.id},
            priority=3
        )
        db.add(publish_task)
        db.commit()
    
    return {"message": "Approved and queued for publishing"}
```

**Deliverable:** Client-facing portal with approval workflows

**Hand to Claude Code:**
> "Build client portal with pages above. Use separate authentication from admin (clients can only see their own data). Add approval workflow (approve/request changes). Implement auto-publishing when client approves content. Style with Tailwind CSS. Deploy as subdomain (client.localcatalyst.ai)."

---

### **PHASE 7: Automation Enhancements (Week 8)**

**Objective:** Add advanced automation features to minimize human involvement

#### **7.1: Automated Lead Qualification**

**Goal:** Automatically qualify inbound leads and create client records

```python
# app/automation/lead_qualification.py

def qualify_lead(lead_data: dict):
    """
    Automatically qualify lead from contact form submission.
    
    Criteria:
    - Website exists and is live
    - Business has Google Business Profile
    - Budget matches minimum tier
    - Industry is in supported list
    """
    
    # Check website
    website_check = check_website_exists(lead_data["website"])
    if not website_check["exists"]:
        return {
            "qualified": False,
            "reason": "Website not accessible",
            "action": "email_template_website_fix"
        }
    
    # Check GBP
    gbp_check = check_gbp_exists(lead_data["business_name"], lead_data["location"])
    if not gbp_check["exists"]:
        return {
            "qualified": False,
            "reason": "No Google Business Profile found",
            "action": "email_template_gbp_setup"
        }
    
    # Check budget
    if lead_data["budget"] < 1000:  # Minimum $1k/month
        return {
            "qualified": False,
            "reason": "Budget below minimum",
            "action": "email_template_budget_mismatch"
        }
    
    # All checks passed
    return {
        "qualified": True,
        "recommended_tier": recommend_tier(lead_data),
        "action": "create_client_and_send_proposal"
    }

# Webhook endpoint for form submissions
@app.post("/webhooks/new-lead")
def handle_new_lead(lead_data: dict):
    result = qualify_lead(lead_data)
    
    if result["qualified"]:
        # Create client record (status = "prospect")
        client = Client(
            name=lead_data["business_name"],
            website=lead_data["website"],
            contact_email=lead_data["email"],
            contact_phone=lead_data["phone"],
            location=lead_data["location"],
            industry=lead_data["industry"],
            status="prospect",
            billing_tier=result["recommended_tier"]
        )
        db.add(client)
        db.commit()
        
        # Send automated proposal
        send_proposal_email(client)
    else:
        # Send rejection/education email
        send_email_template(lead_data["email"], result["action"])
```

#### **7.2: Automated Onboarding**

**Goal:** When client signs contract, auto-trigger onboarding workflow

```python
# app/automation/onboarding.py

@app.post("/webhooks/contract-signed")
def handle_contract_signed(data: dict):
    """
    Triggered when client signs contract (from DocuSign, HelloSign, etc.)
    """
    client = db.query(Client).filter(Client.email == data["client_email"]).first()
    
    # Update client status
    client.status = "onboarding"
    client.onboarded_at = datetime.now()
    db.commit()
    
    # Auto-create client memory folder
    create_client_memory_folder(client.id)
    
    # Auto-trigger onboarding workflow
    onboarding_workflow = db.query(Workflow).filter(Workflow.name == "onboarding").first()
    start_workflow(onboarding_workflow.id, client.id)
    
    # Send welcome email
    send_welcome_email(client)
    
    # Notify team in Slack
    send_slack_notification(f"🎉 New client onboarded: {client.name}")
```

#### **7.3: Proactive Quality Monitoring**

**Goal:** Automatically detect quality issues and alert team

```python
# app/automation/quality_monitor.py

def run_quality_checks():
    """
    Run nightly quality checks on all deliverables.
    """
    
    # Check for deliverables stuck in "needs_review" for >3 days
    stale_deliverables = db.query(Deliverable).filter(
        Deliverable.status == "needs_review",
        Deliverable.created_at < datetime.now() - timedelta(days=3)
    ).all()
    
    if stale_deliverables:
        send_slack_alert(
            f"⚠️ {len(stale_deliverables)} deliverables stuck in review for >3 days",
            deliverables=stale_deliverables
        )
    
    # Check for clients with no activity in 14 days
    inactive_clients = db.query(Client).filter(
        Client.status == "active",
        Client.last_activity_at < datetime.now() - timedelta(days=14)
    ).all()
    
    if inactive_clients:
        send_slack_alert(
            f"🔴 {len(inactive_clients)} clients with no activity in 14+ days",
            clients=inactive_clients
        )
    
    # Check for failed tasks that haven't been retried
    failed_tasks = db.query(Task).filter(
        Task.status == "failed",
        Task.retries == 0
    ).all()
    
    if failed_tasks:
        # Auto-retry
        for task in failed_tasks:
            retry_task(task.id)
```

#### **7.4: Automated Reporting**

**Goal:** Auto-generate and send monthly reports without human intervention

```python
# app/automation/reporting.py

def send_monthly_reports():
    """
    Run on 1st of every month: generate and send reports to all active clients.
    """
    active_clients = db.query(Client).filter(Client.status == "active").all()
    
    for client in active_clients:
        # Trigger monthly report workflow
        monthly_report_workflow = db.query(Workflow).filter(Workflow.name == "monthly-report").first()
        start_workflow(monthly_report_workflow.id, client.id)
        
        # Wait for workflow to complete (or set up callback)
        # ...
        
        # Once complete, auto-send to client
        report_deliverable = db.query(Deliverable).filter(
            Deliverable.client_id == client.id,
            Deliverable.deliverable_type == "monthly-report",
            Deliverable.created_at > datetime.now() - timedelta(days=1)
        ).first()
        
        if report_deliverable:
            send_report_email(client, report_deliverable)
```

#### **7.5: Churn Prevention**

**Goal:** Detect churn risk and automatically trigger retention campaigns

```python
# app/automation/churn_prevention.py

def detect_churn_risk():
    """
    Run daily: detect clients at risk of churning.
    
    Risk signals:
    - No logins to client portal in 30 days
    - No approved deliverables in 30 days
    - Negative feedback on recent deliverables
    - Rankings declining for 2+ months
    """
    
    at_risk_clients = []
    
    for client in db.query(Client).filter(Client.status == "active").all():
        risk_score = 0
        
        # Check login activity
        last_login = get_last_client_login(client.id)
        if not last_login or last_login < datetime.now() - timedelta(days=30):
            risk_score += 20
        
        # Check approval activity
        recent_approvals = db.query(Deliverable).filter(
            Deliverable.client_id == client.id,
            Deliverable.status == "approved",
            Deliverable.created_at > datetime.now() - timedelta(days=30)
        ).count()
        if recent_approvals == 0:
            risk_score += 30
        
        # Check feedback
        negative_feedback = db.query(Deliverable).filter(
            Deliverable.client_id == client.id,
            Deliverable.client_feedback.like("%not satisfied%")
        ).count()
        if negative_feedback > 0:
            risk_score += 50
        
        if risk_score >= 40:
            at_risk_clients.append(client)
    
    # Auto-trigger retention actions
    for client in at_risk_clients:
        # Send personalized check-in email
        send_retention_email(client)
        
        # Schedule personal call
        schedule_retention_call(client)
        
        # Alert team in Slack
        send_slack_alert(f"🚨 Churn risk: {client.name} (risk score: {risk_score})")
```

**Deliverable:** Automated lead qualification, onboarding, quality monitoring, reporting, churn prevention

**Hand to Claude Code:**
> "Implement automation enhancements: lead qualification webhook, auto-onboarding trigger, nightly quality checks, automated monthly reports, churn risk detection. Use Celery for scheduled tasks. Add Slack webhook integration for alerts. Test each automation end-to-end."

---

### **PHASE 8: Exit Readiness (Week 9-16)**

**Objective:** Prepare system for sale/exit within 12-24 months

#### **8.1: Documentation (Week 9-10)**

**Create comprehensive docs for buyer:**

1. **System Architecture** — How everything works
2. **API Documentation** — All endpoints with examples
3. **Agent Documentation** — What each agent does, how to modify
4. **Workflow Documentation** — All workflows with step-by-step logic
5. **Runbook** — How to operate the system day-to-day
6. **Troubleshooting Guide** — Common issues and fixes
7. **Onboarding Guide** — How to onboard new team member
8. **Scaling Guide** — How to scale from 50 to 500 clients

**Hand to Claude Code:**
> "Generate comprehensive documentation using Docusaurus or GitBook. Auto-generate API docs from FastAPI OpenAPI spec. Write narrative docs for system architecture, agent system, workflows. Create operator runbook with daily/weekly/monthly checklists. Export as PDF and host on docs subdomain."

#### **8.2: Financial Reporting (Week 11)**

**Build financial dashboard for buyers:**

```python
# app/analytics/financials.py

def calculate_unit_economics():
    """
    Calculate key metrics buyers care about.
    """
    
    # MRR (Monthly Recurring Revenue)
    mrr = db.query(func.sum(Client.monthly_rate)).filter(Client.status == "active").scalar()
    
    # CAC (Customer Acquisition Cost)
    # Track marketing spend + sales time
    cac = calculate_cac()
    
    # LTV (Lifetime Value)
    avg_retention_months = calculate_avg_retention()
    avg_mrr_per_client = mrr / db.query(Client).filter(Client.status == "active").count()
    ltv = avg_mrr_per_client * avg_retention_months
    
    # COGS (Cost of Goods Sold)
    # = API costs + human labor costs
    monthly_api_cost = db.query(func.sum(Task.cost_usd)).filter(
        Task.created_at > datetime.now() - timedelta(days=30)
    ).scalar()
    
    monthly_labor_cost = calculate_labor_cost()  # Hours spent on clients × hourly rate
    
    cogs = monthly_api_cost + monthly_labor_cost
    
    # Gross Margin
    gross_margin = ((mrr - cogs) / mrr) * 100
    
    # Churn Rate
    churned_last_month = db.query(Client).filter(
        Client.churned_at > datetime.now() - timedelta(days=30)
    ).count()
    active_start_of_month = db.query(Client).filter(Client.status == "active").count() + churned_last_month
    churn_rate = (churned_last_month / active_start_of_month) * 100
    
    return {
        "mrr": mrr,
        "arr": mrr * 12,
        "cac": cac,
        "ltv": ltv,
        "ltv_cac_ratio": ltv / cac,
        "cogs": cogs,
        "gross_margin": gross_margin,
        "churn_rate": churn_rate,
        "payback_period": cac / avg_mrr_per_client
    }
```

**Dashboard for buyers:**
- MRR growth chart (last 12 months)
- CAC, LTV, LTV:CAC ratio
- Gross margin by client tier
- Churn rate over time
- Cohort retention analysis

#### **8.3: Reduce Operator Dependency (Week 12-14)**

**Goal:** System should run without you

**Actions:**
1. **Hire VA** — Train them to handle client approvals, basic support
2. **Auto-approve more** — Set thresholds (e.g., auto-approve Silas audits if quality score >90%)
3. **Self-serve client portal** — Clients handle approvals, no human needed
4. **Automated customer support** — Chatbot for FAQs, ticket system for complex issues
5. **Document everything** — Any task you do manually, document how to do it

**Result:** You can go on vacation for 2 weeks and nothing breaks.

#### **8.4: Build Team (Week 15-16)**

**Hire small team to run operations:**
- **Operations Manager** ($60k/year) — Oversees daily operations, client communication
- **SEO Specialist** ($50k/year) — Reviews deliverables, handles escalations
- **Customer Success** ($45k/year) — Onboards clients, handles support

**Why this increases valuation:**
- Buyer doesn't have to find talent (team is already trained)
- System is proven to work with non-founders
- Reduces "key person risk" (business doesn't depend on you)

#### **8.5: Prove Scalability (Week 15-16)**

**Demonstrate system can scale:**
- Onboard 10 clients in one month (without breaking anything)
- Show that cost per client decreases as you scale (economies of scale)
- Document max capacity (e.g., "System can handle 200 clients with current infrastructure")

**Result:** Buyer sees clear growth potential.

---

## 🆕 NEW SKILLS NEEDED (Automation Gaps)

Based on the system design, here are skills we haven't built yet but should:

### **Skill 1: Lead Qualification**
**Agent:** Archer (or new "Sales" agent)  
**Purpose:** Automatically qualify inbound leads from contact forms  
**Inputs:** Lead form data (name, email, website, budget, industry)  
**Outputs:** Qualified (yes/no), recommended tier, next action  
**File:** `agents/archer/skills/lead-qualification.md`

### **Skill 2: Proposal Generation**
**Agent:** Mozi (sales/pricing expert)  
**Purpose:** Generate customized proposals based on client needs  
**Inputs:** Client info, services needed, budget  
**Outputs:** Proposal PDF with pricing, scope, timeline  
**File:** `agents/mozi/skills/proposal-generation.md`

### **Skill 3: Churn Risk Analysis**
**Agent:** Sentinel (monitoring)  
**Purpose:** Analyze client behavior and predict churn risk  
**Inputs:** Login activity, approval rates, feedback, rankings  
**Outputs:** Churn risk score (0-100), recommended retention actions  
**File:** `agents/sentinel/skills/churn-risk-analysis.md`

### **Skill 4: Automated A/B Testing**
**Agent:** Razor (CRO)  
**Purpose:** Design and analyze A/B tests for client websites  
**Inputs:** Page URL, conversion goal, test duration  
**Outputs:** Test plan, statistical analysis, winner recommendation  
**File:** `agents/razor/skills/ab-test-automation.md`

### **Skill 5: Competitive Monitoring**
**Agent:** Scout (research)  
**Purpose:** Monitor competitor rankings, content, backlinks daily  
**Inputs:** Client website, competitor list  
**Outputs:** Daily/weekly competitive intelligence report  
**File:** `agents/scout/skills/competitive-monitoring.md`

### **Skill 6: Auto-Publishing**
**Agent:** Wrench (site optimization)  
**Purpose:** Publish approved content to WordPress without human intervention  
**Inputs:** Deliverable ID, publish date/time  
**Outputs:** Confirmation of published post with URL  
**File:** `agents/wrench/skills/auto-publish.md`

### **Skill 7: GBP Posting**
**Agent:** Herald (GBP operations)  
**Purpose:** Publish GBP posts via Google Business API  
**Inputs:** GBP post content, call-to-action, media  
**Outputs:** Confirmation of published post  
**File:** `agents/herald/skills/gbp-auto-post.md`

### **Skill 8: Citation Submission**
**Agent:** Citadel (citations)  
**Purpose:** Submit business to directories automatically  
**Inputs:** Business NAP, category, description  
**Outputs:** List of submissions with status  
**File:** `agents/citadel/skills/auto-citation-submit.md`

### **Skill 9: Rank Tracking**
**Agent:** Lookout (monitoring)  
**Purpose:** Check rankings daily and alert on significant changes  
**Inputs:** Website, keyword list  
**Outputs:** Rankings with change indicators, anomaly alerts  
**File:** `agents/lookout/skills/daily-rank-check.md`

### **Skill 10: Monthly Report Generation**
**Agent:** Archer (orchestrator)  
**Purpose:** Compile all metrics into client-facing report  
**Inputs:** Rankings, traffic, deliverables, cost data  
**Outputs:** Branded PDF report with insights  
**File:** `agents/archer/skills/monthly-report.md`

### **Skill 11: Client Feedback Analysis**
**Agent:** Mozi (advisor)  
**Purpose:** Analyze client feedback and suggest improvements  
**Inputs:** Feedback text, sentiment, context  
**Outputs:** Action items, priority level, owner  
**File:** `agents/mozi/skills/feedback-analysis.md`

### **Skill 12: Cost Optimization**
**Agent:** Ledger (cost tracking)  
**Purpose:** Analyze API usage and suggest cost savings  
**Inputs:** Task logs, agent usage, model usage  
**Outputs:** Optimization recommendations, projected savings  
**File:** `agents/ledger/skills/cost-optimization.md`

---

## 🎯 EXIT READINESS CHECKLIST

**Use this checklist to ensure system is sale-ready:**

### **Product Readiness**
- [ ] System runs 24/7 without downtime
- [ ] All workflows fully automated (no manual steps)
- [ ] Client portal allows self-service (approvals, support)
- [ ] Admin dashboard shows all key metrics
- [ ] Financial dashboard tracks unit economics
- [ ] System can handle 100+ clients (proven with load testing)
- [ ] All code is clean, commented, maintainable
- [ ] Zero critical bugs in production
- [ ] Comprehensive documentation exists
- [ ] API is fully documented with examples

### **Business Readiness**
- [ ] 50+ active clients (minimum)
- [ ] $100k+ MRR (minimum)
- [ ] <10% monthly churn rate
- [ ] LTV:CAC ratio >3:1
- [ ] Gross margin >60%
- [ ] 12+ months of financial history
- [ ] Client contracts in place (not month-to-month)
- [ ] Recurring revenue >90% of total revenue
- [ ] No single client >10% of revenue (diversification)

### **Team Readiness**
- [ ] Operations Manager hired and trained
- [ ] SEO Specialist hired and trained
- [ ] Customer Success hired and trained
- [ ] Team can run business without founder for 2+ weeks
- [ ] All processes documented in runbooks
- [ ] Team uses system successfully (not just founder)

### **Legal/Financial Readiness**
- [ ] Business is incorporated (LLC or C-Corp)
- [ ] Financial statements audited (P&L, balance sheet, cash flow)
- [ ] Client contracts reviewed by lawyer
- [ ] Employee contracts in place
- [ ] IP assigned to company (not founder personally)
- [ ] No outstanding legal issues or disputes
- [ ] Tax compliance (filed returns, paid taxes)

### **Valuation Drivers**
- [ ] Proprietary technology (custom platform, not white-label)
- [ ] Scalable without linear cost growth
- [ ] High margins (>60% gross, >30% net)
- [ ] Predictable recurring revenue (MRR/ARR)
- [ ] Low churn (<10% monthly)
- [ ] Strong LTV:CAC ratio (>3:1)
- [ ] Team in place (reduces key person risk)
- [ ] Growth trajectory (20%+ MoM growth)
- [ ] Large addressable market (not niche)

### **Buyer Preparation**
- [ ] Create Confidential Information Memorandum (CIM)
- [ ] Prepare data room with all docs (financials, contracts, code, processes)
- [ ] Clean up customer list (remove churned, categorize by tier)
- [ ] Create pitch deck highlighting growth + automation
- [ ] List system capabilities and roadmap
- [ ] Identify target buyers (agencies, PE firms, SaaS companies)
- [ ] Hire M&A advisor or business broker (optional but recommended)

---

## 📊 EXPECTED OUTCOMES

### **Week 8 (MVP Complete)**
- Functional platform with client management, task queue, agent runner, workflows
- Admin dashboard for internal operations
- Can manage 10-20 clients manually

### **Week 12 (Client Portal Complete)**
- Client-facing portal with self-service approvals
- Automated onboarding workflow
- Can manage 20-50 clients with minimal human intervention

### **Week 16 (Exit-Ready)**
- Fully automated platform with quality monitoring, reporting, churn prevention
- Team in place to run operations
- Comprehensive documentation for buyer
- Can scale to 100+ clients
- Ready to sell for 8-10x MRR

### **Revenue Projections**

**Month 6:**
- 30 clients @ $2,000 avg = $60k MRR
- API costs: $9k (15% of revenue)
- Labor: $12k (20% of revenue)
- Net margin: $39k (65%)

**Month 12:**
- 50 clients @ $2,000 avg = $100k MRR
- API costs: $12k (12% — economies of scale)
- Labor: $18k (18%)
- Net margin: $70k (70%)

**Exit valuation:**
- $100k MRR × 8-10x = **$800k - $1M**
- With strong growth (30%+ MoM): **$1.2M - $1.5M**

---

## 🚀 IMMEDIATE NEXT STEPS

1. **Read this entire document**
2. **Decide:** Fix dispatcher (2 weeks) or build custom system (8 weeks)?
3. **If building custom system:**
   - Week 1: Hand Phase 0-1 to Claude Code (foundation + database)
   - Week 2: Hand Phase 2 to Claude Code (API)
   - Week 3: Hand Phase 3 to Claude Code (agent runner)
   - Week 4: Hand Phase 4 to Claude Code (workflow engine)
   - Week 5-6: Hand Phase 5 to Claude Code (admin dashboard)
   - Week 7: Hand Phase 6 to Claude Code (client portal)
   - Week 8: Hand Phase 7 to Claude Code (automation enhancements)
4. **Monitor progress weekly** — Review code, test features, give feedback
5. **Start documenting as you build** — Don't wait until the end

---

**This is your roadmap to a $1M+ exit. Execute it phase by phase, and in 16 weeks you'll have a sellable, scalable, automated SEO agency platform.**

**Now get building. 🔨**

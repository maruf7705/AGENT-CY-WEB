# ⚡ AGENT-CY-WEB: Autonomous AI Agency & Product Studio Ecosystem

A complete, production-grade suite of AI agency platforms and autonomous operation architectures. Designed for founders, operators, and enterprises deploying **Multi-Agent Swarms (LangChain / LangGraph)**, **Workflow Automation (n8n)**, and **Interactive 3D Web Experiences (Three.js / WebGL)**.

---

## 📂 Repository Structure & Editions

This repository is structured into three progressive agency platforms:

```
AGENT-CY-WEB/
├── Web One/                   # Editorial B2B AI Agency & Studio Platform
│   ├── assets/                # Styles, JS logic, interactive simulators
│   ├── index.html             # Flagship homepage & visitor conversion flow
│   ├── solutions.html         # Service scope & agent architecture breakdowns
│   ├── process.html           # 5-stage deployment governance & scoped pilots
│   ├── pricing.html           # Transparent packages & cost calculators
│   ├── how-we-build.html      # LangChain, n8n, & model governance specs
│   └── README.md              # Documentation for Web One
│
├── Web TWO/                   # Advanced Interactive Systems & ROI Portal
│   ├── assets/                # Dataflow blueprint visualizers & ROI engines
│   │   └── js/
│   │       ├── cost-calculator.js      # ROI & revenue leakage calculator
│   │       └── dataflow-blueprint.js   # 5-node dataflow pipeline explorer
│   ├── index.html             # Flagship conversion portal with live demo
│   ├── privacy.html           # Data governance boundaries
│   ├── terms.html             # Commercial terms of engagement
│   └── README.md              # Documentation for Web TWO
│
├── Web Three/                 # 2027 Futuristic 3D Cyber-Corporate Platform (Next.js 14 + R3F)
│   ├── app/                   # Next.js 14 App Router (layout, page, API routes)
│   │   ├── api/orchestrate/   # Backend orchestration webhook bridge
│   │   ├── globals.css        # Tailwind directives & glassmorphic styling
│   │   ├── layout.tsx         # Typography & root metadata
│   │   └── page.tsx           # 3D WebGL hero + dynamic agent pipeline UI
│   ├── components/            # React & Three.js visual components
│   │   ├── Hero.tsx           # High-conversion sales copy & feature cards
│   │   └── ThreeScene.tsx     # 3D interactive particle swarm (React Three Fiber)
│   ├── backend/               # FastAPI + LangChain AI cognitive microservice
│   │   ├── main.py            # AI researcher & qualification endpoints
│   │   └── requirements.txt   # Python dependencies
│   ├── docker-compose.yml     # Self-hosted n8n + PostgreSQL (pgvector) + Qdrant
│   ├── AGENCY_MASTERPLAN_2027.md # Comprehensive 2027 business & tech masterplan
│   ├── package.json           # Frontend dependencies (React 18, Next 14, R3F, Zustand)
│   └── tsconfig.json          # TypeScript configuration
│
├── .gitignore                 # Root gitignore protecting dependencies, caches & envs
└── README.md                  # This file
```

---

## 🚀 Quick Start Guide

### 1. Web Three (3D Next.js + React Three Fiber + FastAPI + n8n)

#### Frontend (Next.js 14):
```bash
cd "Web Three"
pnpm install
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the 3D WebGL particle swarm and interface.

#### AI Cognitive Backend (FastAPI + LangChain):
```bash
cd "Web Three/backend"
python -m venv venv
# Windows:
.\venv\Scripts\Activate.ps1
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python main.py
```
Backend API will run at [http://localhost:8000](http://localhost:8000).

#### n8n Orchestration & Vector DB Stack (Docker):
```bash
cd "Web Three"
docker-compose up -d
```
- **n8n Webhook Engine:** [http://localhost:5678](http://localhost:5678) (Default login: `admin` / `admin`)
- **PostgreSQL + pgvector:** `localhost:5432`
- **Qdrant Vector DB:** `localhost:6333`

---

### 2. Web One & Web TWO (Static Editorial & Interactive Portals)

Both `Web One` and `Web TWO` are zero-build static web applications. You can serve them using any HTTP server:

```bash
# Using Python
cd "Web One"  # or cd "Web TWO"
python -m http.server 8080

# Using Node / npx
npx serve .
```
Visit [http://localhost:8080](http://localhost:8080).

---

## 🛠️ Technology Stack Breakdown

| Layer | Technologies |
| :--- | :--- |
| **3D & Frontend** | Next.js 14 (App Router), React 18, React Three Fiber (R3F), Three.js, Framer Motion, TailwindCSS, Lucide Icons |
| **State & Dataflow** | Zustand, Axios, HTML5 Canvas / WebGL |
| **Cognitive AI Layer** | LangChain, LangGraph, Nous Hermes 3, OpenAI, Anthropic Claude 3.5 Sonnet |
| **Orchestration & Pipes** | n8n (Self-Hosted / Cloud), Webhook Triggers, REST APIs |
| **Database & Vector Memory** | PostgreSQL with `pgvector`, Qdrant Vector Engine |
| **Infrastructure** | Docker Compose, FastAPI, Uvicorn, Python 3.10+ |

---

## 🔒 Security & Deployment Checklist

- [x] **Dependencies Ignored:** `node_modules`, `.pnpm-store`, `.next`, `venv`, and build artifacts are strictly excluded via `.gitignore`.
- [x] **Secrets Protected:** Raw `.env` files are removed and replaced with `.env.example` templates.
- [x] **Pinned Packages:** Pinned `zustand@4.5.5` to ensure 100% compatibility with React Three Fiber in Next.js 14.
- [x] **Containerized Automation:** Standard `docker-compose.yml` provides reproducible database and workflow environments.

---

## 📄 License & Ownership

Developed for **Agent-Cy / AIVIBEDEV**. All architectures, templates, and agent orchestration blueprints are ready for enterprise deployment.

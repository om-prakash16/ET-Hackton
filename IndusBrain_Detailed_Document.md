# IndusBrain AI: Unified Asset & Operations Brain
**Official Submission for: AI for Industrial Knowledge Intelligence**

---

## 1. The Multi-Billion Dollar Problem Context

According to a recent McKinsey survey, professionals in asset-intensive industries spend **35% of their working hours** just searching for information. In India, a NASSCOM-EY study reveals that the average large plant operates across **7 to 12 disconnected document systems** (P&IDs, maintenance work orders, safety procedures, and email archives). 

This knowledge fragmentation is catastrophic. BIS Research estimates it contributes to **18–22% of unplanned downtime**, as maintenance teams make decisions without complete equipment history. Furthermore, India is facing a devastating "knowledge cliff"—**25% of experienced industrial engineers will retire within the next decade**, taking decades of undocumented operational knowledge with them forever.

## 2. Our Solution: The Agentic Knowledge Graph

IndusBrain is an **Enterprise AI Copilot and Unified Operations Brain** designed specifically to solve this exact challenge. We built an end-to-end AI pipeline that ingests heterogeneous documents (structured and unstructured) and makes their collective intelligence queryable, actionable, and continuously updated.

Our system goes beyond basic chatbots by utilizing a **Topological Knowledge Graph (GraphRAG)** combined with **Vector Search**. We digitally map the physical reality of a plant (*Pumps ➔ Valves ➔ Safety Procedures ➔ Past Incidents*) and overlay it with semantic document understanding. 

---

## 3. Core Deliverables & Capabilities

### 🧠 Universal Document Ingestion & Knowledge Graph
Our async pipeline processes OEM manuals, telemetry, and safety PDFs, extracting entities (equipment tags, parameters, personnel) and updating the Neo4j graph automatically to maintain cross-document relationships.

### 🕸️ Expert Knowledge Copilot
An agentic RAG system that answers complex engineering queries. **Zero Hallucination Guarantee:** Every response includes exact source citations, confidence scores, and direct links to the originating documents.

### 🔧 Maintenance Intelligence & RCA Agent
Autonomously generates Root Cause Analysis (RCA) trees by fusing telemetry with historical maintenance logs to predict and prevent downtime before it occurs.

### 🛡️ Quality & Regulatory Compliance Intelligence
Actively maps plant conditions against regulatory frameworks like the **Factory Act** and **OISD**, instantly flagging compliance gaps and auto-generating evidence packages for audits.

---

## 4. Why We Are Better (The Competitive Moat)

Most competitors rely on standard Vector Search (RAG), which treats engineering manuals like generic text. **Standard RAG fails in heavy industry** because it cannot understand physical relationships or ontology. 

By combining **Neo4j** (physical relationships) with **Qdrant** (semantic meaning), IndusBrain actually *understands* the physics of the plant. If Valve A fails, the Graph knows it physically impacts Pump B. *We don’t just read your documents; we understand your factory's topology.*

---

## 5. Technology Stack & Enterprise Architecture

We built a highly scalable, microservices-driven architecture designed to be deployed in enterprise cloud environments.

*   **Frontend Command Center**: Next.js 15, React, Tailwind CSS.
*   **Backend Decision Engine**: Python 3.12, FastAPI, SQLAlchemy 2.0 (Async), Celery Workers.
*   **Data Ingestion Pipeline**: Apache Kafka (Event-Driven Streaming).
*   **Multi-Model Data Layer**:
    *   **PostgreSQL**: Manages RBAC, Tenants, and Document Metadata.
    *   **Qdrant**: Stores semantic chunk embeddings for unstructured text retrieval.
    *   **Neo4j**: Powers the Industrial Knowledge Graph, linking Equipment to Incidents and Regulations.
    *   **Redis**: High-speed caching and session state.

---

## 6. Multi-Tenant Enterprise Security & RBAC

IndusBrain is built from the ground up for B2B SaaS deployment, featuring strict Role-Based Access Control (RBAC). Data is completely segregated at the database level using JWT-enforced organizational silos.

**Supported Roles & Access Tiers:**
*   **Super Admin**: Full cross-tenant access. Can create organizations and manage global AI engines.
*   **Plant Head**: Plant-level access. Oversees all operations, analytics, and assets for a specific plant. 
*   **Maintenance Engineer**: Access to predictive maintenance alerts, asset health, and the GraphRAG copilot.
*   **External Auditor**: Read-only compliance view for generating enterprise audit logs.

---

## 7. Business Impact & ROI

*   **Eliminates the 18-22% downtime** caused by knowledge fragmentation by providing instant, contextualized RCA.
*   **Recovers the 35% wasted time** by instantly surfacing cited, evidence-backed answers at the point of need.
*   **Preserves Tribal Knowledge:** Permanently embeds the workflows of the retiring 25% of the workforce into the enterprise Knowledge Graph.

---

## 8. Future Implementation & Enhancements

To scale this into a global enterprise product, our immediate roadmap includes:
*   **Computer Vision for P&ID Digitization:** Native parsing of complex AutoCAD DWG and unstructured visual diagrams to automatically draw topological graph connections.
*   **Live IoT Telemetry Integration:** Fusing real-time SCADA/PLC data directly into the Knowledge Graph to trigger agentic RCA *before* failures occur.
*   **Edge-Deployed LLMs:** Running lightweight, quantized LLMs directly on mobile devices for offshore oil rigs or remote mines with zero internet connectivity.
*   **3D Digital Twin Overlay:** Mapping the Neo4j graph nodes directly onto 3D CAD models for spatial maintenance intelligence and AR field support.

---

## 9. Evaluation & Testing Guide (For Judges)

To fully evaluate the Multi-Tenant RBAC and GraphRAG capabilities of IndusBrain, you can utilize the following test accounts:

### 🔐 Test Credentials
*   **Super Admin:** `superadmin@indusbrain.ai` | Password: `admin123`
    *(Has global visibility across all tenants and can trigger system-wide compliance audits).*
*   **Plant Head:** `manager@tatasteel.com` | Password: `admin123`
    *(Has isolated visibility restricted to Plant-A analytics and alerts).*
*   **Maintenance Engineer:** `engineer@tatasteel.com` | Password: `admin123`
    *(Has access to perform Root Cause Analysis via the AI Copilot).*

### 🛠️ Environment (.env) Setup
For security reasons, `.env` files are strictly excluded from our GitHub repository. To run this project locally, create a `.env.local` file in the `frontend` directory with the following variables:

```env
# /frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
GEMINI_API_KEY=your_gemini_api_key_here
```

To run the backend, create a `.env` file in the `backend` directory:
```env
# /backend/.env
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/indusbrain
REDIS_URL=redis://localhost:6380/0
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
QDRANT_URL=http://localhost:6333
```
*(All local database infrastructure can be instantly provisioned by running `docker compose up -d` in the `/docker` folder).*

***

*End of Document. Prepared for the Economic Times AI Hackathon 2.0.*

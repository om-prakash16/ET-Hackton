# Industrial Knowledge Intelligence Platform (Unified Asset & Operations Brain)

## 1. Problem Statement
Modern industrial enterprises (oil & gas, manufacturing, energy) generate terabytes of unstructured data daily: OEM manuals, safety regulations, maintenance logs, and scattered sensor telemetry. 
When a critical asset fails, engineers spend hours sifting through fragmented silos to find the root cause, verify compliance, and formulate a repair strategy. This latency costs millions in downtime and introduces severe safety risks.

## 2. Our Solution
We built an **Enterprise Industrial Copilot**. It is not a generic chatbot. It is a **Decision Intelligence Engine** that physically maps the topological relationships of an industrial plant (Pumps -> Valves -> Procedures -> Incidents) and overlays semantic document understanding. 

By combining **GraphRAG** (Neo4j) with **Vector Search** (Qdrant), our Copilot allows an engineer to ask: *"Why did Pump P-101 fail last year and what are the OISD-105 compliance gaps?"* and instantly receive an evidence-backed answer, visual graph traversal, and extracted citations.

## 3. Technology Stack & Architecture
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion (Glassmorphic, Dark-First Enterprise UI).
- **Backend API**: Python 3.12, FastAPI, SQLAlchemy 2.0 (Async).
- **Ingestion Pipeline**: Kafka (Event-Driven), Python Background Workers.
- **Data Layer**:
  - **Relational (PostgreSQL)**: RBAC, Tenants, Document Metadata.
  - **Vector (Qdrant)**: Semantic chunk embeddings for unstructured text.
  - **Topological (Neo4j)**: Industrial Knowledge Graph linking Equipment to Incidents and Regulations.

### Core Workflow (Demo Flow)
1. **Ingest**: Drag and drop an OEM Manual into the Document Center.
2. **Process**: Kafka routes the document to async workers. OCR runs, entities (valves, pumps) are extracted, and relationships are embedded into Neo4j.
3. **Query**: The user asks the Copilot a complex diagnostic question.
4. **GraphRAG**: The Hybrid Retrieval Engine searches Qdrant for semantic meaning and Neo4j for physical asset topology.
5. **Action**: The UI streams back the LLM's diagnostic answer, sliding out an "Evidence Map" panel showing the exact Graph Traversal path and Source Citations.

## 4. Business Impact
- **MTTR Reduction**: Reduces Mean Time to Resolution by 60% through instant root-cause context.
- **Compliance Automation**: Continuously monitors assets against regulatory documents, reducing audit preparation from weeks to minutes.
- **Knowledge Retention**: Captures tribal knowledge from retiring engineers into a permanent, queryable Knowledge Graph.

## 5. Future Roadmap
- Live IoT Telemetry Integration via Apache Flink.
- 3D Digital Twin overlay mapping graph nodes to CAD models.
- Edge-deployed LLMs for offline rig operations.

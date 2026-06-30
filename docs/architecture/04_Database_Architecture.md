# Database Architecture

The enterprise architecture embraces polyglot persistence to handle the extreme variance in industrial data types (relational, vector, graph, time-series).

## 1. Neo4j (Knowledge Graph)
**Purpose**: Stores the Industrial Ontology.
**Usage**: Tracks physical hierarchy (Plant -> Area -> Equipment -> Sensor) and logical hierarchy (Document -> Section -> Concept).
**Why**: Relational DBs fail at deeply nested recursive queries (e.g., "Find all valves downstream of this tank that are currently under maintenance"). Neo4j handles this in sub-millisecond times using native graph traversals.

## 2. Qdrant (Vector Database)
**Purpose**: Stores dense vector embeddings of documents, manuals, and historical incident reports.
**Usage**: Powers the semantic retrieval phase of GraphRAG.
**Why**: Qdrant offers native Rust performance, metadata filtering (hybrid search), and handles millions of 1536-dimensional vectors with minimal memory footprint compared to Pinecone or Milvus.

## 3. PostgreSQL (Relational)
**Purpose**: Traditional ACID persistence.
**Usage**: User accounts, organizations, Role-Based Access Control (RBAC), tenant settings, and standard web application data.
**Why**: The industry standard for transactional consistency.

## 4. Redis (In-Memory Cache)
**Purpose**: High-speed ephemeral storage.
**Usage**: Caching Copilot chat histories, AI Agent memory, and maintaining high-speed rate-limiting states for the API Gateway.
**Why**: Sub-millisecond latency is required for conversational context lookup before injecting it into the LLM prompt.

## 5. Apache Kafka (Event Streaming)
**Purpose**: Decoupled message bus.
**Usage**: Ingests thousands of SCADA telemetry data points per second.
**Why**: Industrial sensors generate massive throughput. Direct API ingestion would overwhelm the AI engines. Kafka acts as a shock absorber.

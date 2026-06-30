# Architecture Decision Record: Core Technology Stack

## 1. Web Framework: Next.js vs React (Vite)
**Decision**: Next.js 14 (App Router)
**Reasoning**: Industrial dashboards require significant SEO (for manual indexing), server-side rendering for fast initial loads of massive asset trees, and API route handling for lightweight BFF (Backend-For-Frontend) logic. Vite is strictly Client-Side, which slows down initial time-to-interactive for heavy dashboards.

## 2. API Backend: FastAPI vs Spring Boot vs Express
**Decision**: FastAPI (Python 3.11+)
**Reasoning**: AI models, LangChain, and data science libraries are universally Python-native. Using Spring Boot or Express would require bridging data across language barriers, adding latency and complexity. FastAPI provides native async/await, Pydantic validation, and excellent performance, marrying enterprise web routing directly with native AI libraries.

## 3. Vector Database: Qdrant vs Pinecone vs Milvus
**Decision**: Qdrant
**Reasoning**: 
- *Pinecone* is closed-source and SaaS only, violating strict air-gapped on-premise industrial requirements.
- *Milvus* is highly scalable but operationally heavy (requires MinIO, etcd, Pulsar).
- *Qdrant* is written in Rust, operates brilliantly as a single statically linked binary or container, allows local deployment for air-gapped environments, and supports advanced payload filtering crucial for Hybrid Search.

## 4. Graph Database: Neo4j vs Amazon Neptune
**Decision**: Neo4j
**Reasoning**: Neo4j supports Cypher (the industry standard for graph querying), which LLMs are exceptionally good at generating via Text-to-Cypher. Neptune's Gremlin is notoriously difficult for LLMs to generate reliably. Furthermore, Neo4j can be run in air-gapped containers.

## 5. Event Bus: Apache Kafka vs RabbitMQ
**Decision**: Apache Kafka
**Reasoning**: Industrial SCADA streams are high-throughput and require event replayability (for incident forensics). RabbitMQ is a message queue that deletes messages upon consumption; Kafka is a distributed append-only log that allows historical replay.

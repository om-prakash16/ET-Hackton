# C4 Architecture Diagrams

## 1. System Context Diagram
Shows the high-level interactions between user personas and external systems.

```mermaid
C4Context
    title System Context: Industrial Knowledge Intelligence Platform

    Person(operator, "Field Operator", "Queries manuals, reports issues")
    Person(manager, "Plant Manager", "Views dashboards, analytics")
    
    System(brain, "Unified Brain Platform", "Ingests data, provides AI Copilot and Predictive insights")
    
    System_Ext(scada, "SCADA / IoT Sensors", "Live telemetry data stream")
    System_Ext(erp, "ERP / SAP", "Maintenance work orders")

    Rel(operator, brain, "Asks questions, views procedures", "HTTPS")
    Rel(manager, brain, "Views compliance and risk dashboards", "HTTPS")
    Rel(scada, brain, "Streams asset telemetry", "Kafka/MQTT")
    Rel(brain, erp, "Fetches work orders, syncs maintenance", "REST API")
```

## 2. Container Diagram
Shows the high-level technical containers that make up the system.

```mermaid
C4Container
    title Container Diagram: Unified Brain Platform

    Person(user, "Industrial User")

    System_Boundary(platform, "Platform Hosted in Kubernetes") {
        Container(spa, "Next.js Command Center", "React, Tailwind", "Frontend UI")
        Container(api_gateway, "API Gateway", "Envoy/Kong", "Routing, Rate Limiting")
        
        Container(backend, "FastAPI Microservices", "Python 3.11", "Business logic (Copilot, Ingest, Compliance)")
        Container(ai_agents, "AI Agent Swarm", "LangChain/LlamaIndex", "Orchestrates LLM tasks")
        
        ContainerDb(neo4j, "Neo4j Knowledge Graph", "Graph DB", "Stores Industrial Ontology")
        ContainerDb(qdrant, "Qdrant Vector DB", "Vector DB", "Stores document embeddings")
        ContainerDb(redis, "Redis Cache & Memory", "In-Memory", "Conversation history, fast cache")
        ContainerDb(postgres, "PostgreSQL", "RDBMS", "User accounts, RBAC, tenant data")
        
        ContainerQueue(kafka, "Apache Kafka", "Event Stream", "Telemetry ingestion and async jobs")
    }

    Rel(user, spa, "Uses", "HTTPS")
    Rel(spa, api_gateway, "API Calls", "HTTPS")
    Rel(api_gateway, backend, "Routes traffic", "gRPC / HTTP")
    Rel(backend, ai_agents, "Delegates AI tasks", "Internal RPC")
    Rel(backend, kafka, "Publishes/Consumes events")
    Rel(ai_agents, neo4j, "Cypher Queries")
    Rel(ai_agents, qdrant, "Vector Similarity Search")
    Rel(backend, redis, "Caches state")
    Rel(backend, postgres, "Reads user profiles")
```

## 3. Component Diagram (Backend API)

```mermaid
C4Component
    title Component Diagram: FastAPI Backend

    Container_Boundary(backend, "FastAPI Microservices") {
        Component(auth, "Auth Middleware", "Python", "Validates JWT")
        
        Component(ingest_domain, "Ingestion Domain", "Python", "Processes PDFs and extracts entities")
        Component(copilot_domain, "Copilot Domain", "Python", "Handles chat interactions")
        Component(predictive_domain, "Predictive Domain", "Python", "Analyzes telemetry for risks")
        Component(compliance_domain, "Compliance Domain", "Python", "Enforces OPA policies")

        Component(neo4j_client, "Neo4j Repository", "Python", "Abstracts Cypher")
        Component(qdrant_client, "Qdrant Repository", "Python", "Abstracts Vector Ops")
    }
    
    Rel(auth, ingest_domain, "Routes")
    Rel(copilot_domain, neo4j_client, "Queries")
    Rel(copilot_domain, qdrant_client, "Queries")
```

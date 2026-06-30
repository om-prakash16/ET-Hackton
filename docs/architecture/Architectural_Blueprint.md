# Phase 1: Universal Document Ingestion & Knowledge Graph Pipeline (Engine A)

## 1. System Overview
Engine A acts as the foundational data ingestion and cognitive mapping layer. It transforms highly unstructured, multi-modal engineering data (CAD drawings, PDFs, text, telemetry) into a deterministic, queryable Knowledge Graph.

## 2. Ingestion & Cognitive Architecture

```mermaid
graph TD
    %% Data Sources
    subgraph "Unstructured & Structured Data Sources"
        PDF[Unstructured PDFs / Manuals]
        PID[CAD / P&ID Drawings]
        WO[Legacy Maintenance Work Orders]
        REG[OISD / Factory Act Regulations]
        SENS[Sensor Logs / SCADA Telemetry]
    end

    %% Ingestion Layer
    subgraph "Data Fusion & Ingestion Pipeline"
        OCR[Computer Vision / P&ID Symbol Extraction API]
        PDF_Parser[Deep PDF Parsing / Table Extraction]
        NLP[NLP Entity & Regex Extraction]
        Kafka[Kafka Event Stream]
    end

    %% Knowledge Graph Pipeline
    subgraph "Cognitive Processing & Ontology Mapping"
        LLM[LLM Contextual Entity & Relation Extraction]
        Embedder[Dense Vector Embedding Engine]
        Ontology[Industrial Asset Ontology Rules]
    end

    %% Storage Layer
    subgraph "Unified Brain Storage Layer"
        GraphDB[(Graph Database e.g., Neo4j)]
        VectorDB[(Vector Store e.g., Pinecone)]
        TSDB[(Time-Series DB e.g., InfluxDB)]
    end

    %% Flow Dynamics
    PDF --> PDF_Parser
    PID --> OCR
    WO --> NLP
    REG --> PDF_Parser
    SENS --> Kafka

    OCR -->|Geometric & Symbol Data| LLM
    PDF_Parser -->|Chunked Text| LLM
    NLP -->|Maintenance Entities| LLM

    LLM -->|Extracts Tags, Control Loops, Params| GraphDB
    LLM -->|Generates Contextual Chunks| Embedder
    Embedder --> VectorDB
    Kafka -->|High-Frequency Ingestion| TSDB

    Ontology -->|Schema Constraints| LLM
    
    %% Storage Relationships
    GraphDB <-->|Hybrid Search / RAG Base| VectorDB
    GraphDB <-->|Sensor Tag ID Linking| TSDB
```

## 3. Technical Specifications

### A. Computer Vision for P&ID (Piping and Instrumentation Diagrams)
- **Model**: Custom-trained YOLOv8 for engineering symbol recognition paired with layout-aware OCR (e.g., Tesseract/AWS Textract).
- **Target**: Extracts equipment tags (e.g., `P-101`), valves, pipelines, and instrument bubbles, logging bounding box coordinates.

### B. NLP for Legacy Work Orders & Regulations
- **Pipeline**: SpaCy with custom NER (Named Entity Recognition) models trained on OISD guidelines and standard maintenance taxonomy.
- **Chunking Strategy**: Semantic chunking for regulations (chunking by clause/sub-clause) and tabular extraction for manuals.

### C. The Industrial Ontology Map
The Graph DB strictly enforces the following Node Types and relationships to prevent hallucination in downstream engines:
- `(Equipment)-[:MONITORS]->(Sensor)`
- `(Equipment)-[:APPEARS_IN]->(Document)`
- `(Equipment)-[:MAINTAINED_BY]->(WorkOrder)`
- `(Equipment)-[:GOVERNED_BY]->(Regulation)`

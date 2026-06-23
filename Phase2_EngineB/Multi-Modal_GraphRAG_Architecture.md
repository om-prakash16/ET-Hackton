# Phase 2: Expert Field Knowledge Copilot (Engine B)

## 1. System Overview
Engine B is a multi-modal, context-aware Copilot designed for field operators. It leverages GraphRAG (combining Graph Database traversal with Vector semantic search) to provide hallucination-free, heavily grounded operational assistance based on manuals, real-time telemetry, and visual inputs.

## 2. Multi-Modal GraphRAG Architecture

```mermaid
graph TD
    %% Client Interface
    subgraph "Field Operator Interface"
        UI_Text[Text/Voice Query]
        UI_Image[Image/Camera Upload]
    end

    %% Embedding Layer
    subgraph "Multi-Modal Embedding Engine"
        BGE[BGE-M3 Text Embedder]
        CLIP[Clip-ViT Vision Embedder]
    end

    %% Retrieval Layer
    subgraph "Hybrid Retrieval Layer"
        Vector_Search{Semantic Similarity Search}
        Graph_Traversal{2-Hop Cypher Traversal}
    end

    %% Data Stores (from Engine A)
    subgraph "Unified Knowledge Base (Engine A)"
        VectorDB[(Pinecone / Milvus)]
        GraphDB[(Neo4j)]
    end

    %% Context Fusion
    subgraph "Inference & Grounding Pipeline"
        Fusion[Context Fusion Engine]
        Reranker[Cross-Encoder Reranker]
        LLM[Multi-Modal LLM e.g., Gemini 1.5 Pro]
    end

    %% Flow
    UI_Text --> BGE
    UI_Image --> CLIP

    BGE -->|Dense Text Vector| Vector_Search
    CLIP -->|Dense Image Vector| Vector_Search

    BGE -->|Entity Recognition| Graph_Traversal

    Vector_Search -->|Top-K Chunks| VectorDB
    Graph_Traversal -->|Starting Node IDs| GraphDB

    VectorDB -->|Localized Document Chunks| Fusion
    GraphDB -->|2-Hop Subgraph Topology| Fusion

    Fusion -->|CopilotInferenceContextBundle| Reranker
    Reranker -->|Prioritized Context| LLM
    LLM -->|Grounded Actionable Response| Field_Operator((Field Operator))
```

## 3. Technical Specifications
- **BGE-M3**: Handles multi-lingual, multi-granularity textual queries (English, Hindi, regional dialects) for searching maintenance logs and OISD standards.
- **Clip-ViT**: Encodes field images (e.g., a photo of a leaking valve or a degraded pump seal) to cross-reference against stored schematic diagrams or previous defect photos in the VectorDB.
- **2-Hop Substructure**: Ensures that if a user asks about "Pump P-101", the LLM natively knows the upstream valve, downstream sensor, and active work orders without hallucinating connectivity.

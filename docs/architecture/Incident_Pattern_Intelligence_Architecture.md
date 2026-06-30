# Phase 5: Historical Incident Pattern & Lessons Learned Predictive Engine (Engine E)

## 1. System Overview
Engine E acts as the macro-level foresight layer of the Unified Asset Brain. It shifts focus from reactive telemetry monitoring (Engine C) and static compliance checking (Engine D) into proactive threat forecasting. By continuously mapping live operational states against a massive corpus of global industrial disasters, near-miss ledgers, and shift logs, it surfaces predictive warnings before a critical sequence converges into an incident.

## 2. Incident Pattern Intelligence Architecture

```mermaid
graph TD
    %% Historical Corpora
    subgraph "Historical Incident Data Lakes"
        CSB[CSB / Global Disaster Reports]
        NearMiss[Internal Near-Miss Ledgers]
        ShiftLogs[Historical Shift Handover Logs]
        RegFindings[OISD Audit Deficiencies]
    end

    %% Embedding & Clustering Pipeline
    subgraph "Macro Pattern Extraction Engine"
        LLM_Summarizer[LLM Event Chain Extraction]
        VecEmbedder[Dense Passage Retrieval Embedder]
        HDBScan[HDBScan Threat Vector Clustering]
    end

    %% Live Match Evaluator
    subgraph "Live Predictive Matcher"
        LiveState[Live Plant State from Engines C & D]
        SimilarityEngine[Cross-Encoder Similarity Search]
    end

    %% Proactive Action
    subgraph "Proactive Early Warning System"
        ThreatDashboard[HSE Threat Forecasting UI]
        OperatorAlert[Proactive Mobile Push to Shift Lead]
    end

    %% Flow Dynamics
    CSB --> LLM_Summarizer
    NearMiss --> LLM_Summarizer
    ShiftLogs --> LLM_Summarizer
    RegFindings --> LLM_Summarizer

    LLM_Summarizer -->|Standardized Event Chain Vectors| VecEmbedder
    VecEmbedder -->|Historical Disaster DB| VectorDB[(Pinecone Historical VectorDB)]
    VectorDB --> HDBScan

    LiveState -->|Live Shift Events + Anomalies| SimilarityEngine
    VectorDB --> SimilarityEngine

    SimilarityEngine -->|If Similarity > 90%| PatternMatch{High Risk Pattern Detected}

    PatternMatch -- YES --> ThreatDashboard
    PatternMatch -- YES --> OperatorAlert
```

## 3. Operational Logic Workflow
1. **Continuous Corpus Ingestion**: Reports of major industrial disasters (like Bhopal, Visakhapatnam, Texas City) and local near-misses are ingested, parsed for causal event chains by an LLM, and stored as dense vectors in the Historical VectorDB.
2. **Cluster Formation**: HDBScan clusters similar historical failures together (e.g., "Shift Handover Communication Failures + Unacted Pressure Spikes").
3. **Live State Polling**: The Similarity Engine polls current operational states (e.g., alarms firing during shift changeovers) synthesized from Engine C and D.
4. **Predictive Matching**: If the live vector trajectory closely aligns (e.g., > 90% cosine similarity) with a historical disaster cluster, Engine E flags the sequence as a pre-incident pattern and pushes immediate mitigation strategies to the operations team before physical limits are breached.

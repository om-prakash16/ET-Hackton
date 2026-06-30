# Vector Database Design (Qdrant)

Qdrant is configured to store all unstructured semantic embeddings, enabling high-speed semantic search, hybrid search (keyword + semantic), and GraphRAG.

## 1. Vector Configuration
- **Model**: `text-embedding-3-small` (OpenAI) or `bge-large-en-v1.5` (Local/Air-Gapped).
- **Dimension**: `1536` dimensions.
- **Distance Metric**: `Cosine Similarity`.

## 2. Qdrant Collections

To prevent cross-contamination and ensure high performance, vectors are partitioned into specialized collections.

### Collection: `industrial_manuals`
- **Purpose**: OEM equipment manuals, maintenance procedures, and standard operating procedures (SOPs).
- **Payload (Metadata)**:
  ```json
  {
    "document_id": "uuid",
    "equipment_class": "Centrifugal Pump",
    "manufacturer": "Flowserve",
    "page_number": 42,
    "chunk_index": 115
  }
  ```

### Collection: `compliance_regulations`
- **Purpose**: Strict legal and safety standards (e.g., OSHA, ISO 9001, OISD-105).
- **Payload (Metadata)**:
  ```json
  {
    "standard_code": "OISD-105",
    "clause": "4.2.1",
    "hazard_level": "CRITICAL"
  }
  ```

### Collection: `historical_incidents`
- **Purpose**: Root Cause Analysis (RCA) reports, lessons learned, and failure logs.
- **Payload (Metadata)**:
  ```json
  {
    "incident_id": "uuid",
    "equipment_tag": "P-101A",
    "failure_mode": "Mechanical Seal Leak",
    "severity": "HIGH",
    "year": 2024
  }
  ```

## 3. Hybrid Search Strategy
Qdrant supports strict payload filtering *before* executing the HNSW vector search. 

**Example Query**: *"How do I replace the impeller?"*
**Filter**: `equipment_class == "Centrifugal Pump"` AND `manufacturer == "Flowserve"`

By pushing the hard filters to the vector database, we guarantee that the AI Copilot will not retrieve an impeller replacement procedure for the wrong manufacturer, preventing catastrophic industrial accidents.

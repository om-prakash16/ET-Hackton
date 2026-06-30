# Document Model

The platform treats documents not as static files, but as living, versioned assets.

## 1. Document Lifecycle
1. **`UPLOADED`**: Stored in S3/MinIO. PostgreSQL `DOCUMENT_METADATA` record created.
2. **`PARSING`**: OCR pipeline extracts text and layout.
3. **`CHUNKING`**: Text is split into semantic blocks.
4. **`EMBEDDING`**: Vectors are generated and pushed to Qdrant.
5. **`GRAPHING`**: Entities are extracted and edges are pushed to Neo4j.
6. **`ACTIVE`**: Document is fully available for GraphRAG.
7. **`ARCHIVED`**: A newer version is uploaded; old vectors are soft-deleted from the active Qdrant search radius but retained for audit.

## 2. Supported Modalities
- **PDF / DOCX**: Standard manuals and procedures.
- **P&ID (Drawings)**: Processed by Vision AI models. Text and symbols are extracted and converted directly into Neo4j `[:CONNECTED_TO]` topology edges.
- **Images**: Incident photos. Passed through Vision models to generate dense captions, which are then embedded into Qdrant.

## 3. Versioning & Lineage
If an OEM releases a V2 of a manual, the system:
1. Creates a new `DOCUMENT_METADATA` entry.
2. Tags the old document as `ARCHIVED`.
3. In Neo4j, the edge `(:Equipment)-[:HAS_MANUAL]->(:Document)` is severed from V1 and pointed to V2.
4. If an operator asks a question about an incident from 2022, the system can use temporal filtering to query the V1 manual that was active at that time.

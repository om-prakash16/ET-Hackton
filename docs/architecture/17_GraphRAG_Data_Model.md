# GraphRAG Data Model

The GraphRAG (Graph-Retrieval Augmented Generation) data model bridges unstructured text in Qdrant with the structured topology in Neo4j.

## 1. Chunking Strategy
Industrial PDFs (e.g., a 500-page compressor manual) are notoriously difficult to parse because context spans across pages and tables.
- **Hierarchical Chunking**: Documents are split not by raw character count, but by logical document structure (H1 -> H2 -> Paragraph).
- **Chunk Size**: Max 512 tokens with a 50-token overlap.
- **Table Preservation**: Markdown conversion forces tables into a linearized string or HTML block to preserve row/column semantic meaning before embedding.

## 2. Entity Extraction & Linking (The "Graph" in GraphRAG)
When a document is ingested, the pipeline uses an LLM (e.g., GPT-4o-mini) to extract entities via strict JSON schemas.

**Input Text**: 
> "If the discharge pressure on Pump P-101A exceeds 500 PSI, the operator must manually close Valve V-200 to prevent cavitation."

**Extracted Entities**:
- `Pump` (P-101A)
- `Valve` (V-200)
- `FailureMode` (Cavitation)

**Neo4j Injection**:
The ingestion pipeline merges these entities into the graph and creates the edges:
- `(:Chunk { id: 123 })-[:MENTIONS]->(:Equipment { tag: "P-101A" })`
- `(:Chunk { id: 123 })-[:MENTIONS]->(:Equipment { tag: "V-200" })`
- `(:Chunk { id: 123 })-[:MITIGATES]->(:FailureMode { name: "Cavitation" })`

## 3. Retrieval Traversal (Hybrid Context Ranking)
When an operator asks a question, the retrieval engine scores context using two algorithms simultaneously:
1. **Cosine Similarity Score** (from Qdrant) -> Evaluates textual relevance.
2. **PageRank / Node Degree Score** (from Neo4j) -> Evaluates topological relevance. 

The contexts are combined and re-ranked (e.g., via Cohere Re-ranker) before final prompt injection, ensuring high-confidence Answer Provenance.

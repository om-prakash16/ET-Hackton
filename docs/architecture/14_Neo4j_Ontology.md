# Neo4j Industrial Ontology Design

Neo4j stores the deep relational topology of the industrial plant, combining the physical world (machines, pipes, sensors) with the conceptual world (documents, safety standards, incidents).

## 1. Core Node Labels

### 🏭 Physical Asset Nodes
- `(:Plant { id, name, location })`
- `(:Area { id, name, hazard_zone })`
- `(:Equipment { id, name, class, tag_number, manufacturer, criticality })`
- `(:Component { id, name, type, material })`
- `(:Sensor { id, tag, type, unit_of_measure, min_threshold, max_threshold })`

### 📄 Conceptual / Knowledge Nodes
- `(:Document { id, title, type, version, published_date })`
- `(:Chunk { id, content_hash, text, page_number })`
- `(:Regulation { id, standard_code, title, issuing_body })`
- `(:Incident { id, date, severity, root_cause })`
- `(:WorkOrder { id, status, type, scheduled_date })`

### 👷 Human Nodes
- `(:Person { id, name, role, certifications })`
- `(:Department { id, name })`

## 2. Core Relationship Definitions

### Spatial & Hierarchical Edges
- `(:Plant)-[:CONTAINS_AREA]->(:Area)`
- `(:Area)-[:CONTAINS_EQUIPMENT]->(:Equipment)`
- `(:Equipment)-[:HAS_COMPONENT]->(:Component)`
- `(:Equipment)-[:HAS_SENSOR]->(:Sensor)`

### Topological (P&ID) Edges
- `(:Equipment)-[:CONNECTED_TO { medium: "gas/liquid", flow_direction: "forward", pipe_diameter: "10in" }]->(:Equipment)`

### Semantic & Knowledge Edges
- `(:Document)-[:HAS_CHUNK { sequence_index: 1 }]->(:Chunk)`
- `(:Chunk)-[:MENTIONS { confidence: 0.95, extraction_method: "LLM" }]->(:Equipment)`
- `(:Chunk)-[:MENTIONS]->(:Component)`
- `(:Regulation)-[:GOVERNS { strictness: "MANDATORY" }]->(:Equipment)`
- `(:Incident)-[:INVOLVED]->(:Equipment)`

### Operational Edges
- `(:WorkOrder)-[:TARGETS]->(:Equipment)`
- `(:Person)-[:EXECUTED]->(:WorkOrder)`
- `(:Incident)-[:RESOLVED_BY]->(:WorkOrder)`

## 3. Graph Design Principles
- **No Dense Text in Neo4j**: The actual text embeddings are stored in Qdrant. Neo4j `(:Chunk)` nodes only contain the plaintext for graph-traversal context and a UUID reference to Qdrant.
- **Edge Properties**: Edge properties are utilized heavily for pathfinding algorithms. For example, `[:CONNECTED_TO]` edges have a `status: "OPEN" | "CLOSED"` property to dynamically calculate if fluid can flow from Tank A to Pump B.

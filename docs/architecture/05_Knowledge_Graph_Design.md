# Knowledge Graph Design & Industrial Ontology

The core of the intelligence platform is its strictly typed Industrial Ontology mapped inside Neo4j.

## 1. Core Nodes
- **`(:Equipment)`**: A physical asset (e.g., Boiler, Valve, Pump).
- **`(:Sensor)`**: An IoT device attached to equipment (e.g., Temp_Sensor, Pressure_Sensor).
- **`(:Document)`**: A technical manual, P&ID, or standard (e.g., OISD-STD-105).
- **`(:Chunk)`**: A specific paragraph or section extracted from a document.
- **`(:Regulation)`**: A specific compliance rule.
- **`(:Incident)`**: A historical failure or Root Cause Analysis record.

## 2. Core Relationships
- `(:Equipment)-[:HAS_SENSOR]->(:Sensor)`
- `(:Equipment)-[:CONNECTED_TO {type: "fluid", direction: "downstream"}]->(:Equipment)`
- `(:Document)-[:CONTAINS]->(:Chunk)`
- `(:Chunk)-[:MENTIONS]->(:Equipment)`
- `(:Regulation)-[:GOVERNS]->(:Equipment)`
- `(:Incident)-[:INVOLVED]->(:Equipment)`

## 3. GraphRAG Synergy
When a user asks: *"How do I fix the high temperature on Boiler 4?"*
1. **Vector Search**: Finds the most semantically relevant `(:Chunk)` describing boiler temperature fixes.
2. **Graph Traversal**: The system jumps from that `(:Chunk)` across the `[:MENTIONS]` edge to `(:Equipment {name: "Boiler 4"})`, then traverses `[:CONNECTED_TO]` to find upstream valves that might be causing the issue.
3. **LLM Synthesis**: Both the semantic text and the physical graph topology are injected into the LLM prompt.

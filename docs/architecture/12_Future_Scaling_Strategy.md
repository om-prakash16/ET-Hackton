# Future Scaling Strategy

As the platform scales from a single factory to a global fleet of industrial plants, the architecture must evolve.

## 1. Multi-Tenant Architecture
- Currently, the Neo4j and Qdrant databases are unified.
- **Phase 2**: Introduce strict multitenancy at the database layer.
  - **Qdrant**: Utilize Qdrant Collections and Payload isolation.
  - **Neo4j**: Utilize Fabric or isolated graphs per tenant to ensure Plant A data never cross-pollinates with Plant B.

## 2. Global Edge AI (Federated Inference)
- **Challenge**: Network latency between a deep-sea oil rig and the central cloud AI is too high for emergency situations.
- **Strategy**: Deploy lightweight quantized models (e.g., Llama 3 8B) on localized Edge Servers directly inside the plant. These edge instances will sync their local Knowledge Graphs with the central cloud graph asynchronously via Kafka, but remain capable of instantaneous local RAG inference during network outages.

## 3. Continuous Graph Updates
- Currently, the Ingestion pipeline is a batch process.
- **Strategy**: Implement Change Data Capture (CDC) using Debezium attached to the SCADA historian, automatically updating Neo4j property values in real-time as physical assets change states, ensuring the Graph is always a true Digital Twin.

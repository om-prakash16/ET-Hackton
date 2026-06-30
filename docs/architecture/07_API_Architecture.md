# API Architecture

The platform exposes a single unified API Gateway, routing traffic to underlying bounded contexts (microservices). All internal communication between AI domains relies on asynchronous event buses or high-speed gRPC.

## 1. REST API Boundaries
The external-facing interface is RESTful JSON, adhering to OpenAPI 3.1 specifications.

- **`POST /api/v1/ingest/document`** (Ingestion Domain)
- **`POST /api/v1/copilot/chat`** (Copilot Domain)
- **`GET /api/v1/predictive/telemetry/anomalies`** (Predictive Domain)
- **`POST /api/v1/compliance/evaluate`** (Compliance Domain)

## 2. Internal gRPC and Event Streams
To prevent API blocking and timeout errors during heavy LLM inference:
- Long-running RAG queries are processed via async worker queues (Celery/Kafka).
- The Copilot domain communicates with the Ingestion domain via internal gRPC for ultra-low latency context fetching.

## 3. WebSockets for Real-Time State
- The Next.js Command Center maintains an active WebSocket connection `wss://api.industrialbrain.io/ws/telemetry` to stream live SCADA alerts from the Predictive Engine directly into the UI without polling.

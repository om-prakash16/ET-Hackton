# Data Governance & Security Guide

## 1. Data Classification
All data entering the Unified Brain is classified to enforce routing rules:
- **`PUBLIC`**: OEM Manuals. Can be queried by any authenticated user.
- **`INTERNAL`**: Plant SOPs. Restricted to employees of that specific Organization/Tenant.
- **`CONFIDENTIAL`**: Financial impact reports, sensitive HR/safety incidents. Restricted to Plant Managers and Auditors.

## 2. Retention Policies
- **Telemetry (Kafka/Redis)**: Hot storage for 7 days.
- **Telemetry (PostgreSQL TimescaleDB / Cold Storage)**: Aggregated hourly and retained for 7 years for model training.
- **Audit Logs**: Immutable and retained indefinitely.

## 3. Data Lineage & Provenance
AI Hallucinations in industrial settings are unacceptable.
- **Requirement**: Every LLM response MUST provide a strict citation back to the source data.
- **Mechanism**: The LLM prompt is injected with context blocks that include `[DOC_ID: 402]`. The UI parses these tags and generates clickable hyperlinks. If the LLM generates a claim without a matching `DOC_ID` in its context, the Supervisor Agent flags it as a potential hallucination and warns the operator.

## 4. Encryption & Tenancy
- **PostgreSQL**: Row-Level Security (RLS) is enabled. A user from `Tenant_A` cannot `SELECT` data from `Tenant_B` even if an API bug occurs.
- **Qdrant**: `tenant_id` is a required payload field for every vector. Qdrant filters implicitly apply `tenant_id == current_user.tenant_id`.
- **Neo4j**: Every node contains a `tenant_id` property. Global queries are restricted via Cypher parameter injection.

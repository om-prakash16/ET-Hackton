# PostgreSQL Relational Architecture & ER Diagram

PostgreSQL acts as the transactional backbone of the Industrial Data Platform. It stores highly structured data such as Users, RBAC, Organizations, Audit Logs, and strict Maintenance tasks that require ACID guarantees. 

*Note: The physical topology of assets and unstructured text are stored in Neo4j and Qdrant respectively. PostgreSQL only stores the UUID references to those entities.*

## 1. Entity Relationship Diagram

```mermaid
erDiagram
    ORGANIZATION ||--o{ PLANT : "owns"
    ORGANIZATION ||--o{ USER : "employs"
    PLANT ||--o{ ASSET_RECORD : "contains"
    USER }|--o{ ROLE : "assigned"
    USER ||--o{ AUDIT_LOG : "triggers"
    USER ||--o{ WORK_ORDER : "assigned_to"
    
    ASSET_RECORD ||--o{ WORK_ORDER : "requires"
    ASSET_RECORD ||--o{ INCIDENT : "involved_in"
    
    WORK_ORDER ||--o{ INSPECTION : "results_in"
    DOCUMENT_METADATA }|--o{ ASSET_RECORD : "references"
    DOCUMENT_METADATA }|--o{ UPLOAD_BATCH : "belongs_to"

    ORGANIZATION {
        uuid id PK
        string name
        string tenant_id
        timestamp created_at
    }
    
    USER {
        uuid id PK
        uuid org_id FK
        string email
        string password_hash
        boolean is_active
        timestamp last_login
    }

    PLANT {
        uuid id PK
        uuid org_id FK
        string name
        string location
        string timezone
    }

    ASSET_RECORD {
        uuid id PK
        uuid plant_id FK
        string name
        string serial_number
        string status "ACTIVE | MAINTENANCE | DECOMMISSIONED"
        uuid neo4j_node_id "Reference to Graph Topology"
    }

    WORK_ORDER {
        uuid id PK
        uuid asset_id FK
        uuid assigned_user_id FK
        string status "OPEN | IN_PROGRESS | CLOSED"
        string priority "LOW | MEDIUM | HIGH | CRITICAL"
        timestamp due_date
    }

    DOCUMENT_METADATA {
        uuid id PK
        string filename
        string file_type "PDF | DOCX | DWG | JPG"
        int size_bytes
        string blob_storage_uri
        uuid qdrant_collection_id "Reference to Vector DB"
    }

    AUDIT_LOG {
        uuid id PK
        uuid user_id FK
        string action "e.g., APPROVED_WORK_ORDER"
        jsonb details
        timestamp created_at
    }
```

## 2. Table Design Strategies
- **Primary Keys**: UUIDv7 for sequential sorting and global uniqueness across the distributed fleet.
- **Soft Deletes**: Every table contains `deleted_at (timestamp)`. Queries enforce `deleted_at IS NULL`.
- **JSONB**: Used extensively in `AUDIT_LOG` and `DOCUMENT_METADATA` for flexible schemas without breaking relational constraints.
- **Foreign Key Indexing**: Every FK is explicitly indexed to prevent full-table scans during JOIN operations.

# IndusBrain AI - Evaluation Credentials

Welcome to the IndusBrain AI platform. To thoroughly evaluate the multi-tenant architecture and Role-Based Access Control (RBAC), please use the following accounts to log into the application.

Each account demonstrates a different tier of access and visibility across the platform.

### System Roles
| Role | Email | Password | Description |
|---|---|---|---|
| **Super Admin** | `superadmin@indusbrain.ai` | `admin123` | Full cross-tenant access. Can create organizations and manage global AI engines. |
| **Tenant Admin** | `admin@tatasteel.com` | `admin123` | Organization-level admin. Can manage users, billing, and plant deployments. |
| **Plant Head** | `planthead@tatasteel.com` | `admin123` | Plant-level access. Oversees all operations, analytics, and assets for a specific plant. |
| **Operations Manager**| `ops@tatasteel.com` | `admin123` | Day-to-day management of manufacturing lines and resource allocation. |
| **Maintenance Engineer**| `maintenance@tatasteel.com`| `admin123` | Access to predictive maintenance alerts, asset health, and knowledge graph. |
| **AI / Data Analyst** | `analyst@tatasteel.com` | `admin123` | Access to GraphRAG, AI models, continuous intelligence, and telemetry streams. |
| **Operator** | `operator@tatasteel.com` | `admin123` | Floor-level dashboard for acknowledging alerts and viewing basic metrics. |

### Custom Roles
| Role | Email | Password | Description |
|---|---|---|---|
| **External Auditor** | `auditor@deloitte.com` | `admin123` | Read-only compliance view for generating enterprise audit logs. |
| **Safety Inspector** | `safety@tatasteel.com` | `admin123` | Access scoped exclusively to safety incident reports and physical security governance. |

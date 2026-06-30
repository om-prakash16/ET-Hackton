# Security Architecture

Given the platform's ability to recommend actions on critical physical infrastructure, Security and Zero-Trust are paramount.

## 1. Authentication & Identity
- **OAuth 2.0 + OIDC**: The Next.js frontend uses NextAuth connected to an enterprise Identity Provider (e.g., Azure AD or Okta).
- **JWT Lifecycles**: 15-minute access tokens, 7-day refresh tokens securely stored in HTTP-only cookies.

## 2. Authorization (RBAC + ABAC)
- **Role-Based Access**: Distinguishes `Viewer` vs `Operator` vs `Auditor`.
- **Attribute-Based Access**: An operator might have `Operator` rights, but ABAC limits them strictly to *Plant A* or *Unit 4*. They cannot query the Knowledge Graph for *Plant B*.

## 3. Physical Compliance (The Safety Hard-Stop)
- **Open Policy Agent (OPA)**: Acts as a deterministic "circuit breaker" between the AI Copilot and the physical world.
- If the LLM generates a recommendation (e.g., "Open valve V-200"), OPA intercepts the payload, cross-references live telemetry, and explicitly evaluates it against hardcoded thermodynamic rules (like OISD-STD-105). If it violates safety, the action is blocked entirely, bypassing the AI.

## 4. Encryption
- **Data at Rest**: AES-256 encryption on all persistent volumes (PostgreSQL, Qdrant, Neo4j).
- **Data in Transit**: Enforced TLS 1.3 across all internal gRPC and external HTTPS traffic.

# Phase 4: Quality, Factory Act, & OISD Regulatory Compliance Auditor (Engine D)

## 1. System Overview
Engine D introduces an automated, continuously running regulatory auditing layer. It evaluates active operational states (from Engine C), knowledge graph topography (from Engine A), and live Permit to Work (PTW) data against digitized statutory constraints, acting as an autonomous compliance enforcement mechanism.

## 2. Compliance Evaluation Flow Architecture

```mermaid
graph TD
    %% Input Sources
    subgraph "Live Operational Context"
        PTW[Permit To Work System / SAP PM]
        State[Current Equipment State via Engine C]
        Graph[(Neo4j Knowledge Graph)]
    end

    %% Digitized Policy Store
    subgraph "Statutory Rule Base"
        OISD[OISD Standards e.g., STD-105]
        FactoryAct[Factory Act 1948 Rules]
        PESO[PESO Guidelines]
    end

    %% Rule Engine
    subgraph "Compliance Auditor Engine"
        PolicyCompiler[Policy Compiler / Rego Engine]
        OPA[Open Policy Agent - OPA]
        SpatialEval[Spatial & Topological Evaluator]
    end

    %% Actions
    subgraph "Enforcement & Remediation"
        Webhook_Revoke[Auto-Revoke Permit API]
        Alerting[HSE Management Dashboard]
        AuditLog[(Immutable Audit Ledger)]
    end

    %% Flow Dynamics
    PTW -->|Active Hot/Cold Work Permits| PolicyCompiler
    State -->|Purge Status, Hydrocarbon Levels| SpatialEval
    Graph -->|Distance Metrics, Equipment Types| SpatialEval

    OISD --> PolicyCompiler
    FactoryAct --> PolicyCompiler
    PESO --> PolicyCompiler

    PolicyCompiler -->|Digitized Constraints| OPA
    SpatialEval -->|Geospatial/Topological Fact Base| OPA

    OPA -->|Evaluate Fact Base vs Constraints| Result{Is Compliant?}

    Result -- YES --> AuditLog
    Result -- NO --> Webhook_Revoke
    Result -- NO --> Alerting
    Result -- NO --> AuditLog
```

## 3. Operational Logic Workflow
1. **Fact Gathering**: Whenever a Hot Work Permit is requested or goes active in the PTW system, Engine D ingests the geo-coordinates of the permit execution zone.
2. **Spatial Graph Traversal**: The Engine queries the GraphDB to identify all volatile storage tanks or process equipment within a 15-meter radius (a standard hot work constraint).
3. **State Evaluation**: The system polls the active state of those nearby assets. If an asset is flagged as "UNPURGED" or containing active hydrocarbons, the facts are passed to the Open Policy Agent (OPA).
4. **Policy Enforcement**: OPA evaluates the digitized OISD-STD-105 constraint. Given the facts (Hot Work within 15m of Unpurged Tank), the policy evaluates to a `CRITICAL_VIOLATION`.
5. **Remediation Action**: Engine D immediately dispatches a webhook to the PTW system to auto-suspend the permit and logs an immutable entry in the safety ledger.

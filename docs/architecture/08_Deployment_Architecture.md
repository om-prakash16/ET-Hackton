# Deployment Architecture

The platform uses a Kubernetes-native deployment strategy designed for either Cloud (GCP/AWS/Azure) or On-Premise Air-Gapped execution (for strict industrial environments).

## 1. Local Development
- Handled exclusively via `docker-compose.yml`.
- Spins up Neo4j, Qdrant, Redis, Kafka, and Zookeeper alongside the FastAPI application locally.

## 2. Kubernetes Architecture (Production)
```mermaid
C4Deployment
    title Deployment: Cloud / On-Prem Kubernetes Cluster
    
    Node(k8s, "Kubernetes Cluster", "EKS/GKE") {
        Node(ingress, "Ingress Node") {
            Container(nginx, "Nginx Ingress Controller")
        }
        
        Node(app_nodes, "Application Nodes (Auto-Scaling)") {
            Container(fastapi, "FastAPI Pods", "HPA: 3-50 replicas")
            Container(nextjs, "Next.js Pods", "HPA: 2-10 replicas")
            Container(celery, "Celery AI Workers", "HPA: 5-100 replicas")
        }
        
        Node(state_nodes, "StatefulSet Nodes (Pinned/High-IOPS)") {
            ContainerDb(neo4j, "Neo4j Cluster", "Core Database")
            ContainerDb(qdrant, "Qdrant Cluster", "Vector Database")
            ContainerQueue(kafka, "Kafka Brokers", "Message Queue")
        }
    }
```

## 3. CI/CD Pipeline
- **GitHub Actions**: Triggers on `main` branch merges.
- **Pipeline Flow**: `Linting` -> `PyTest (Unit)` -> `Testcontainers (Integration)` -> `Docker Build` -> `Helm Upgrade`.
- **Zero-Downtime**: Helm implements rolling updates to ensure operators never lose Copilot connectivity.

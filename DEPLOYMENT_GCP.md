# Google Cloud Deployment Guide

This project is configured to run on Google Cloud Run for a fully managed, scalable deployment. 

## Prerequisites
1. A Google Cloud Platform (GCP) project.
2. The Google Cloud CLI (`gcloud`) installed locally, or use Cloud Shell.
3. Billing enabled on the GCP project.

## Required Environment Variables

When deploying to Google Cloud Run, you will need to set the following environment variables (using Cloud Run environment variables or GCP Secret Manager):

### Frontend (`frontend-app`)
* `GEMINI_API_KEY`: Your Gemini API key for streaming AI responses.
* `NEXT_PUBLIC_API_URL`: The deployed URL of your backend (e.g. `https://backend-api-xxx.a.run.app`).

### Backend (`backend-api`)
* `DATABASE_URL`: Connection string for Google Cloud SQL for PostgreSQL.
* `REDIS_URL`: Connection string for Google Cloud Memorystore for Redis.
* `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`: Credentials for your Neo4j Aura instance or self-hosted Neo4j.
* `QDRANT_URL`, `QDRANT_API_KEY`: Credentials for Qdrant Cloud.
* `KAFKA_BROKERS`: Comma-separated list of Kafka broker URLs.

## Automated Deployment (Cloud Build)

We have provided a `cloudbuild.yaml` file in the root directory that automatically builds and deploys both the frontend and backend to Cloud Run.

To trigger a build manually:
```bash
gcloud builds submit --config cloudbuild.yaml .
```

To set up continuous deployment:
1. Go to **Cloud Build > Triggers** in the GCP Console.
2. Connect your GitHub repository.
3. Create a trigger for the `main` branch that points to `cloudbuild.yaml`.

## VPC Connectors

If you are using Cloud SQL with a private IP, or MemoryStore, you must configure a Serverless VPC Access connector and attach it to your Cloud Run services. You can do this by adding the following to the `gcloud run deploy` command in `cloudbuild.yaml`:
```yaml
--vpc-connector=projects/YOUR_PROJECT/locations/YOUR_REGION/connectors/YOUR_CONNECTOR
```

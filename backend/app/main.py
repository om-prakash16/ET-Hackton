import asyncio
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.neo4j_client import neo4j_client
from app.db.session import engine
from app.core.events import event_publisher
from app.workers.document_worker import pipeline_worker

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("IndustrialBrain")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize resources
    logger.info("Initializing Industrial Intelligence Operating System...")
    logger.info(f"Connecting to PostgreSQL at {settings.POSTGRES_SERVER}...")
    await event_publisher.start()
    
    # Start background Kafka consumers
    await pipeline_worker.start()
    
    yield
    
    # Shutdown: Clean up resources
    logger.info("Shutting down Industrial Intelligence Operating System...")
    await pipeline_worker.stop()
    await event_publisher.stop()
    neo4j_client.close()
    await engine.dispose()
    logger.info("Database connections closed.")

app = FastAPI(
    title=settings.PROJECT_NAME, 
    version=settings.VERSION,
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.domains.authentication import api as auth
from app.domains.compliance import api as compliance
from app.domains.predictive import api as predictive
from app.domains.ingestion import api as ingest
from app.domains.copilot import api as copilot
from app.domains.maintenance import api as maintenance

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(compliance.router, prefix="/api/v1/compliance", tags=["Compliance"])
app.include_router(ingest.router, prefix="/api/v1/ingest", tags=["Ingestion"])
app.include_router(copilot.router, prefix="/api/v1/copilot", tags=["Copilot"])
app.include_router(maintenance.router, prefix="/api/v1/maintenance", tags=["Maintenance Intelligence"])

@app.get("/")
def health_check():
    return {"status": "ONLINE", "engines": ["A", "B", "C", "D", "E"], "db": "Configured"}

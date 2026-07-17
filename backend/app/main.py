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
from app.domains.telemetry.engine import telemetry_engine
from app.domains.pattern_detection.engine import pattern_engine

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
    
    # Start Telemetry Engine
    logger.info("Starting Telemetry Engine...")
    asyncio.create_task(telemetry_engine.start())
    
    # Start Pattern Detection Background Engine
    logger.info("Starting AI Pattern Detection Engine...")
    asyncio.create_task(pattern_engine.start())
    
    yield
    
    # Shutdown: Clean up resources
    logger.info("Shutting down Industrial Intelligence Operating System...")
    pattern_engine.stop()
    telemetry_engine.stop()
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
from app.domains.dashboard import api as dashboard
from app.domains.telemetry import api as telemetry
from app.domains.documents import router as documents_router
from app.domains.lessons_learned import api as lessons
from app.domains.lessons_learned import super_admin_api as lessons_admin
from app.domains.pattern_detection import api as patterns
from app.domains.knowledge_hub import api as knowledge
from app.domains.events import api as events
from app.domains.trust_center import api as trust
from app.domains.execution import api as execution
from app.domains.ai_brain import api as brain
from app.domains.integration import api as integration
from app.domains.governance import api as governance
from app.domains.evolution import api as evolution
from app.domains.digital_twin import api as digital_twin
from app.domains.ai_os import api as ai_os
from app.domains.marketplace import api as marketplace
from app.domains.executive import api as executive
from app.domains.network import api as network
from app.domains.fabric import api as fabric


app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(compliance.router, prefix="/api/v1/compliance", tags=["Compliance"])
app.include_router(ingest.router, prefix="/api/v1/ingest", tags=["Ingestion"])
app.include_router(copilot.router, prefix="/api/v1/copilot", tags=["Copilot"])
app.include_router(telemetry.router, prefix="/api/v1/telemetry", tags=["Telemetry"])
app.include_router(maintenance.router, prefix="/api/v1/maintenance", tags=["Maintenance Intelligence"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Command Center"])
app.include_router(documents_router.router, prefix="/api/v1/documents", tags=["DMS"])
app.include_router(lessons.router, prefix="/api/v1/lessons", tags=["Lessons Learned Engine"])
app.include_router(lessons_admin.router, prefix="/api/v1/admin/lessons", tags=["Super Admin"])
app.include_router(patterns.router, prefix="/api/v1", tags=["AI Pattern Engine"])
app.include_router(knowledge.router, prefix="/api/v1/knowledge", tags=["External Knowledge Hub"])
app.include_router(events.router, prefix="/api/v1/events", tags=["Enterprise Event Bus"])
app.include_router(trust.router, prefix="/api/v1/trust", tags=["AI Trust Center"])
app.include_router(execution.router, prefix="/api/v1/execution", tags=["Execution & ROI"])
app.include_router(brain.router, prefix="/api/v1/brain", tags=["AI Brain Orchestrator"])
app.include_router(integration.router, prefix="/api/v1/integration", tags=["Enterprise Integration Hub"])
app.include_router(governance.router, prefix="/api/v1/governance", tags=["Enterprise Governance"])
app.include_router(evolution.router, prefix="/api/v1/evolution", tags=["Self-Evolving Knowledge"])
app.include_router(digital_twin.router, prefix="/api/v1/digital-twin", tags=["Digital Twin & SCADA"])
app.include_router(ai_os.router, prefix="/api/v1/ai-os", tags=["Industrial AI OS"])
app.include_router(marketplace.router, prefix="/api/v1/marketplace", tags=["Intelligence Marketplace"])
app.include_router(executive.router, prefix="/api/v1/executive", tags=["Executive Intelligence"])
app.include_router(network.router, prefix="/api/v1/network", tags=["Global Enterprise Network"])
app.include_router(fabric.router, prefix="/api/v1/fabric", tags=["Intelligence Fabric"])


@app.get("/")
def health_check():
    return {"status": "ONLINE", "engines": ["A", "B", "C", "D", "E"], "db": "Configured"}

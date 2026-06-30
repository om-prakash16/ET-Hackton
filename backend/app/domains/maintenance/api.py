from typing import Any
import logging
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_active_user
from app.core.rbac import RequirePermissions
from app.db.session import get_db
from app.models.user import User
from app.domains.maintenance import schemas
from app.services.asset_health import asset_health_engine
from app.services.rca import rca_engine

logger = logging.getLogger("IndustrialBrain.Maintenance")
router = APIRouter()

@router.get("/assets/{id}/health", response_model=schemas.HealthScoreResponse)
async def get_asset_health(
    id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(RequirePermissions(["maintenance.read"]))
) -> Any:
    """
    Computes an Asset Health Score dynamically using the Neo4j Knowledge Graph topology.
    """
    logger.info(f"User {current_user.id} requested health score for {id}")
    org_id = str(current_user.org_id)
    
    health_data = await asset_health_engine.compute_health_score(id, org_id)
    return health_data

@router.post("/rca", response_model=schemas.RCAResponse)
async def trigger_root_cause_analysis(
    request: schemas.RCARequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(RequirePermissions(["maintenance.execute"]))
) -> Any:
    """
    Triggers the deep GraphRAG AI Root Cause Analyzer.
    Retrieves semantic chunks and topological graph links related to the specific failure symptom and equipment.
    """
    logger.info(f"User {current_user.id} running RCA on {request.equipment_tag} for '{request.failure_symptom}'")
    org_id = str(current_user.org_id)
    
    rca_results = await rca_engine.analyze_failure(
        equipment_tag=request.equipment_tag,
        failure_symptom=request.failure_symptom,
        org_id=org_id
    )
    
    return rca_results

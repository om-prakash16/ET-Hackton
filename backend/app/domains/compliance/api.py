from typing import Any
import logging
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_active_user
from app.core.rbac import RequirePermissions
from app.db.session import get_db
from app.models.user import User
from app.domains.compliance import schemas
from app.services.compliance import compliance_evaluator
from app.services.safety_risk import safety_risk_engine

logger = logging.getLogger("IndustrialBrain.Compliance")
router = APIRouter()

@router.get("/assets/{id}/risks", response_model=schemas.RiskScoreResponse)
async def get_asset_risk(
    id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(RequirePermissions(["compliance.read"]))
) -> Any:
    """
    Computes the Safety & Regulatory risk of an asset.
    """
    logger.info(f"User {current_user.id} requested risk score for {id}")
    org_id = str(current_user.org_id)
    
    risk_data = await safety_risk_engine.compute_risk(id, org_id)
    return risk_data

@router.post("/evaluate", response_model=schemas.ComplianceResultResponse)
async def evaluate_compliance(
    request: schemas.ComplianceEvaluateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(RequirePermissions(["compliance.execute"]))
) -> Any:
    """
    Triggers a GraphRAG evaluation against a specific regulation.
    Retrieves semantic chunks of the regulation, merges with equipment topology, 
    and checks for compliance gaps.
    """
    logger.info(f"User {current_user.id} running Compliance Eval on {request.equipment_tag} against '{request.target_regulation}'")
    org_id = str(current_user.org_id)
    
    eval_results = await compliance_evaluator.evaluate_asset(
        equipment_tag=request.equipment_tag,
        target_regulation=request.target_regulation,
        org_id=org_id
    )
    
    return eval_results

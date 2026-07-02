from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Any

from app.db.session import get_db
from app.core.deps import get_current_active_user
from app.models import User, DashboardLayout
from app.domains.dashboard import schemas
import json

router = APIRouter()

@router.get("/layout")
async def get_dashboard_layout(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Fetch the saved drag-and-drop dashboard layout for the current user."""
    query = select(DashboardLayout).where(DashboardLayout.user_id == current_user.id, DashboardLayout.is_default == True)
    result = await db.execute(query)
    layout = result.scalars().first()
    
    if layout:
        return {"layout": layout.layout_data}
    
    # Return default layout if none exists
    default_layout = [
        {"i": "AIBriefing", "x": 0, "y": 0, "w": 12, "h": 2},
        {"i": "KPIGrid", "x": 0, "y": 2, "w": 12, "h": 2},
        {"i": "AssetHealth", "x": 0, "y": 4, "w": 6, "h": 4},
        {"i": "MaintenanceTrend", "x": 6, "y": 4, "w": 6, "h": 4},
        {"i": "RecentFailures", "x": 0, "y": 8, "w": 12, "h": 3}
    ]
    return {"layout": default_layout}

@router.post("/layout")
async def save_dashboard_layout(
    layout_in: schemas.LayoutSaveRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Saves the user's customized drag-and-drop widget coordinates."""
    query = select(DashboardLayout).where(DashboardLayout.user_id == current_user.id, DashboardLayout.is_default == True)
    result = await db.execute(query)
    layout = result.scalars().first()
    
    if layout:
        layout.layout_data = layout_in.layout_data
    else:
        layout = DashboardLayout(
            user_id=current_user.id,
            is_default=True,
            name="My Dashboard",
            layout_data=layout_in.layout_data
        )
        db.add(layout)
        
    await db.commit()
    return {"status": "success"}

@router.get("/kpis", response_model=schemas.DashboardSummary)
async def get_dashboard_kpis(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Returns mocked aggregate KPI metrics scoped to the user's org.
    (Real aggregation logic will be injected here once Asset/Incident tables are fully seeded)
    """
    return schemas.DashboardSummary(
        org_id=str(current_user.org_id),
        assets=[
            {"title": "Total Assets", "value": 1420, "trend": "+12", "status": "good"},
            {"title": "Critical Equipment", "value": 45, "trend": "Stable", "status": "warning"},
            {"title": "Availability", "value": "98.4%", "trend": "+0.2%", "status": "good"}
        ],
        maintenance=[
            {"title": "Open Work Orders", "value": 84, "trend": "-5", "status": "good"},
            {"title": "Overdue", "value": 12, "trend": "+3", "status": "warning"}
        ],
        ai_usage=[
            {"title": "AI Queries Today", "value": 1250, "trend": "+15%", "status": "good"},
            {"title": "Documents Analyzed", "value": 340, "trend": "+120", "status": "good"}
        ],
        compliance=[
            {"title": "Compliance Score", "value": "94%", "trend": "+1%", "status": "good"},
            {"title": "Open Findings", "value": 2, "trend": "-1", "status": "good"}
        ]
    )

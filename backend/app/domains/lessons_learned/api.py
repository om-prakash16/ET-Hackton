from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from app.domains.lessons_learned.engine import lessons_engine
# from sqlalchemy.ext.asyncio import AsyncSession
# from app.db.session import get_db

router = APIRouter()

# Mocking historical lessons for the hackathon UI
MOCK_LESSONS = [
    {
        "id": "1",
        "title": "Corrosion in Cooling Water Pipeline C-200",
        "summary": "Repeated pinhole leaks observed in cooling water pipelines near the primary heat exchanger.",
        "business_impact": "$45,000 in repair costs and partial shutdowns.",
        "root_cause": "Localized galvanic corrosion due to dissimilar metals (carbon steel and copper alloys) without proper insulation joints.",
        "contributing_factors": ["High water conductivity", "Missing isolation gaskets"],
        "risk_score": 7.2,
        "confidence_score": 0.98,
        "recommendations": ["Install dielectric insulation kits on all flanged connections between dissimilar metals."],
        "preventive_actions": ["Update installation SOP to mandate dielectric kits.", "Add galvanic inspection to annual PM."],
        "created_at": "2024-02-15T10:00:00Z"
    },
    {
        "id": "2",
        "title": "Valve V-305 Actuator Failure",
        "summary": "Pneumatic actuators on control valve V-305 failing to stroke fully.",
        "business_impact": "Process control instability causing quality deviations.",
        "root_cause": "Instrument air contamination (moisture/oil) freezing or gumming up the actuator internals during winter.",
        "contributing_factors": ["Sub-zero winter temperatures", "Dryer malfunction on air compressor"],
        "risk_score": 6.5,
        "confidence_score": 0.85,
        "recommendations": ["Install localized air filter/regulator with auto-drain.", "Heat trace the instrument air lines."],
        "preventive_actions": ["Add dew point check to daily operator rounds."],
        "created_at": "2023-11-20T08:30:00Z"
    }
]

@router.get("/")
async def get_all_lessons() -> List[Dict[str, Any]]:
    """Fetch all historical lessons learned."""
    # In production: return db.query(Lesson).all()
    return MOCK_LESSONS

@router.post("/analyze")
async def trigger_historical_analysis() -> Dict[str, Any]:
    """
    Trigger the Gemini AI to analyze all organizational history and external DBs
    to discover new lessons and patterns.
    """
    new_insight = await lessons_engine.run_historical_analysis()
    # In production: save to database here
    # db.add(Lesson(**new_insight))
    return {
        "status": "success",
        "message": "Analysis complete.",
        "new_insight": new_insight
    }

@router.get("/tenant/dashboard")
async def get_tenant_dashboard() -> Dict[str, Any]:
    """Mock metrics for the organization workspace dashboard."""
    return {
        "metrics": {
            "total_lessons": 142,
            "new_lessons": 3,
            "critical_lessons": 12,
            "risk_alerts": 4,
            "preventive_recommendations": 84,
            "repeated_failures": 18,
            "similar_incidents": 56,
            "knowledge_articles": 312,
            "assets_at_risk": 7,
            "departments_at_risk": 2,
            "pending_reviews": 15,
            "completed_actions": 240,
            "knowledge_coverage": "92%",
            "average_confidence": 0.89,
            "recommendation_success": "86%"
        }
    }

@router.get("/tenant/insights")
async def get_tenant_insights() -> Dict[str, Any]:
    """Fetch 'Today's AI Insights' feed for the tenant."""
    return {
        "insights": [
            {
                "type": "Critical Risk",
                "title": "Bearing failure pattern detected on P-101 class pumps",
                "department": "Maintenance",
                "time": "2 hours ago"
            },
            {
                "type": "Quality Alert",
                "title": "Temperature fluctuations causing 12% increase in NCRs",
                "department": "Quality",
                "time": "5 hours ago"
            },
            {
                "type": "Preventive Action",
                "title": "AI suggests modifying SOP-442 to include vibration check",
                "department": "Reliability",
                "time": "1 day ago"
            }
        ]
    }

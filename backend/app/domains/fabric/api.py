from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

@router.get("/dashboard")
async def get_fabric_dashboard() -> Dict[str, Any]:
    """Returns the Digital Workforce roster and automated Operations Plan."""
    return {
        "workforce": [
            {
                "id": "AI-001",
                "name": "Gemini Maintenance Agent",
                "type": "AI_AGENT",
                "status": "WORKING",
                "current_task": "Drafting Predictive WO for Pump P-101A",
                "efficiency": "99.8%"
            },
            {
                "id": "AI-002",
                "name": "Gemini Quality Agent",
                "type": "AI_AGENT",
                "status": "WORKING",
                "current_task": "Correlating Flowmeter drifts across 3 plants",
                "efficiency": "99.9%"
            },
            {
                "id": "HUM-088",
                "name": "Sarah Jenkins",
                "type": "HUMAN",
                "status": "ONLINE",
                "current_task": "Reviewing CAPA-882 (Pending Approval)",
                "efficiency": "N/A"
            }
        ],
        "operations_plan": [
            {
                "id": "PLAN-771",
                "title": "Q3 API 610 Seal Replacement Campaign",
                "type": "MAINTENANCE",
                "generated_by": "Gemini Master Orchestrator",
                "status": "AI_DRAFTED",
                "trigger": "Aggregated vibration anomalies detected by Digital Twin.",
                "human_approval_required": True,
                "scheduled_date": "Next Tuesday"
            },
            {
                "id": "PLAN-772",
                "title": "Emergency Winterization Audit",
                "type": "INSPECTION",
                "generated_by": "Safety & Compliance Agent",
                "status": "EXECUTING",
                "trigger": "Weather API forecast correlated with historical freeze failures.",
                "human_approval_required": False, # Fast-tracked by automation rule
                "scheduled_date": "Today"
            }
        ]
    }

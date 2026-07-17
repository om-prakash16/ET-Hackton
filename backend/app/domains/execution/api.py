from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

# Mock in-memory state for Hackathon demo
DEMO_STATE = {
    "total_roi": 142500,
    "downtime_saved_hours": 124,
    "success_rate": 0.88,
    "open_tasks": 12,
    "tasks": [
        {
            "id": "REC-9001",
            "title": "Upgrade P-101A Primary Seal to API Plan 53B",
            "status": "EXECUTED", # Needs Verification
            "asset": "P-101A",
            "owner": "J. Smith",
            "expected_roi": 45000,
            "downtime_prevention": 24
        },
        {
            "id": "REC-9002",
            "title": "Recalibrate Flowmeter F-203 based on ISO 50001",
            "status": "PENDING",
            "asset": "F-203",
            "owner": "A. Gupta",
            "expected_roi": 5000,
            "downtime_prevention": 4
        }
    ]
}

@router.get("/dashboard")
async def get_execution_dashboard() -> Dict[str, Any]:
    """Returns the closed-loop execution and ROI metrics."""
    return {
        "metrics": {
            "total_roi_saved": DEMO_STATE["total_roi"],
            "downtime_saved_hours": DEMO_STATE["downtime_saved_hours"],
            "recommendation_success_rate": DEMO_STATE["success_rate"],
            "open_recommendations": DEMO_STATE["open_tasks"],
        },
        "scorecard": {
            "reliability_score": 92,
            "safety_score": 98,
            "ai_adoption": 85,
            "execution_speed_hrs": 42
        },
        "tasks": DEMO_STATE["tasks"]
    }

@router.post("/{task_id}/verify")
async def verify_execution(task_id: str) -> Dict[str, Any]:
    """
    Simulates the Verification Step in the Closed-Loop System.
    Updates ROI and marks task as VERIFIED.
    """
    for task in DEMO_STATE["tasks"]:
        if task["id"] == task_id:
            if task["status"] != "VERIFIED":
                task["status"] = "VERIFIED"
                # Add to total ROI
                DEMO_STATE["total_roi"] += task["expected_roi"]
                DEMO_STATE["downtime_saved_hours"] += task["downtime_prevention"]
                
                return {
                    "status": "success",
                    "message": "Task verified. ROI captured and AI learning loop updated.",
                    "new_roi": DEMO_STATE["total_roi"]
                }
                
    return {"status": "error", "message": "Task not found."}

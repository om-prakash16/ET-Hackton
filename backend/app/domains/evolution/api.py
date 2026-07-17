from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

# Mock State for Demo
DEMO_STATE = {
    "gaps": [
        {
            "id": "GAP-881",
            "type": "Missing SOP",
            "description": "Standard Operating Procedure for Winterization of API 610 Pumps is missing.",
            "severity": "HIGH",
            "ai_can_generate": True,
            "status": "OPEN"
        },
        {
            "id": "GAP-882",
            "type": "Missing Vendor Manual",
            "description": "Maintenance manual for Compressor C-202 is outdated by 6 years.",
            "severity": "MEDIUM",
            "ai_can_generate": False,
            "status": "OPEN"
        },
        {
            "id": "GAP-883",
            "type": "Training Required",
            "description": "New recurring failure pattern on Flowmeter calibration detected. No training module exists.",
            "severity": "HIGH",
            "ai_can_generate": True,
            "status": "OPEN"
        }
    ]
}

@router.get("/dashboard")
async def get_evolution_dashboard() -> Dict[str, Any]:
    """Returns knowledge evolution metrics, gaps, and leaderboards."""
    return {
        "metrics": {
            "knowledge_maturity_score": 84,
            "knowledge_growth_ytd": "+22%",
            "active_gaps_detected": len([g for g in DEMO_STATE["gaps"] if g["status"] == "OPEN"]),
            "lessons_auto_merged": 14
        },
        "gaps": DEMO_STATE["gaps"],
        "leaderboard": [
            {"rank": 1, "name": "Sarah Jenkins", "role": "Reliability Eng", "lessons": 45, "score": 1250},
            {"rank": 2, "name": "Michael Chang", "role": "Maint. Manager", "lessons": 32, "score": 980},
            {"rank": 3, "name": "Elena Rodriguez", "role": "Quality Control", "lessons": 28, "score": 850},
            {"rank": 4, "name": "AI Orchestrator", "role": "Gemini Engine", "lessons": 142, "score": 5050}
        ]
    }

@router.post("/generate-gap/{gap_id}")
async def generate_gap_content(gap_id: str) -> Dict[str, Any]:
    """Simulates Gemini generating missing knowledge (e.g., an SOP)."""
    for gap in DEMO_STATE["gaps"]:
        if gap["id"] == gap_id:
            if gap["ai_can_generate"]:
                gap["status"] = "GENERATING"
                return {
                    "status": "success",
                    "message": f"Gemini is now generating: {gap['description']}. It will be sent for review shortly."
                }
            else:
                return {"status": "error", "message": "AI cannot generate this (e.g., requires external vendor upload)."}
    return {"status": "error", "message": "Gap not found."}

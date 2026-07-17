from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter()

MOCK_AUDIT_LOGS = [
    {
        "id": "DEC-9921",
        "type": "Recommendation",
        "title": "Replace Primary Seal on P-101A",
        "confidence": 0.96,
        "risk_level": "High",
        "timestamp": "10 minutes ago",
        "model": "gemini-1.5-pro",
        "prompt_version": "v2.1.4",
        "reasoning": "Historical pattern matching found 3 similar high-temperature incidents preceding seal failures on API 610 pumps.",
        "citations": [
            {"source": "OEM Manual Vol 2.", "page": "45", "relevance": "High"},
            {"source": "Incident Report INC-2023-08", "page": "1", "relevance": "Direct Match"},
            {"source": "Maintenance History P-101A", "page": "N/A", "relevance": "Asset Context"}
        ],
        "hallucination_flag": False
    },
    {
        "id": "DEC-9920",
        "type": "Lesson Generated",
        "title": "Winterization Protocol Failure",
        "confidence": 0.88,
        "risk_level": "Medium",
        "timestamp": "2 hours ago",
        "model": "gemini-1.5-pro",
        "prompt_version": "v2.1.4",
        "reasoning": "Detected anomalous freezing events despite active heat tracing circuits.",
        "citations": [
            {"source": "SOP-14: Winterization", "page": "12", "relevance": "High"}
        ],
        "hallucination_flag": False
    },
    {
        "id": "DEC-9915",
        "type": "Risk Assessment",
        "title": "Valve V-305 Vibration Anomaly",
        "confidence": 0.62,
        "risk_level": "Low",
        "timestamp": "1 day ago",
        "model": "gemini-1.5-flash",
        "prompt_version": "v1.8",
        "reasoning": "Vibration data shows slight deviance, but lack of acoustic emission data lowers confidence.",
        "citations": [],
        "hallucination_flag": True, # Simulated flag for low confidence
        "hallucination_reason": "Missing citations. Unsupported claim regarding acoustic emission baselines."
    }
]

@router.get("/dashboard")
async def get_trust_dashboard() -> Dict[str, Any]:
    """Returns top level governance metrics for the Trust Center."""
    return {
        "metrics": {
            "average_confidence": 0.91,
            "decisions_audited": 1450,
            "hallucination_alerts": 3,
            "manual_reviews_pending": 4,
            "tokens_consumed": "1.2M",
            "active_prompt_version": "v2.1.4"
        },
        "recent_decisions": MOCK_AUDIT_LOGS
    }

@router.get("/decision/{decision_id}")
async def get_decision_explainer(decision_id: str) -> Dict[str, Any]:
    """Returns the full explainability trace for a single AI decision."""
    for log in MOCK_AUDIT_LOGS:
        if log["id"] == decision_id:
            return log
    return {"error": "Decision trace not found."}

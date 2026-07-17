from fastapi import APIRouter
from typing import Dict, Any, List
from app.domains.pattern_detection.engine import pattern_engine

router = APIRouter()

# Mock storage for discovered patterns in the hackathon
DISCOVERED_PATTERNS = []

@router.get("/patterns")
async def get_patterns() -> List[Dict[str, Any]]:
    """Fetch all automatically discovered patterns."""
    return DISCOVERED_PATTERNS

@router.post("/patterns/run")
async def trigger_pattern_cycle() -> Dict[str, Any]:
    """Manually force the background engine to run a cycle for the demo."""
    new_pattern = await pattern_engine.run_pattern_detection_cycle()
    DISCOVERED_PATTERNS.append(new_pattern)
    return {
        "status": "success",
        "message": "AI Pattern Detection cycle completed.",
        "discovered_pattern": new_pattern
    }

@router.get("/recommendations")
async def get_recommendations() -> List[Dict[str, Any]]:
    """Extract and return all recommendations from the discovered patterns."""
    recs = []
    for pattern in DISCOVERED_PATTERNS:
        if "recommendation" in pattern:
            recs.append(pattern["recommendation"])
    return recs

@router.get("/risk-analysis")
async def get_risk_analysis() -> Dict[str, Any]:
    """Return aggregated risk scores based on patterns."""
    return {
        "high_risk_assets": ["P-101A", "V-305"],
        "critical_patterns": len([p for p in DISCOVERED_PATTERNS if p["risk_score"] > 8.0])
    }

# Mocking continuous learning log for the hackathon
CONTINUOUS_LEARNING_LOG = []

@router.post("/recommendations/{recommendation_id}/feedback")
async def submit_recommendation_feedback(recommendation_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Submit user feedback on an AI recommendation. 
    This triggers the Continuous Learning Loop (Part 7).
    """
    user_action = payload.get("action", "UNKNOWN")
    
    # Store the feedback for the learning engine
    feedback_entry = {
        "recommendation_id": recommendation_id,
        "action": user_action,
        "prompt_version": "v2.1",
        "confidence": 0.95,
        "timestamp": "Just Now",
        "impact": "Improves future pattern precision by 2%."
    }
    
    CONTINUOUS_LEARNING_LOG.insert(0, feedback_entry)
    
    return {
        "status": "success",
        "message": f"Feedback '{user_action}' recorded. AI models updated.",
        "feedback": feedback_entry
    }

@router.get("/decisions/learning-loop")
async def get_learning_loop() -> List[Dict[str, Any]]:
    """Fetch the recent human-in-the-loop AI corrections."""
    return CONTINUOUS_LEARNING_LOG

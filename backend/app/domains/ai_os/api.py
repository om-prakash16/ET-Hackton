from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

@router.get("/command-center")
async def get_command_center() -> Dict[str, Any]:
    """Returns top level KPIs and autonomous feed for the AI OS Command Center."""
    return {
        "metrics": {
            "overall_asset_health": "94%",
            "knowledge_growth": "+12%",
            "safety_score": "99.8%",
            "ai_roi_savings": "$1.2M"
        },
        "autonomous_feed": [
            {
                "id": "AUTO-441",
                "agent": "Maintenance Agent",
                "action": "Generated Predictive Work Order WO-9921",
                "reason": "Vibration anomaly detected on P-101A. Correlated with 2021 seal failure.",
                "time": "5 mins ago"
            },
            {
                "id": "AUTO-440",
                "agent": "Quality Agent",
                "action": "Generated CAPA-882",
                "reason": "Detected recurring Flowmeter calibration drifts across 3 plants.",
                "time": "1 hour ago"
            },
            {
                "id": "AUTO-439",
                "agent": "Knowledge Agent",
                "action": "Drafted New Winterization SOP",
                "reason": "Identified knowledge gap in preparation for upcoming freeze event.",
                "time": "3 hours ago"
            }
        ]
    }

@router.get("/copilot/{role}")
async def get_copilot_summary(role: str) -> Dict[str, Any]:
    """Returns a tailored Gemini summary based on the user's role."""
    
    summaries = {
        "executive": {
            "greeting": "Executive Summary",
            "insights": [
                "Overall enterprise asset health is strong at 94%.",
                "Recent AI-driven predictive maintenance on C-202 saved an estimated $400k in downtime.",
                "Vendor risk is low, though seal failures from FlowServe remain a minor trend."
            ],
            "focus": "Strategic ROI & Enterprise Risk"
        },
        "plant_head": {
            "greeting": "Plant Operations Summary",
            "insights": [
                "Production is on track. No immediate safety concerns.",
                "Pump P-101A is showing signs of early seal wear. A predictive work order has been auto-scheduled for the night shift.",
                "3 inspection tasks are overdue in the utilities sector."
            ],
            "focus": "Daily Operations & Bottlenecks"
        },
        "engineer": {
            "greeting": "Engineering & Reliability Summary",
            "insights": [
                "Vibration signature on P-101A exactly matches the failure profile from incident INC-2021-04.",
                "Recommended action: Replace mechanical seal and verify alignment. Torque specs: 45 Nm.",
                "I have attached the updated OEM manual and historical RCA for your review."
            ],
            "focus": "Technical Root Cause & Actionable Repairs"
        }
    }
    
    return summaries.get(role, summaries["executive"])

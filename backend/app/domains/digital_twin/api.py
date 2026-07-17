from fastapi import APIRouter
from typing import Dict, Any
import random

router = APIRouter()

@router.get("/dashboard")
async def get_digital_twin_dashboard() -> Dict[str, Any]:
    """Returns digital twin overview and live asset states."""
    return {
        "metrics": {
            "assets_online": 142,
            "sensors_active": 1250,
            "critical_alerts": 1,
            "energy_consumption_kw": "4,200"
        },
        "twins": [
            {
                "id": "TWIN-P101A",
                "name": "Boiler Feed Pump P-101A",
                "health": 92,
                "status": "ONLINE",
                "telemetry": {
                    "vibration_mm": 2.1,
                    "bearing_temp_c": 65,
                    "flow_rate_m3": 120
                }
            },
            {
                "id": "TWIN-C202",
                "name": "Main Compressor C-202",
                "health": 88,
                "status": "ONLINE",
                "telemetry": {
                    "vibration_mm": 1.4,
                    "bearing_temp_c": 72,
                    "pressure_bar": 45
                }
            }
        ],
        "alerts": [
            {
                "id": "ALT-992",
                "twin_name": "Cooling Tower CT-1",
                "severity": "MEDIUM",
                "message": "Water level dropping below optimal threshold.",
                "ai_insight": "Correlates with valve V-44 sticking history.",
                "timestamp": "10 mins ago"
            }
        ]
    }

@router.post("/simulate-anomaly")
async def trigger_anomaly_simulation() -> Dict[str, Any]:
    """Simulates a sudden IoT spike causing Gemini to predict a failure."""
    return {
        "status": "anomaly_triggered",
        "twin_id": "TWIN-P101A",
        "simulated_telemetry": {
            "vibration_mm": 8.5, # Critical Spike
            "bearing_temp_c": 110 # Critical Spike
        },
        "ai_prediction": {
            "event": "Sudden Bearing Vibration Spike",
            "prediction": "Catastrophic seal failure highly likely within 4 hours.",
            "knowledge_match": "Matches incident pattern INC-2021-04 on similar API 610 pumps.",
            "recommendation": "Automatically shutting down P-101A. Auto-generating WO for bearing replacement."
        }
    }

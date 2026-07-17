from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

@router.get("/dashboard")
async def get_network_dashboard() -> Dict[str, Any]:
    """Returns active B2B connections and federated cross-organization activity."""
    return {
        "connections": [
            {
                "id": "CONN-OEM-01",
                "name": "Siemens Global",
                "type": "OEM",
                "status": "ACTIVE",
                "shared_assets": 42
            },
            {
                "id": "CONN-REG-01",
                "name": "EPA Regulatory Node",
                "type": "REGULATOR",
                "status": "ACTIVE",
                "shared_assets": "Audit Logs Only"
            },
            {
                "id": "CONN-CON-01",
                "name": "Global Reliability Experts LLC",
                "type": "CONSULTANT",
                "status": "PENDING",
                "shared_assets": 0
            }
        ],
        "activity_feed": [
            {
                "id": "ACT-991",
                "partner": "Siemens Global",
                "action": "OEM Firmware Update Pushed",
                "details": "Critical security patch applied to Compressor C-202 Digital Twin logic controller.",
                "time": "10 mins ago"
            },
            {
                "id": "ACT-990",
                "partner": "EPA Regulatory Node",
                "action": "Automated Compliance Pull",
                "details": "Regulator successfully synced Q2 Emissions Data for Plant B via Zero Trust API.",
                "time": "2 hours ago"
            },
            {
                "id": "ACT-989",
                "partner": "FlowServe Connect",
                "action": "Service Bulletin Issued",
                "details": "New OEM maintenance template available for API 610 seal replacements.",
                "time": "1 day ago"
            }
        ]
    }

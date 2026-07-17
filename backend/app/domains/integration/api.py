from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

@router.get("/modules")
async def get_connected_modules() -> Dict[str, Any]:
    """Returns the health status of all integrated internal and external modules."""
    return {
        "status": "HEALTHY",
        "total_modules": 8,
        "modules": [
            {"id": "MOD-01", "name": "Internal Asset Module", "type": "INTERNAL", "status": "ONLINE", "latency": "12ms", "last_sync": "Just now"},
            {"id": "MOD-02", "name": "Internal Maintenance Module", "type": "INTERNAL", "status": "ONLINE", "latency": "15ms", "last_sync": "Just now"},
            {"id": "MOD-03", "name": "Internal Incident Module", "type": "INTERNAL", "status": "ONLINE", "latency": "10ms", "last_sync": "Just now"},
            {"id": "MOD-04", "name": "SAP Plant Maintenance", "type": "EXTERNAL", "status": "ONLINE", "latency": "145ms", "last_sync": "2 mins ago"},
            {"id": "MOD-05", "name": "IBM Maximo", "type": "EXTERNAL", "status": "ONLINE", "latency": "210ms", "last_sync": "5 mins ago"},
            {"id": "MOD-06", "name": "Siemens Teamcenter (PLM)", "type": "EXTERNAL", "status": "SYNCING", "latency": "850ms", "last_sync": "Syncing..."},
            {"id": "MOD-07", "name": "Aveva Historian", "type": "EXTERNAL", "status": "ONLINE", "latency": "80ms", "last_sync": "1 min ago"},
            {"id": "MOD-08", "name": "Microsoft SharePoint", "type": "EXTERNAL", "status": "ONLINE", "latency": "220ms", "last_sync": "1 hour ago"}
        ]
    }

@router.get("/events/stream")
async def get_event_stream() -> Dict[str, Any]:
    """Simulates a live event stream of knowledge syncing across the platform."""
    return {
        "events": [
            {
                "id": "EVT-9092",
                "source": "SAP Plant Maintenance",
                "type": "WORK_ORDER_CLOSED",
                "description": "WO-44921 Closed: Replaced impeller on P-101A.",
                "timestamp": "Just now",
                "routes": ["Knowledge Graph", "Lessons Engine"]
            },
            {
                "id": "EVT-9091",
                "source": "Internal Incident Module",
                "type": "INCIDENT_CREATED",
                "description": "INC-882: Minor seal leak on P-101B.",
                "timestamp": "2 mins ago",
                "routes": ["Vector Database", "Gemini Reasoning Engine"]
            },
            {
                "id": "EVT-9090",
                "source": "Aveva Historian",
                "type": "TELEMETRY_ALERT",
                "description": "High vibration detected on Compressor C-202.",
                "timestamp": "15 mins ago",
                "routes": ["Risk Center", "Maintenance Agent"]
            }
        ]
    }

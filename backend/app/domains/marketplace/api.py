from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter()

@router.get("/packages")
async def get_marketplace_packages() -> Dict[str, Any]:
    """Returns available knowledge packs and AI agents in the marketplace."""
    return {
        "featured": [
            {
                "id": "PKG-001",
                "name": "API 610 Pump Reliability Pack",
                "category": "OEM_KNOWLEDGE",
                "provider": "Global Reliability Consortium",
                "description": "Federated failure patterns, maintenance templates, and 2,000+ anonymous RCA resolutions for API 610 centrifugal pumps.",
                "downloads": "12.4k",
                "rating": 4.9,
                "is_premium": False
            },
            {
                "id": "PKG-002",
                "name": "Siemens Compressor Twin",
                "category": "DIGITAL_TWIN",
                "provider": "Siemens OEM",
                "description": "Official AI anomaly detection boundaries and Digital Twin telemetry maps for Siemens integrally geared compressors.",
                "downloads": "4.2k",
                "rating": 4.8,
                "is_premium": True
            },
            {
                "id": "PKG-003",
                "name": "Safety Incident Prompt Pack",
                "category": "PROMPT_PACK",
                "provider": "OSHA Compliance Group",
                "description": "Pre-engineered Gemini prompts designed to strictly extract root causes from unstructured near-miss and LTI reports.",
                "downloads": "28.9k",
                "rating": 4.9,
                "is_premium": False
            }
        ]
    }

@router.get("/benchmarks")
async def get_industry_benchmarks() -> Dict[str, Any]:
    """Returns federated anonymous industry benchmarks vs local tenant performance."""
    return {
        "industry": "Refining & Petrochemicals",
        "comparisons": [
            {
                "metric": "Pump MTBF (Months)",
                "local_tenant": 34.2,
                "industry_avg": 28.5,
                "top_quartile": 42.0,
                "status": "AHEAD_OF_AVG"
            },
            {
                "metric": "AI Recommendation Adoption",
                "local_tenant": 68,
                "industry_avg": 75,
                "top_quartile": 92,
                "status": "BEHIND_AVG"
            },
            {
                "metric": "Unplanned Downtime (%)",
                "local_tenant": 2.1,
                "industry_avg": 4.8,
                "top_quartile": 1.5,
                "status": "AHEAD_OF_AVG"
            }
        ]
    }

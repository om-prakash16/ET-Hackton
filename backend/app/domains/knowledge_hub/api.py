from fastapi import APIRouter
from typing import Dict, Any, List
import asyncio

router = APIRouter()

MOCK_ARTICLES = [
    {
        "id": "KA-1001",
        "title": "Vibration Analysis on P-101 Series",
        "category": "Maintenance",
        "summary": "Best practices for interpreting vibration spectrums on P-101 series pumps.",
        "author": "AI (from OEM Manual + Expert Interview)",
        "confidence": 0.98,
        "status": "PUBLISHED",
        "created_at": "2026-06-25T10:00:00Z"
    },
    {
        "id": "KA-1002",
        "title": "ISO 9001:2015 Quality Updates for Assembly Line",
        "category": "Compliance",
        "summary": "Generated from ISO updates and integrated with our internal quality control manual.",
        "author": "AI (from ISO Standards)",
        "confidence": 0.99,
        "status": "PUBLISHED",
        "created_at": "2026-06-28T14:30:00Z"
    }
]

@router.get("/")
async def list_knowledge_articles() -> List[Dict[str, Any]]:
    """Fetch all knowledge articles."""
    return MOCK_ARTICLES

@router.post("/generate-training")
async def generate_training_guide(request: Dict[str, Any]) -> Dict[str, Any]:
    """
    Simulate Gemini taking an expert note/interview and converting it into a training guide.
    """
    source_material = request.get("source_material", "Unknown")
    
    # Simulate Gemini processing delay
    await asyncio.sleep(2)
    
    new_article = {
        "id": f"KA-100{len(MOCK_ARTICLES) + 1}",
        "title": f"Training Guide: {source_material[:30]}...",
        "category": "Training",
        "summary": "Automatically generated training module with assessment questions.",
        "author": "AI (Training Generator)",
        "confidence": 0.92,
        "status": "DRAFT",
        "created_at": "Just Now"
    }
    
    MOCK_ARTICLES.insert(0, new_article)
    
    return {
        "status": "success",
        "message": "Training guide generated successfully.",
        "article": new_article
    }

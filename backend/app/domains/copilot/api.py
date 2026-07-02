from typing import Any
import logging
import time
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.domains.copilot import schemas
from app.domains.copilot.service import CopilotService

logger = logging.getLogger("IndustrialBrain.Copilot")
router = APIRouter()
copilot_service = CopilotService()

@router.post("/chat", response_model=schemas.ChatResponse)
async def chat_with_copilot(
    request: schemas.ChatRequest,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Industrial GraphRAG Endpoint.
    Takes a natural language query, extracts entities, searches Neo4j for topological evidence, 
    and synthesizes via Gemini LLM.
    """
    start_time = time.time()
    logger.info(f"Copilot query received: {request.query}")
    
    # 1. Process Query via GraphRAG (LLM + Neo4j)
    result = await copilot_service.process_query(request.query, "default_session")
    
    # 2. Format Output Citations
    citations = []
    for citation_text in result.get("citations", []):
        citations.append(
            schemas.Citation(
                document_id=citation_text,
                chunk_index=0,
                text_snippet="",
                confidence=1.0
            )
        )
        
    g_ev = schemas.GraphEvidence(
        nodes_traversed=[str(result.get("context", {}).get("graph_nodes_traversed", 0))],
        relationships=result.get("context", {}).get("entities_identified", [])
    )
    
    processing_time_ms = int((time.time() - start_time) * 1000)
    
    return schemas.ChatResponse(
        answer=result["response"],
        confidence_score=0.95,
        citations=citations,
        graph_evidence=g_ev,
        processing_time_ms=processing_time_ms
    )

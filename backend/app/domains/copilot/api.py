from typing import Any
import logging
import time
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_active_user
from app.core.rbac import RequirePermissions
from app.db.session import get_db
from app.models.user import User
from app.domains.copilot import schemas
from app.services.retrieval import retrieval_engine
from app.services.context import context_builder
from app.services.llm import llm_provider

logger = logging.getLogger("IndustrialBrain.Copilot")
router = APIRouter()

@router.post("/chat", response_model=schemas.ChatResponse)
async def chat_with_copilot(
    request: schemas.ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(RequirePermissions(["copilot.use"]))
) -> Any:
    """
    Industrial GraphRAG Endpoint.
    Takes a natural language query, searches Qdrant for semantic evidence,
    searches Neo4j for topological evidence, and fuses them via an LLM to generate an answer.
    """
    start_time = time.time()
    logger.info(f"User {current_user.id} asked Copilot: {request.query}")
    
    org_id = str(current_user.org_id)
    
    # 1. Hybrid Retrieval
    semantic_evidence = await retrieval_engine.search_vectors(request.query, org_id)
    graph_evidence = await retrieval_engine.search_graph(org_id, request.query)
    
    # 2. Context Building
    system_prompt = context_builder.build_system_prompt()
    context = context_builder.build_context(semantic_evidence, graph_evidence)
    
    # 3. LLM Generation
    answer = await llm_provider.generate_response(system_prompt, context, request.query)
    
    # 4. Format Output Citations
    citations = []
    for v in semantic_evidence:
        citations.append(
            schemas.Citation(
                document_id=v["document_id"] or "unknown",
                chunk_index=v["chunk_index"] or 0,
                text_snippet=v["text"][:100] if v["text"] else "",
                confidence=v["score"]
            )
        )
        
    g_ev = schemas.GraphEvidence(
        nodes_traversed=graph_evidence["nodes"],
        relationships=graph_evidence["edges"]
    )
    
    processing_time_ms = int((time.time() - start_time) * 1000)
    
    return schemas.ChatResponse(
        answer=answer,
        confidence_score=0.92, # Simulated LLM confidence
        citations=citations,
        graph_evidence=g_ev,
        processing_time_ms=processing_time_ms
    )

import logging
import time
import json
from typing import Dict, Any, List
from app.services.retrieval import retrieval_engine
from google import genai
from pydantic import BaseModel
from app.core.config import settings
from app.db.qms_mock import get_qms_standard

logger = logging.getLogger(__name__)

try:
    client = genai.Client(api_key=settings.AI_API_KEY)
except Exception:
    client = None

class ComplianceGap(BaseModel):
    gap_type: str
    description: str
    severity: str
    regulatory_reference: str

class ComplianceEvaluationResult(BaseModel):
    status: str
    gaps: list[ComplianceGap]

class ComplianceEvaluator:
    """
    Evaluates industrial assets against targeted regulations using GraphRAG and QMS mock.
    """

    async def evaluate_asset(self, equipment_tag: str, target_regulation: str, org_id: str) -> Dict[str, Any]:
        start_time = time.time()
        logger.info(f"Evaluating {equipment_tag} against {target_regulation}")
        
        qms_standard = get_qms_standard(target_regulation)
        rules_text = "\n".join([f"- {r}" for r in qms_standard.get("rules", [])])
        
        # 1. Targeted GraphRAG Retrieval for Equipment history
        query = f"Maintenance history, work orders, and incident reports for {equipment_tag}"
        semantic_evidence = await retrieval_engine.search_vectors(query, org_id, limit=5)
        graph_evidence = await retrieval_engine.search_graph(org_id, equipment_tag)
        
        context = "--- GRAPH EVIDENCE ---\n"
        context += json.dumps(graph_evidence, indent=2) + "\n\n"
        context += "--- SEMANTIC EVIDENCE ---\n"
        for v in semantic_evidence:
            context += f"- {v['text']}\n"
            
        # 2. Build the Evaluator Prompt
        evaluator_prompt = f"""
        You are a strict Industrial Compliance Auditor.
        Evaluate {equipment_tag} against the {target_regulation} standard.
        
        Rules to check:
        {rules_text}
        
        Context Data (Graph & Documents):
        {context}
        
        Determine if it is 'Compliant', 'Non-Compliant', or 'Partially Compliant'.
        Extract any gaps based on missing evidence for the required rules.
        Map gaps to severity levels (HIGH, MEDIUM, LOW).
        Do NOT invent evidence. If something required is not in the context, it is a gap.
        """
        
        status = "Unknown"
        gaps = []
        confidence_score = 0.0
        
        if client:
            try:
                response = client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=evaluator_prompt,
                    config={
                        'response_mime_type': 'application/json',
                        'response_schema': ComplianceEvaluationResult,
                        'temperature': 0.1
                    },
                )
                parsed_data = response.parsed
                status = parsed_data.status
                gaps = [g.model_dump() for g in parsed_data.gaps]
                confidence_score = 0.92
            except Exception as e:
                logger.error(f"Failed to run LLM compliance check: {e}")
                status = "Error"
        else:
            logger.warning("GenAI client not available. Returning empty check.")
            
        processing_time_ms = int((time.time() - start_time) * 1000)
        
        return {
            "equipment_tag": equipment_tag,
            "status": status,
            "confidence_score": confidence_score,
            "gaps": gaps,
            "evidence_citations": [f"Qdrant-Chunk-{v['chunk_index']}" for v in semantic_evidence],
            "processing_time_ms": processing_time_ms
        }

compliance_evaluator = ComplianceEvaluator()

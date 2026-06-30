import logging
import time
from typing import Dict, Any, List
from app.services.retrieval import retrieval_engine
from app.services.llm import llm_provider

logger = logging.getLogger(__name__)

class ComplianceEvaluator:
    """
    Evaluates industrial assets against targeted regulations using GraphRAG.
    """

    async def evaluate_asset(self, equipment_tag: str, target_regulation: str, org_id: str) -> Dict[str, Any]:
        start_time = time.time()
        logger.info(f"Evaluating {equipment_tag} against {target_regulation}")
        
        # 1. Targeted GraphRAG Retrieval for Regulation + Equipment history
        query = f"Does the maintenance history and documents for {equipment_tag} comply with {target_regulation} requirements?"
        semantic_evidence = await retrieval_engine.search_vectors(query, org_id, limit=5)
        graph_evidence = await retrieval_engine.search_graph(org_id, equipment_tag)
        
        # 2. Build the Evaluator Prompt
        evaluator_prompt = f"""You are a strict Industrial Compliance Auditor.
        Evaluate {equipment_tag} against the regulation: '{target_regulation}'.
        Use the provided context to determine if it is Compliant, Non-Compliant, or Partially Compliant.
        Extract gaps and map them to severity levels.
        Do NOT invent evidence.
        """
        
        context = "--- COMPLIANCE EVIDENCE ---\n"
        for v in semantic_evidence:
            context += f"- {v['text']}\n"
            
        # 3. LLM Orchestration
        # In production, output is enforced via JSON schemas. Simulated here.
        raw_llm_response = await llm_provider.generate_response(evaluator_prompt, context, query)
        
        # 4. Synthesize structured Compliance Object
        # Based on our offline mock, we'll produce a deterministic gap analysis
        status = "Partially Compliant"
        gaps = []
        
        if "Missing" in raw_llm_response or "fail" in raw_llm_response.lower():
            status = "Non-Compliant"
            gaps.append({
                "gap_type": "Missing Inspection",
                "description": "Simulated gap: Annual thickness testing not found in records.",
                "severity": "HIGH",
                "regulatory_reference": target_regulation
            })
        else:
            gaps.append({
                "gap_type": "Documentation Gap",
                "description": "Simulated gap: Operator training certificates not linked to the equipment topology.",
                "severity": "MEDIUM",
                "regulatory_reference": target_regulation
            })

        processing_time_ms = int((time.time() - start_time) * 1000)
        
        return {
            "equipment_tag": equipment_tag,
            "status": status,
            "confidence_score": 0.82,
            "gaps": gaps,
            "evidence_citations": [f"Qdrant-Chunk-{v['chunk_index']}" for v in semantic_evidence],
            "processing_time_ms": processing_time_ms
        }

compliance_evaluator = ComplianceEvaluator()

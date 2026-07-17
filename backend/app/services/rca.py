import logging
import time
import json
from typing import Dict, Any, List
from app.services.retrieval import retrieval_engine
from google import genai
from pydantic import BaseModel
from app.core.config import settings

logger = logging.getLogger(__name__)

try:
    client = genai.Client(api_key=settings.AI_API_KEY)
except Exception:
    client = None

class Recommendation(BaseModel):
    action: str
    priority: str
    evidence_citation: str

class RootCauseAnalysisResult(BaseModel):
    probable_root_causes: list[str]
    contributing_factors: list[str]
    recommendations: list[Recommendation]

class RootCauseAnalyzer:
    """
    Executes a specialized GraphRAG retrieval to deduce root causes of equipment failures.
    """

    async def analyze_failure(self, equipment_tag: str, failure_symptom: str, org_id: str) -> Dict[str, Any]:
        start_time = time.time()
        logger.info(f"Initiating RCA for {equipment_tag}: {failure_symptom}")
        
        # 1. Targeted GraphRAG Retrieval
        query = f"Causes and historical incidents related to {failure_symptom} on equipment {equipment_tag}"
        semantic_evidence = await retrieval_engine.search_vectors(query, org_id, limit=5)
        graph_evidence = await retrieval_engine.search_graph(org_id, equipment_tag) # Expand specific equipment node
        
        context = "--- GRAPH EVIDENCE ---\n"
        context += json.dumps(graph_evidence, indent=2) + "\n\n"
        context += "--- SEMANTIC EVIDENCE ---\n"
        for v in semantic_evidence:
            context += f"- {v['text']}\n"
            
        # 2. RCA Context Builder
        rca_prompt = f"""You are an Industrial Root Cause Analysis (RCA) Expert.
        Analyze the provided context regarding the failure symptom: '{failure_symptom}' on '{equipment_tag}'.
        Return your findings as structured data containing probable root causes and recommended actions.
        Ensure every recommendation cites a specific piece of evidence from the context.
        Do NOT invent evidence. If there isn't enough context, state that as a root cause limit.
        
        Context Data:
        {context}
        """
        
        probable_root_causes = []
        contributing_factors = []
        recommendations = []
        confidence_score = 0.0
        
        # 3. LLM Orchestration
        if client:
            try:
                response = client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=rca_prompt,
                    config={
                        'response_mime_type': 'application/json',
                        'response_schema': RootCauseAnalysisResult,
                        'temperature': 0.2
                    },
                )
                parsed_data = response.parsed
                probable_root_causes = parsed_data.probable_root_causes
                contributing_factors = parsed_data.contributing_factors
                recommendations = [r.model_dump() for r in parsed_data.recommendations]
                confidence_score = 0.88
            except Exception as e:
                logger.error(f"Failed to run LLM RCA: {e}")
                probable_root_causes = ["Error generating RCA"]
        else:
            logger.warning("GenAI client not available. Returning empty RCA.")
        
        # 4. Synthesize structured RCA Object
        processing_time_ms = int((time.time() - start_time) * 1000)
        
        return {
            "equipment_tag": equipment_tag,
            "probable_root_causes": probable_root_causes,
            "contributing_factors": contributing_factors,
            "confidence_score": confidence_score,
            "graph_evidence_nodes": graph_evidence["nodes"],
            "recommendations": recommendations,
            "processing_time_ms": processing_time_ms
        }

rca_engine = RootCauseAnalyzer()

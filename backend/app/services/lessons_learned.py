import logging
import time
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

class SystemicPattern(BaseModel):
    pattern_description: str
    affected_equipment_types: list[str]
    root_cause_trend: str

class ProactiveWarning(BaseModel):
    warning_message: str
    priority: str
    recommended_mitigation: str

class LessonsLearnedResult(BaseModel):
    systemic_patterns: list[SystemicPattern]
    proactive_warnings: list[ProactiveWarning]

class LessonsLearnedEngine:
    """
    Analyzes historical incident reports and audit findings to identify 
    systemic patterns and proactively push warnings.
    """

    async def analyze_org_history(self, org_id: str, focus_area: str = "equipment failures") -> Dict[str, Any]:
        start_time = time.time()
        logger.info(f"Initiating Lessons Learned Analysis for org {org_id} on {focus_area}")
        
        # 1. Broad Vector Search for incidents, near-misses, and audits
        query = f"Historical incident reports, near-misses, and root cause audits regarding {focus_area}"
        semantic_evidence = await retrieval_engine.search_vectors(query, org_id, limit=10)
        
        context = "--- HISTORICAL EVIDENCE ---\n"
        for v in semantic_evidence:
            context += f"- {v['text']}\n"
            
        # 2. Pattern Analysis Prompt
        analysis_prompt = f"""You are an Industrial Failure Intelligence Engine.
        Analyze the historical incident reports and near-misses regarding '{focus_area}'.
        Identify systemic patterns that are invisible to individual review. 
        Generate proactive warnings for operational teams to prevent similar conditions.
        
        Context Data:
        {context}
        """
        
        systemic_patterns = []
        proactive_warnings = []
        
        # 3. LLM Orchestration
        if client:
            try:
                response = client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=analysis_prompt,
                    config={
                        'response_mime_type': 'application/json',
                        'response_schema': LessonsLearnedResult,
                        'temperature': 0.3
                    },
                )
                parsed_data = response.parsed
                systemic_patterns = [p.model_dump() for p in parsed_data.systemic_patterns]
                proactive_warnings = [w.model_dump() for w in parsed_data.proactive_warnings]
            except Exception as e:
                logger.error(f"Failed to run LLM Lessons Learned analysis: {e}")
        else:
            logger.warning("GenAI client not available. Returning empty analysis.")
            
        processing_time_ms = int((time.time() - start_time) * 1000)
        
        return {
            "focus_area": focus_area,
            "systemic_patterns": systemic_patterns,
            "proactive_warnings": proactive_warnings,
            "processing_time_ms": processing_time_ms
        }

lessons_learned_engine = LessonsLearnedEngine()

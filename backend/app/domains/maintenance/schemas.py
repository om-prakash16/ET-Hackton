from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class HealthScoreResponse(BaseModel):
    equipment_tag: str
    health_score: float # 0.0 to 100.0
    risk_level: str # LOW, MEDIUM, HIGH, CRITICAL
    factors: List[str]
    confidence_score: float

class RCARequest(BaseModel):
    equipment_tag: str
    failure_symptom: str
    include_historical_incidents: bool = True

class RecommendedAction(BaseModel):
    action: str
    priority: str # LOW, MEDIUM, HIGH
    evidence_citation: str

class RCAResponse(BaseModel):
    equipment_tag: str
    probable_root_causes: List[str]
    contributing_factors: List[str]
    confidence_score: float
    graph_evidence_nodes: List[str]
    recommendations: List[RecommendedAction]
    processing_time_ms: int

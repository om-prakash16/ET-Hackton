from pydantic import BaseModel
from typing import List, Optional

class ComplianceGap(BaseModel):
    gap_type: str # e.g. "Missing Inspection", "Expired Procedure"
    description: str
    severity: str # LOW, MEDIUM, HIGH, CRITICAL
    regulatory_reference: str

class ComplianceEvaluateRequest(BaseModel):
    equipment_tag: str
    target_regulation: str # e.g. "OISD-105"

class ComplianceResultResponse(BaseModel):
    equipment_tag: str
    status: str # Compliant, Non-Compliant, Partially Compliant
    confidence_score: float
    gaps: List[ComplianceGap]
    evidence_citations: List[str]
    processing_time_ms: int

class RiskScoreResponse(BaseModel):
    equipment_tag: str
    operational_risk: float
    regulatory_risk: float
    criticality: str
    mitigation_recommendation: str

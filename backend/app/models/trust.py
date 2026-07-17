from sqlalchemy import Column, String, Float, Text, JSON
from app.models.base import Base

class AIDecisionAudit(Base):
    __tablename__ = "ai_decision_audit_logs"

    decision_id = Column(String, index=True, nullable=False)
    decision_type = Column(String, index=True) # e.g., "LESSON", "RECOMMENDATION", "RISK_SCORE"
    
    # Traceability
    gemini_model = Column(String, default="gemini-1.5-pro")
    prompt_version = Column(String)
    prompt_template = Column(Text)
    
    # Explainability Data
    reasoning_summary = Column(Text)
    citations = Column(JSON) # List of documents/assets cited
    confidence_score = Column(Float)
    confidence_breakdown = Column(JSON) # e.g., {"historical": 0.9, "document": 0.8}
    
    # Audit
    tokens_used = Column(Float)
    processing_time_ms = Column(Float)
    tenant_id = Column(String, index=True)

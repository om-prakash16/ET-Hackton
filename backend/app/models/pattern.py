from sqlalchemy import Column, String, Float, Integer, Text, Boolean
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base

class FailurePattern(Base):
    __tablename__ = "failure_patterns"

    tenant_id = Column(String, index=True, nullable=True)
    title = Column(String, nullable=False)
    pattern_type = Column(String, index=True) # e.g., "Seasonal", "Repeated Maintenance"
    confidence_score = Column(Float, default=0.0)
    risk_score = Column(Float, default=0.0)
    
    root_cause_chain = Column(JSONB, default=list)
    affected_assets = Column(JSONB, default=list)
    historical_occurrences = Column(Integer, default=1)
    
    status = Column(String, default="ACTIVE")

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    tenant_id = Column(String, index=True, nullable=True)
    pattern_id = Column(String, index=True, nullable=True)
    action_type = Column(String, index=True) # e.g., "Maintenance", "Inspection", "Training"
    description = Column(Text, nullable=False)
    priority = Column(String, default="MEDIUM")
    
    business_impact = Column(Text)
    confidence = Column(Float, default=0.0)
    
    status = Column(String, default="PENDING") # PENDING, ACCEPTED, REJECTED, COMPLETED

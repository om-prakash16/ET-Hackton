from sqlalchemy import Column, String, Float, Integer, JSON, Boolean, DateTime
from app.models.base import Base
import datetime

class KnowledgeHealth(Base):
    __tablename__ = "knowledge_health"

    health_id = Column(String, index=True, nullable=False)
    knowledge_id = Column(String, index=True) 
    
    quality_score = Column(Float)
    confidence_score = Column(Float)
    reuse_count = Column(Integer, default=0)
    
    status = Column(String) # HEALTHY, OUTDATED, NEEDS_REVIEW, CONFLICTING
    tenant_id = Column(String, index=True)

class KnowledgeGap(Base):
    __tablename__ = "knowledge_gap_analysis"
    
    gap_id = Column(String, index=True, nullable=False)
    gap_type = Column(String) # MISSING_SOP, MISSING_MANUAL, TRAINING_REQUIRED
    description = Column(String)
    
    severity = Column(String) # HIGH, MEDIUM, LOW
    ai_can_generate = Column(Boolean, default=True)
    status = Column(String, default="OPEN") # OPEN, GENERATING, CLOSED
    
    detected_at = Column(DateTime, default=datetime.datetime.utcnow)
    tenant_id = Column(String, index=True)

class EngineerContribution(Base):
    __tablename__ = "expert_contributions"
    
    contribution_id = Column(String, index=True, nullable=False)
    user_id = Column(String, index=True)
    user_name = Column(String)
    
    lessons_added = Column(Integer, default=0)
    recommendations_improved = Column(Integer, default=0)
    total_score = Column(Integer, default=0)
    
    tenant_id = Column(String, index=True)

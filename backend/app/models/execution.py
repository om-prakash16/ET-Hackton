from sqlalchemy import Column, String, Float, Boolean, JSON, DateTime
from app.models.base import Base
import datetime

class RecommendationExecution(Base):
    __tablename__ = "recommendation_execution"

    recommendation_id = Column(String, index=True, nullable=False)
    status = Column(String, index=True, default="PENDING") # PENDING, IN_PROGRESS, EXECUTED, VERIFIED
    owner_id = Column(String)
    department = Column(String)
    
    # Timeline
    assigned_at = Column(DateTime)
    executed_at = Column(DateTime)
    verified_at = Column(DateTime)
    
    # ROI & Tracking
    business_impact = Column(String)
    downtime_prevented_hours = Column(Float, default=0.0)
    cost_saved = Column(Float, default=0.0)
    
    # Verification Feedback
    verification_notes = Column(String)
    success_score = Column(Float) # 0.0 to 1.0 (fed back to Gemini)
    
    tenant_id = Column(String, index=True)

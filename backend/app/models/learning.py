from sqlalchemy import Column, String, Float, Text
from app.models.base import Base

class RecommendationFeedback(Base):
    __tablename__ = "recommendation_feedback"

    recommendation_id = Column(String, index=True, nullable=False)
    user_action = Column(String, index=True) # e.g., "ACCEPTED", "REJECTED", "MODIFIED"
    feedback_text = Column(Text, nullable=True)
    
    ai_confidence_at_time = Column(Float, default=0.0)
    gemini_model_version = Column(String, default="gemini-1.5-pro")
    prompt_version = Column(String, default="v2.1")
    
    user_id = Column(String, index=True)
    tenant_id = Column(String, index=True)

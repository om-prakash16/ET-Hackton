from sqlalchemy import Column, String, Float, Text
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base

class Lesson(Base):
    __tablename__ = "lessons_learned"

    tenant_id = Column(String, index=True, nullable=True)
    plant_id = Column(String, index=True, nullable=True)
    status = Column(String, default="PUBLISHED")

    title = Column(String, index=True, nullable=False)
    summary = Column(Text, nullable=False)
    business_impact = Column(Text, nullable=True)
    root_cause = Column(Text, nullable=True)
    
    # Using JSONB to store lists/arrays of strings or structured data
    contributing_factors = Column(JSONB, default=list)
    similar_incidents = Column(JSONB, default=list)
    
    # Analytics
    risk_score = Column(Float, nullable=False, default=0.0)
    confidence_score = Column(Float, nullable=False, default=0.0)
    
    # Actionable Outputs
    recommendations = Column(JSONB, default=list)
    preventive_actions = Column(JSONB, default=list)
    
    # Provenance
    supporting_documents = Column(JSONB, default=list)
    knowledge_graph_links = Column(JSONB, default=list)

from sqlalchemy import Column, String, Float, Text
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base

class KnowledgeArticle(Base):
    __tablename__ = "knowledge_articles"

    title = Column(String, index=True, nullable=False)
    category = Column(String, index=True) # e.g., "Maintenance", "Compliance"
    summary = Column(Text)
    full_content = Column(Text, nullable=False)
    
    author = Column(String)
    ai_generated_summary = Column(Text)
    related_assets = Column(JSONB, default=list)
    
    confidence = Column(Float, default=1.0)
    version = Column(String, default="1.0")
    status = Column(String, default="PUBLISHED") # DRAFT, REVIEW, PUBLISHED, ARCHIVED
    
    source_type = Column(String) # e.g., "OEM Manual", "Expert Interview", "Incident Report"
    source_reference = Column(String)

class ExpertProfile(Base):
    __tablename__ = "expert_profiles"
    
    name = Column(String, index=True, nullable=False)
    department = Column(String)
    experience_years = Column(Float, default=0.0)
    skills = Column(JSONB, default=list)
    certifications = Column(JSONB, default=list)
    knowledge_score = Column(Float, default=0.0)
    contribution_score = Column(Float, default=0.0)

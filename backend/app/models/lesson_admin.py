from sqlalchemy import Column, String, Float, Integer, Boolean
from sqlalchemy.dialects.postgresql import JSONB
from app.models.base import Base

class LessonEngineSettings(Base):
    __tablename__ = "lesson_engine_settings"

    enable_ai = Column(Boolean, default=True)
    enable_pattern_detection = Column(Boolean, default=True)
    enable_recommendations = Column(Boolean, default=True)
    enable_knowledge_retention = Column(Boolean, default=True)
    enable_external_knowledge = Column(Boolean, default=True)
    enable_risk_prediction = Column(Boolean, default=True)
    
class LessonAiModels(Base):
    __tablename__ = "lesson_ai_models"
    
    provider = Column(String, default="Google Gemini")
    primary_model = Column(String, default="gemini-2.5-pro")
    secondary_model = Column(String, default="gemini-2.5-flash")
    embedding_model = Column(String, default="gemini-embeddings")
    
    temperature = Column(Float, default=0.2)
    top_p = Column(Float, default=0.95)
    top_k = Column(Integer, default=40)
    max_tokens = Column(Integer, default=8192)
    
    confidence_threshold = Column(Float, default=0.75)
    citation_required = Column(Boolean, default=True)

class LessonPrompts(Base):
    __tablename__ = "lesson_prompts"
    
    name = Column(String, index=True)
    content = Column(String)
    version = Column(String, default="1.0")

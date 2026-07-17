from sqlalchemy import Column, String, Integer, DateTime, Boolean, JSON
from app.models.base import Base
import datetime

class KnowledgeLifecycle(Base):
    __tablename__ = "knowledge_lifecycle"

    version_id = Column(String, index=True, nullable=False)
    knowledge_id = Column(String, index=True) 
    title = Column(String)
    
    # DRAFT, REVIEWED, APPROVED, PUBLISHED, ARCHIVED
    state = Column(String, default="DRAFT") 
    version_number = Column(String, default="v1.0")
    
    author_id = Column(String)
    approved_by = Column(String)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    archived_at = Column(DateTime)
    
    tenant_id = Column(String, index=True)

class SecurityEvent(Base):
    __tablename__ = "security_events"
    
    event_id = Column(String, index=True, nullable=False)
    event_type = Column(String) # SSO_LOGIN, RBAC_FAILURE, API_KEY_ROTATION
    severity = Column(String) # LOW, MEDIUM, HIGH, CRITICAL
    
    details = Column(JSON)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    tenant_id = Column(String, index=True)

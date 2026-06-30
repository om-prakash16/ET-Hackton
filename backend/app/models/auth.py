from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.models.base import Base

class Session(Base):
    __tablename__ = "sessions"
    
    user_id = Column(ForeignKey("users.id"), nullable=False, index=True)
    refresh_token = Column(String(500), unique=True, nullable=False, index=True)
    is_revoked = Column(Boolean, default=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    
    # Tracking
    device_id = Column(String(255), nullable=True)
    user_agent = Column(String(500), nullable=True)
    ip_address = Column(String(50), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="sessions")

class APIKey(Base):
    __tablename__ = "api_keys"
    
    user_id = Column(ForeignKey("users.id"), nullable=False, index=True) # Usually a Service Account user
    name = Column(String(255), nullable=False)
    hashed_key = Column(String(255), nullable=False, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    expires_at = Column(DateTime(timezone=True), nullable=True)
    last_used_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="api_keys")

class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    user_id = Column(ForeignKey("users.id"), nullable=True, index=True) # Null for anonymous actions
    org_id = Column(ForeignKey("organizations.id"), nullable=True, index=True)
    action = Column(String(255), nullable=False, index=True) # e.g. "auth.login.success", "user.password.change"
    resource = Column(String(255), nullable=True) # e.g. "Document: 1234"
    details = Column(JSONB, nullable=True)
    ip_address = Column(String(50), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="audit_logs")

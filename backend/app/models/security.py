from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.models.base import Base

class Session(Base):
    __tablename__ = "sessions"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    
    token = Column(String(500), nullable=False, unique=True) # Refresh token or session ID
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(Text, nullable=True)
    device_id = Column(UUID(as_uuid=True), ForeignKey("devices.id"), nullable=True)
    
    login_time = Column(DateTime, default=datetime.utcnow)
    last_activity = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="sessions")
    device = relationship("Device", back_populates="sessions")


class Device(Base):
    __tablename__ = "devices"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    
    device_name = Column(String(255), nullable=True)
    os = Column(String(50), nullable=True)
    browser = Column(String(50), nullable=True)
    ip_address = Column(String(50), nullable=True)
    location = Column(String(255), nullable=True)
    
    is_trusted = Column(Boolean, default=False)
    last_seen = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="devices")
    sessions = relationship("Session", back_populates="device")


class AuditLog(Base):
    __tablename__ = "audit_logs"
    __table_args__ = {'extend_existing': True}
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True, index=True) # Can be null for anonymous actions
    
    action = Column(String(100), nullable=False) # e.g. "USER_LOGIN", "ROLE_UPDATED"
    module = Column(String(100), nullable=False) # e.g. "Authentication", "RBAC"
    
    old_value = Column(JSON, nullable=True)
    new_value = Column(JSON, nullable=True)
    
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(Text, nullable=True)
    status = Column(String(50), default="Success") # Success, Failed
    reason = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="audit_logs")


class MFASettings(Base):
    __tablename__ = "mfa_settings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    
    mfa_type = Column(String(50), nullable=False) # e.g. "totp", "sms", "email"
    secret = Column(String(255), nullable=True) # e.g. TOTP secret
    is_enabled = Column(Boolean, default=False)
    recovery_codes = Column(JSON, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="mfa_settings")


class APIKey(Base):
    __tablename__ = "api_keys"
    __table_args__ = {'extend_existing': True}
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True) # Usually a Service Account user
    
    name = Column(String(255), nullable=False)
    hashed_key = Column(String(255), nullable=False, unique=True, index=True)
    
    is_active = Column(Boolean, default=True)
    expires_at = Column(DateTime, nullable=True)
    last_used_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="api_keys")


class EmailVerification(Base):
    __tablename__ = "email_verifications"
    __table_args__ = {'extend_existing': True}
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), nullable=False, index=True)
    otp = Column(String(10), nullable=False)
    is_verified = Column(Boolean, default=False)
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    verified_at = Column(DateTime, nullable=True)


class Invitation(Base):
    __tablename__ = "invitations"
    __table_args__ = {'extend_existing': True}
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), nullable=False, index=True)
    token = Column(String(255), nullable=False, unique=True, index=True)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=True)
    plant_id = Column(UUID(as_uuid=True), ForeignKey("plants.id"), nullable=True)
    role = Column(String(50), nullable=False)
    invited_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    status = Column(String(50), default="Pending") # Pending, Accepted, Expired
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization")
    plant = relationship("Plant")
    inviter = relationship("User")

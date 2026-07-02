from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer, Table, Text, Date, Float
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.models.base import Base

user_roles = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True),
    Column("role_id", UUID(as_uuid=True), ForeignKey("roles.id"), primary_key=True),
    Column("plant_id", UUID(as_uuid=True), ForeignKey("plants.id"), nullable=True),
    Column("department_id", UUID(as_uuid=True), ForeignKey("departments.id"), nullable=True)
)

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=True) # Null for OAuth/SSO
    
    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=True)
    employee_id = Column(String(50), nullable=True, unique=True)
    phone = Column(String(50), nullable=True)
    
    # Account Security
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    failed_login_attempts = Column(Integer, default=0)
    locked_until = Column(DateTime(timezone=True), nullable=True)
    last_login = Column(DateTime(timezone=True), nullable=True)
    password_changed_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    organization = relationship("Organization", back_populates="users")
    roles = relationship("Role", secondary=user_roles, back_populates="users")
    profile = relationship("UserProfile", back_populates="user", foreign_keys="[UserProfile.user_id]", uselist=False, cascade="all, delete-orphan")
    password_history = relationship("PasswordHistory", back_populates="user", cascade="all, delete-orphan")
    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")
    devices = relationship("Device", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user", cascade="all, delete-orphan")
    mfa_settings = relationship("MFASettings", back_populates="user", cascade="all, delete-orphan")
    api_keys = relationship("APIKey", back_populates="user", cascade="all, delete-orphan")


class UserProfile(Base):
    __tablename__ = "user_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    
    profile_picture_url = Column(String(255), nullable=True)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(String(50), nullable=True)
    language = Column(String(50), default="en")
    timezone = Column(String(50), default="UTC")
    bio = Column(Text, nullable=True)
    
    # Professional Info
    designation = Column(String(100), nullable=True)
    reporting_manager_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    experience_years = Column(Float, nullable=True)
    skills = Column(Text, nullable=True) # JSON or CSV
    certifications = Column(Text, nullable=True)
    employment_type = Column(String(50), nullable=True)
    emergency_contact = Column(String(255), nullable=True)

    user = relationship("User", back_populates="profile", foreign_keys=[user_id])
    reporting_manager = relationship("User", foreign_keys=[reporting_manager_id])


class PasswordHistory(Base):
    __tablename__ = "password_history"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="password_history")

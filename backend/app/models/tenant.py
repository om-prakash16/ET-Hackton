from sqlalchemy import Column, String, Float, ForeignKey, Text, JSON, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.models.base import Base

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, unique=True)
    logo_url = Column(String(255))
    industry = Column(String(100))
    company_size = Column(String(50))
    address = Column(Text)
    country = Column(String(100))
    state = Column(String(100))
    city = Column(String(100))
    gst = Column(String(50))
    registration_number = Column(String(100))
    website = Column(String(255))
    contact_email = Column(String(255))
    subscription_plan = Column(String(50), default="Free")
    status = Column(String(50), default="Active")

    # Relationships
    plants = relationship("Plant", back_populates="organization", cascade="all, delete-orphan")
    users = relationship("User", back_populates="organization", cascade="all, delete-orphan")


class Plant(Base):
    __tablename__ = "plants"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    code = Column(String(50), nullable=False, unique=True)
    location = Column(String(255))
    timezone = Column(String(50), default="UTC")
    address = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    working_hours = Column(String(100))
    status = Column(String(50), default="Active")

    # Relationships
    organization = relationship("Organization", back_populates="plants")
    departments = relationship("Department", back_populates="plant", cascade="all, delete-orphan")


class Department(Base):
    __tablename__ = "departments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    plant_id = Column(UUID(as_uuid=True), ForeignKey("plants.id"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    code = Column(String(50), nullable=False, unique=True)
    description = Column(Text)
    head_of_department_id = Column(UUID(as_uuid=True), ForeignKey("users.id", use_alter=True), nullable=True)
    status = Column(String(50), default="Active")

    # Relationships
    plant = relationship("Plant", back_populates="departments")
    head_of_department = relationship("User", foreign_keys=[head_of_department_id], post_update=True)

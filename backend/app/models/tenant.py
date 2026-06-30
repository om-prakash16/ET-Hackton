from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class Organization(Base):
    __tablename__ = "organizations"

    name = Column(String(255), nullable=False)
    tenant_id = Column(String(100), unique=True, nullable=False, index=True)

    # Relationships
    plants = relationship("Plant", back_populates="organization", cascade="all, delete-orphan")
    users = relationship("User", back_populates="organization", cascade="all, delete-orphan")


class Plant(Base):
    __tablename__ = "plants"

    org_id = Column(ForeignKey("organizations.id"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=True)
    timezone = Column(String(50), default="UTC")

    # Relationships
    organization = relationship("Organization", back_populates="plants")

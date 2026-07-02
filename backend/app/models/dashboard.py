import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Enum, text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.models.base import Base

class DashboardPreference(Base):
    __tablename__ = "dashboard_preferences"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    default_plant_id = Column(UUID(as_uuid=True), ForeignKey("plants.id"), nullable=True)
    
    auto_refresh = Column(Boolean, default=True)
    refresh_interval_sec = Column(String(50), default="60") # in seconds
    theme = Column(String(20), default="system") # light, dark, system
    language = Column(String(10), default="en")
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", backref="dashboard_preference")

class DashboardLayout(Base):
    __tablename__ = "dashboard_layouts"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True, index=True) # Null if role-default
    role_id = Column(UUID(as_uuid=True), ForeignKey("roles.id"), nullable=True, index=True) # If this is a default layout for a role
    
    name = Column(String(255), default="My Custom Dashboard")
    is_default = Column(Boolean, default=False) # Whether this is the active layout for the user
    layout_data = Column(JSONB, nullable=False, server_default=text("'[]'::jsonb")) # react-grid-layout coordinates array
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", backref="layouts")
    
class WidgetConfiguration(Base):
    __tablename__ = "widget_configurations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    layout_id = Column(UUID(as_uuid=True), ForeignKey("dashboard_layouts.id", ondelete="CASCADE"), nullable=False, index=True)
    widget_type = Column(String(100), nullable=False) # e.g. "AssetHealth", "AIBriefing", "MaintenanceTrend"
    
    # Internal widget configuration like filter settings or chart types
    settings = Column(JSONB, nullable=False, server_default=text("'{}'::jsonb"))
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    layout = relationship("DashboardLayout", backref="widgets")

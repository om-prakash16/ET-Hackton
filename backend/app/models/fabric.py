from sqlalchemy import Column, String, Boolean, DateTime, JSON
from app.models.base import Base
import datetime

class DigitalWorkforce(Base):
    __tablename__ = "digital_workforce"

    member_id = Column(String, index=True, nullable=False)
    name = Column(String) 
    type = Column(String) # HUMAN, AI_AGENT
    
    role = Column(String) # e.g., "Quality Agent", "Reliability Engineer"
    status = Column(String) # IDLE, WORKING, OFFLINE
    
    current_task = Column(String)
    
    tenant_id = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class OperationsPlan(Base):
    __tablename__ = "operations_plans"
    
    plan_id = Column(String, index=True, nullable=False)
    plan_type = Column(String) # MAINTENANCE, INSPECTION, SHUTDOWN
    
    title = Column(String)
    generated_by = Column(String) # usually Gemini Master Orchestrator
    
    schedule = Column(JSON)
    status = Column(String, default="DRAFT") # DRAFT, APPROVED, EXECUTING
    
    tenant_id = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AutomationRule(Base):
    __tablename__ = "automation_rules"
    
    rule_id = Column(String, index=True, nullable=False)
    trigger = Column(String)
    action = Column(String)
    
    requires_human_approval = Column(Boolean, default=True)
    
    tenant_id = Column(String, index=True)

from sqlalchemy import Column, String, JSON, DateTime
from app.models.base import Base
import datetime

class AutonomousTask(Base):
    __tablename__ = "autonomous_tasks"

    task_id = Column(String, index=True, nullable=False)
    task_type = Column(String) # WORK_ORDER, CAPA, INSPECTION
    
    generated_by = Column(String) # e.g., Maintenance Agent, Quality Agent
    reasoning = Column(String)
    
    status = Column(String) # SCHEDULED, IN_PROGRESS, COMPLETED
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    tenant_id = Column(String, index=True)

class CopilotSummary(Base):
    __tablename__ = "copilot_summaries"
    
    summary_id = Column(String, index=True, nullable=False)
    role = Column(String, index=True) # EXECUTIVE, PLANT_HEAD, ENGINEER
    
    content = Column(JSON)
    generated_at = Column(DateTime, default=datetime.datetime.utcnow)
    tenant_id = Column(String, index=True)

from sqlalchemy import Column, String, Float, Text, JSON, DateTime
from app.models.base import Base

class AIBrainEvent(Base):
    __tablename__ = "ai_brain_events"

    event_id = Column(String, index=True, nullable=False)
    event_type = Column(String, index=True) 
    description = Column(Text)
    
    # Orchestration tracking
    assigned_agents = Column(JSON) # e.g., ["MaintenanceAgent", "VendorAgent"]
    agent_results = Column(JSON)
    
    # Gemini Synthesis
    synthesis_reasoning = Column(Text)
    final_decision = Column(JSON)
    
    status = Column(String, default="PROCESSING") # PROCESSING, COMPLETED
    tenant_id = Column(String, index=True)

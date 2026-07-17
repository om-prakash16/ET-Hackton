from sqlalchemy import Column, String, JSON, DateTime, Boolean, Integer
from app.models.base import Base
import datetime

class IntegrationEvent(Base):
    __tablename__ = "integration_events"

    event_id = Column(String, index=True, nullable=False)
    source_module = Column(String, index=True) # e.g., "SAP_PM", "ASSET_MODULE"
    event_type = Column(String, index=True) # e.g., "WORK_ORDER_CLOSED"
    
    payload = Column(JSON)
    processed = Column(Boolean, default=False)
    
    # Traceability
    knowledge_graph_updated = Column(Boolean, default=False)
    vector_db_updated = Column(Boolean, default=False)
    
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    tenant_id = Column(String, index=True)

class ModuleRegistry(Base):
    __tablename__ = "integration_module_registry"
    
    module_id = Column(String, index=True, nullable=False)
    module_name = Column(String)
    module_type = Column(String) # "INTERNAL", "EXTERNAL"
    
    status = Column(String, default="ONLINE")
    last_sync = Column(DateTime)
    events_processed = Column(Integer, default=0)
    failed_jobs = Column(Integer, default=0)

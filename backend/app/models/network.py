from sqlalchemy import Column, String, Boolean, DateTime
from app.models.base import Base
import datetime

class PartnerConnection(Base):
    __tablename__ = "partner_connections"

    connection_id = Column(String, index=True, nullable=False)
    partner_name = Column(String) 
    partner_type = Column(String) # OEM, SUPPLIER, CONSULTANT, REGULATOR
    
    status = Column(String) # ACTIVE, PENDING, SUSPENDED
    permission_level = Column(String) # READ_ONLY, COLLABORATOR, FULL_ACCESS
    
    tenant_id = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class IndustryUpdate(Base):
    __tablename__ = "industry_updates"
    
    update_id = Column(String, index=True, nullable=False)
    source_partner_id = Column(String, index=True)
    
    update_type = Column(String) # SERVICE_BULLETIN, RECALL, COMPLIANCE_NOTICE
    content = Column(String)
    
    is_read = Column(Boolean, default=False)
    tenant_id = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

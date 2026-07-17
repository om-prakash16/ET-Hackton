from sqlalchemy import Column, String, Float, Integer, JSON, DateTime
from app.models.base import Base
import datetime

class BusinessROI(Base):
    __tablename__ = "business_roi"

    roi_id = Column(String, index=True, nullable=False)
    metric_name = Column(String) 
    
    financial_value_usd = Column(Float)
    percentage_improvement = Column(Float)
    
    tenant_id = Column(String, index=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

class ESGMetric(Base):
    __tablename__ = "esg_metrics"
    
    metric_id = Column(String, index=True, nullable=False)
    category = Column(String) # CARBON, WATER, WASTE
    
    value = Column(Float)
    unit = Column(String)
    
    tenant_id = Column(String, index=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

class SimulationResult(Base):
    __tablename__ = "simulation_results"
    
    simulation_id = Column(String, index=True, nullable=False)
    scenario = Column(String)
    
    predicted_operational_impact = Column(String)
    predicted_financial_impact = Column(String)
    predicted_risk_impact = Column(String)
    
    tenant_id = Column(String, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

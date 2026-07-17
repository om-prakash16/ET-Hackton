from sqlalchemy import Column, String, Float, Integer, JSON, Boolean, DateTime
from app.models.base import Base
import datetime

class DigitalTwin(Base):
    __tablename__ = "digital_twins"

    twin_id = Column(String, index=True, nullable=False)
    asset_id = Column(String, index=True) 
    asset_name = Column(String)
    
    health_score = Column(Float)
    status = Column(String) # ONLINE, WARNING, CRITICAL, OFFLINE
    
    last_telemetry = Column(JSON)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)
    tenant_id = Column(String, index=True)

class IoTDevice(Base):
    __tablename__ = "iot_devices"
    
    device_id = Column(String, index=True, nullable=False)
    twin_id = Column(String, index=True)
    sensor_type = Column(String) # TEMPERATURE, VIBRATION, PRESSURE
    
    status = Column(String, default="ACTIVE")
    tenant_id = Column(String, index=True)

class LiveAlert(Base):
    __tablename__ = "live_alerts"
    
    alert_id = Column(String, index=True, nullable=False)
    twin_id = Column(String, index=True)
    
    alert_type = Column(String) # PREDICTIVE, ANOMALY, THRESHOLD
    severity = Column(String) # HIGH, MEDIUM, LOW
    
    message = Column(String)
    ai_recommendation = Column(String)
    
    resolved = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    tenant_id = Column(String, index=True)

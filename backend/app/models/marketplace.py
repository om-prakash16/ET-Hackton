from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime
from app.models.base import Base
import datetime

class MarketplacePackage(Base):
    __tablename__ = "marketplace_packages"

    package_id = Column(String, index=True, nullable=False)
    name = Column(String) 
    category = Column(String) # AI_AGENT, OEM_KNOWLEDGE, PROMPT_PACK, STANDARDS
    
    provider = Column(String) # e.g., "Siemens OEM", "Global Reliability Consortium"
    description = Column(String)
    
    downloads = Column(Integer, default=0)
    rating = Column(Float)
    
    is_premium = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class IndustryBenchmark(Base):
    __tablename__ = "industry_benchmarks"
    
    benchmark_id = Column(String, index=True, nullable=False)
    industry_category = Column(String, index=True) # e.g., "Oil & Gas"
    metric_name = Column(String) # e.g., "MTBF_API610_PUMP"
    
    industry_average = Column(Float)
    top_quartile = Column(Float)
    
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

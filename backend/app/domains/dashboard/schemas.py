from typing import List, Dict, Any, Optional
from pydantic import BaseModel, ConfigDict
from uuid import UUID

class LayoutSaveRequest(BaseModel):
    layout_data: List[Dict[str, Any]]
    
class KPIResponse(BaseModel):
    title: str
    value: str | int | float
    trend: str # e.g. "+5%", "-2%"
    status: str # "good", "warning", "critical"

class DashboardSummary(BaseModel):
    org_id: str
    assets: List[KPIResponse]
    maintenance: List[KPIResponse]
    ai_usage: List[KPIResponse]
    compliance: List[KPIResponse]

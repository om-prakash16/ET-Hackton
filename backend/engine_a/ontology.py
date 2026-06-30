from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field

class AssetType(str, Enum):
    TANK = "TANK"
    VALVE = "VALVE"
    PUMP = "PUMP"
    SENSOR = "SENSOR"
    PIPELINE = "PIPELINE"

class Status(str, Enum):
    ACTIVE = "ACTIVE"
    MAINTENANCE = "MAINTENANCE"
    OFFLINE = "OFFLINE"

class NodeAsset(BaseModel):
    asset_id: str = Field(..., description="Unique identifier for the asset (e.g., ST-402)")
    asset_type: AssetType = Field(..., description="Classification of the asset")
    description: str = Field(..., description="Functional description of the asset")
    max_pressure_psi: Optional[float] = None
    max_temp_celsius: Optional[float] = None
    status: Status = Status.ACTIVE

class EdgeRelationship(str, Enum):
    FEEDS_INTO = "FEEDS_INTO"
    CONTROLS = "CONTROLS"
    MONITORS = "MONITORS"
    REGULATED_BY = "REGULATED_BY"

class AssetRelationship(BaseModel):
    source_asset_id: str
    target_asset_id: str
    relationship_type: EdgeRelationship
    properties: dict = Field(default_factory=dict)

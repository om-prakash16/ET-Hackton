from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional

class DocumentResponse(BaseModel):
    id: UUID
    filename: str
    file_type: str
    size_bytes: int
    status: str
    checksum_sha256: str
    uploaded_by_id: Optional[UUID] = None
    org_id: UUID
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

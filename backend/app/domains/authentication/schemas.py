from typing import Optional, List
from pydantic import BaseModel, EmailStr, ConfigDict
from uuid import UUID

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenPayload(BaseModel):
    sub: Optional[str] = None
    
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    org_id: UUID

class RoleSchema(BaseModel):
    name: str
    
    model_config = ConfigDict(from_attributes=True)

class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    org_id: UUID
    is_active: bool
    roles: List[RoleSchema] = []
    
    model_config = ConfigDict(from_attributes=True)

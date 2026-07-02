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

class OrganizationRegistrationFlow(BaseModel):
    org_name: str
    admin_email: EmailStr
    admin_password: str

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

class AccountRegisterRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str

class VerifyEmailRequest(BaseModel):
    email: EmailStr
    otp: str

class OrganizationCreateRequest(BaseModel):
    name: str
    industry: str
    company_size: str
    country: str
    state: str
    city: str
    address: str

class PlantCreateRequest(BaseModel):
    name: str
    code: str
    country: str
    state: str
    city: str
    address: str
    timezone: str = "UTC"

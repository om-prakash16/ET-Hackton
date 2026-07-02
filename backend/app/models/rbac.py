from sqlalchemy import Column, String, ForeignKey, Table, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.models.base import Base

role_permissions = Table(
    "role_permissions",
    Base.metadata,
    Column("role_id", UUID(as_uuid=True), ForeignKey("roles.id"), primary_key=True),
    Column("permission_id", UUID(as_uuid=True), ForeignKey("permissions.id"), primary_key=True),
)

class Permission(Base):
    __tablename__ = "permissions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    module = Column(String(100), nullable=False, index=True) # e.g. "documents"
    action = Column(String(50), nullable=False) # e.g. "create", "read", "update", "delete"
    description = Column(String(255))
    
    roles = relationship("Role", secondary=role_permissions, back_populates="permissions")

class Role(Base):
    __tablename__ = "roles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=True, index=True) # Null for Global/Platform Roles
    name = Column(String(100), nullable=False, index=True) # e.g. "Super Admin"
    description = Column(String(255))
    is_default = Column(Boolean, default=False)
    
    users = relationship("User", secondary="user_roles", back_populates="roles")
    permissions = relationship("Permission", secondary=role_permissions, back_populates="roles")

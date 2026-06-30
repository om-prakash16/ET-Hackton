import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    """
    Base class for all SQLAlchemy declarative models.
    Provides global standard columns: id, created_at, updated_at, deleted_at.
    Automatically derives the __tablename__ from the class name.
    """
    
    @declared_attr.directive
    def __tablename__(cls) -> str:
        # Convert CamelCase to snake_case for table names, or just lower case + 's'
        return cls.__name__.lower() + "s"

    # UUIDv4 is generated at the app layer or DB layer.
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # Audit timestamps
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Soft delete
    deleted_at = Column(DateTime(timezone=True), nullable=True, index=True)

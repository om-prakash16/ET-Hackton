import uuid
from sqlalchemy import Column, String, ForeignKey, BigInteger, Boolean, DateTime, Table
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from app.models.base import Base

# Association table for Document <-> Tags
dms_document_tags = Table(
    'dms_document_tags', Base.metadata,
    Column('document_id', UUID(as_uuid=True), ForeignKey('dms_documents.id', ondelete="CASCADE")),
    Column('tag_id', UUID(as_uuid=True), ForeignKey('dms_tags.id', ondelete="CASCADE"))
)

class DMSCategory(Base):
    __tablename__ = "dms_categories"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, unique=True)
    description = Column(String(500), nullable=True)

class DMSTag(Base):
    __tablename__ = "dms_tags"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, unique=True)
    color = Column(String(50), nullable=True, default="#3b82f6") # Hex color

class DMSFolder(Base):
    """Hierarchical folder structure for documents"""
    __tablename__ = "dms_folders"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    parent_id = Column(UUID(as_uuid=True), ForeignKey('dms_folders.id'), nullable=True, index=True)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    
    # Relationships
    children = relationship("DMSFolder", backref="parent", remote_side=[id])
    documents = relationship("DMSDocument", back_populates="folder")

class DMSDocument(Base):
    """The root logical document. Versions are tracked underneath this."""
    __tablename__ = "dms_documents"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_number = Column(String(100), unique=True, index=True, nullable=False) # e.g. DOC-2025-001
    title = Column(String(500), nullable=False)
    description = Column(String(2000), nullable=True)
    
    folder_id = Column(UUID(as_uuid=True), ForeignKey('dms_folders.id'), nullable=True, index=True)
    category_id = Column(UUID(as_uuid=True), ForeignKey('dms_categories.id'), nullable=True)
    org_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    status = Column(String(50), default="DRAFT", index=True) # DRAFT, REVIEW, APPROVED, PUBLISHED, ARCHIVED
    confidentiality = Column(String(50), default="INTERNAL") # PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    folder = relationship("DMSFolder", back_populates="documents")
    category = relationship("DMSCategory")
    owner = relationship("User")
    tags = relationship("DMSTag", secondary=dms_document_tags)
    versions = relationship("DMSVersion", back_populates="document", cascade="all, delete-orphan")
    approvals = relationship("DMSApproval", back_populates="document")

class DMSVersion(Base):
    """Tracks physical files and binary artifacts representing a document version."""
    __tablename__ = "dms_versions"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey('dms_documents.id', ondelete="CASCADE"), nullable=False, index=True)
    
    version_number = Column(String(50), nullable=False) # e.g. "1.0", "1.1"
    is_current = Column(Boolean, default=True, index=True)
    
    # Technical Metadata
    filename = Column(String(500), nullable=False)
    file_type = Column(String(100), nullable=False) # MIME Type
    size_bytes = Column(BigInteger, nullable=False)
    checksum_sha256 = Column(String(64), nullable=False, index=True)
    blob_storage_uri = Column(String(1000), nullable=False)
    
    # AI / Parsing Meta
    ai_status = Column(String(50), default="PENDING") # PENDING, OCR_PROCESSING, INDEXED, FAILED
    ai_summary = Column(String(2000), nullable=True)
    qdrant_collection_id = Column(String(255), nullable=True)
    
    # Dynamic JSON Metadata (Resolution, Pages, Duration, Custom Form Fields)
    metadata_json = Column(JSONB, nullable=True, default={})
    
    uploaded_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    document = relationship("DMSDocument", back_populates="versions")
    uploaded_by = relationship("User")

class DMSApproval(Base):
    """Approval workflow tracking."""
    __tablename__ = "dms_approvals"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey('dms_documents.id', ondelete="CASCADE"), nullable=False)
    version_id = Column(UUID(as_uuid=True), ForeignKey('dms_versions.id', ondelete="CASCADE"), nullable=False)
    reviewer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    status = Column(String(50), default="PENDING") # PENDING, APPROVED, REJECTED
    comments = Column(String(1000), nullable=True)
    reviewed_at = Column(DateTime(timezone=True), nullable=True)
    
    document = relationship("DMSDocument", back_populates="approvals")
    reviewer = relationship("User")

class DMSAuditLog(Base):
    """Tracks every action on documents."""
    __tablename__ = "dms_audit_logs"
    __table_args__ = {'extend_existing': True}
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey('dms_documents.id', ondelete="SET NULL"), nullable=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    
    action = Column(String(50), nullable=False) # VIEW, DOWNLOAD, UPLOAD, APPROVE, REJECT, DELETE
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(String(500), nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    details = Column(JSONB, nullable=True)

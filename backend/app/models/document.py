from sqlalchemy import Column, String, ForeignKey, BigInteger
from sqlalchemy.orm import relationship
from app.models.base import Base

class DocumentMetadata(Base):
    __tablename__ = "document_metadata"
    
    org_id = Column(ForeignKey("organizations.id"), nullable=False, index=True)
    uploaded_by_id = Column(ForeignKey("users.id"), nullable=True, index=True)
    
    filename = Column(String(500), nullable=False)
    file_type = Column(String(50), nullable=False) # e.g. "application/pdf"
    size_bytes = Column(BigInteger, nullable=False)
    checksum_sha256 = Column(String(64), nullable=False, index=True)
    
    blob_storage_uri = Column(String(1000), nullable=False)
    qdrant_collection_id = Column(String(255), nullable=True) # UUID mapped as string
    
    status = Column(String(50), default="UPLOADED", nullable=False, index=True)
    
    # Optional metadata
    title = Column(String(500), nullable=True)
    version = Column(String(50), default="1.0")
    language = Column(String(50), default="en")
    
    # Relationships
    organization = relationship("Organization")
    uploaded_by = relationship("User")

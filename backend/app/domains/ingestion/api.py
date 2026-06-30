from typing import Any
import logging
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.deps import get_current_active_user
from app.core.rbac import RequirePermissions
from app.db.session import get_db
from app.models.user import User
from app.models.document import DocumentMetadata
from app.models.auth import AuditLog
from app.services.storage import save_upload_file
from app.core.events import event_publisher
from app.domains.ingestion import schemas

logger = logging.getLogger("IndustrialBrain.Ingest")
router = APIRouter()

@router.post("/upload", response_model=schemas.DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(RequirePermissions(["documents.write"]))
) -> Any:
    """
    Uploads a document, extracts checksum, stores it locally (simulating S3), 
    writes metadata to Postgres, and dispatches a Kafka event to trigger the AI parser.
    """
    logger.info(f"User {current_user.id} uploading file {file.filename}")
    
    # 1. Save to blob storage abstraction
    blob_uri, size_bytes, checksum = await save_upload_file(file, current_user.org_id)
    
    # 2. Check for duplicate checksum in same organization
    query = select(DocumentMetadata).where(
        DocumentMetadata.checksum_sha256 == checksum,
        DocumentMetadata.org_id == current_user.org_id
    )
    result = await db.execute(query)
    if result.scalars().first():
        # Clean up the blob if we want, or just reject
        raise HTTPException(status_code=409, detail="A document with this exact content already exists in your organization.")
        
    # 3. Create Postgres Metadata Record
    doc_meta = DocumentMetadata(
        org_id=current_user.org_id,
        uploaded_by_id=current_user.id,
        filename=file.filename,
        file_type=file.content_type or "application/octet-stream",
        size_bytes=size_bytes,
        checksum_sha256=checksum,
        blob_storage_uri=blob_uri,
        status="UPLOADED"
    )
    db.add(doc_meta)
    
    # 4. Audit Log
    audit_log = AuditLog(
        user_id=current_user.id,
        org_id=current_user.org_id,
        action="document.uploaded",
        details={"filename": file.filename, "size": size_bytes}
    )
    db.add(audit_log)
    
    await db.commit()
    await db.refresh(doc_meta)
    
    # 5. Dispatch Kafka Event for asynchronous processing
    event_payload = {
        "document_id": str(doc_meta.id),
        "org_id": str(doc_meta.org_id),
        "blob_uri": doc_meta.blob_storage_uri,
        "file_type": doc_meta.file_type
    }
    await event_publisher.publish("document.uploaded", event_payload)
    
    return doc_meta

@router.get("/{id}", response_model=schemas.DocumentResponse)
async def get_document(
    id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(RequirePermissions(["documents.read"]))
) -> Any:
    """
    Retrieve document metadata by ID, ensuring tenant isolation.
    """
    query = select(DocumentMetadata).where(
        DocumentMetadata.id == id,
        DocumentMetadata.org_id == current_user.org_id,
        DocumentMetadata.deleted_at == None
    )
    result = await db.execute(query)
    doc = result.scalars().first()
    
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    return doc

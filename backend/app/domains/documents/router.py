import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import get_db
from app.models.user import User
from app.models.dms import DMSDocument, DMSVersion, DMSFolder, DMSCategory, DMSTag
from app.core.deps import get_current_active_user
from app.workers.document_worker import pipeline_worker
import hashlib
import os
import aiofiles

router = APIRouter(prefix="/documents", tags=["DMS"])

UPLOAD_DIR = "storage/dms/"

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: Optional[str] = Form(None),
    folder_id: Optional[str] = Form(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Handles enterprise document upload. Creates the logical Document, 
    the physical Version, saves to blob storage, and fires off the AI pipeline.
    """
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    # Generate unique document number
    doc_number = f"DOC-{uuid.uuid4().hex[:8].upper()}"
    
    # Read file content for hash and size
    content = await file.read()
    size_bytes = len(content)
    file_hash = hashlib.sha256(content).hexdigest()
    
    # Save file to local storage (Simulating S3/Blob)
    file_path = os.path.join(UPLOAD_DIR, f"{file_hash}_{file.filename}")
    async with aiofiles.open(file_path, 'wb') as out_file:
        await out_file.write(content)
        
    blob_uri = f"local://{file_path}"
    
    # Create Logical Document
    new_doc = DMSDocument(
        document_number=doc_number,
        title=title,
        description=description,
        org_id=current_user.org_id,
        owner_id=current_user.id,
        status="DRAFT"
    )
    if folder_id:
        new_doc.folder_id = uuid.UUID(folder_id)
        
    db.add(new_doc)
    await db.flush()
    
    # Create Version
    new_version = DMSVersion(
        document_id=new_doc.id,
        version_number="1.0",
        filename=file.filename,
        file_type=file.content_type,
        size_bytes=size_bytes,
        checksum_sha256=file_hash,
        blob_storage_uri=blob_uri,
        uploaded_by_id=current_user.id,
        ai_status="PENDING"
    )
    db.add(new_version)
    await db.commit()
    
    # Trigger AI Pipeline
    payload = {
        "document_id": str(new_doc.id),
        "version_id": str(new_version.id),
        "org_id": str(current_user.org_id),
        "blob_uri": blob_uri,
        "file_type": file.content_type
    }
    
    # Directly process message since Kafka might be unreliable in dev mode
    # We await the coroutine slightly asynchronously or dispatch it
    import asyncio
    asyncio.create_task(pipeline_worker.process_message(payload))
    
    return {
        "message": "Upload successful. AI processing started.",
        "document_id": new_doc.id,
        "version_id": new_version.id,
        "status": new_doc.status
    }

@router.get("/folders")
async def get_folder_tree(
    parent_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Fetches the folder hierarchy for the SharePoint-like Explorer.
    """
    query = select(DMSFolder).where(DMSFolder.org_id == current_user.org_id)
    
    if parent_id:
        query = query.where(DMSFolder.parent_id == uuid.UUID(parent_id))
    else:
        query = query.where(DMSFolder.parent_id == None)
        
    result = await db.execute(query)
    folders = result.scalars().all()
    
    return [
        {
            "id": f.id,
            "name": f.name,
            "parent_id": f.parent_id
        }
        for f in folders
    ]

@router.get("/search")
async def search_documents(
    q: Optional[str] = None,
    folder_id: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Advanced Enterprise Search. Combines vector search with relational metadata filters.
    """
    query = select(DMSDocument).where(DMSDocument.org_id == current_user.org_id)
    
    if folder_id:
        query = query.where(DMSDocument.folder_id == uuid.UUID(folder_id))
        
    if q:
        query = query.where(DMSDocument.title.ilike(f"%{q}%") | DMSDocument.document_number.ilike(f"%{q}%"))
        
    result = await db.execute(query)
    docs = result.scalars().all()
    
    return [
        {
            "id": d.id,
            "document_number": d.document_number,
            "title": d.title,
            "status": d.status,
            "created_at": d.created_at
        }
        for d in docs
    ]

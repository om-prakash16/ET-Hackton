import os
import aiofiles
import hashlib
from typing import Tuple

# In production, this would be an S3 or MinIO bucket path.
STORAGE_ROOT = os.path.join(os.getcwd(), "storage")

if not os.path.exists(STORAGE_ROOT):
    os.makedirs(STORAGE_ROOT)

async def save_upload_file(upload_file, org_id: str) -> Tuple[str, int, str]:
    """
    Saves an uploaded file asynchronously to the local file system (mocking S3).
    Returns the file path, size in bytes, and SHA-256 checksum.
    """
    org_folder = os.path.join(STORAGE_ROOT, str(org_id))
    if not os.path.exists(org_folder):
        os.makedirs(org_folder)
        
    file_path = os.path.join(org_folder, upload_file.filename)
    
    sha256_hash = hashlib.sha256()
    size_bytes = 0
    
    # We write chunks to avoid loading huge files into memory
    async with aiofiles.open(file_path, 'wb') as out_file:
        while content := await upload_file.read(1024 * 1024):  # 1MB chunks
            await out_file.write(content)
            sha256_hash.update(content)
            size_bytes += len(content)
            
    checksum = sha256_hash.hexdigest()
    
    # Ensure the file pointer is reset if the file needs to be read again
    await upload_file.seek(0)
    
    # The URI could be 's3://bucket/path' in prod
    blob_uri = f"local://{file_path}"
    
    return blob_uri, size_bytes, checksum

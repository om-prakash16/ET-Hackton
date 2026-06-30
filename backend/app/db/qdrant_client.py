from qdrant_client import QdrantClient as QClient
from app.core.config import settings

class QdrantClientWrapper:
    def __init__(self):
        self.client = QClient(url=settings.QDRANT_URL)
        
qdrant_client = QdrantClientWrapper().client

import uuid
import logging
from typing import List, Dict, Any
from qdrant_client import AsyncQdrantClient
from qdrant_client.http import models as qdrant_models
from app.core.config import settings

logger = logging.getLogger(__name__)

import google.generativeai as genai

class EmbeddingService:
    def __init__(self):
        self.qdrant = AsyncQdrantClient(url=settings.QDRANT_URL)
        self.vector_size = 768  # Gemini standard dimension
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
        
    async def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Generates embeddings using Gemini's text-embedding-004 model.
        """
        if not texts:
            return []
            
        try:
            # We can use embedding-001 or text-embedding-004. Gemini handles batched inputs.
            # Using standard recommended model for embeddings
            result = genai.embed_content(
                model="models/text-embedding-004",
                content=texts,
                task_type="retrieval_document"
            )
            
            # The result could be a dict with 'embedding' or a list if batched
            if isinstance(result['embedding'], list) and len(result['embedding']) > 0 and isinstance(result['embedding'][0], list):
                return result['embedding']
            elif isinstance(result['embedding'], list):
                return [result['embedding']] # Single embedding
            return []
        except Exception as e:
            logger.error(f"Failed to generate embeddings via Gemini: {e}")
            # Fallback to zero vector if failure
            return [[0.0] * self.vector_size for _ in texts]

    async def ensure_collection(self, collection_name: str):
        """Creates the Qdrant collection if it doesn't exist."""
        try:
            collections = await self.qdrant.get_collections()
            exists = any(c.name == collection_name for c in collections.collections)
            if not exists:
                await self.qdrant.create_collection(
                    collection_name=collection_name,
                    vectors_config=qdrant_models.VectorParams(
                        size=self.vector_size,
                        distance=qdrant_models.Distance.COSINE
                    )
                )
                logger.info(f"Created Qdrant collection: {collection_name}")
        except Exception as e:
            logger.error(f"Failed to ensure Qdrant collection {collection_name}: {e}")

    async def ingest_chunks(self, org_id: str, document_id: str, chunks: List[Dict[str, Any]]):
        """
        Generates embeddings for chunks and upserts them into Qdrant.
        """
        collection_name = f"org_{org_id.replace('-', '_')}"
        await self.ensure_collection(collection_name)
        
        texts = [chunk["text"] for chunk in chunks]
        vectors = await self.generate_embeddings(texts)
        
        points = []
        for i, (chunk, vector) in enumerate(zip(chunks, vectors)):
            point_id = str(uuid.uuid4())
            points.append(
                qdrant_models.PointStruct(
                    id=point_id,
                    vector=vector,
                    payload={
                        "document_id": document_id,
                        "chunk_index": chunk["chunk_index"],
                        "text": chunk["text"],
                        "word_count": chunk["word_count"]
                    }
                )
            )
            
        if points:
            await self.qdrant.upsert(
                collection_name=collection_name,
                points=points
            )
            logger.info(f"Ingested {len(points)} chunks into Qdrant collection {collection_name} for document {document_id}")

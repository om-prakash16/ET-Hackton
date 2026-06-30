import logging
from typing import List, Dict, Any
from qdrant_client import AsyncQdrantClient
from qdrant_client.http import models as qdrant_models
from app.core.config import settings
from app.db.neo4j_client import neo4j_client
from app.services.embeddings import EmbeddingService

logger = logging.getLogger(__name__)

class HybridRetrievalEngine:
    def __init__(self):
        self.qdrant = AsyncQdrantClient(url=settings.QDRANT_URL)
        self.embedder = EmbeddingService()

    async def search_vectors(self, query: str, org_id: str, limit: int = 3) -> List[Dict[str, Any]]:
        collection_name = f"org_{org_id.replace('-', '_')}"
        try:
            # 1. Embed query
            vectors = await self.embedder.generate_embeddings([query])
            query_vector = vectors[0]
            
            # 2. Search Qdrant
            results = await self.qdrant.search(
                collection_name=collection_name,
                query_vector=query_vector,
                limit=limit
            )
            
            return [{
                "document_id": r.payload.get("document_id"),
                "chunk_index": r.payload.get("chunk_index"),
                "text": r.payload.get("text"),
                "score": r.score
            } for r in results]
            
        except Exception as e:
            logger.error(f"Vector search failed: {e}")
            return []

    async def search_graph(self, org_id: str, query: str) -> Dict[str, Any]:
        """
        Keyword-based topology extraction from Neo4j.
        """
        evidence = {"nodes": [], "edges": []}
        try:
            with neo4j_client.get_session() as session:
                # Basic graph expansion if Equipment is mentioned
                result = session.run(
                    "MATCH (e:Equipment {org_id: $org_id})-[r]->(d:Document) "
                    "RETURN e.tag AS tag, e.type AS type, type(r) AS rel, d.id AS doc "
                    "LIMIT 10",
                    org_id=org_id
                )
                
                for record in result:
                    evidence["nodes"].append(record["tag"])
                    evidence["edges"].append(f"({record['tag']})-[{record['rel']}]->({record['doc']})")
                    
        except Exception as e:
            logger.error(f"Graph traversal failed: {e}")
            
        return evidence

retrieval_engine = HybridRetrievalEngine()

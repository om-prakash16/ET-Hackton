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
        Advanced Graph Traversal from Neo4j, pulling multi-hop neighborhood around the query entity.
        """
        evidence = {"nodes": [], "edges": []}
        try:
            with neo4j_client.get_session() as session:
                # 2-hop graph expansion around any node matching the query tag
                result = session.run(
                    """
                    MATCH (n {org_id: $org_id})
                    WHERE n.tag = $query OR n.label = $query
                    MATCH p = (n)-[*1..2]-(m)
                    RETURN [node IN nodes(p) | {labels: labels(node), props: properties(node)}] AS path_nodes,
                           [rel IN relationships(p) | {type: type(rel), start: startNode(rel).tag, end: endNode(rel).tag}] AS path_rels
                    LIMIT 25
                    """,
                    org_id=org_id, query=query
                )
                
                added_nodes = set()
                added_edges = set()
                
                for record in result:
                    # Add nodes
                    for node in record["path_nodes"]:
                        node_str = f"{node['labels'][0] if node['labels'] else 'Node'}({node['props'].get('tag', node['props'].get('id', 'Unknown'))})"
                        if node_str not in added_nodes:
                            evidence["nodes"].append(node_str)
                            added_nodes.add(node_str)
                            
                    # Add edges
                    for rel in record["path_rels"]:
                        edge_str = f"({rel.get('start', '?')})-[{rel['type']}]->({rel.get('end', '?')})"
                        if edge_str not in added_edges:
                            evidence["edges"].append(edge_str)
                            added_edges.add(edge_str)
                            
        except Exception as e:
            logger.error(f"Graph traversal failed: {e}")
            
        return evidence

retrieval_engine = HybridRetrievalEngine()

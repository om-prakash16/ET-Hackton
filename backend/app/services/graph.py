import logging
from typing import Dict, Any, List
from app.db.neo4j_client import neo4j_client

logger = logging.getLogger(__name__)

class GraphExtractionService:
    """
    Handles extracting Industrial Entities and pushing them to Neo4j.
    """
    
    async def extract_and_ingest(self, document_id: str, org_id: str, text: str):
        """
        Analyzes the document text, extracts entities (Equipment, Sensors, Incidents),
        and merges them into the Neo4j Knowledge Graph.
        """
        logger.info(f"Extracting Graph Entities for document {document_id}")
        
        # In a real implementation, this is where we would prompt an LLM:
        # prompt = f"Extract Plant, Equipment, and incident entities from this text: {text[:2000]}..."
        # entities = await llm.predict(prompt, schema=GraphSchema)
        
        # For Iteration 2, we simulate an entity extraction based on keywords
        entities = []
        if "Pump" in text or "P-101A" in text:
            entities.append({"label": "Equipment", "tag": "P-101A", "type": "Centrifugal Pump"})
        if "Valve" in text or "V-200" in text:
            entities.append({"label": "Equipment", "tag": "V-200", "type": "Gate Valve"})
        
        self._commit_to_neo4j(document_id, org_id, entities)

    def _commit_to_neo4j(self, document_id: str, org_id: str, entities: List[Dict[str, str]]):
        if not entities:
            logger.info("No entities extracted for graph ingestion.")
            return
            
        try:
            with neo4j_client.get_session() as session:
                # Always ensure the Document node exists
                session.run(
                    "MERGE (d:Document {id: $doc_id}) SET d.org_id = $org_id",
                    doc_id=document_id, org_id=org_id
                )
                
                for ent in entities:
                    if ent["label"] == "Equipment":
                        session.run(
                            "MERGE (e:Equipment {tag: $tag, org_id: $org_id}) "
                            "SET e.type = $type "
                            "MERGE (d:Document {id: $doc_id}) "
                            "MERGE (e)-[:MENTIONED_IN]->(d)",
                            tag=ent["tag"], org_id=org_id, type=ent.get("type", "Unknown"), doc_id=document_id
                        )
                        
            logger.info(f"Ingested {len(entities)} entities into Neo4j for document {document_id}")
        except Exception as e:
            logger.error(f"Failed Neo4j Graph ingestion: {e}")

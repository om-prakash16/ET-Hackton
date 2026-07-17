import logging
from typing import Dict, Any, List
from app.db.neo4j_client import neo4j_client
from google import genai
from pydantic import BaseModel
from app.core.config import settings

logger = logging.getLogger(__name__)

try:
    client = genai.Client(api_key=settings.AI_API_KEY)
except Exception:
    client = None

class ExtractedEntity(BaseModel):
    label: str
    tag: str
    type: str

class ExtractedRelationship(BaseModel):
    source_tag: str
    target_tag: str
    rel_type: str

class GraphExtractionSchema(BaseModel):
    entities: list[ExtractedEntity]
    relationships: list[ExtractedRelationship]

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
        
        if not client:
            logger.error("GenAI client not initialized.")
            return

        prompt = f"""
        Extract industrial equipment, sensors, locations, and incident entities from this text.
        Also extract relationships between them (e.g. CONTAINS, CONNECTED_TO).
        Text: {text[:4000]}
        """
        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config={
                    'response_mime_type': 'application/json',
                    'response_schema': GraphExtractionSchema,
                    'temperature': 0.1
                },
            )
            parsed_data = response.parsed
            
            entities = [{"label": e.label, "tag": e.tag, "type": e.type} for e in parsed_data.entities]
            relationships = [{"source_tag": r.source_tag, "target_tag": r.target_tag, "rel_type": r.rel_type} for r in parsed_data.relationships]
            
            self._commit_to_neo4j(document_id, org_id, entities, relationships)
        except Exception as e:
            logger.error(f"Failed to extract entities via LLM: {e}")

    def _commit_to_neo4j(self, document_id: str, org_id: str, entities: List[Dict[str, str]], relationships: List[Dict[str, str]]):
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
                    label = ent.get("label", "Entity").capitalize()
                    # Sanitize label to prevent cypher injection
                    if not label.isalnum(): label = "Entity"
                    
                    session.run(
                        f"MERGE (e:{label} {{tag: $tag, org_id: $org_id}}) "
                        "SET e.type = $type "
                        "MERGE (d:Document {id: $doc_id}) "
                        "MERGE (e)-[:MENTIONED_IN]->(d)",
                        tag=ent["tag"], org_id=org_id, type=ent.get("type", "Unknown"), doc_id=document_id
                    )
                    
                for rel in relationships:
                    rel_type = rel.get("rel_type", "RELATED_TO").upper().replace(" ", "_")
                    
                    session.run(
                        f"MATCH (a {{tag: $source_tag, org_id: $org_id}}) "
                        f"MATCH (b {{tag: $target_tag, org_id: $org_id}}) "
                        f"MERGE (a)-[:{rel_type}]->(b)",
                        source_tag=rel["source_tag"], target_tag=rel["target_tag"], org_id=org_id
                    )
                        
            logger.info(f"Ingested {len(entities)} entities and {len(relationships)} relationships into Neo4j for document {document_id}")
        except Exception as e:
            logger.error(f"Failed Neo4j Graph ingestion: {e}")

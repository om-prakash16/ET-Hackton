import logging
import asyncio
from app.db.neo4j_client import neo4j_client

logger = logging.getLogger("IndustrialBrain.EngineA")

class IngestionService:
    async def process_document(self, filename: str, file_data: bytes):
        """
        Simulate the OCR/CV, NLP extraction, and Graph mapping.
        """
        logger.info(f"Starting pipeline for {filename}")
        
        # Simulating processing time
        await asyncio.sleep(2)
        
        # Simulate extraction results
        extracted_entities = []
        if filename.endswith(".pdf") or filename.endswith(".png"):
            logger.info("Running Deep PDF / CV Parser...")
            extracted_entities = [
                {"label": "Equipment", "id": "ST-402", "type": "Styrene Tank"},
                {"label": "Sensor", "id": "PT-809", "type": "Pressure Transmitter", "monitors": "ST-402"},
                {"label": "Regulation", "id": "OISD-STD-105", "governs": "ST-402"}
            ]
        
        logger.info(f"Extracted {len(extracted_entities)} entities. Committing to Knowledge Graph...")
        self.commit_to_graph(extracted_entities, filename)
        logger.info(f"Successfully processed {filename}.")
        
    def commit_to_graph(self, entities: list, source_doc: str):
        try:
            with neo4j_client.get_session() as session:
                # Create the document node
                session.run("MERGE (d:Document {name: $name})", name=source_doc)
                
                for entity in entities:
                    if entity["label"] == "Equipment":
                        session.run(
                            "MERGE (e:Equipment {id: $id}) SET e.type = $type "
                            "MERGE (d:Document {name: $doc}) "
                            "MERGE (e)-[:APPEARS_IN]->(d)",
                            id=entity["id"], type=entity["type"], doc=source_doc
                        )
                    elif entity["label"] == "Sensor":
                        session.run(
                            "MERGE (s:Sensor {id: $id}) SET s.type = $type "
                            "MERGE (e:Equipment {id: $eq}) "
                            "MERGE (e)-[:MONITORS]->(s)",
                            id=entity["id"], type=entity["type"], eq=entity.get("monitors", "UNKNOWN")
                        )
                    elif entity["label"] == "Regulation":
                        session.run(
                            "MERGE (r:Regulation {id: $id}) "
                            "MERGE (e:Equipment {id: $eq}) "
                            "MERGE (e)-[:GOVERNED_BY]->(r)",
                            id=entity["id"], eq=entity.get("governs", "UNKNOWN")
                        )
        except Exception as e:
            logger.error(f"Failed to commit to graph: {e}")

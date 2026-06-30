import logging
from typing import List
from neo4j import GraphDatabase
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct, VectorParams, Distance
from .ontology import NodeAsset, AssetRelationship, AssetType, EdgeRelationship

logger = logging.getLogger("Engine_A_Ingestion")
logging.basicConfig(level=logging.INFO)

class UniversalIngestionEngine:
    """
    Engine A: The Universal Ingestion Pipeline.
    Responsible for parsing unstructured industrial documents (P&IDs, Manuals)
    and structuring them into the unified Neo4j + Qdrant Knowledge Graph.
    """
    def __init__(self, neo4j_uri, neo4j_user, neo4j_password, qdrant_url):
        self.neo4j_driver = GraphDatabase.driver(neo4j_uri, auth=(neo4j_user, neo4j_password))
        self.qdrant_client = QdrantClient(url=qdrant_url)
        self._init_vector_db()

    def _init_vector_db(self):
        try:
            self.qdrant_client.recreate_collection(
                collection_name="industrial_assets",
                vectors_config=VectorParams(size=384, distance=Distance.COSINE),
            )
            logger.info("Qdrant collection 'industrial_assets' initialized.")
        except Exception as e:
            logger.warning(f"Qdrant initialization bypassed: {e}")

    def ingest_assets_to_graph(self, assets: List[NodeAsset]):
        """Persists extracted asset nodes into Neo4j."""
        with self.neo4j_driver.session() as session:
            for asset in assets:
                query = """
                MERGE (a:Asset {asset_id: $asset_id})
                SET a.asset_type = $asset_type,
                    a.description = $description,
                    a.max_pressure_psi = $max_pressure_psi,
                    a.max_temp_celsius = $max_temp_celsius,
                    a.status = $status
                RETURN a
                """
                session.run(query, **asset.dict())
        logger.info(f"Successfully ingested {len(assets)} assets into Neo4j.")

    def ingest_relationships_to_graph(self, relationships: List[AssetRelationship]):
        """Persists physical relationships between assets into Neo4j."""
        with self.neo4j_driver.session() as session:
            for rel in relationships:
                query = f"""
                MATCH (source:Asset {{asset_id: $source_id}})
                MATCH (target:Asset {{asset_id: $target_id}})
                MERGE (source)-[r:{rel.relationship_type.value}]->(target)
                SET r += $properties
                """
                session.run(query, source_id=rel.source_asset_id, target_id=rel.target_asset_id, properties=rel.properties)
        logger.info(f"Successfully ingested {len(relationships)} relationships into Neo4j.")

    def close(self):
        self.neo4j_driver.close()

# ---------------------------------------------------------
# SIMULATION: Intelligent Document Parsing (LLM Extraction)
# ---------------------------------------------------------
def simulate_pid_extraction():
    logger.info("Simulating LLM extraction from P&ID Document: 'Styrene Storage Manual v4'")
    
    # Mock extracted entities
    assets = [
        NodeAsset(asset_id="ST-402", asset_type=AssetType.TANK, description="Main Styrene Storage Tank", max_pressure_psi=150.0, max_temp_celsius=65.0),
        NodeAsset(asset_id="V-101", asset_type=AssetType.VALVE, description="Primary Isolation Valve for ST-402"),
        NodeAsset(asset_id="P-205", asset_type=AssetType.PUMP, description="Feed Pump to Reactor"),
        NodeAsset(asset_id="S-PRESS-01", asset_type=AssetType.SENSOR, description="Pressure Transmitter on ST-402")
    ]
    
    # Mock extracted relationships
    relationships = [
        AssetRelationship(source_asset_id="V-101", target_asset_id="ST-402", relationship_type=EdgeRelationship.CONTROLS, properties={"fail_state": "CLOSED"}),
        AssetRelationship(source_asset_id="ST-402", target_asset_id="P-205", relationship_type=EdgeRelationship.FEEDS_INTO),
        AssetRelationship(source_asset_id="S-PRESS-01", target_asset_id="ST-402", relationship_type=EdgeRelationship.MONITORS, properties={"protocol": "OPC-UA"}),
    ]
    
    return assets, relationships

if __name__ == "__main__":
    # Test the ingestion logic locally against the Docker containers
    engine = UniversalIngestionEngine(neo4j_uri="bolt://localhost:7687", neo4j_user="neo4j", neo4j_password="password", qdrant_url="http://localhost:6333")
    
    extracted_nodes, extracted_edges = simulate_pid_extraction()
    engine.ingest_assets_to_graph(extracted_nodes)
    engine.ingest_relationships_to_graph(extracted_edges)
    
    engine.close()
    logger.info("Engine A Ingestion Test Complete. The Graph is alive.")

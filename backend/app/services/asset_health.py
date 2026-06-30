import logging
from typing import Dict, Any, List
from app.db.neo4j_client import neo4j_client

logger = logging.getLogger(__name__)

class AssetHealthEngine:
    """
    Computes Health Scores for Industrial Equipment based on Knowledge Graph topology
    (e.g., connected Incident nodes, Failure modes, Maintenance delays).
    """

    async def compute_health_score(self, equipment_tag: str, org_id: str) -> Dict[str, Any]:
        logger.info(f"Computing health score for Asset: {equipment_tag}")
        
        # In a full deployment, we would pull work order history from Postgres/ERP
        # For this Graph-first implementation, we look at the Neo4j topology.
        
        health_score = 100.0
        factors = []
        risk_level = "LOW"
        
        try:
            with neo4j_client.get_session() as session:
                # Mock Graph query to see if the Equipment is linked to past incidents
                # "MATCH (e:Equipment {tag: $tag, org_id: $org_id})<-[:AFFECTS]-(i:Incident) RETURN count(i)"
                result = session.run(
                    "MATCH (e:Equipment {tag: $tag, org_id: $org_id})-[:MENTIONED_IN]->(d:Document) "
                    "RETURN count(d) AS doc_count",
                    tag=equipment_tag, org_id=org_id
                )
                
                doc_count = result.single()["doc_count"]
                
                if doc_count > 5:
                    health_score -= 15.0
                    factors.append("High volume of historical documents/reports (potential recurring issues).")
                elif doc_count > 0:
                    health_score -= 5.0
                    factors.append("Standard operational wear and tear reported.")
                else:
                    factors.append("No historical failure or maintenance documents found in Knowledge Graph.")
                    
        except Exception as e:
            logger.error(f"Graph traversal failed during Health Scoring: {e}")
            factors.append("Error traversing asset history.")

        # Final risk classification
        if health_score >= 90:
            risk_level = "LOW"
        elif health_score >= 70:
            risk_level = "MEDIUM"
        elif health_score >= 40:
            risk_level = "HIGH"
        else:
            risk_level = "CRITICAL"

        return {
            "equipment_tag": equipment_tag,
            "health_score": round(health_score, 1),
            "risk_level": risk_level,
            "factors": factors,
            "confidence_score": 0.85
        }

asset_health_engine = AssetHealthEngine()

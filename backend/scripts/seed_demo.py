import asyncio
import os
import sys

# Ensure backend root is in PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.db.neo4j_client import neo4j_client

def seed_neo4j():
    print("Connecting to Neo4j to seed Industrial Knowledge Graph...")
    
    with neo4j_client.get_session() as session:
        # Clean existing
        session.run("MATCH (n) DETACH DELETE n")

        # Seed Organization
        session.run(
            "CREATE (o:Organization {id: 'org_1', name: 'Global Energy Corp'})"
        )

        # Seed Plants
        session.run(
            "MATCH (o:Organization {id: 'org_1'}) "
            "CREATE (p1:Plant {id: 'plant_1', name: 'Visakhapatnam Refinery', location: 'India'}) "
            "CREATE (p2:Plant {id: 'plant_2', name: 'Texas Petrochemical', location: 'USA'}) "
            "CREATE (o)-[:OWNS]->(p1) "
            "CREATE (o)-[:OWNS]->(p2)"
        )

        # Seed Equipment for Visakhapatnam
        session.run(
            "MATCH (p:Plant {id: 'plant_1'}) "
            "CREATE (e1:Equipment {tag: 'P-101A', type: 'Centrifugal Pump', status: 'CRITICAL'}) "
            "CREATE (e2:Equipment {tag: 'ST-402', type: 'Steam Turbine', status: 'NOMINAL'}) "
            "CREATE (e3:Equipment {tag: 'V-201', type: 'Pressure Vessel', status: 'WARNING'}) "
            "CREATE (p)-[:CONTAINS]->(e1) "
            "CREATE (p)-[:CONTAINS]->(e2) "
            "CREATE (p)-[:CONTAINS]->(e3) "
            "CREATE (e1)-[:FEEDS]->(e3)"
        )

        # Seed Incidents
        session.run(
            "MATCH (e:Equipment {tag: 'P-101A'}) "
            "CREATE (i1:Incident {id: 'INC-2025-04', type: 'Seal Failure', severity: 'HIGH', date: '2025-11-12'}) "
            "CREATE (i1)-[:AFFECTED]->(e)"
        )

        # Seed Regulations
        session.run(
            "MATCH (e1:Equipment {tag: 'P-101A'}), (e3:Equipment {tag: 'V-201'}) "
            "CREATE (r1:Regulation {id: 'OISD-105', title: 'Work Permit System'}) "
            "CREATE (r2:Regulation {id: 'API-610', title: 'Centrifugal Pumps for Petroleum'}) "
            "CREATE (r1)-[:GOVERNS]->(e3) "
            "CREATE (r2)-[:GOVERNS]->(e1)"
        )

    print("Neo4j Knowledge Graph successfully seeded with Demo Data!")

if __name__ == "__main__":
    seed_neo4j()

// 002_neo4j_init.cypher
// Initializes the Industrial Knowledge Graph schema, constraints, and indexes.

// 1. Constraints (Ensure uniqueness and prevent duplicates)
CREATE CONSTRAINT plant_id_unique IF NOT EXISTS FOR (p:Plant) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT equipment_id_unique IF NOT EXISTS FOR (e:Equipment) REQUIRE e.id IS UNIQUE;
CREATE CONSTRAINT equipment_tag_unique IF NOT EXISTS FOR (e:Equipment) REQUIRE e.tag IS UNIQUE;
CREATE CONSTRAINT document_id_unique IF NOT EXISTS FOR (d:Document) REQUIRE d.id IS UNIQUE;
CREATE CONSTRAINT chunk_id_unique IF NOT EXISTS FOR (c:Chunk) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT incident_id_unique IF NOT EXISTS FOR (i:Incident) REQUIRE i.id IS UNIQUE;

// 2. Indexes (For fast traversal and lookup)
CREATE INDEX equipment_class_idx IF NOT EXISTS FOR (e:Equipment) ON (e.class);
CREATE INDEX equipment_manufacturer_idx IF NOT EXISTS FOR (e:Equipment) ON (e.manufacturer);
CREATE INDEX incident_date_idx IF NOT EXISTS FOR (i:Incident) ON (i.date);

// 3. Setup Taxonomy Nodes (Master reference nodes)
MERGE (c_pump:EquipmentClass {name: "Centrifugal Pump"})
MERGE (c_valve:EquipmentClass {name: "Gate Valve"})
MERGE (fm_cavitation:FailureMode {name: "Cavitation"})
MERGE (fm_seal_leak:FailureMode {name: "Mechanical Seal Leak"});

// 4. Sample Graph Seeding
// Create Plant
MERGE (p:Plant {id: "pl-1001", name: "Houston Refinery", location: "Texas, USA"})

// Create Equipment
MERGE (e1:Equipment {id: "eq-5001", tag: "P-101A", name: "Main Crude Charge Pump", class: "Centrifugal Pump", manufacturer: "Flowserve", criticality: "CRITICAL"})
MERGE (e2:Equipment {id: "eq-5002", tag: "V-200", name: "Discharge Isolation Valve", class: "Gate Valve", manufacturer: "Emerson", criticality: "HIGH"})

// Connect Equipment to Class Taxonomy
MERGE (e1)-[:BELONGS_TO_CLASS]->(c_pump)
MERGE (e2)-[:BELONGS_TO_CLASS]->(c_valve)

// Connect Equipment Topological Edge (P&ID)
MERGE (e1)-[:CONNECTED_TO {medium: "crude_oil", direction: "downstream"}]->(e2)

// Create Incident and link to Equipment
MERGE (i:Incident {id: "inc-2024-001", title: "Seal Leak due to Cavitation", date: "2024-03-15", severity: "CRITICAL"})
MERGE (i)-[:INVOLVED]->(e1)
MERGE (i)-[:FAILED_DUE_TO]->(fm_cavitation);

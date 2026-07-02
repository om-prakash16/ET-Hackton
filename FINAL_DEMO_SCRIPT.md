# ETI Hackathon: Industrial AI Operating System - Final Demo Script

## The Narrative (Pitch)
**Presenter (Speaker 1):**
"A 2024 McKinsey survey found that professionals in asset-intensive industries spend 35% of their time just searching for information. P&IDs are in one system, maintenance logs in another, and OEM manuals in a PDF archive. When a critical pump begins to vibrate, engineers lose hours piecing together the context.

Today, we are presenting our Industrial AI Operating System. This is not a chatbot. This is a unified intelligence layer that automatically ingests unstructured engineering data, builds an active Knowledge Graph, and powers decision intelligence across maintenance, compliance, and operations."

---

## Step 1: The Unified Brain (Executive Dashboard)
**Action:** Open the application to the default 'Unified Brain' tab (`http://localhost:3000`).
**Presenter:**
"When a Plant Manager logs in, they don't see a static dashboard. They see a live operational brain. 
* Point to the top metrics: We are actively monitoring total assets, graph nodes, and compliance status.
* Point to the **Active Ingestion Stream**: You can see Kafka streaming in new documents, chunking them, and inserting them into our Neo4j and Qdrant clusters in real-time.
* Point to the **AI Triage Inbox**: Immediately, the system surfaces a critical alert: P-101A is experiencing a 15% pressure drop. The AI has already triaged this and linked it to the relevant telemetry."

---

## Step 2: Document Corpus & Knowledge Graph
**Action:** Click on the 'Document Corpus' tab on the left navigation.
**Presenter:**
"How does the AI know about P-101A? Through our Universal Document Intelligence pipeline. 
* We ingested the API-610 Centrifugal Pumps Manual, P&ID DWG files, and maintenance logs.
* **Action:** Click on the `API-610_Centrifugal_Pumps_Manual.pdf` row in the table.
* On the right side, you see the Knowledge Graph Inspector. The system didn't just store the PDF; it extracted entities, recognized that 'P-101A' is a mechanical seal pump, and built a topology preview representing how this document connects to our physical assets."

---

## Step 3: GraphRAG Copilot Investigation
**Action:** Click on the 'AI Copilot' tab on the left navigation.
**Presenter:**
"Let's ask the AI about our failing pump. Because we are using GraphRAG—combining Vector Search with Knowledge Graph traversal—the AI doesn't hallucinate."
* **Action:** Type into the chat: `"What is causing the pressure drop in P-101A?"`
* Wait for the AI to stream the response.
**Presenter:**
"The AI explains the issue and generates citations. Notice the citations are not just plain text.
* **Action:** Click the `Cite: API-610 Page 42` button below the AI's response.
* The Right Inspector immediately synchronizes, pulling up the exact paragraph from the OEM manual stating that a 10% pressure drop indicates seal failure. 
* We have 100% explainability and provenance. The engineer trusts the AI because the AI shows its exact source document and confidence score."

---

## Step 4: Maintenance Intelligence & RCA
**Action:** Click on the 'Maintenance & RCA' tab on the left navigation.
**Presenter:**
"Instead of spending 3 days doing a Root Cause Analysis, the system does it instantly."
* **Action:** Click on the `P-101A Seal Degradation` active incident on the left.
* **Presenter:**
"Here is the automated Root Cause Tree. 
1. **Symptom:** 15% Pressure Drop (detected via telemetry).
2. **Probable Cause:** Mechanical Seal Degradation.
3. **Root Cause:** By analyzing the maintenance logs and cross-referencing the API-610 manual, the AI discovered that during the October 2nd maintenance, the wrong flushing fluid (Type-B) was used, causing accelerated wear.
* The AI immediately provides actionable recommendations: Isolate the pump and swap the flush fluid. We've turned a potential catastrophic failure into a scheduled maintenance task."

---

## Step 5: Compliance & Audit
**Action:** Click on the 'Compliance Audit' tab on the left navigation.
**Presenter:**
"Finally, we map all of this operational reality against regulatory frameworks like the Factory Act and OISD-105."
* **Action:** Point to the 'Overall Compliance Score' and the active violations list.
* **Presenter:**
"The system detects that Tank T-400 missed its mandatory secondary containment inspection. It knows this because no work order node exists in the Graph since August. It also flags the P-101A fluid mismatch as a direct safety violation. 
With one click, we can generate a work order to fix the compliance gap."

---

## Conclusion
**Presenter:**
"In conclusion, we have built an end-to-end Industrial Operating System. We built the ingestion pipeline, the graph database integration, the vector retrieval, and this premium enterprise command center. 
We've proven that by breaking down document silos into a unified knowledge graph, we can drastically reduce downtime, guarantee compliance, and empower engineers with context-aware AI."

*End Demo.*

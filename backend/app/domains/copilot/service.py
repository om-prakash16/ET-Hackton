import logging
import asyncio
from app.db.neo4j_client import neo4j_client
from app.ai.llm_client import extract_entities, synthesize_answer
import json

logger = logging.getLogger("IndustrialBrain.CopilotService")

class CopilotService:
    async def process_query(self, query: str, session_id: str):
        logger.info(f"Processing Copilot Query: '{query}'")
        
        # 1. LLM Entity Extraction
        try:
            extracted = extract_entities(query)
            logger.info(f"Extracted Entities: {extracted.equipment_tags} (Intent: {extracted.intent})")
        except Exception as e:
            logger.error(f"Failed to extract entities: {e}")
            extracted = type('obj', (object,), {'equipment_tags': [], 'intent': 'unknown'})
            
        agent_type = "GraphRAG_Agent"
        
        # 2. Graph Retrieval
        graph_context_strs = []
        citations = []
        
        if extracted.equipment_tags:
            try:
                with neo4j_client.get_session() as session:
                    for tag in extracted.equipment_tags:
                        result = session.run(
                            """
                            MATCH (e:Equipment {tag: $tag})-[r]-(connected)
                            RETURN e.tag AS source, type(r) AS rel, labels(connected)[0] AS type, properties(connected) AS props
                            """,
                            tag=tag
                        )
                        records = result.data()
                        if records:
                            context_chunk = f"Topology for {tag}:\n"
                            for rec in records:
                                context_chunk += f"- {rec['source']} [{rec['rel']}] {rec['type']} (Details: {json.dumps(rec['props'])})\n"
                                
                                # Gather citations heuristically
                                if rec['type'] == 'Regulation':
                                    citations.append(rec['props'].get('id', 'Regulation'))
                                elif rec['type'] == 'Incident':
                                    citations.append(rec['props'].get('id', 'Incident'))
                            
                            graph_context_strs.append(context_chunk)
                        else:
                            graph_context_strs.append(f"No graph data found for equipment {tag}.")
            except Exception as e:
                logger.error(f"Graph traversal failed: {e}")
                graph_context_strs.append("Graph database unavailable.")
        else:
            graph_context_strs.append("No specific equipment tags identified in the query. Answer generically.")

        combined_context = "\n\n".join(graph_context_strs)
        logger.info(f"Retrieved Graph Context:\n{combined_context}")
        
        # 3. LLM Synthesis
        try:
            final_answer = synthesize_answer(query, combined_context)
        except Exception as e:
            logger.error(f"LLM Synthesis failed: {e}")
            final_answer = "I'm sorry, my synthesis engine is currently unavailable."

        return {
            "response": final_answer,
            "citations": list(set(citations)) if citations else ["Neo4j Graph Context"],
            "context": {
                "graph_nodes_traversed": len(graph_context_strs),
                "entities_identified": extracted.equipment_tags
            },
            "agent": agent_type
        }

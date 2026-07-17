import logging
import json
from google import genai
from app.core.config import settings
from app.services.rca import rca_engine
from app.services.compliance import compliance_evaluator
from app.services.retrieval import retrieval_engine
from app.services.lessons_learned import lessons_learned_engine

logger = logging.getLogger(__name__)

try:
    client = genai.Client(api_key=settings.AI_API_KEY)
except Exception:
    client = None

# Define tool functions that the LLM can call
async def run_root_cause_analysis(equipment_tag: str, failure_symptom: str) -> str:
    """Runs a Root Cause Analysis on a failing equipment piece."""
    result = await rca_engine.analyze_failure(equipment_tag, failure_symptom, "default_org")
    return json.dumps(result)

async def run_compliance_check(equipment_tag: str, target_regulation: str) -> str:
    """Checks an equipment piece against a regulatory standard (like OISD-105 or Factory Act)."""
    result = await compliance_evaluator.evaluate_asset(equipment_tag, target_regulation, "default_org")
    return json.dumps(result)

async def query_knowledge_graph(query: str) -> str:
    """Queries the knowledge graph and vector store for general context."""
    # We use a general keyword for graph search, assume the LLM extracted it
    semantic_evidence = await retrieval_engine.search_vectors(query, "default_org", limit=3)
    # Simple heuristic to extract a tag from query if present, otherwise just return semantic
    # A real implementation would use a proper entity extractor first
    tag_candidates = [word for word in query.split() if "-" in word or any(c.isdigit() for c in word)]
    graph_evidence = {}
    if tag_candidates:
        graph_evidence = await retrieval_engine.search_graph("default_org", tag_candidates[0])
        
    return json.dumps({
        "semantic": [s["text"] for s in semantic_evidence],
        "graph": graph_evidence
    })

async def run_lessons_learned_analysis(focus_area: str) -> str:
    """Analyzes org-wide history for systemic patterns and proactive warnings."""
    result = await lessons_learned_engine.analyze_org_history("default_org", focus_area)
    return json.dumps(result)

# The mapping from function name to the actual async Python function
_TOOL_FUNCTIONS = {
    "run_root_cause_analysis": run_root_cause_analysis,
    "run_compliance_check": run_compliance_check,
    "query_knowledge_graph": query_knowledge_graph,
    "run_lessons_learned_analysis": run_lessons_learned_analysis
}

# The declarations for Gemini
_TOOL_DECLARATIONS = [
    {
        "name": "run_root_cause_analysis",
        "description": "Runs a Root Cause Analysis on a failing equipment piece.",
        "parameters": {
            "type": "OBJECT",
            "properties": {
                "equipment_tag": {"type": "STRING", "description": "The equipment tag, e.g., P-101A"},
                "failure_symptom": {"type": "STRING", "description": "The symptom, e.g., 'pressure drop'"}
            },
            "required": ["equipment_tag", "failure_symptom"]
        }
    },
    {
        "name": "run_compliance_check",
        "description": "Checks an equipment piece against a regulatory standard.",
        "parameters": {
            "type": "OBJECT",
            "properties": {
                "equipment_tag": {"type": "STRING"},
                "target_regulation": {"type": "STRING", "description": "e.g., OISD-105, Factory Act"}
            },
            "required": ["equipment_tag", "target_regulation"]
        }
    },
    {
        "name": "query_knowledge_graph",
        "description": "Queries the knowledge graph for general equipment or document context.",
        "parameters": {
            "type": "OBJECT",
            "properties": {
                "query": {"type": "STRING", "description": "The search query."}
            },
            "required": ["query"]
        }
    },
    {
        "name": "run_lessons_learned_analysis",
        "description": "Analyzes historical incidents across the organization to find systemic patterns.",
        "parameters": {
            "type": "OBJECT",
            "properties": {
                "focus_area": {"type": "STRING", "description": "The type of failure or process to analyze, e.g., 'pump failures', 'safety audits'"}
            },
            "required": ["focus_area"]
        }
    }
]

class AgentOrchestrator:
    """
    Agentic Orchestrator that takes a user query, decides which tool to use,
    executes the tool, and synthesizes a final response.
    """
    
    async def process_user_query(self, user_query: str) -> str:
        logger.info(f"Orchestrating query: {user_query}")
        
        if not client:
            return "AI Client not initialized."
            
        try:
            # 1. Ask LLM to determine the tool
            system_prompt = "You are an Industrial AI Agent. Use the provided tools to answer the user's query."
            
            chat = client.chats.create(
                model='gemini-2.5-flash',
                config={
                    "tools": [{"function_declarations": _TOOL_DECLARATIONS}],
                    "system_instruction": system_prompt,
                    "temperature": 0.2
                }
            )
            
            # Send message, it might return a function call
            response = chat.send_message(user_query)
            
            # 2. Check for function calls and execute them
            if response.function_calls:
                # We handle the first function call for simplicity in MVP
                fc = response.function_calls[0]
                tool_name = fc.name
                tool_args = fc.args
                
                logger.info(f"Agent chose tool: {tool_name} with args {tool_args}")
                
                if tool_name in _TOOL_FUNCTIONS:
                    # Execute the actual python tool asynchronously
                    tool_result_str = await _TOOL_FUNCTIONS[tool_name](**tool_args)
                    
                    # 3. Send the result back to the LLM so it can synthesize the final answer
                    final_response = chat.send_message(
                        [genai.types.Part.from_function_response(
                            name=tool_name,
                            response={"result": tool_result_str}
                        )]
                    )
                    return final_response.text
                else:
                    return f"Error: Tool {tool_name} not found."
            else:
                # The LLM answered directly without needing a tool
                return response.text
                
        except Exception as e:
            logger.error(f"Orchestrator failed: {e}")
            return "An error occurred while orchestrating the agent response."

orchestrator = AgentOrchestrator()

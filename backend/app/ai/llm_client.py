from google import genai
from pydantic import BaseModel
from app.core.config import settings

client = genai.Client(api_key=settings.AI_API_KEY)

class ExtractedEntities(BaseModel):
    equipment_tags: list[str]
    intent: str

def extract_entities(query: str) -> ExtractedEntities:
    """Uses Gemini Structured Outputs to extract entity tags from the query."""
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=f"Extract industrial equipment tags (like P-101A, V-201, CV-05) and the user intent from this query: '{query}'",
        config={
            'response_mime_type': 'application/json',
            'response_schema': ExtractedEntities,
            'temperature': 0.1
        },
    )
    return response.parsed

def synthesize_answer(query: str, graph_context: str) -> str:
    """Synthesizes the final answer using the provided graph topology context."""
    system_prompt = (
        "You are an Industrial AI Copilot. You have been provided with topological "
        "and incident context retrieved from a Neo4j Knowledge Graph.\n\n"
        f"Context:\n{graph_context}\n\n"
        "Answer the user's query clearly and concisely based ONLY on the provided context. "
        "If the context does not contain the answer, say you don't know."
    )
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[system_prompt, f"User Query: {query}"],
    )
    return response.text

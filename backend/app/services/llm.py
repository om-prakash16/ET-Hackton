import logging
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

from google import genai
from app.core.config import settings

class LLMProvider:
    """
    LLM Provider powered by Google's Gemini Flash.
    """
    
    def __init__(self):
        if settings.AI_API_KEY:
            self.client = genai.Client(api_key=settings.AI_API_KEY)
        else:
            self.client = genai.Client()
            
    async def generate_response(self, system_prompt: str, context: str, user_query: str) -> str:
        """
        Calls Gemini with the context and user query to generate a synthesized response.
        """
        logger.info("Executing LLM generation via Gemini...")
        
        if not context or context.strip() == "":
            return "I'm sorry, but I do not have enough evidence in the system to answer your question."
            
        try:
            prompt = f"Context Evidence:\n{context}\n\nUser Query:\n{user_query}\n\nPlease synthesize an answer purely from the provided context."
            
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config=genai.types.GenerateContentConfig(
                    system_instruction=system_prompt,
                )
            )
            return response.text
        except Exception as e:
            logger.error(f"Failed to generate LLM response via Gemini: {e}")
            return f"An error occurred while connecting to the intelligence core: {str(e)}"

llm_provider = LLMProvider()

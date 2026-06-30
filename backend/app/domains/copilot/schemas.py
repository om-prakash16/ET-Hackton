from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ChatMessage(BaseModel):
    role: str # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    query: str
    history: List[ChatMessage] = []
    # Optional filters
    equipment_tag: Optional[str] = None
    document_id: Optional[str] = None

class Citation(BaseModel):
    document_id: str
    chunk_index: int
    text_snippet: str
    confidence: float

class GraphEvidence(BaseModel):
    nodes_traversed: List[str] = []
    relationships: List[str] = []

class ChatResponse(BaseModel):
    answer: str
    confidence_score: float
    citations: List[Citation] = []
    graph_evidence: Optional[GraphEvidence] = None
    processing_time_ms: int

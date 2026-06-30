from typing import List, Dict, Any

class ContextBuilder:
    """
    Fuses Vector search results and Graph topologies into a single context prompt.
    """
    
    def build_system_prompt(self, role: str = "Engineering Assistant") -> str:
        return f"""You are an Industrial AI {role}.
        You must answer the user's question using ONLY the provided Context block.
        If the Context does not contain the answer, you must state that there is insufficient evidence.
        Always cite the document IDs and graph entities you used.
        """
        
    def build_context(self, vectors: List[Dict[str, Any]], graph_data: Dict[str, Any]) -> str:
        context = "--- SEMANTIC EVIDENCE ---\n"
        for v in vectors:
            context += f"Document ID: {v['document_id']} | Chunk: {v['chunk_index']} | Score: {v['score']:.2f}\n"
            context += f"Content: {v['text']}\n\n"
            
        context += "--- GRAPH TOPOLOGY EVIDENCE ---\n"
        if graph_data["nodes"]:
            context += f"Known Entities: {', '.join(graph_data['nodes'])}\n"
            context += "Relationships:\n"
            for edge in graph_data["edges"]:
                context += f"- {edge}\n"
        else:
            context += "No topological graph evidence found.\n"
            
        return context

context_builder = ContextBuilder()

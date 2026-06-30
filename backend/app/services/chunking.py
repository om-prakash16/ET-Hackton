from typing import List, Dict, Any

class SemanticChunker:
    """
    Chunks large document text into semantic windows.
    For this implementation, we use a simple sliding window algorithm with token overlaps.
    """
    def __init__(self, chunk_size: int = 500, overlap: int = 50):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk_text(self, text: str) -> List[Dict[str, Any]]:
        """
        Splits text into chunks of roughly `chunk_size` words, 
        overlapping by `overlap` words to preserve context.
        """
        words = text.split()
        chunks = []
        
        if not words:
            return chunks

        i = 0
        chunk_index = 0
        while i < len(words):
            chunk_words = words[i:i + self.chunk_size]
            chunk_text = " ".join(chunk_words)
            
            chunks.append({
                "chunk_index": chunk_index,
                "text": chunk_text,
                "word_count": len(chunk_words)
            })
            
            i += (self.chunk_size - self.overlap)
            chunk_index += 1
            
        return chunks

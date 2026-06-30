import fitz  # PyMuPDF
import logging
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

class DocumentParser:
    """Base class for all document parsers."""
    def parse(self, file_path: str) -> Dict[str, Any]:
        raise NotImplementedError

class PDFParser(DocumentParser):
    def parse(self, file_path: str) -> Dict[str, Any]:
        """
        Parses a PDF using PyMuPDF. Extracts text, basic layout, and metadata.
        """
        logger.info(f"Parsing PDF: {file_path}")
        
        result = {
            "text": "",
            "pages": [],
            "metadata": {},
            "tables": []
        }
        
        try:
            doc = fitz.open(file_path)
            result["metadata"] = doc.metadata
            
            for page_num in range(len(doc)):
                page = doc.load_page(page_num)
                text = page.get_text("text")
                result["text"] += text + "\n"
                
                result["pages"].append({
                    "page_number": page_num + 1,
                    "text": text
                })
                
                # Basic table detection (if PyMuPDF supports it natively in this version)
                tabs = page.find_tables()
                if tabs:
                    for tab in tabs.tables:
                        result["tables"].append({
                            "page": page_num + 1,
                            "content": tab.extract()
                        })
                        
            doc.close()
        except Exception as e:
            logger.error(f"Failed to parse PDF {file_path}: {e}")
            raise e
            
        return result

def get_parser(file_type: str) -> DocumentParser:
    """Returns the appropriate parser based on MIME type."""
    if file_type == "application/pdf":
        return PDFParser()
    # Fallback to a generic or throw error
    return PDFParser() # Defaulting to PDF for the hackathon MVP

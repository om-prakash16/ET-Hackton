import fitz  # PyMuPDF
import logging
from typing import Dict, Any, List
import pytesseract
from PIL import Image
from pdf2image import convert_from_path

logger = logging.getLogger(__name__)

class DocumentParser:
    """Base class for all document parsers."""
    def parse(self, file_path: str) -> Dict[str, Any]:
        raise NotImplementedError

class PDFParser(DocumentParser):
    def parse(self, file_path: str) -> Dict[str, Any]:
        """
        Parses a PDF using PyMuPDF. Extracts text, basic layout, and metadata.
        Falls back to OCR for scanned pages.
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
                text = page.get_text("text").strip()
                
                # If text is too short, we assume it's a scanned page and run OCR
                if len(text) < 50:
                    logger.info(f"Page {page_num + 1} looks scanned. Running OCR...")
                    try:
                        images = convert_from_path(file_path, first_page=page_num+1, last_page=page_num+1)
                        if images:
                            text = pytesseract.image_to_string(images[0])
                    except Exception as ocr_e:
                        logger.warning(f"OCR failed on page {page_num+1}: {ocr_e}")
                        
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

class ImageParser(DocumentParser):
    def parse(self, file_path: str) -> Dict[str, Any]:
        logger.info(f"Running OCR on Image: {file_path}")
        result = {"text": "", "pages": [], "metadata": {}, "tables": []}
        try:
            image = Image.open(file_path)
            text = pytesseract.image_to_string(image)
            result["text"] = text
            result["pages"].append({"page_number": 1, "text": text})
        except Exception as e:
            logger.error(f"OCR failed on image {file_path}: {e}")
            raise e
        return result

def get_parser(file_type: str) -> DocumentParser:
    """Returns the appropriate parser based on MIME type."""
    if file_type == "application/pdf":
        return PDFParser()
    elif file_type in ["image/png", "image/jpeg", "image/jpg"]:
        return ImageParser()
    # Fallback to a generic or throw error
    return PDFParser() # Defaulting to PDF for the hackathon MVP

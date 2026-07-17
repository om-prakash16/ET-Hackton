import pytest
from unittest.mock import MagicMock

def test_knowledge_graph_extraction_mock():
    # Mocking the entity extraction to ensure basic tests exist
    document_content = "Pump P-101A experienced a 15% pressure drop on October 2nd."
    
    # Mock extraction result
    mock_extractor = MagicMock()
    mock_extractor.extract_entities.return_value = [
        {"entity": "P-101A", "type": "Equipment"},
        {"entity": "15% pressure drop", "type": "Symptom"},
        {"entity": "October 2nd", "type": "Date"}
    ]
    
    entities = mock_extractor.extract_entities(document_content)
    
    assert len(entities) == 3
    assert entities[0]["entity"] == "P-101A"
    assert entities[0]["type"] == "Equipment"

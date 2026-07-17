from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "ONLINE", "engines": ["A", "B", "C", "D", "E"], "db": "Configured"}

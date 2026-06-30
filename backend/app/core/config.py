import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Unified Asset & Operations Brain API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # PostgreSQL / SQLAlchemy
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "industrial_brain")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        # Use asyncpg for asynchronous operations
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # JWT Authentication
    SECRET_KEY: str = os.getenv("SECRET_KEY", "SUPER_SECRET_CHANGE_IN_PRODUCTION")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15

    # Neo4j
    NEO4J_URI: str = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    NEO4J_USER: str = os.getenv("NEO4J_USER", "neo4j")
    NEO4J_PASSWORD: str = os.getenv("NEO4J_PASSWORD", "password")
    
    # Qdrant
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    
    # Redis
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6380/0")
    
    # Kafka
    KAFKA_BROKER: str = os.getenv("KAFKA_BROKER", "localhost:9092")
    
    # AI Models
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

settings = Settings()

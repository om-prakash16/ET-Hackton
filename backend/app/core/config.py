import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file="../.env", env_file_encoding="utf-8", extra="ignore")
    PROJECT_NAME: str = "Unified Asset & Operations Brain API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # PostgreSQL / SQLAlchemy
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "industrial_brain"
    POSTGRES_PORT: str = "5432"

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        # Use asyncpg for asynchronous operations
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # JWT Authentication
    SECRET_KEY: str = "SUPER_SECRET_CHANGE_IN_PRODUCTION"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15

    # Neo4j
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "password"
    
    # Qdrant
    QDRANT_URL: str = "http://localhost:6333"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6380/0"
    
    # Kafka
    KAFKA_BROKER: str = "localhost:9092"
    
    # AI Models
    GOOGLE_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    
    @property
    def AI_API_KEY(self) -> str:
        return self.GEMINI_API_KEY or self.GOOGLE_API_KEY

settings = Settings()

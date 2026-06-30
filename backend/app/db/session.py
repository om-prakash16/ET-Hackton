from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.core.config import settings

# Create the async engine
engine = create_async_engine(
    settings.SQLALCHEMY_DATABASE_URI,
    echo=False,          # Set to True for verbose SQL logging
    future=True,         # Use 2.0 style
    pool_pre_ping=True,  # Check connection liveness
    pool_size=10,
    max_overflow=20
)

# Create the async session factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency function that yields an async database session.
    Automatically closes the session after the request is finished.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

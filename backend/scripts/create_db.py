import asyncio
import asyncpg
from app.core.config import settings

async def create_db():
    try:
        # Connect to the default 'postgres' database
        conn = await asyncpg.connect(
            user=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASSWORD,
            host=settings.POSTGRES_SERVER,
            port=settings.POSTGRES_PORT,
            database='postgres'
        )
        print(f"Connected to postgres database to create {settings.POSTGRES_DB}")
        
        # Check if database exists
        exists = await conn.fetchval(f"SELECT 1 FROM pg_database WHERE datname='{settings.POSTGRES_DB}'")
        if not exists:
            await conn.execute(f"CREATE DATABASE {settings.POSTGRES_DB}")
            print(f"Database {settings.POSTGRES_DB} created successfully.")
        else:
            print(f"Database {settings.POSTGRES_DB} already exists.")
            
        await conn.close()
    except Exception as e:
        print(f"Failed to create database: {e}")

if __name__ == "__main__":
    asyncio.run(create_db())

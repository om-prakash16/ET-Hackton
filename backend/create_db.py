import asyncio
import asyncpg
import os

async def create_db():
    try:
        # Connect to default postgres db
        conn = await asyncpg.connect(
            user=os.getenv("POSTGRES_USER", "postgres"),
            password=os.getenv("POSTGRES_PASSWORD", "postgres"),
            host=os.getenv("POSTGRES_SERVER", "localhost"),
            port=os.getenv("POSTGRES_PORT", "5432"),
            database="postgres"
        )
        db_name = os.getenv("POSTGRES_DB", "industrial_brain")
        try:
            await conn.execute(f'CREATE DATABASE {db_name}')
            print(f"Database {db_name} created!")
        except asyncpg.exceptions.DuplicateDatabaseError:
            print(f"Database {db_name} already exists!")
            
        await conn.close()
    except Exception as e:
        print(f"Error connecting to postgres: {e}")

asyncio.run(create_db())

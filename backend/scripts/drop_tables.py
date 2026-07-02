import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

async def main():
    engine = create_async_engine("postgresql+asyncpg://postgres:postgres@localhost:5432/skillsutra")
    async with engine.begin() as conn:
        await conn.execute(text("DROP SCHEMA public CASCADE;"))
        await conn.execute(text("CREATE SCHEMA public;"))
    print("Dropped public schema and recreated it.")

if __name__ == "__main__":
    asyncio.run(main())

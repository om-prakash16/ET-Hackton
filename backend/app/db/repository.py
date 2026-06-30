from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from uuid import UUID
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.base import Base

ModelType = TypeVar("ModelType", bound=Base)

class CRUDBase(Generic[ModelType]):
    """
    Generic CRUD object with default methods to Create, Read, Update, Delete (CRUD).
    Enforces soft deletes automatically if `deleted_at` is part of the model.
    """
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def get(self, db: AsyncSession, id: Any) -> Optional[ModelType]:
        query = select(self.model).where(self.model.id == id, self.model.deleted_at == None)
        result = await db.execute(query)
        return result.scalars().first()

    async def get_multi(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> List[ModelType]:
        query = select(self.model).where(self.model.deleted_at == None).offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars().all()

    async def create(self, db: AsyncSession, *, obj_in: Dict[str, Any]) -> ModelType:
        db_obj = self.model(**obj_in)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(self, db: AsyncSession, *, db_obj: ModelType, obj_in: Dict[str, Any]) -> ModelType:
        for field in obj_in:
            if hasattr(db_obj, field):
                setattr(db_obj, field, obj_in[field])
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def soft_delete(self, db: AsyncSession, *, id: UUID) -> Optional[ModelType]:
        from datetime import datetime
        db_obj = await self.get(db, id)
        if db_obj:
            db_obj.deleted_at = datetime.utcnow()
            db.add(db_obj)
            await db.commit()
            await db.refresh(db_obj)
        return db_obj

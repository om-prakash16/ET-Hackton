from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.core.config import settings
from app.core.security import decode_access_token
from app.db.session import get_db
from app.models.user import User
from app.core.exceptions import UnauthorizedException, ForbiddenException
import logging

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

logger = logging.getLogger(__name__)

from fastapi import Request
import uuid

async def get_current_user(
    request: Request,
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Dependency that bypasses JWT for hackathon dev mode if X-Hackathon-Bypass is set.
    """
    # Hackathon bypass
    if request.headers.get("X-Hackathon-Bypass") == "true":
        # Return a mock user
        user = User(
            id=uuid.UUID('12345678-1234-5678-1234-567812345678'),
            org_id=uuid.UUID('87654321-4321-8765-4321-876543210987'),
            email="hackathon@admin.com",
            is_active=True
        )
        return user
        
    # Standard flow (disabled or simplified for now)
    raise UnauthorizedException("Auth requires JWT which is disabled for Hackathon dev. Use X-Hackathon-Bypass header.")

async def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    """Enforces that the user is active."""
    if not current_user.is_active:
        raise ForbiddenException("Inactive user")
    return current_user

async def get_current_tenant(
    current_user: User = Depends(get_current_active_user),
) -> str:
    """Extracts the organization ID (tenant ID) from the current user."""
    if not current_user.org_id:
        raise ForbiddenException("User does not belong to any organization.")
    return str(current_user.org_id)

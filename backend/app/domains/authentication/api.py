from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.core.security import verify_password, get_password_hash, create_access_token
from app.core.deps import get_current_active_user
from app.db.session import get_db
from app.models.user import User
from app.models.tenant import Organization
from app.models.auth import AuditLog
from app.domains.authentication import schemas

router = APIRouter()

@router.post("/login", response_model=schemas.Token)
async def login_access_token(
    db: AsyncSession = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    # 1. Fetch user by email
    query = select(User).where(User.email == form_data.username, User.deleted_at == None)
    result = await db.execute(query)
    user = result.scalars().first()
    
    # 2. Verify existence and password
    if not user or not verify_password(form_data.password, user.password_hash):
        # Optionally log failed attempt to AuditLog here
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    # 3. Audit Log Success
    audit_log = AuditLog(
        user_id=user.id,
        org_id=user.org_id,
        action="auth.login.success",
        details={"username": form_data.username}
    )
    db.add(audit_log)
    await db.commit()

    # 4. Mint JWT Token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    custom_claims = {
        "org_id": str(user.org_id)
    }
    
    return {
        "access_token": create_access_token(
            user.id, expires_delta=access_token_expires, custom_claims=custom_claims
        ),
        "token_type": "bearer",
    }

@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(
    user_in: schemas.UserCreate,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Create new user.
    """
    # Verify Organization exists
    query_org = select(Organization).where(Organization.id == user_in.org_id)
    result_org = await db.execute(query_org)
    org = result_org.scalars().first()
    if not org:
        raise HTTPException(
            status_code=404,
            detail="The specified organization does not exist."
        )

    # Check for existing email
    query = select(User).where(User.email == user_in.email)
    result = await db.execute(query)
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
        
    # Create User
    user = User(
        email=user_in.email,
        password_hash=get_password_hash(user_in.password),
        org_id=user_in.org_id,
        is_active=True,
    )
    db.add(user)
    
    # Audit Log
    audit_log = AuditLog(
        org_id=user_in.org_id,
        action="auth.register.success",
        details={"email": user_in.email}
    )
    db.add(audit_log)
    
    await db.commit()
    await db.refresh(user)
    
    # Need to query with roles to satisfy the response schema model_config
    query_user = select(User).options(selectinload(User.roles)).where(User.id == user.id)
    result_user = await db.execute(query_user)
    loaded_user = result_user.scalars().first()
    
    return loaded_user

@router.get("/me", response_model=schemas.UserResponse)
async def read_current_user(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Get current user profile securely via JWT token.
    """
    return current_user

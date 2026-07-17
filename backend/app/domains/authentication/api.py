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
from app.models import User, Organization, AuditLog, Plant, Department
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
    query = select(User).where(User.email == form_data.username)
    result = await db.execute(query)
    user = result.scalars().first()
    
    # 2. Verify existence and password
    if not user or not verify_password(form_data.password, user.password_hash):
        if user:
            # Increment failed attempts
            user.failed_login_attempts += 1
            audit_log = AuditLog(
                user_id=user.id,
                action="USER_LOGIN_FAILED",
                module="Authentication",
                new_value={"reason": "Incorrect password"}
            )
            db.add(audit_log)
            await db.commit()
        raise HTTPException(status_code=400, detail="Incorrect email or password")
        
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    # Reset failed attempts
    user.failed_login_attempts = 0
        
    # 3. Audit Log Success
    audit_log = AuditLog(
        user_id=user.id,
        action="USER_LOGIN_SUCCESS",
        module="Authentication",
        new_value={"username": form_data.username}
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

@router.post("/register/organization", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
async def register_organization_flow(
    org_in: schemas.OrganizationRegistrationFlow,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Enterprise Registration Flow:
    Organization -> Plant -> Department -> Super Admin User
    """
    # 1. Check if email exists
    query = select(User).where(User.email == org_in.admin_email)
    result = await db.execute(query)
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="User email already registered")

    # 2. Check if Org name exists
    query_org = select(Organization).where(Organization.name == org_in.org_name)
    result_org = await db.execute(query_org)
    if result_org.scalars().first():
        raise HTTPException(status_code=400, detail="Organization name already exists")

    # 3. Create Org
    org = Organization(name=org_in.org_name)
    db.add(org)
    await db.flush() # flush to get org.id

    # 4. Create Plant
    plant = Plant(
        org_id=org.id,
        name=f"Main Plant - {org_in.org_name}",
        code=f"PLANT-{org.id.hex[:6].upper()}"
    )
    db.add(plant)
    await db.flush()

    # 5. Create Department
    dept = Department(
        plant_id=plant.id,
        name="Administration",
        code=f"ADMIN-{plant.id.hex[:6].upper()}"
    )
    db.add(dept)
    await db.flush()

    # 6. Create Super Admin User
    user = User(
        email=org_in.admin_email,
        password_hash=get_password_hash(org_in.admin_password),
        org_id=org.id,
        is_active=True,
    )
    db.add(user)
    
    # 7. Audit Log
    audit_log = AuditLog(
        action="TENANT_PROVISIONED",
        module="Authentication",
        new_value={"org_name": org_in.org_name, "admin": org_in.admin_email}
    )
    db.add(audit_log)
    
    await db.commit()
    await db.refresh(user)
    
    return user

@router.get("/me", response_model=schemas.UserResponse)
async def read_current_user(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Get current user profile securely via JWT token.
    """
    return current_user

import random
from datetime import datetime, timedelta

@router.post("/register", response_model=schemas.UserResponse)
async def register_account(
    req: schemas.AccountRegisterRequest,
    db: AsyncSession = Depends(get_db)
) -> Any:
    # 1. Check if email exists
    query = select(User).where(User.email == req.email)
    result = await db.execute(query)
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="User email already registered")

    # 2. Create User
    user = User(
        email=req.email,
        first_name=req.first_name,
        last_name=req.last_name,
        password_hash=get_password_hash(req.password),
        is_active=True,
        is_verified=False
    )
    db.add(user)
    await db.flush()

    # 3. Generate OTP
    from app.models.security import EmailVerification
    otp = str(random.randint(100000, 999999))
    print(f"==================================================")
    print(f"📧 EMAIL OTP for {req.email}: {otp}")
    print(f"==================================================")

    ev = EmailVerification(
        email=req.email,
        otp=otp,
        expires_at=datetime.utcnow() + timedelta(minutes=15)
    )
    db.add(ev)
    await db.commit()
    await db.refresh(user)
    return user


@router.post("/verify-email", response_model=schemas.Token)
async def verify_email(
    req: schemas.VerifyEmailRequest,
    db: AsyncSession = Depends(get_db)
) -> Any:
    from app.models.security import EmailVerification
    # Check OTP
    query = select(EmailVerification).where(
        EmailVerification.email == req.email,
        EmailVerification.otp == req.otp,
        EmailVerification.is_verified == False
    )
    result = await db.execute(query)
    ev = result.scalars().first()

    if not ev:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    if ev.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")

    # Mark verified
    ev.is_verified = True
    ev.verified_at = datetime.utcnow()

    # Verify user
    query_user = select(User).where(User.email == req.email)
    result_user = await db.execute(query_user)
    user = result_user.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.is_verified = True
    await db.commit()

    # Issue Token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    custom_claims = {"org_id": str(user.org_id) if user.org_id else ""}
    return {
        "access_token": create_access_token(user.id, expires_delta=access_token_expires, custom_claims=custom_claims),
        "token_type": "bearer",
    }


@router.post("/create-organization")
async def create_organization(
    req: schemas.OrganizationCreateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if current_user.org_id:
        raise HTTPException(status_code=400, detail="User already belongs to an organization")

    # Check if org name exists
    query = select(Organization).where(Organization.name == req.name)
    result = await db.execute(query)
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Organization name already exists")

    org = Organization(
        name=req.name,
        industry=req.industry,
        company_size=req.company_size,
        country=req.country,
        state=req.state,
        city=req.city,
        address=req.address
    )
    db.add(org)
    await db.flush()

    current_user.org_id = org.id
    
    # Audit Log
    audit_log = AuditLog(
        user_id=current_user.id,
        action="ORGANIZATION_CREATED",
        module="Onboarding",
        new_value={"org_name": org.name}
    )
    db.add(audit_log)

    await db.commit()
    return {"status": "success", "org_id": org.id}


@router.post("/create-plant")
async def create_plant(
    req: schemas.PlantCreateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    if not current_user.org_id:
        raise HTTPException(status_code=400, detail="User does not belong to an organization")

    plant = Plant(
        org_id=current_user.org_id,
        name=req.name,
        code=req.code,
        country=req.country,
        state=req.state,
        city=req.city,
        address=req.address,
        timezone=req.timezone
    )
    db.add(plant)
    await db.flush()

    dept = Department(
        plant_id=plant.id,
        name="Administration",
        code=f"ADMIN-{plant.id.hex[:6].upper()}"
    )
    db.add(dept)

    # Audit Log
    audit_log = AuditLog(
        user_id=current_user.id,
        action="PLANT_CREATED",
        module="Onboarding",
        new_value={"plant_name": plant.name}
    )
    db.add(audit_log)

    await db.commit()
    return {"status": "success", "plant_id": plant.id}


@router.post("/complete-registration")
async def complete_registration(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # Just an endpoint to finalize and return success status and maybe generate a new token
    if not current_user.org_id:
        raise HTTPException(status_code=400, detail="Incomplete onboarding")
        
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    custom_claims = {"org_id": str(current_user.org_id)}
    return {
        "status": "success",
        "access_token": create_access_token(current_user.id, expires_delta=access_token_expires, custom_claims=custom_claims),
        "token_type": "bearer",
    }

from sqlalchemy.dialects.postgresql import insert

@router.post("/delegate-admin")
async def delegate_admin(
    req: schemas.DelegateAdminRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    # 1. Find target user
    query = select(User).where(User.id == req.user_id)
    result = await db.execute(query)
    target_user = result.scalars().first()
    if not target_user:
        raise HTTPException(status_code=404, detail="Target user not found")
        
    # 2. Find Super Admin role
    from app.models.rbac import Role
    role_query = select(Role).where(Role.name == "Super Admin")
    role_result = await db.execute(role_query)
    sa_role = role_result.scalars().first()
    if not sa_role:
        raise HTTPException(status_code=404, detail="Super Admin role not found")
        
    # 3. Assign role with expiration
    from app.models.user import user_roles
    
    expires = datetime.utcnow() + timedelta(hours=req.duration_hours)
    
    stmt = insert(user_roles).values(
        user_id=target_user.id,
        role_id=sa_role.id,
        expires_at=expires
    )
    stmt = stmt.on_conflict_do_update(
        index_elements=['user_id', 'role_id'],
        set_=dict(expires_at=expires)
    )
    await db.execute(stmt)
    
    # 4. Audit Log
    audit_log = AuditLog(
        user_id=current_user.id,
        action="TEMPORARY_ADMIN_DELEGATED",
        module="Authentication",
        new_value={"target_user": str(target_user.id), "duration": req.duration_hours, "expires_at": expires.isoformat()}
    )
    db.add(audit_log)
    await db.commit()
    
    return {"status": "success", "message": f"Temporary admin granted for {req.duration_hours} hours."}


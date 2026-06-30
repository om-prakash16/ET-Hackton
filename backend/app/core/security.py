from datetime import datetime, timedelta
from typing import Any, Dict, Optional, Union
import jwt
from passlib.context import CryptContext
from app.core.config import settings

# Enterprise Argon2 Context
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto"
)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against the stored Argon2 hash."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hashes a password using Argon2."""
    return pwd_context.hash(password)

def create_access_token(
    subject: Union[str, Any], 
    expires_delta: timedelta = None,
    custom_claims: Dict[str, Any] = None
) -> str:
    """Mints a JWT Access Token with an expiration date and custom claims (RBAC/Tenancy)."""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    
    to_encode = {"exp": expire, "sub": str(subject)}
    
    if custom_claims:
        to_encode.update(custom_claims)
        
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Dict[str, Any]:
    """Decodes a JWT Access Token and verifies signature and expiration."""
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return decoded_token
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")

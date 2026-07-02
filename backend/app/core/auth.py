from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from jwt import PyJWKClient
import os

security = HTTPBearer()

KEYCLOAK_URL = os.getenv("KEYCLOAK_URL", "http://localhost:8080")
KEYCLOAK_REALM = os.getenv("KEYCLOAK_REALM", "indusbrain")
JWKS_URL = f"{KEYCLOAK_URL}/realms/{KEYCLOAK_REALM}/protocol/openid-connect/certs"

# PyJWKClient fetches and caches the public keys from Keycloak
jwks_client = PyJWKClient(JWKS_URL)

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Validates a JWT token against Keycloak's JWKS.
    Can be used as a dependency in FastAPI routes: Depends(verify_token)
    """
    token = credentials.credentials
    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        data = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={"verify_exp": True, "verify_aud": False}
        )
        return data
    except jwt.PyJWKClientError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Unable to verify Keycloak JWKS: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

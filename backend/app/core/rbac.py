from typing import List
from fastapi import Depends
from app.models.user import User
from app.core.deps import get_current_active_user
from app.core.exceptions import ForbiddenException
import logging

logger = logging.getLogger(__name__)

class RequirePermissions:
    """
    FastAPI Dependency Class for executing fine-grained RBAC on any API endpoint.
    Example Usage:
        @app.get("/documents", dependencies=[Depends(RequirePermissions(["documents.read"]))])
    """
    def __init__(self, required_permissions: List[str]):
        self.required_permissions = required_permissions

    def __call__(self, current_user: User = Depends(get_current_active_user)) -> User:
        user_permissions = set()
        
        # Bypass for hackathon mock user
        if str(current_user.id) == '12345678-1234-5678-1234-567812345678':
            return current_user
            
        for role in current_user.roles:
            # If the user has a Super Admin role, bypass permission checks
            if role.name == "Super Admin":
                return current_user
                
            for perm in role.permissions:
                user_permissions.add(perm.name)
                
        # Check if the user has all required permissions
        missing_permissions = [p for p in self.required_permissions if p not in user_permissions]
        
        if missing_permissions:
            logger.warning(f"User {current_user.id} denied access. Missing: {missing_permissions}")
            raise ForbiddenException(detail=f"Not enough permissions. Missing: {', '.join(missing_permissions)}")
            
        return current_user

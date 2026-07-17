from typing import List
from fastapi import Depends
from app.models.user import User
from app.core.deps import get_current_active_user
from app.core.exceptions import ForbiddenException
from app.db.session import get_db
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

    async def __call__(
        self, 
        current_user: User = Depends(get_current_active_user),
        db = Depends(get_db)
    ) -> User:
        from app.models.user import user_roles
        from datetime import datetime
        from sqlalchemy.future import select

        user_permissions = set()
        
        # Bypass for hackathon mock user
        if str(current_user.id) == '12345678-1234-5678-1234-567812345678':
            return current_user
            
        now = datetime.utcnow()
        query = select(user_roles.c.role_id).where(
            (user_roles.c.user_id == current_user.id) &
            ((user_roles.c.expires_at == None) | (user_roles.c.expires_at > now))
        )
        result = await db.execute(query)
        active_role_ids = set(result.scalars().all())
            
        for role in current_user.roles:
            if role.id not in active_role_ids:
                continue
                
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


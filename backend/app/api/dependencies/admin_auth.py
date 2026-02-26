"""Admin token authentication dependency."""

from __future__ import annotations

import secrets

from fastapi import Header, HTTPException, status

from app.core.config import settings


async def verify_admin_token(
    x_admin_token: str = Header(..., alias="X-Admin-Token"),
) -> bool:
    """Validate the X-Admin-Token header against the configured secret.

    Raises:
        HTTPException: 401 if the token is missing or invalid.
    """
    if not secrets.compare_digest(x_admin_token, settings.ADMIN_TOKEN):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing admin token",
        )
    return True

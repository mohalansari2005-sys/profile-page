"""Admin profile management endpoint."""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.admin_auth import verify_admin_token
from app.db.session import get_db
from app.schemas.profile import ProfileOut, ProfileUpdate
from app.services import profile_service

router = APIRouter(dependencies=[Depends(verify_admin_token)])


@router.patch("/profile", response_model=ProfileOut)
async def update_profile(
    data: ProfileUpdate,
    db: AsyncSession = Depends(get_db),
) -> ProfileOut:
    """Update the portfolio owner's profile (admin only)."""
    profile = await profile_service.update_profile(db, data)
    return profile

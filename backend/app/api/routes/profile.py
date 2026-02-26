"""Public profile endpoint."""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.profile import ProfileOut
from app.services import profile_service

router = APIRouter()


@router.get("/profile", response_model=ProfileOut)
async def read_profile(db: AsyncSession = Depends(get_db)) -> ProfileOut:
    """Return the portfolio owner's profile."""
    profile = await profile_service.get_profile(db)
    return profile

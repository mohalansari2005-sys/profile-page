"""Service layer for profile operations — all DB logic lives here."""

from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.profile import Profile
from app.schemas.profile import ProfileUpdate

# ── Default seed data ──────────────────────────────────────
_DEFAULTS = {
    "name": "Your Name",
    "headline": "Backend Developer",
    "bio": "Edit this from admin later.",
    "avatar_url": "",
    "skills": [],
}


async def get_profile(db: AsyncSession) -> Profile:
    """Return the profile row, creating one with defaults if none exists."""
    result = await db.execute(select(Profile).limit(1))
    profile = result.scalar_one_or_none()

    if profile is None:
        profile = Profile(**_DEFAULTS)
        db.add(profile)
        await db.flush()
        await db.refresh(profile)

    return profile


async def create_or_update_profile(
    db: AsyncSession,
    data: ProfileUpdate,
) -> Profile:
    """Upsert the single profile row with the provided data."""
    profile = await get_profile(db)

    update_fields = data.model_dump(exclude_unset=True)
    for field, value in update_fields.items():
        setattr(profile, field, value)

    await db.flush()
    await db.refresh(profile)
    return profile

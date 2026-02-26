"""Pydantic schemas for the Profile domain."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProfileOut(BaseModel):
    """Public read-only representation of a profile."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    headline: str
    bio: str
    avatar_url: str
    skills: list[str]
    created_at: datetime


class ProfileUpdate(BaseModel):
    """Payload for updating a profile (future admin use)."""

    name: str | None = None
    headline: str | None = None
    bio: str | None = None
    avatar_url: str | None = None
    skills: list[str] | None = None

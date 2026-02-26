"""Pydantic schemas for the Profile domain."""

from __future__ import annotations

from typing import Literal
from pydantic import BaseModel, ConfigDict, Field


class SocialLink(BaseModel):
    """Schema for a single social media link."""
    platform: Literal["whatsapp", "email", "linkedin"]
    url: str
    label: str


class ProfileOut(BaseModel):
    """Public read-only representation of a profile."""

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    name: str
    initials: str
    headline: str
    bio: str
    avatarUrl: str = Field(validation_alias="avatar_url", serialization_alias="avatarUrl")
    skills: list[str]
    socials: list[SocialLink]


class ProfileUpdate(BaseModel):
    """Payload for updating a profile (admin use)."""

    name: str | None = None
    headline: str | None = None
    bio: str | None = None
    avatar_url: str | None = Field(default=None, alias="avatarUrl")
    skills: list[str] | None = None
    socials: list[SocialLink] | None = None

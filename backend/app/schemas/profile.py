"""Pydantic schemas for the Profile domain."""

from __future__ import annotations

from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, computed_field


class SocialLink(BaseModel):
    """Schema for a single social media link."""
    platform: Literal["whatsapp", "email", "linkedin"]
    url: str
    label: str


class ProfileOut(BaseModel):
    """Public read-only representation of a profile."""

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    name: str
    headline: str
    bio: str
    avatarUrl: str = Field(validation_alias="avatar_url", serialization_alias="avatarUrl")
    skills: list[str]
    socials: list[SocialLink]

    @computed_field
    def initials(self) -> str:
        """Compute initials from name (first + last letters, uppercase; fallback first letter)."""
        name = self.name.strip()
        if not name:
            return ""
        parts = name.split()
        if len(parts) >= 2:
            return (parts[0][0] + parts[-1][0]).upper()
        return name[0].upper()


class ProfileUpdate(BaseModel):
    """Payload for updating a profile (admin use)."""

    model_config = ConfigDict(populate_by_name=True)

    name: str | None = None
    headline: str | None = None
    bio: str | None = None
    avatar_url: str | None = Field(default=None, alias="avatarUrl")
    skills: list[str] | None = None
    socials: list[SocialLink] | None = None

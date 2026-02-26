"""Declarative base for all ORM models."""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Base class that every future ORM model will inherit from."""

    pass


# Import all models here so Alembic autogenerate can detect them.
from app.models.profile import Profile  # noqa: E402, F401

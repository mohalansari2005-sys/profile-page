"""add_socials_to_profile

Revision ID: a1b2c3d4e5f6
Revises: 53c797540dce
Create Date: 2026-02-27 00:00:34.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, Sequence[str], None] = '53c797540dce'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add socials JSONB column to profile table."""
    op.add_column(
        "profile",
        sa.Column(
            "socials",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'[]'::jsonb"),
            nullable=False,
        ),
    )


def downgrade() -> None:
    """Remove socials column from profile table."""
    op.drop_column("profile", "socials")

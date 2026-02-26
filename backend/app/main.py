"""FastAPI application factory and root routes."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.profile import router as profile_router
from app.core.config import settings


def create_app() -> FastAPI:
    """Build and return the configured FastAPI application."""
    app = FastAPI(title=settings.APP_NAME)

    # ── CORS ────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Routers ─────────────────────────────────────────────
    app.include_router(profile_router, prefix="/api/public", tags=["profile"])

    # ── Health ──────────────────────────────────────────────
    @app.get("/health")
    async def health_check():
        return {"status": "ok", "env": settings.ENV}

    return app


app = create_app()

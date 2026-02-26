"""Application settings loaded from environment / .env file."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Central configuration consumed by the rest of the application."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    APP_NAME: str = "Profile Page API"
    ENV: str = "development"
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]


settings = Settings()

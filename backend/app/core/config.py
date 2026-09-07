"""
Application configuration.

pydantic-settings so every config value is read from environment variables
(sane defaults only for local/dev convenience), validated at startup, and
typed everywhere else in the app instead of pulled from os.environ ad hoc.
"""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Loaded from a .env file when present (docker-compose injects real env
    # vars directly in containers; the .env file is a convenience for running
    # the app outside Docker).
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # --- Database ---
    # Full SQLAlchemy connection string, e.g.
    # postgresql+psycopg2://user:pass@host:5432/dbname
    DATABASE_URL: str = "postgresql+psycopg2://stock_platform_user:stock_platform_pass@localhost:5434/stock_platform_db"

    # --- App metadata ---
    PROJECT_NAME: str = "STOCK Platform"
    API_V1_PREFIX: str = "/api/v1"

    # --- CORS ---
    # Comma-separated list of allowed origins for the frontend SPA. Kept
    # permissive-by-default for local dev; locked down per environment via
    # env var in real deployments (stock-infrastructure sets this).
    CORS_ORIGINS: str = "*"


@lru_cache
def get_settings() -> Settings:
    # Cached so we don't re-parse env vars on every request; Settings is
    # immutable for the lifetime of the process anyway.
    return Settings()

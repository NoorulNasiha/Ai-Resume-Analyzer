"""Configuration helpers."""

from pydantic import BaseSettings


class Settings(BaseSettings):
    project_name: str = "Resume Analyzer"
    environment: str = "local"
    database_url: str = "sqlite:///./data.db"
    secret_key: str = "please-change-me"

    class Config:
        env_file = ".env"


settings = Settings()

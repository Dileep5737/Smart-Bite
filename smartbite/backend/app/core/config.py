import os

class Settings:
    PROJECT_NAME: str = "SmartBite API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "smartbite_secret_super_key_2026_pilot")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    # Default to local SQLite fallback if DATABASE_URL not set
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./smartbite.db")
    
    # Environment info
    ENV: str = os.getenv("ENV", "development")
    DEMO_MODE: bool = True

settings = Settings()

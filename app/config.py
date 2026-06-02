"""
Configuration management for URBEX Content Moderation System
"""
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import List
import os
from dotenv import dotenv_values

# Read .env file directly and override environment variables
env_values = dotenv_values(".env")
for key, value in env_values.items():
    if value:
        os.environ[key] = value.strip('"')  # Remove quotes if present


class Settings(BaseSettings):
    """Application settings with environment variable support"""
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )

    # ===========================================
    # LLM API Configuration (Choose ONE provider)
    # ===========================================
    
    # Option 1: OpenAI
    openai_api_key: str = Field(default="", validation_alias="OPENAI_API_KEY")
    openai_model: str = Field(default="gpt-4o-mini", validation_alias="OPENAI_MODEL")
    
    # Option 2: Google Gemini (FREE TIER)
    gemini_api_key: str = Field(default="", validation_alias="GEMINI_API_KEY")
    gemini_model: str = Field(default="gemini-1.5-flash", validation_alias="GEMINI_MODEL")
    
    # Option 3: Groq (FREE TIER)
    groq_api_key: str = Field(default="", validation_alias="GROQ_API_KEY")
    groq_model: str = Field(default="llama3-70b-8192", validation_alias="GROQ_MODEL")
    
    # Option 4: Together AI ($25 FREE CREDIT)
    together_api_key: str = Field(default="", validation_alias="TOGETHER_API_KEY")
    together_model: str = Field(default="meta-llama/Llama-3-70b-chat-hf", validation_alias="TOGETHER_MODEL")
    
    # Active Provider (openai, gemini, groq, together, mock)
    active_provider: str = Field(default="mock", validation_alias="ACTIVE_PROVIDER")

    # Mock Mode (use when no API key is available)
    use_mock_mode: bool = Field(default=True, validation_alias="USE_MOCK_MODE")

    # Embedding Configuration
    embedding_model: str = Field(
        default="sentence-transformers/all-MiniLM-L6-v2",
        validation_alias="EMBEDDING_MODEL"
    )
    embedding_dimension: int = Field(default=384, validation_alias="EMBEDDING_DIMENSION")

    # Vector Store Configuration
    faiss_index_path: str = Field(default="./data/faiss_index", validation_alias="FAISS_INDEX_PATH")
    vector_store_type: str = Field(default="faiss", validation_alias="VECTOR_STORE_TYPE")

    # API Configuration
    api_host: str = Field(default="0.0.0.0", validation_alias="API_HOST")
    api_port: int = Field(default=8000, validation_alias="API_PORT")
    api_workers: int = Field(default=4, validation_alias="API_WORKERS")
    api_reload: bool = Field(default=False, validation_alias="API_RELOAD")

    # Rate Limiting
    rate_limit_per_minute: int = Field(default=100, validation_alias="RATE_LIMIT_PER_MINUTE")
    rate_limit_burst: int = Field(default=20, validation_alias="RATE_LIMIT_BURST")

    # Moderation Thresholds
    toxicity_threshold: float = Field(default=0.7, validation_alias="TOXICITY_THRESHOLD")
    high_confidence_threshold: float = Field(default=0.85, validation_alias="HIGH_CONFIDENCE_THRESHOLD")
    low_confidence_threshold: float = Field(default=0.5, validation_alias="LOW_CONFIDENCE_THRESHOLD")

    # Performance Configuration
    max_retrieval_docs: int = Field(default=5, validation_alias="MAX_RETRIEVAL_DOCS")
    response_timeout: int = Field(default=10, validation_alias="RESPONSE_TIMEOUT")
    cache_ttl: int = Field(default=3600, validation_alias="CACHE_TTL")

    # Logging
    log_level: str = Field(default="INFO", validation_alias="LOG_LEVEL")
    log_format: str = Field(default="json", validation_alias="LOG_FORMAT")
    log_file: str = Field(default="logs/urbex.log", validation_alias="LOG_FILE")

    # Monitoring
    enable_metrics: bool = Field(default=True, validation_alias="ENABLE_METRICS")
    metrics_port: int = Field(default=9090, validation_alias="METRICS_PORT")

    # Database
    database_url: str = Field(
        default="sqlite:///./data/moderation_logs.db",
        validation_alias="DATABASE_URL"
    )

    # Security
    api_key: str = Field(default="urbex_secret_key_2024", validation_alias="API_KEY")
    api_key_header: str = Field(default="X-API-Key", validation_alias="API_KEY_HEADER")
    cors_origins: List[str] = Field(
        default=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
        validation_alias="CORS_ORIGINS"
    )

    # Feature Flags
    enable_batch_processing: bool = Field(default=True, validation_alias="ENABLE_BATCH_PROCESSING")
    enable_streaming: bool = Field(default=False, validation_alias="ENABLE_STREAMING")
    enable_detailed_logging: bool = Field(default=True, validation_alias="ENABLE_DETAILED_LOGGING")


# Global settings instance
settings = Settings()


# Validation functions
def validate_settings():
    """Validate critical settings on startup"""
    errors = []

    # Only require API key if not in mock mode
    if not settings.use_mock_mode:
        if not settings.openai_api_key or settings.openai_api_key == "your_openai_api_key_here":
            errors.append("OPENAI_API_KEY must be set (or set USE_MOCK_MODE=true)")

    if settings.toxicity_threshold < 0 or settings.toxicity_threshold > 1:
        errors.append("TOXICITY_THRESHOLD must be between 0 and 1")
    
    if not os.path.exists(os.path.dirname(settings.log_file)):
        try:
            os.makedirs(os.path.dirname(settings.log_file), exist_ok=True)
        except Exception as e:
            errors.append(f"Cannot create log directory: {e}")
    
    if errors:
        raise ValueError(f"Configuration errors: {', '.join(errors)}")
    
    return True


# Export commonly used settings
OPENAI_API_KEY = settings.openai_api_key
OPENAI_MODEL = settings.openai_model
EMBEDDING_MODEL = settings.embedding_model
TOXICITY_THRESHOLD = settings.toxicity_threshold
MAX_RETRIEVAL_DOCS = settings.max_retrieval_docs

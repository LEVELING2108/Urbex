"""
Configuration management for URBEX Content Moderation System
"""
from pydantic_settings import BaseSettings
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

    # ===========================================
    # LLM API Configuration (Choose ONE provider)
    # ===========================================
    
    # Option 1: OpenAI
    openai_api_key: str = Field(default="", env="OPENAI_API_KEY")
    openai_model: str = Field(default="gpt-4o-mini", env="OPENAI_MODEL")
    
    # Option 2: Google Gemini (FREE TIER)
    gemini_api_key: str = Field(default="", env="GEMINI_API_KEY")
    gemini_model: str = Field(default="gemini-1.5-flash", env="GEMINI_MODEL")
    
    # Option 3: Groq (FREE TIER)
    groq_api_key: str = Field(default="", env="GROQ_API_KEY")
    groq_model: str = Field(default="llama3-70b-8192", env="GROQ_MODEL")
    
    # Option 4: Together AI ($25 FREE CREDIT)
    together_api_key: str = Field(default="", env="TOGETHER_API_KEY")
    together_model: str = Field(default="meta-llama/Llama-3-70b-chat-hf", env="TOGETHER_MODEL")
    
    # Active Provider (openai, gemini, groq, together, mock)
    active_provider: str = Field(default="mock", env="ACTIVE_PROVIDER")

    # Mock Mode (use when no API key is available)
    use_mock_mode: bool = Field(default=True, env="USE_MOCK_MODE")

    # Embedding Configuration
    embedding_model: str = Field(
        default="sentence-transformers/all-MiniLM-L6-v2",
        env="EMBEDDING_MODEL"
    )
    embedding_dimension: int = Field(default=384, env="EMBEDDING_DIMENSION")

    # Vector Store Configuration
    faiss_index_path: str = Field(default="./data/faiss_index", env="FAISS_INDEX_PATH")
    vector_store_type: str = Field(default="faiss", env="VECTOR_STORE_TYPE")

    # API Configuration
    api_host: str = Field(default="0.0.0.0", env="API_HOST")
    api_port: int = Field(default=8000, env="API_PORT")
    api_workers: int = Field(default=4, env="API_WORKERS")
    api_reload: bool = Field(default=False, env="API_RELOAD")

    # Rate Limiting
    rate_limit_per_minute: int = Field(default=100, env="RATE_LIMIT_PER_MINUTE")
    rate_limit_burst: int = Field(default=20, env="RATE_LIMIT_BURST")

    # Moderation Thresholds
    toxicity_threshold: float = Field(default=0.7, env="TOXICITY_THRESHOLD")
    high_confidence_threshold: float = Field(default=0.85, env="HIGH_CONFIDENCE_THRESHOLD")
    low_confidence_threshold: float = Field(default=0.5, env="LOW_CONFIDENCE_THRESHOLD")

    # Performance Configuration
    max_retrieval_docs: int = Field(default=5, env="MAX_RETRIEVAL_DOCS")
    response_timeout: int = Field(default=10, env="RESPONSE_TIMEOUT")
    cache_ttl: int = Field(default=3600, env="CACHE_TTL")

    # Logging
    log_level: str = Field(default="INFO", env="LOG_LEVEL")
    log_format: str = Field(default="json", env="LOG_FORMAT")
    log_file: str = Field(default="logs/urbex.log", env="LOG_FILE")

    # Monitoring
    enable_metrics: bool = Field(default=True, env="ENABLE_METRICS")
    metrics_port: int = Field(default=9090, env="METRICS_PORT")

    # Database
    database_url: str = Field(
        default="sqlite:///./data/moderation_logs.db",
        env="DATABASE_URL"
    )

    # Security
    api_key: str = Field(default="urbex_secret_key_2024", env="API_KEY")
    api_key_header: str = Field(default="X-API-Key", env="API_KEY_HEADER")
    cors_origins: List[str] = Field(
        default=["http://localhost:3000"],
        env="CORS_ORIGINS"
    )

    # Feature Flags
    enable_batch_processing: bool = Field(default=True, env="ENABLE_BATCH_PROCESSING")
    enable_streaming: bool = Field(default=False, env="ENABLE_STREAMING")
    enable_detailed_logging: bool = Field(default=True, env="ENABLE_DETAILED_LOGGING")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


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

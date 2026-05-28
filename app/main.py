"""
Main FastAPI application for URBEX Content Moderation System
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import logging
import time
from datetime import datetime
import os

from app.config import settings, validate_settings
from app.models import HealthResponse, ErrorResponse
from app.api.routes import router, set_moderation_agent
from core.rag_agent import create_moderation_agent

# Import all provider agents
try:
    from core.mock_agent import create_mock_moderation_agent
    MOCK_AGENT_AVAILABLE = True
except ImportError:
    MOCK_AGENT_AVAILABLE = False

try:
    from core.gemini_agent import create_gemini_moderation_agent
    GEMINI_AGENT_AVAILABLE = True
except ImportError:
    GEMINI_AGENT_AVAILABLE = False

try:
    from core.groq_agent import create_groq_moderation_agent
    GROQ_AGENT_AVAILABLE = True
except ImportError:
    GROQ_AGENT_AVAILABLE = False

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.log_level),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Application state
app_state = {
    "start_time": time.time(),
    "moderation_agent": None,
    "vector_store_loaded": False,
    "model_loaded": False
}


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Startup
    logger.info("Starting URBEX Content Moderation System...")

    try:
        # Initialize database
        from app.database import init_db
        init_db()
        logger.info("Database initialized")

        # Validate configuration
        validate_settings()
        logger.info("Configuration validated")

        # Check if vector store exists
        if os.path.exists(settings.faiss_index_path):
            # Determine which provider to use
            provider = settings.active_provider.lower()
            
            if provider == "mock" or settings.use_mock_mode:
                # Use mock mode
                if MOCK_AGENT_AVAILABLE:
                    logger.info("🔄 Loading MOCK moderation agent (rule-based, FREE)...")
                    agent = create_mock_moderation_agent(
                        vector_store_path=settings.faiss_index_path
                    )
                    app_state["moderation_agent"] = agent
                    app_state["vector_store_loaded"] = True
                    app_state["model_loaded"] = True
                    app_state["mock_mode"] = True
                    app_state["provider"] = "mock"
                    set_moderation_agent(agent)
                    logger.info("✅ Mock moderation agent loaded successfully")
                else:
                    logger.error("Mock agent not available")
                    
            elif provider == "gemini" and GEMINI_AGENT_AVAILABLE:
                # Use Google Gemini
                if settings.gemini_api_key and settings.gemini_api_key != "your_gemini_api_key_here":
                    logger.info(f"🔄 Loading Google Gemini agent: {settings.gemini_model}...")
                    agent = create_gemini_moderation_agent(
                        vector_store_path=settings.faiss_index_path,
                        api_key=settings.gemini_api_key,
                        model_name=settings.gemini_model
                    )
                    app_state["moderation_agent"] = agent
                    app_state["vector_store_loaded"] = True
                    app_state["model_loaded"] = True
                    app_state["mock_mode"] = False
                    app_state["provider"] = "gemini"
                    set_moderation_agent(agent)
                    logger.info(f"✅ Gemini moderation agent loaded: {settings.gemini_model}")
                else:
                    logger.warning("Gemini API key not set, falling back to mock mode")
                    
            elif provider == "openai":
                # Use OpenAI
                if settings.openai_api_key and settings.openai_api_key != "your_openai_api_key_here":
                    logger.info(f"🔄 Loading OpenAI agent: {settings.openai_model}...")
                    agent = create_moderation_agent(
                        vector_store_path=settings.faiss_index_path,
                        openai_api_key=settings.openai_api_key,
                        model_name=settings.openai_model
                    )
                    app_state["moderation_agent"] = agent
                    app_state["vector_store_loaded"] = True
                    app_state["model_loaded"] = True
                    app_state["mock_mode"] = False
                    app_state["provider"] = "openai"
                    set_moderation_agent(agent)
                    logger.info(f"✅ OpenAI moderation agent loaded: {settings.openai_model}")
                else:
                    logger.warning("OpenAI API key not set, falling back to mock mode")
                    
            elif provider == "groq" and GROQ_AGENT_AVAILABLE:
                # Use Groq
                if settings.groq_api_key and settings.groq_api_key != "your_groq_api_key_here":
                    logger.info(f"🔄 Loading Groq agent: {settings.groq_model}...")
                    agent = create_groq_moderation_agent(
                        vector_store_path=settings.faiss_index_path,
                        api_key=settings.groq_api_key,
                        model_name=settings.groq_model
                    )
                    app_state["moderation_agent"] = agent
                    app_state["vector_store_loaded"] = True
                    app_state["model_loaded"] = True
                    app_state["mock_mode"] = False
                    app_state["provider"] = "groq"
                    set_moderation_agent(agent)
                    logger.info(f"✅ Groq moderation agent loaded: {settings.groq_model}")
                else:
                    logger.warning("Groq API key not set, falling back to mock mode")
            else:
                logger.warning(f"Unknown provider '{provider}', using mock mode")
                if MOCK_AGENT_AVAILABLE:
                    agent = create_mock_moderation_agent(
                        vector_store_path=settings.faiss_index_path
                    )
                    app_state["moderation_agent"] = agent
                    app_state["vector_store_loaded"] = True
                    app_state["model_loaded"] = True
                    app_state["mock_mode"] = True
                    app_state["provider"] = "mock"
                    set_moderation_agent(agent)

        else:
            logger.warning(
                f"Vector store not found at {settings.faiss_index_path}. "
                "Please run initialization script first."
            )

        logger.info("✅ Application startup complete")

    except Exception as e:
        logger.error(f"Failed to start application: {e}", exc_info=True)
        raise

    yield

    # Shutdown
    logger.info("Shutting down URBEX Content Moderation System...")
    logger.info("Shutdown complete")


# Create FastAPI application
app = FastAPI(
    title="URBEX Content Moderation API",
    description="Context-aware content moderation using RAG-based AI",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Exception handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="InternalServerError",
            message="An unexpected error occurred",
            details={"error": str(exc)}
        ).model_dump()
    )


# Include API routes
app.include_router(router)

# Mount static files
if not os.path.exists("static"):
    os.makedirs("static")
app.mount("/static", StaticFiles(directory="static"), name="static")


# Root endpoint
@app.get("/")
async def root():
    """Serve the frontend demo"""
    return FileResponse("static/index.html")


# Health check endpoint
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    
    Returns:
        Service health status
    """
    uptime = time.time() - app_state["start_time"]
    
    return HealthResponse(
        status="healthy" if app_state["model_loaded"] else "degraded",
        version="1.0.0",
        uptime_seconds=uptime,
        vector_store_loaded=app_state["vector_store_loaded"],
        model_loaded=app_state["model_loaded"]
    )


# Metrics endpoint (basic version)
@app.get("/metrics")
async def metrics():
    """
    Basic metrics endpoint
    
    In production, this would integrate with Prometheus
    """
    uptime = time.time() - app_state["start_time"]
    
    return {
        "uptime_seconds": uptime,
        "status": "operational",
        "vector_store_loaded": app_state["vector_store_loaded"],
        "model_loaded": app_state["model_loaded"]
    }


# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all requests"""
    start_time = time.time()
    
    # Log request
    logger.debug(f"Request: {request.method} {request.url.path}")
    
    # Process request
    response = await call_next(request)
    
    # Log response
    duration = time.time() - start_time
    logger.debug(
        f"Response: {response.status_code} "
        f"Duration: {duration*1000:.2f}ms"
    )
    
    return response


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.api_reload,
        workers=1 if settings.api_reload else settings.api_workers,
        log_level=settings.log_level.lower()
    )

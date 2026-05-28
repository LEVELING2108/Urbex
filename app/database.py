"""
Database configuration and models for URBEX
"""
from sqlalchemy import create_engine, Column, String, Boolean, Float, Integer, DateTime, JSON, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime
from datetime import timezone
from app.config import settings

# Database setup
engine = create_engine(
    settings.database_url, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class ModerationLog(Base):
    """Database model for moderation logs"""
    __tablename__ = "moderation_logs"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    is_toxic = Column(Boolean)
    confidence = Column(Float)
    toxicity_type = Column(String)
    explanation = Column(String)
    should_block = Column(Boolean)
    latency_ms = Column(Integer)
    context = Column(JSON, nullable=True)
    metadata_json = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=lambda: datetime.datetime.now(timezone.utc))

class Feedback(Base):
    """Database model for user feedback"""
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    request_id = Column(String, index=True)
    was_correct = Column(Boolean)
    actual_toxicity_type = Column(String, nullable=True)
    comment = Column(String, nullable=True)
    timestamp = Column(DateTime, default=lambda: datetime.datetime.now(timezone.utc))

def init_db():
    """Initialize the database"""
    Base.metadata.create_all(bind=engine)

def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

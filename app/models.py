"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, Field, validator
from typing import Optional, Dict, List, Any
from datetime import datetime
from enum import Enum


class ToxicityType(str, Enum):
    """Types of toxicity detected"""
    HATE_SPEECH = "hate_speech"
    HARASSMENT = "harassment"
    INDIRECT_THREAT = "indirect_threat"
    SEXUAL_CONTENT = "sexual_content"
    PROFANITY = "profanity"
    IDENTITY_ATTACK = "identity_attack"
    BULLYING = "bullying"
    SPAM = "spam"
    SAFE = "safe"


class ModerationRequest(BaseModel):
    """Request model for content moderation"""
    text: str = Field(..., min_length=1, max_length=5000, description="Text to moderate")
    context: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Additional context (user_id, conversation_id, etc.)"
    )
    language: Optional[str] = Field(default="en", description="Language code")
    check_only: bool = Field(
        default=False,
        description="If True, only check without logging"
    )
    
    @validator('text')
    def validate_text(cls, v):
        """Validate text content"""
        if not v or v.isspace():
            raise ValueError("Text cannot be empty or only whitespace")
        return v.strip()


class ModerationResponse(BaseModel):
    """Response model for content moderation"""
    is_toxic: bool = Field(..., description="Whether content is toxic")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score")
    toxicity_type: ToxicityType = Field(..., description="Type of toxicity detected")
    explanation: str = Field(..., description="Human-readable explanation")
    should_block: bool = Field(..., description="Recommendation to block content")
    latency_ms: int = Field(..., description="Processing time in milliseconds")
    retrieved_examples: Optional[List[str]] = Field(
        default=None,
        description="Similar examples retrieved from vector store"
    )
    metadata: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Additional metadata"
    )
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class BatchModerationItem(BaseModel):
    """Single item in batch moderation request"""
    id: str = Field(..., description="Unique identifier for this item")
    text: str = Field(..., min_length=1, max_length=5000)
    context: Optional[Dict[str, Any]] = None


class BatchModerationRequest(BaseModel):
    """Request model for batch moderation"""
    messages: List[BatchModerationItem] = Field(
        ...,
        min_items=1,
        max_items=100,
        description="List of messages to moderate"
    )


class BatchModerationResponse(BaseModel):
    """Response model for batch moderation"""
    results: List[Dict[str, Any]] = Field(..., description="Moderation results")
    total_processed: int = Field(..., description="Number of messages processed")
    total_toxic: int = Field(..., description="Number of toxic messages detected")
    total_latency_ms: int = Field(..., description="Total processing time")
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class HealthResponse(BaseModel):
    """Health check response"""
    status: str = Field(..., description="Service status")
    version: str = Field(default="1.0.0", description="API version")
    uptime_seconds: float = Field(..., description="Service uptime")
    vector_store_loaded: bool = Field(..., description="Vector store status")
    model_loaded: bool = Field(..., description="LLM status")
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class MetricsResponse(BaseModel):
    """Metrics response"""
    total_requests: int = Field(..., description="Total requests processed")
    toxic_detected: int = Field(..., description="Total toxic content detected")
    false_positive_rate: float = Field(..., description="Estimated false positive rate")
    avg_latency_ms: float = Field(..., description="Average latency")
    p95_latency_ms: float = Field(..., description="95th percentile latency")
    uptime_seconds: float = Field(..., description="Service uptime")


class FeedbackRequest(BaseModel):
    """User feedback on moderation decision"""
    request_id: str = Field(..., description="ID of the moderation request")
    was_correct: bool = Field(..., description="Whether the decision was correct")
    actual_toxicity_type: Optional[ToxicityType] = Field(
        default=None,
        description="Correct toxicity type if different"
    )
    comment: Optional[str] = Field(
        default=None,
        max_length=500,
        description="Additional feedback"
    )


class ErrorResponse(BaseModel):
    """Error response model"""
    error: str = Field(..., description="Error type")
    message: str = Field(..., description="Error message")
    details: Optional[Dict[str, Any]] = Field(default=None)
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class GuidelineExample(BaseModel):
    """Community guideline example for vector store"""
    text: str = Field(..., description="Example text")
    is_toxic: bool = Field(..., description="Whether this is a toxic example")
    toxicity_type: Optional[ToxicityType] = Field(default=None)
    explanation: str = Field(..., description="Why this is/isn't toxic")
    severity: int = Field(..., ge=1, le=5, description="Severity rating (1-5)")
    tags: List[str] = Field(default=[], description="Categorization tags")


class VectorStoreStats(BaseModel):
    """Statistics about the vector store"""
    total_examples: int = Field(..., description="Total examples in store")
    toxic_examples: int = Field(..., description="Number of toxic examples")
    safe_examples: int = Field(..., description="Number of safe examples")
    dimensions: int = Field(..., description="Embedding dimensions")
    index_type: str = Field(..., description="Index type (e.g., FAISS)")
    last_updated: datetime = Field(..., description="Last update timestamp")

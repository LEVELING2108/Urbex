"""
API routes for content moderation
"""
from fastapi import APIRouter, HTTPException, BackgroundTasks, Request, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List
import time
import logging

from app.database import get_db, ModerationLog, Feedback
from app.api.auth import verify_api_key
from app.models import (
    ModerationRequest,
    ModerationResponse,
    BatchModerationRequest,
    BatchModerationResponse,
    FeedbackRequest,
    VectorStoreStats
)

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api/v1",
    tags=["moderation"],
    dependencies=[Depends(verify_api_key)]
)

# Global agent instance (initialized in main.py)
_moderation_agent = None


def set_moderation_agent(agent):
    """Set the global moderation agent"""
    global _moderation_agent
    _moderation_agent = agent


def get_moderation_agent():
    """Get the global moderation agent"""
    if _moderation_agent is None:
        raise HTTPException(
            status_code=503,
            detail="Moderation agent not initialized"
        )
    return _moderation_agent


@router.post("/moderate", response_model=ModerationResponse)
async def moderate_content(
    request: ModerationRequest,
    background_tasks: BackgroundTasks
):
    """
    Moderate a single piece of content
    
    Args:
        request: Moderation request with text and optional context
        
    Returns:
        ModerationResponse with toxicity analysis
    """
    try:
        agent = get_moderation_agent()
        
        # Perform moderation
        result, latency = agent.moderate(
            text=request.text,
            context=request.context,
            history=request.history
        )
        
        # Log request in background if not check_only
        if not request.check_only:
            background_tasks.add_task(
                log_moderation_request,
                request.text,
                result.model_dump(),
                request.context
            )
        
        logger.info(
            f"Moderation request completed: "
            f"toxic={result.is_toxic}, latency={latency}ms"
        )
        
        return result
        
    except Exception as e:
        logger.error(f"Error in moderation endpoint: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Moderation failed: {str(e)}"
        )


@router.post("/moderate/batch", response_model=BatchModerationResponse)
async def moderate_batch(
    request: BatchModerationRequest,
    background_tasks: BackgroundTasks
):
    """
    Moderate multiple messages in batch
    
    Args:
        request: Batch moderation request
        
    Returns:
        BatchModerationResponse with results for each message
    """
    try:
        agent = get_moderation_agent()
        
        start_time = time.time()
        
        # Extract texts, contexts and histories
        texts = [item.text for item in request.messages]
        contexts = [item.context for item in request.messages]
        histories = [item.history for item in request.messages]
        
        # Perform batch moderation
        results = agent.moderate_batch(texts, contexts, histories)
        
        # Format results
        formatted_results = []
        toxic_count = 0
        
        for item, (result, latency) in zip(request.messages, results):
            formatted_results.append({
                "id": item.id,
                "text": item.text,
                **result.model_dump()
            })
            if result.is_toxic:
                toxic_count += 1
        
        total_latency = int((time.time() - start_time) * 1000)
        
        response = BatchModerationResponse(
            results=formatted_results,
            total_processed=len(results),
            total_toxic=toxic_count,
            total_latency_ms=total_latency
        )
        
        logger.info(
            f"Batch moderation completed: "
            f"{len(results)} messages, {toxic_count} toxic, {total_latency}ms"
        )
        
        return response
        
    except Exception as e:
        logger.error(f"Error in batch moderation endpoint: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Batch moderation failed: {str(e)}"
        )


@router.post("/feedback")
async def submit_feedback(
    request: FeedbackRequest,
    db: Session = Depends(get_db)
):
    """
    Submit feedback on a moderation decision
    
    Args:
        request: Feedback request
        db: Database session
        
    Returns:
        Success message
    """
    try:
        # Store feedback in database
        feedback_entry = Feedback(
            request_id=request.request_id,
            was_correct=request.was_correct,
            actual_toxicity_type=request.actual_toxicity_type.value if request.actual_toxicity_type else None,
            comment=request.comment
        )
        db.add(feedback_entry)
        db.commit()
        
        logger.info(
            f"Feedback received and stored for request {request.request_id}: "
            f"correct={request.was_correct}"
        )
        
        return {
            "status": "success",
            "message": "Feedback received successfully",
            "request_id": request.request_id
        }
        
    except Exception as e:
        logger.error(f"Error storing feedback: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to store feedback"
        )


@router.get("/stats", response_model=VectorStoreStats)
async def get_stats(db: Session = Depends(get_db)):
    """
    Get statistics about the moderation system
    
    Returns:
        VectorStoreStats with system statistics
    """
    try:
        agent = get_moderation_agent()
        stats = agent.get_statistics()
        
        vector_stats = stats["vector_store"]
        
        # We could also add DB stats here if needed
        
        return VectorStoreStats(
            total_examples=vector_stats["total_documents"],
            toxic_examples=vector_stats["toxic_examples"],
            safe_examples=vector_stats["safe_examples"],
            dimensions=vector_stats["dimension"],
            index_type=vector_stats["index_type"],
            last_updated=time.time()
        )
        
    except Exception as e:
        logger.error(f"Error getting stats: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to get statistics"
        )


from sqlalchemy import func, desc

@router.get("/admin/logs", response_model=List[dict])
async def get_admin_logs(
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Fetch recent moderation logs for the dashboard"""
    logs = db.query(ModerationLog).order_by(desc(ModerationLog.timestamp)).limit(limit).all()
    return [
        {
            "id": log.id,
            "text": log.text,
            "is_toxic": log.is_toxic,
            "confidence": log.confidence,
            "toxicity_type": log.toxicity_type,
            "explanation": log.explanation,
            "latency_ms": log.latency_ms,
            "timestamp": log.timestamp.isoformat()
        } for log in logs
    ]


@router.get("/admin/metrics")
async def get_admin_metrics(db: Session = Depends(get_db)):
    """Fetch aggregate metrics for the dashboard charts"""
    # Toxicity distribution
    toxic_counts = db.query(
        ModerationLog.toxicity_type, 
        func.count(ModerationLog.id)
    ).group_by(ModerationLog.toxicity_type).all()
    
    # Decisions over time (last 7 days)
    # This is simplified for SQLite
    daily_stats = db.query(
        func.date(ModerationLog.timestamp).label('date'),
        func.count(ModerationLog.id).label('total'),
        func.sum(func.cast(ModerationLog.is_toxic, Integer)).label('toxic')
    ).group_by('date').order_by('date').limit(7).all()

    return {
        "toxicity_distribution": {t[0]: t[1] for t in toxic_counts},
        "daily_trends": [
            {"date": d[0], "total": d[1], "toxic": d[2] or 0} for d in daily_stats
        ]
    }


# Background task functions
def log_moderation_request(text: str, result: dict, context: dict = None):
    """Log moderation request to database (background task)"""
    from app.database import SessionLocal
    db = SessionLocal()
    try:
        # Create log entry
        log_entry = ModerationLog(
            text=text,
            is_toxic=result.get("is_toxic"),
            confidence=result.get("confidence"),
            toxicity_type=result.get("toxicity_type"),
            explanation=result.get("explanation"),
            should_block=result.get("should_block"),
            latency_ms=result.get("latency_ms"),
            context=context,
            metadata_json=result.get("metadata")
        )
        
        db.add(log_entry)
        db.commit()
        
        logger.debug(f"Logged moderation request to database: {text[:50]}...")
        
    except Exception as e:
        logger.error(f"Failed to log moderation request to database: {e}")
        db.rollback()
    finally:
        db.close()

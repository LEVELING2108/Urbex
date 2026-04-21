"""
API routes for content moderation
"""
from fastapi import APIRouter, HTTPException, BackgroundTasks, Request
from fastapi.responses import JSONResponse
from typing import List
import time
import logging

from app.models import (
    ModerationRequest,
    ModerationResponse,
    BatchModerationRequest,
    BatchModerationResponse,
    FeedbackRequest,
    VectorStoreStats
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1", tags=["moderation"])

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
            context=request.context
        )
        
        # Log request in background if not check_only
        if not request.check_only:
            background_tasks.add_task(
                log_moderation_request,
                request.text,
                result.dict(),
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
        
        # Extract texts and contexts
        texts = [item.text for item in request.messages]
        contexts = [item.context for item in request.messages]
        
        # Perform batch moderation
        results = agent.moderate_batch(texts, contexts)
        
        # Format results
        formatted_results = []
        toxic_count = 0
        
        for item, (result, latency) in zip(request.messages, results):
            formatted_results.append({
                "id": item.id,
                "text": item.text,
                **result.dict()
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
async def submit_feedback(request: FeedbackRequest):
    """
    Submit feedback on a moderation decision
    
    Args:
        request: Feedback request
        
    Returns:
        Success message
    """
    try:
        # In production, this would store feedback in a database
        # for model improvement and retraining
        logger.info(
            f"Feedback received for request {request.request_id}: "
            f"correct={request.was_correct}"
        )
        
        # TODO: Store in database
        # await store_feedback(request)
        
        return {
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
async def get_stats():
    """
    Get statistics about the moderation system
    
    Returns:
        VectorStoreStats with system statistics
    """
    try:
        agent = get_moderation_agent()
        stats = agent.get_statistics()
        
        vector_stats = stats["vector_store"]
        
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


# Background task functions
async def log_moderation_request(text: str, result: dict, context: dict = None):
    """Log moderation request to database (background task)"""
    try:
        # In production, this would write to a database
        log_entry = {
            "timestamp": time.time(),
            "text": text,
            "result": result,
            "context": context
        }
        
        # TODO: Write to database
        # await db.moderation_logs.insert_one(log_entry)
        
        logger.debug(f"Logged moderation request: {log_entry}")
        
    except Exception as e:
        logger.error(f"Failed to log moderation request: {e}")

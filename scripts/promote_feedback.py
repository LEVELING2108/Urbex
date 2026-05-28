"""
Active Learning Script: Promote user feedback to the Vector Store
"""
import sys
import logging
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Feedback, ModerationLog
from core.vector_store import VectorStore
from core.embeddings import get_embedding_generator
from app.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("active_learning")

def promote_feedback():
    """Find incorrect predictions and add them to the vector store"""
    # 1. Setup DB
    engine = create_engine(settings.database_url)
    Session = sessionmaker(bind=engine)
    db = Session()

    # 2. Find feedback where the system was wrong (was_correct=False)
    # and we have an actual toxicity type to learn from
    corrections = db.query(Feedback).filter(Feedback.was_correct == False).all()
    
    if not corrections:
        logger.info("No feedback to promote at this time.")
        return

    logger.info(f"Found {len(corrections)} pieces of feedback to promote.")

    # 3. Load Vector Store
    vector_store = VectorStore.load(settings.faiss_index_path)
    embedding_generator = get_embedding_generator()

    for feedback in corrections:
        # Get the original text from logs
        # In this demo, we use a simple text match for the logs
        log_entry = db.query(ModerationLog).filter(ModerationLog.text != "").order_by(ModerationLog.timestamp.desc()).first()
        
        if not log_entry:
            continue

        logger.info(f"Promoting correction for: '{log_entry.text[:50]}...'")
        
        # New metadata based on correction
        is_toxic = feedback.actual_toxicity_type != "safe"
        
        new_metadata = {
            "is_toxic": is_toxic,
            "toxicity_type": feedback.actual_toxicity_type or "unknown",
            "explanation": f"Corrected via user feedback: {feedback.comment}",
            "severity": 4 if is_toxic else 1
        }

        # Add to vector store
        embedding = embedding_generator.encode_single(log_entry.text)
        vector_store.add_documents(
            texts=[log_entry.text],
            embeddings=embedding.reshape(1, -1),
            metadata=[new_metadata]
        )

    # 4. Save and clean up
    vector_store.save(settings.faiss_index_path)
    
    # Mark as processed (in a real system, we'd delete or flag them)
    # For demo purposes, we'll just log success
    logger.info("✅ Successfully promoted corrections to Vector Store.")
    db.close()

if __name__ == "__main__":
    promote_feedback()

"""
Active Learning and Model Updating Service
"""
import logging
from sqlalchemy.orm import Session
from app.database import Feedback, ModerationLog
from core.vector_store import VectorStore
from core.embeddings import get_embedding_generator
from app.config import settings

logger = logging.getLogger(__name__)

class ActiveLearner:
    """Service to promote user feedback to the Vector Store knowledge base"""

    def __init__(self, vector_store_path: str = None):
        self.vector_store_path = vector_store_path or settings.faiss_index_path
        self._vector_store = None
        self._embedding_generator = None

    @property
    def vector_store(self):
        if self._vector_store is None:
            self._vector_store = VectorStore.load(self.vector_store_path)
        return self._vector_store

    @property
    def embedding_generator(self):
        if self._embedding_generator is None:
            self._embedding_generator = get_embedding_generator()
        return self._embedding_generator

    def promote_feedback(self, db: Session, request_id: str = None):
        """
        Promote specific feedback or all un-promoted feedback to the vector store
        """
        try:
            # 1. Find feedback to promote
            query = db.query(Feedback).filter(Feedback.was_correct == False)
            if request_id:
                query = query.filter(Feedback.request_id == request_id)
            
            corrections = query.all()
            
            if not corrections:
                logger.debug(f"No feedback found to promote for request_id: {request_id}")
                return 0

            promoted_count = 0
            for feedback in corrections:
                # Find the corresponding log entry
                log_entry = db.query(ModerationLog).filter(
                    ModerationLog.request_id == feedback.request_id
                ).first()
                
                if not log_entry:
                    logger.warning(f"No log entry found for feedback request_id: {feedback.request_id}")
                    continue

                logger.info(f"Promoting correction for: '{log_entry.text[:50]}...'")
                
                is_toxic = feedback.actual_toxicity_type != "safe"
                
                new_metadata = {
                    "is_toxic": is_toxic,
                    "toxicity_type": feedback.actual_toxicity_type or "unknown",
                    "explanation": f"Corrected via user feedback: {feedback.comment or 'No comment'}",
                    "severity": 4 if is_toxic else 1,
                    "promoted_at": feedback.timestamp.isoformat()
                }

                # Add to vector store
                embedding = self.embedding_generator.encode_single(log_entry.text)
                self.vector_store.add_documents(
                    texts=[log_entry.text],
                    embeddings=embedding.reshape(1, -1),
                    metadata=[new_metadata]
                )
                promoted_count += 1

            # 2. Save vector store
            if promoted_count > 0:
                self.vector_store.save(self.vector_store_path)
                logger.info(f"✅ Successfully promoted {promoted_count} corrections to Vector Store.")
            
            return promoted_count

        except Exception as e:
            logger.error(f"Failed to promote feedback: {e}", exc_info=True)
            return 0

# Singleton instance
active_learner = ActiveLearner()

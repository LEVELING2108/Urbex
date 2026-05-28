"""
Mock Content Moderation Agent for testing without OpenAI API
Uses rule-based heuristics and similarity matching
"""
import time
import logging
import re
from typing import Dict, List, Optional, Tuple

from core.vector_store import VectorStore
from core.embeddings import EmbeddingGenerator, get_embedding_generator
from app.models import ToxicityType, ModerationResponse

logger = logging.getLogger(__name__)


# Toxic keywords and patterns (simplified for demo)
TOXIC_PATTERNS = {
    "hate_speech": [
        r"\b(stupid|idiot|dumb|idiotic)\b.*\b(you|your)\b",
        r"\byou're (so )?(an )?(stupid|idiot|dumb|idiotic)\b",
        r"\bbelong in the kitchen\b",
        r"\bgo back to where you came from\b",
        r"\bpeople like you\b",
        r"\bdiversity hire\b",
    ],
    "harassment": [
        r"\bnobody cares\b",
        r"\bshut up\b",
        r"\btoo sensitive\b",
        r"\boverreacting\b",
        r"\bunwanted|unwelcome\b",
        r"\bidiot\b",
        r"\bstupid\b",
    ],
    "indirect_threat": [
        r"\bi know where you\b",
        r"\bi've been watching\b",
        r"\bmake sure you never\b",
        r"\bruin your life\b",
        r"\bsomething terrible happens\b",
        r"\bi'll make sure\b",
    ],
    "identity_attack": [
        r"\bnot a real (woman|man)\b",
        r"\bfor someone like you\b",
        r"\btypical\b.*\b(always|never)\b",
    ],
    "bullying": [
        r"\beveryone thinks\b",
        r"\bnobody likes you\b",
        r"\btoo ugly\b",
        r"\bdon't belong here\b",
    ],
}

SAFE_INDICATORS = [
    r"\bi disagree\b",
    r"\bin my opinion\b",
    r"\bi think\b",
    r"\bi feel\b",
    r"\bcan we discuss\b",
    r"\bi need\b",
    r"\bi'd prefer\b",
]


class MockModerationAgent:
    """Mock content moderation agent using rule-based heuristics"""

    def __init__(
        self,
        vector_store: VectorStore,
        embedding_generator: EmbeddingGenerator,
        max_retrieval_docs: int = 5
    ):
        """
        Initialize the mock moderation agent

        Args:
            vector_store: FAISS vector store with examples
            embedding_generator: Embedding generator
            max_retrieval_docs: Maximum documents to retrieve
        """
        self.vector_store = vector_store
        self.embedding_generator = embedding_generator
        self.max_retrieval_docs = max_retrieval_docs

        # Compile regex patterns
        self.compiled_patterns = {}
        for toxicity_type, patterns in TOXIC_PATTERNS.items():
            self.compiled_patterns[toxicity_type] = [
                re.compile(p, re.IGNORECASE) for p in patterns
            ]

        logger.info("Mock moderation agent initialized (rule-based mode)")

    def _detect_toxicity_type(self, text: str) -> Optional[str]:
        """Detect toxicity type using pattern matching"""
        text_lower = text.lower()

        for toxicity_type, patterns in self.compiled_patterns.items():
            for pattern in patterns:
                if pattern.search(text_lower):
                    return toxicity_type

        return None

    def _is_safe_language(self, text: str) -> bool:
        """Check if text contains safe language indicators"""
        for pattern in SAFE_INDICATORS:
            if re.search(pattern, text, re.IGNORECASE):
                return True
        return False

    def moderate(
        self,
        text: str,
        context: Optional[Dict] = None,
        history: Optional[List[Dict]] = None,
        include_examples: bool = True
    ) -> Tuple[ModerationResponse, int]:
        """
        Moderate a single piece of content using mock logic

        Args:
            text: Text to moderate
            context: Optional context
            history: Optional conversation history
            include_examples: Whether to include retrieved examples

        Returns:
            Tuple of (ModerationResponse, latency_ms)
        """
        start_time = time.time()

        # Combine history with current text for better pattern matching
        full_text_to_check = text
        if history:
            history_text = " ".join([h.get("content", "") for h in history])
            full_text_to_check = f"{history_text} {text}"

        try:
            # Generate query embedding
            query_embedding = self.embedding_generator.encode_single(text)
            
            # Retrieve similar examples
            retrieved_docs = []
            if include_examples:
                retrieved_docs = self.vector_store.search(
                    query_embedding,
                    k=self.max_retrieval_docs
                )

            # --- FAST PATH SIMULATION ---
            if retrieved_docs and retrieved_docs[0][1] > 0.95:
                doc_text, similarity, metadata = retrieved_docs[0]
                latency_ms = int((time.time() - start_time) * 1000)
                return ModerationResponse(
                    is_toxic=metadata.get("is_toxic", False),
                    confidence=similarity,
                    toxicity_type=ToxicityType(metadata.get("toxicity_type", "safe")),
                    explanation=f"Matches existing pattern: {metadata.get('explanation')}",
                    should_block=metadata.get("should_block", metadata.get("is_toxic", False)),
                    latency_ms=latency_ms,
                    metadata={"fast_path": True}
                ), latency_ms

            # Analyze retrieved examples
            toxic_votes = 0
            safe_votes = 0
            toxicity_types = []

            for doc_text, similarity, metadata in retrieved_docs:
                if similarity > 0.5:  # High similarity threshold
                    if metadata.get("is_toxic", False):
                        toxic_votes += similarity * 10
                        toxicity_types.append(metadata.get("toxicity_type", "unknown"))
                    else:
                        safe_votes += similarity * 10

            # Pattern-based detection (using history context)
            pattern_toxicity = self._detect_toxicity_type(full_text_to_check)
            safe_language = self._is_safe_language(text)

            # Calculate confidence
            base_confidence = (toxic_votes - safe_votes) / max(toxic_votes + safe_votes, 1)
            base_confidence = max(0, min(1, (base_confidence + 1) / 2))

            # Adjust based on pattern detection
            if pattern_toxicity:
                base_confidence = max(base_confidence, 0.75)
                if pattern_toxicity not in toxicity_types:
                    toxicity_types.append(pattern_toxicity)

            if safe_language and not pattern_toxicity:
                base_confidence = min(base_confidence, 0.3)

            # Determine if toxic
            is_toxic = base_confidence > 0.5 or pattern_toxicity is not None

            # Determine toxicity type
            if is_toxic and toxicity_types:
                # Most common toxicity type
                toxicity_type = max(set(toxicity_types), key=toxicity_types.count)
            elif is_toxic:
                toxicity_type = pattern_toxicity or "harassment"
            else:
                toxicity_type = "safe"

            # Generate explanation
            if is_toxic:
                if pattern_toxicity:
                    explanation = f"Detected pattern matching {toxicity_type.replace('_', ' ')}. "
                else:
                    explanation = "Similar to known toxic examples in the database. "

                if retrieved_docs:
                    similar_example = retrieved_docs[0][0]
                    explanation += f"Similar to: '{similar_example[:50]}...'"
            else:
                if safe_language:
                    explanation = "Contains respectful communication patterns. "
                else:
                    explanation = "No significant toxicity indicators found. "
                explanation += "Appears to be acceptable communication."

            # Determine if should block
            should_block = base_confidence > 0.7 or (
                pattern_toxicity in ["indirect_threat", "hate_speech"] and base_confidence > 0.6
            )

            # Calculate latency
            latency_ms = int((time.time() - start_time) * 1000)

            # Create response
            moderation_response = ModerationResponse(
                is_toxic=is_toxic,
                confidence=round(base_confidence, 2),
                toxicity_type=ToxicityType(toxicity_type),
                explanation=explanation,
                should_block=should_block,
                latency_ms=latency_ms,
                retrieved_examples=[doc[0] for doc in retrieved_docs[:3]] if include_examples else None,
                metadata={
                    "severity": int(base_confidence * 5),
                    "key_indicators": toxicity_types,
                    "model": "mock-rule-based",
                    "toxic_votes": toxic_votes,
                    "safe_votes": safe_votes,
                    "pattern_detected": pattern_toxicity is not None
                }
            )

            logger.info(
                f"Mock moderation complete: toxic={is_toxic}, "
                f"confidence={base_confidence:.2f}, latency={latency_ms}ms"
            )

            return moderation_response, latency_ms

        except Exception as e:
            logger.error(f"Error during mock moderation: {e}", exc_info=True)

            # Return safe default on error
            latency_ms = int((time.time() - start_time) * 1000)
            return ModerationResponse(
                is_toxic=False,
                confidence=0.0,
                toxicity_type=ToxicityType.SAFE,
                explanation=f"Error during mock moderation: {str(e)}",
                should_block=False,
                latency_ms=latency_ms,
                metadata={"error": True}
            ), latency_ms

    def moderate_batch(
        self,
        texts: List[str],
        contexts: Optional[List[Dict]] = None,
        histories: Optional[List[List[Dict]]] = None
    ) -> List[Tuple[ModerationResponse, int]]:
        """
        Moderate multiple texts in batch

        Args:
            texts: List of texts to moderate
            contexts: Optional list of contexts
            histories: Optional list of histories

        Returns:
            List of (ModerationResponse, latency_ms) tuples
        """
        if contexts is None:
            contexts = [None] * len(texts)

        if histories is None:
            histories = [None] * len(texts)

        results = []
        for text, context, history in zip(texts, contexts, histories):
            result = self.moderate(text, context, history)
            results.append(result)

        return results

    def get_statistics(self) -> Dict:
        """Get statistics about the moderation agent"""
        return {
            "vector_store": self.vector_store.get_statistics(),
            "model": "mock-rule-based",
            "max_retrieval_docs": self.max_retrieval_docs,
            "embedding_dimension": self.embedding_generator.get_dimension(),
            "mode": "mock"
        }


def create_mock_moderation_agent(
    vector_store_path: str,
) -> MockModerationAgent:
    """
    Factory function to create a mock moderation agent

    Args:
        vector_store_path: Path to saved vector store

    Returns:
        Initialized MockModerationAgent
    """
    # Load vector store
    logger.info(f"Loading vector store from {vector_store_path}")
    vector_store = VectorStore.load(vector_store_path)

    # Get embedding generator
    embedding_generator = get_embedding_generator()

    # Create agent
    agent = MockModerationAgent(
        vector_store=vector_store,
        embedding_generator=embedding_generator
    )

    logger.info("Mock moderation agent created successfully")
    return agent

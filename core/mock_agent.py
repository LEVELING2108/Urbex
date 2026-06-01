"""
Mock Content Moderation Agent for testing without OpenAI API
Uses rule-based heuristics and similarity matching
"""
import time
import logging
import re
import json
import os
from typing import Dict, List, Optional, Tuple

from core.vector_store import VectorStore
from core.embeddings import EmbeddingGenerator, get_embedding_generator
from app.models import ToxicityType, ModerationResponse

logger = logging.getLogger(__name__)

# Default patterns in case JSON fails to load
DEFAULT_TOXIC_PATTERNS = {
    "hate_speech": [r"\b(stupid|idiot|dumb|idiotic)\b.*\b(you|your)\b"],
    "harassment": [r"\bshut up\b"],
    "violence_threat": [r"\bkill (you|yourself)\b"]
}

class MockModerationAgent:
    """Mock content moderation agent using rule-based heuristics"""

    def __init__(
        self,
        vector_store: VectorStore,
        embedding_generator: EmbeddingGenerator,
        max_retrieval_docs: int = 5,
        patterns_path: str = "data/patterns.json"
    ):
        """
        Initialize the mock moderation agent

        Args:
            vector_store: FAISS vector store with examples
            embedding_generator: Embedding generator
            max_retrieval_docs: Maximum documents to retrieve
            patterns_path: Path to the JSON file containing toxic patterns
        """
        self.vector_store = vector_store
        self.embedding_generator = embedding_generator
        self.max_retrieval_docs = max_retrieval_docs
        
        # Load patterns, keywords, and weights
        (self.patterns, 
         self.safe_indicators, 
         self.keywords, 
         self.category_weights, 
         self.keyword_weights) = self._load_patterns(patterns_path)

        # Compile regex patterns
        self.compiled_patterns = {}
        for toxicity_type, patterns in self.patterns.items():
            self.compiled_patterns[toxicity_type] = [
                re.compile(p, re.IGNORECASE) for p in patterns
            ]
        
        self.compiled_safe = [re.compile(p, re.IGNORECASE) for p in self.safe_indicators]
        self.compiled_keywords = {
            k: re.compile(f"\\b{re.escape(k)}\\b", re.IGNORECASE) for k in self.keywords
        }

        logger.info(f"Mock moderation agent initialized (rule-based mode) with {len(self.compiled_keywords)} keywords and weighted scoring")

    def _load_patterns(self, path: str) -> Tuple[Dict, List, List, Dict, Dict]:
        """Load patterns and weights from JSON file"""
        try:
            if os.path.exists(path):
                with open(path, 'r') as f:
                    data = json.load(f)
                    return (
                        data.get("toxic_patterns", DEFAULT_TOXIC_PATTERNS),
                        data.get("safe_indicators", []),
                        data.get("toxic_keywords", []),
                        data.get("category_weights", {}),
                        data.get("keyword_weights", {})
                    )
            else:
                logger.warning(f"Patterns file not found at {path}, using defaults")
        except Exception as e:
            logger.error(f"Failed to load patterns from {path}: {e}")
        
        return DEFAULT_TOXIC_PATTERNS, [], [], {}, {}

    def _normalize_text(self, text: str) -> str:
        """Normalize text for fuzzy matching (handle common substitutions)"""
        text = text.lower()
        
        # Common character substitutions
        substitutions = {
            '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b',
            '@': 'a', '$': 's', '!': 'i', '*': 'u', '+': 't'
        }
        
        for char, sub in substitutions.items():
            text = text.replace(char, sub)
            
        # Remove common repeated characters (e.g., "haaaaate" -> "hate")
        text = re.sub(r'(.)\1{2,}', r'\1', text)
        
        return text

    def _detect_toxicity_features(self, text: str) -> Tuple[Optional[str], float, List[str]]:
        """Detect toxicity type and calculate weighted score"""
        text_lower = text.lower()
        normalized_text = self._normalize_text(text)
        
        matched_categories = []
        max_score = 0.0
        indicators = []

        # 1. Check keyword weights
        for keyword, pattern in self.compiled_keywords.items():
            if pattern.search(text_lower) or pattern.search(normalized_text):
                weight = self.keyword_weights.get(keyword, 0.5)
                max_score = max(max_score, weight)
                indicators.append(f"keyword:{keyword}")
                if "harassment" not in matched_categories:
                    matched_categories.append("harassment")

        # 2. Check category patterns
        for category, patterns in self.compiled_patterns.items():
            cat_weight = self.category_weights.get(category, 0.5)
            for pattern in patterns:
                if pattern.search(text_lower) or pattern.search(normalized_text):
                    max_score = max(max_score, cat_weight)
                    indicators.append(f"pattern:{category}")
                    if category not in matched_categories:
                        matched_categories.append(category)
                    break # One match per category is enough

        # Determine primary category (one with highest weight)
        primary_category = None
        if matched_categories:
            primary_category = max(matched_categories, key=lambda c: self.category_weights.get(c, 0.5))

        # Adjust score if multiple indicators are present
        if len(indicators) > 1:
            max_score = min(0.99, max_score + (0.05 * (len(indicators) - 1)))

        return primary_category, max_score, indicators

    def _is_safe_language(self, text: str) -> bool:
        """Check if text contains safe language indicators"""
        for pattern in self.compiled_safe:
            if pattern.search(text):
                return True
        return False

    def moderate(
        self,
        text: str,
        image_data: Optional[str] = None,
        context: Optional[Dict] = None,
        history: Optional[List[Dict]] = None,
        include_examples: bool = True
    ) -> Tuple[ModerationResponse, int]:
        """
        Moderate text and optional image using weighted mock logic
        """
        start_time = time.time()

        # Combine history with current text for better pattern matching
        full_text_to_check = text
        if history:
            history_text = " ".join([h.get("content", "") for h in history])
            full_text_to_check = f"{history_text} {text}"

        try:
            # 1. Rule-based detection (Weighted Scoring)
            pattern_category, pattern_score, indicators = self._detect_toxicity_features(full_text_to_check)
            safe_language = self._is_safe_language(text)

            # 2. Vector-store similarity (RAG)
            query_embedding = self.embedding_generator.encode_single(text)
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
                    request_id="", # To be filled by route
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
                if similarity > 0.5:
                    if metadata.get("is_toxic", False):
                        toxic_votes += similarity * 10
                        toxicity_types.append(metadata.get("toxicity_type", "unknown"))
                    else:
                        safe_votes += similarity * 10

            # Calculate RAG confidence
            rag_confidence = (toxic_votes - safe_votes) / max(toxic_votes + safe_votes, 1)
            rag_confidence = max(0, min(1, (rag_confidence + 1) / 2))

            # --- HYBRID CONFIDENCE CALCULATION ---
            # Combine rule-based score with RAG results
            final_confidence = max(pattern_score, rag_confidence)
            
            if safe_language and final_confidence < 0.8:
                final_confidence = max(0.1, final_confidence - 0.3)

            is_toxic = final_confidence > 0.5
            
            # Determine toxicity type
            if is_toxic:
                if pattern_category:
                    toxicity_type = pattern_category
                elif toxicity_types:
                    toxicity_type = max(set(toxicity_types), key=toxicity_types.count)
                else:
                    toxicity_type = "harassment"
            else:
                toxicity_type = "safe"

            # Generate explanation
            if is_toxic:
                explanation = f"Detected {toxicity_type.replace('_', ' ')} indicators (Score: {final_confidence:.2f}). "
                if indicators:
                    explanation += f"Triggers: {', '.join(indicators[:3])}. "
                if retrieved_docs and retrieved_docs[0][1] > 0.6:
                    explanation += f"Similar to known patterns."
            else:
                explanation = "No significant toxicity indicators found. Appears safe."

            # Determine if should block
            should_block = final_confidence > 0.7 or (is_toxic and final_confidence > 0.6)

            latency_ms = int((time.time() - start_time) * 1000)

            return ModerationResponse(
                request_id="", # To be filled by route
                is_toxic=is_toxic,
                confidence=round(float(final_confidence), 2),
                toxicity_type=ToxicityType(toxicity_type),
                explanation=explanation,
                should_block=should_block,
                latency_ms=latency_ms,
                retrieved_examples=[doc[0] for doc in retrieved_docs[:3]] if include_examples else None,
                metadata={
                    "severity": int(final_confidence * 5),
                    "indicators": indicators,
                    "model": "mock-weighted-hybrid",
                    "rag_confidence": round(rag_confidence, 2),
                    "rule_score": round(pattern_score, 2)
                }
            ), latency_ms

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

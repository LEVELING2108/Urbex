"""
Groq API integration for content moderation
"""
import json
import time
import logging
from typing import Dict, List, Optional, Tuple
from groq import Groq

from core.vector_store import VectorStore
from core.embeddings import EmbeddingGenerator, get_embedding_generator
from core.prompt_templates import format_moderation_prompt, get_system_prompt
from app.models import ToxicityType, ModerationResponse

logger = logging.getLogger(__name__)


class GroqModerationAgent:
    """Content moderation agent using Groq API"""

    def __init__(
        self,
        vector_store: VectorStore,
        embedding_generator: EmbeddingGenerator,
        api_key: str,
        model_name: str = "llama3-70b-8192",
        max_retrieval_docs: int = 5
    ):
        """
        Initialize Groq moderation agent

        Args:
            vector_store: FAISS vector store with examples
            embedding_generator: Embedding generator
            api_key: Groq API key
            model_name: Groq model to use
            max_retrieval_docs: Maximum documents to retrieve
        """
        self.vector_store = vector_store
        self.embedding_generator = embedding_generator
        self.max_retrieval_docs = max_retrieval_docs
        self.model_name = model_name

        # Initialize Groq client
        self.client = Groq(api_key=api_key)

        logger.info(f"Groq moderation agent initialized with model: {model_name}")

    def moderate(
        self,
        text: str,
        context: Optional[Dict] = None,
        history: Optional[List[Dict]] = None,
        include_examples: bool = True
    ) -> Tuple[ModerationResponse, int]:
        """
        Moderate a single piece of content using Groq

        Args:
            text: Text to moderate
            context: Optional context
            history: Optional conversation history
            include_examples: Whether to include retrieved examples

        Returns:
            Tuple of (ModerationResponse, latency_ms)
        """
        start_time = time.time()

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

            # Format examples for prompt
            example_texts = []
            for doc_text, similarity, metadata in retrieved_docs:
                is_toxic = metadata.get("is_toxic", False)
                toxicity_type = metadata.get("toxicity_type", "unknown")
                explanation = metadata.get("explanation", "")

                example_str = f"Text: \"{doc_text}\"\nClassification: {'Toxic' if is_toxic else 'Safe'}\nType: {toxicity_type}\nExplanation: {explanation}"
                example_texts.append(example_str)

            # Prepare history context
            history_str = ""
            if history:
                history_str = "\n".join([f"{h.get('role', 'user')}: {h.get('content', '')}" for h in history])

            # Create prompt
            full_prompt = format_moderation_prompt(
                message=text,
                retrieved_examples=example_texts,
                guidelines=self._get_guidelines(),
                context={**(context or {}), "conversation_history": history_str}
            )

            # Call Groq
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": get_system_prompt(),
                    },
                    {
                        "role": "user",
                        "content": full_prompt,
                    }
                ],
                model=self.model_name,
                response_format={"type": "json_object"},
                temperature=0.1,
            )

            # Parse response
            response_text = chat_completion.choices[0].message.content
            result = self._parse_response(response_text)

            # Calculate latency
            latency_ms = int((time.time() - start_time) * 1000)

            # Create response object
            moderation_response = ModerationResponse(
                is_toxic=result["is_toxic"],
                confidence=result["confidence"],
                toxicity_type=ToxicityType(result["toxicity_type"]),
                explanation=result["explanation"],
                should_block=result["should_block"],
                latency_ms=latency_ms,
                retrieved_examples=[doc[0] for doc in retrieved_docs[:3]] if include_examples else None,
                metadata={
                    "severity": result.get("severity", 3),
                    "key_indicators": result.get("key_indicators", []),
                    "model": f"groq-{self.model_name}",
                    "usage": self._get_usage_stats(chat_completion)
                }
            )

            logger.info(
                f"Groq moderation complete: toxic={result['is_toxic']}, "
                f"confidence={result['confidence']:.2f}, latency={latency_ms}ms"
            )

            return moderation_response, latency_ms

        except Exception as e:
            logger.error(f"Error during Groq moderation: {e}", exc_info=True)

            latency_ms = int((time.time() - start_time) * 1000)
            return ModerationResponse(
                is_toxic=False,
                confidence=0.0,
                toxicity_type=ToxicityType.SAFE,
                explanation=f"Error during moderation: {str(e)}",
                should_block=False,
                latency_ms=latency_ms,
                metadata={"error": True}
            ), latency_ms

    def _get_guidelines(self) -> str:
        """Get community guidelines"""
        return """
        Community Guidelines Summary:

        PROHIBITED CONTENT:
        1. Hate Speech: Content targeting individuals/groups based on protected characteristics
        2. Harassment: Repeated unwelcome contact, threats, intimidation
        3. Violence & Threats: Direct or indirect threats of violence
        4. Sexual Content: Unwanted sexual advances, explicit content
        5. Privacy Violations: Sharing personal information without consent
        6. Spam: Repetitive or promotional content that disrupts

        ALLOWED CONTENT:
        - Criticism, disagreement, and debate
        - News and educational content
        - Artistic or creative expression

        Analyze context, nuance, and intent. Minimize false positives.
        """

    def _parse_response(self, response_text: str) -> Dict:
        """Parse Groq response into structured format"""
        try:
            result = json.loads(response_text)

            # Validate and normalize
            result["is_toxic"] = bool(result.get("is_toxic", False))
            result["confidence"] = float(result.get("confidence", 0.5))
            result["toxicity_type"] = result.get("toxicity_type", "safe")
            result["explanation"] = result.get("explanation", "No explanation provided")
            result["should_block"] = bool(result.get("should_block", False))

            return result
        except Exception as e:
            logger.error(f"Failed to parse Groq response: {e}")
            logger.debug(f"Response text: {response_text}")

            return {
                "is_toxic": False,
                "confidence": 0.0,
                "toxicity_type": "safe",
                "explanation": "Failed to parse moderation result",
                "should_block": False,
                "key_indicators": [],
                "severity": 1
            }

    def _get_usage_stats(self, chat_completion) -> Dict:
        """Get usage statistics from response"""
        try:
            return {
                "prompt_tokens": chat_completion.usage.prompt_tokens,
                "completion_tokens": chat_completion.usage.completion_tokens,
                "total_tokens": chat_completion.usage.total_tokens
            }
        except:
            return {}

    def moderate_batch(
        self,
        texts: List[str],
        contexts: Optional[List[Dict]] = None,
        histories: Optional[List[List[Dict]]] = None
    ) -> List[Tuple[ModerationResponse, int]]:
        """Moderate multiple texts in batch"""
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
            "model": f"groq-{self.model_name}",
            "max_retrieval_docs": self.max_retrieval_docs,
            "embedding_dimension": self.embedding_generator.get_dimension(),
            "provider": "Groq"
        }


def create_groq_moderation_agent(
    vector_store_path: str,
    api_key: str,
    model_name: str = "llama3-70b-8192"
) -> GroqModerationAgent:
    """
    Factory function to create a Groq moderation agent

    Args:
        vector_store_path: Path to saved vector store
        api_key: Groq API key
        model_name: Groq model name

    Returns:
        Initialized GroqModerationAgent
    """
    logger.info(f"Loading vector store from {vector_store_path}")
    vector_store = VectorStore.load(vector_store_path)

    embedding_generator = get_embedding_generator()

    agent = GroqModerationAgent(
        vector_store=vector_store,
        embedding_generator=embedding_generator,
        api_key=api_key,
        model_name=model_name
    )

    logger.info("Groq moderation agent created successfully")
    return agent

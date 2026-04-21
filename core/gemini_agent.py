"""
Google Gemini API integration for content moderation
"""
import json
import time
import logging
from typing import Dict, List, Optional, Tuple
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold

from core.vector_store import VectorStore
from core.embeddings import EmbeddingGenerator, get_embedding_generator
from core.prompt_templates import format_moderation_prompt, get_system_prompt
from app.models import ToxicityType, ModerationResponse

logger = logging.getLogger(__name__)


class GeminiModerationAgent:
    """Content moderation agent using Google Gemini API"""

    def __init__(
        self,
        vector_store: VectorStore,
        embedding_generator: EmbeddingGenerator,
        api_key: str,
        model_name: str = "gemini-1.5-flash",
        max_retrieval_docs: int = 5
    ):
        """
        Initialize Gemini moderation agent

        Args:
            vector_store: FAISS vector store with examples
            embedding_generator: Embedding generator
            api_key: Google Gemini API key
            model_name: Gemini model to use
            max_retrieval_docs: Maximum documents to retrieve
        """
        self.vector_store = vector_store
        self.embedding_generator = embedding_generator
        self.max_retrieval_docs = max_retrieval_docs

        # Configure Gemini
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

        # Safety settings (relaxed for moderation analysis)
        self.safety_settings = {
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        }

        logger.info(f"Gemini moderation agent initialized with model: {model_name}")

    def moderate(
        self,
        text: str,
        context: Optional[Dict] = None,
        include_examples: bool = True
    ) -> Tuple[ModerationResponse, int]:
        """
        Moderate a single piece of content using Gemini

        Args:
            text: Text to moderate
            context: Optional context
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

            # Format examples for prompt
            example_texts = []
            for doc_text, similarity, metadata in retrieved_docs:
                is_toxic = metadata.get("is_toxic", False)
                toxicity_type = metadata.get("toxicity_type", "unknown")
                explanation = metadata.get("explanation", "")

                example_str = f"""
                Text: "{doc_text}"
                Classification: {"Toxic" if is_toxic else "Safe"}
                Type: {toxicity_type}
                Explanation: {explanation}
                Similarity: {similarity:.2f}
                """
                example_texts.append(example_str)

            # Create prompt
            full_prompt = format_moderation_prompt(
                message=text,
                retrieved_examples=example_texts,
                guidelines=self._get_guidelines(),
                context=context
            )

            # Call Gemini
            response = self.model.generate_content(
                full_prompt,
                safety_settings=self.safety_settings
            )

            # Parse response
            result = self._parse_response(response.text)

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
                    "model": f"gemini-{self.model.model_name}",
                    "usage": self._get_usage_stats(response)
                }
            )

            logger.info(
                f"Gemini moderation complete: toxic={result['is_toxic']}, "
                f"confidence={result['confidence']:.2f}, latency={latency_ms}ms"
            )

            return moderation_response, latency_ms

        except Exception as e:
            logger.error(f"Error during Gemini moderation: {e}", exc_info=True)

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
        """Parse Gemini response into structured format"""
        try:
            # Try to extract JSON from response
            start_idx = response_text.find('{')
            end_idx = response_text.rfind('}') + 1

            if start_idx != -1 and end_idx > start_idx:
                json_str = response_text[start_idx:end_idx]
                result = json.loads(json_str)

                # Validate and normalize
                result["is_toxic"] = bool(result.get("is_toxic", False))
                result["confidence"] = float(result.get("confidence", 0.5))
                result["toxicity_type"] = result.get("toxicity_type", "safe")
                result["explanation"] = result.get("explanation", "No explanation provided")
                result["should_block"] = bool(result.get("should_block", False))

                return result
            else:
                raise ValueError("No JSON found in response")

        except Exception as e:
            logger.error(f"Failed to parse Gemini response: {e}")
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

    def _get_usage_stats(self, response) -> Dict:
        """Get usage statistics from response"""
        try:
            return {
                "prompt_tokens": response.usage_metadata.prompt_token_count,
                "completion_tokens": response.usage_metadata.candidates_token_count,
                "total_tokens": response.usage_metadata.total_token_count
            }
        except:
            return {}

    def moderate_batch(
        self,
        texts: List[str],
        contexts: Optional[List[Dict]] = None
    ) -> List[Tuple[ModerationResponse, int]]:
        """Moderate multiple texts in batch"""
        if contexts is None:
            contexts = [None] * len(texts)

        results = []
        for text, context in zip(texts, contexts):
            result = self.moderate(text, context)
            results.append(result)

        return results

    def get_statistics(self) -> Dict:
        """Get statistics about the moderation agent"""
        return {
            "vector_store": self.vector_store.get_statistics(),
            "model": f"gemini-{self.model.model_name}",
            "max_retrieval_docs": self.max_retrieval_docs,
            "embedding_dimension": self.embedding_generator.get_dimension(),
            "provider": "Google Gemini"
        }


def create_gemini_moderation_agent(
    vector_store_path: str,
    api_key: str,
    model_name: str = "gemini-1.5-flash"
) -> GeminiModerationAgent:
    """
    Factory function to create a Gemini moderation agent

    Args:
        vector_store_path: Path to saved vector store
        api_key: Google Gemini API key
        model_name: Gemini model name

    Returns:
        Initialized GeminiModerationAgent
    """
    logger.info(f"Loading vector store from {vector_store_path}")
    vector_store = VectorStore.load(vector_store_path)

    embedding_generator = get_embedding_generator()

    agent = GeminiModerationAgent(
        vector_store=vector_store,
        embedding_generator=embedding_generator,
        api_key=api_key,
        model_name=model_name
    )

    logger.info("Gemini moderation agent created successfully")
    return agent

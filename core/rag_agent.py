"""
RAG-based Content Moderation Agent
"""
import json
import time
import logging
from typing import Dict, List, Optional, Tuple
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

from core.vector_store import VectorStore
from core.embeddings import EmbeddingGenerator, get_embedding_generator
from core.prompt_templates import (
    format_moderation_prompt,
    get_system_prompt,
    get_few_shot_examples
)
from app.models import ToxicityType, ModerationResponse

logger = logging.getLogger(__name__)


class ModerationAgent:
    """RAG-based content moderation agent"""
    
    def __init__(
        self,
        vector_store: VectorStore,
        embedding_generator: EmbeddingGenerator,
        openai_api_key: str,
        model_name: str = "gpt-4-turbo-preview",
        temperature: float = 0.1,
        max_retrieval_docs: int = 5
    ):
        """
        Initialize the moderation agent
        
        Args:
            vector_store: FAISS vector store with examples
            embedding_generator: Embedding generator
            openai_api_key: OpenAI API key
            model_name: OpenAI model to use
            temperature: LLM temperature (lower = more deterministic)
            max_retrieval_docs: Maximum documents to retrieve
        """
        self.vector_store = vector_store
        self.embedding_generator = embedding_generator
        self.max_retrieval_docs = max_retrieval_docs
        
        # Initialize LLM
        self.llm = ChatOpenAI(
            api_key=openai_api_key,
            model=model_name,
            temperature=temperature,
            max_tokens=800,
            request_timeout=30
        )
        
        # Community guidelines (loaded from config or database)
        self.guidelines = self._load_guidelines()
        
        logger.info(f"Moderation agent initialized with model: {model_name}")
    
    def _load_guidelines(self) -> str:
        """Load community guidelines"""
        # In production, this would load from a database or file
        # For now, we'll use a hardcoded version
        return """
        Community Guidelines Summary:
        
        PROHIBITED CONTENT:
        1. Hate Speech: Content targeting individuals or groups based on race, ethnicity, religion, gender, sexual orientation, disability, or other protected characteristics
        2. Harassment: Repeated unwelcome contact, threats, intimidation, or coordinated attacks
        3. Violence & Threats: Direct or indirect threats of violence, celebration of violence, or instructions for harm
        4. Sexual Content: Unwanted sexual advances, explicit content, or sexual harassment
        5. Privacy Violations: Sharing personal information without consent (doxxing)
        6. Spam: Repetitive or promotional content that disrupts the platform
        
        ALLOWED CONTENT:
        - Criticism, disagreement, and debate (even when heated)
        - News and educational content about difficult topics
        - Artistic or creative expression
        - Discussion of controversial topics in good faith
        
        NUANCES:
        - Context matters: Same words can be acceptable or harmful based on context
        - Intent matters: Distinguish between malice and misunderstanding
        - Impact matters: Consider the likely effect on the target
        - Reclaimed language: Some communities reclaim slurs; context is key
        """
    
    def moderate(
        self,
        text: str,
        context: Optional[Dict] = None,
        include_examples: bool = True
    ) -> Tuple[ModerationResponse, int]:
        """
        Moderate a single piece of content
        
        Args:
            text: Text to moderate
            context: Optional context (user_id, conversation_id, etc.)
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
                guidelines=self.guidelines,
                context=context
            )
            
            # Call LLM
            messages = [
                SystemMessage(content=get_system_prompt()),
                HumanMessage(content=full_prompt)
            ]
            
            response = self.llm.invoke(messages)
            
            # Parse response
            result = self._parse_llm_response(response.content)
            
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
                    "model": self.llm.model_name
                }
            )
            
            logger.info(
                f"Moderation complete: toxic={result['is_toxic']}, "
                f"confidence={result['confidence']:.2f}, latency={latency_ms}ms"
            )
            
            return moderation_response, latency_ms
            
        except Exception as e:
            logger.error(f"Error during moderation: {e}", exc_info=True)
            
            # Return safe default on error
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
    
    def _parse_llm_response(self, response_text: str) -> Dict:
        """
        Parse LLM response into structured format
        
        Args:
            response_text: Raw LLM response
            
        Returns:
            Parsed response dictionary
        """
        try:
            # Try to extract JSON from response
            # Handle cases where LLM adds explanation before/after JSON
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
            logger.error(f"Failed to parse LLM response: {e}")
            logger.debug(f"Response text: {response_text}")
            
            # Return safe default
            return {
                "is_toxic": False,
                "confidence": 0.0,
                "toxicity_type": "safe",
                "explanation": "Failed to parse moderation result",
                "should_block": False,
                "key_indicators": [],
                "severity": 1
            }
    
    def moderate_batch(
        self,
        texts: List[str],
        contexts: Optional[List[Dict]] = None
    ) -> List[Tuple[ModerationResponse, int]]:
        """
        Moderate multiple texts in batch
        
        Args:
            texts: List of texts to moderate
            contexts: Optional list of contexts
            
        Returns:
            List of (ModerationResponse, latency_ms) tuples
        """
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
            "model": self.llm.model_name,
            "max_retrieval_docs": self.max_retrieval_docs,
            "embedding_dimension": self.embedding_generator.get_dimension()
        }


def create_moderation_agent(
    vector_store_path: str,
    openai_api_key: str,
    model_name: str = "gpt-4-turbo-preview"
) -> ModerationAgent:
    """
    Factory function to create a moderation agent
    
    Args:
        vector_store_path: Path to saved vector store
        openai_api_key: OpenAI API key
        model_name: OpenAI model name
        
    Returns:
        Initialized ModerationAgent
    """
    # Load vector store
    logger.info(f"Loading vector store from {vector_store_path}")
    vector_store = VectorStore.load(vector_store_path)
    
    # Get embedding generator
    embedding_generator = get_embedding_generator()
    
    # Create agent
    agent = ModerationAgent(
        vector_store=vector_store,
        embedding_generator=embedding_generator,
        openai_api_key=openai_api_key,
        model_name=model_name
    )
    
    logger.info("Moderation agent created successfully")
    return agent

"""
Embedding generation module using HuggingFace Sentence Transformers
"""
from sentence_transformers import SentenceTransformer
from typing import List, Union
import numpy as np
import logging
from functools import lru_cache

logger = logging.getLogger(__name__)


class EmbeddingGenerator:
    """Generate embeddings for text using Sentence Transformers"""
    
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        """
        Initialize the embedding generator
        
        Args:
            model_name: HuggingFace model name for embeddings
        """
        self.model_name = model_name
        self.model = None
        self.dimension = None
        self._load_model()
    
    def _load_model(self):
        """Load the sentence transformer model"""
        try:
            logger.info(f"Loading embedding model: {self.model_name}")
            self.model = SentenceTransformer(self.model_name)
            
            # Get embedding dimension
            test_embedding = self.model.encode(["test"])
            self.dimension = len(test_embedding[0])
            
            logger.info(f"Model loaded successfully. Embedding dimension: {self.dimension}")
        except Exception as e:
            logger.error(f"Failed to load embedding model: {e}")
            raise
    
    def encode(
        self,
        texts: Union[str, List[str]],
        batch_size: int = 32,
        show_progress_bar: bool = False
    ) -> np.ndarray:
        """
        Generate embeddings for input texts
        
        Args:
            texts: Single text or list of texts
            batch_size: Batch size for encoding
            show_progress_bar: Whether to show progress bar
            
        Returns:
            Numpy array of embeddings
        """
        if isinstance(texts, str):
            texts = [texts]
        
        try:
            embeddings = self.model.encode(
                texts,
                batch_size=batch_size,
                show_progress_bar=show_progress_bar,
                convert_to_numpy=True
            )
            return embeddings
        except Exception as e:
            logger.error(f"Error encoding texts: {e}")
            raise
    
    def encode_single(self, text: str) -> np.ndarray:
        """
        Encode a single text (optimized for single queries)
        
        Args:
            text: Text to encode
            
        Returns:
            Embedding vector
        """
        return self.encode(text)[0]
    
    def compute_similarity(
        self,
        embedding1: np.ndarray,
        embedding2: np.ndarray
    ) -> float:
        """
        Compute cosine similarity between two embeddings
        
        Args:
            embedding1: First embedding
            embedding2: Second embedding
            
        Returns:
            Similarity score (0-1)
        """
        # Normalize embeddings
        embedding1_norm = embedding1 / np.linalg.norm(embedding1)
        embedding2_norm = embedding2 / np.linalg.norm(embedding2)
        
        # Compute cosine similarity
        similarity = np.dot(embedding1_norm, embedding2_norm)
        
        return float(similarity)
    
    def get_dimension(self) -> int:
        """Get the embedding dimension"""
        return self.dimension
    
    def get_model_name(self) -> str:
        """Get the model name"""
        return self.model_name


# Global embedding generator instance
_embedding_generator = None


def get_embedding_generator(model_name: str = None) -> EmbeddingGenerator:
    """
    Get or create the global embedding generator instance
    
    Args:
        model_name: Optional model name (uses default if not provided)
        
    Returns:
        EmbeddingGenerator instance
    """
    global _embedding_generator
    
    if _embedding_generator is None:
        from app.config import EMBEDDING_MODEL
        model = model_name or EMBEDDING_MODEL
        _embedding_generator = EmbeddingGenerator(model)
    
    return _embedding_generator


@lru_cache(maxsize=1000)
def cached_encode_single(text: str, model_name: str = None) -> tuple:
    """
    Cache single text embeddings for frequently queried texts
    
    Args:
        text: Text to encode
        model_name: Model name (for cache key)
        
    Returns:
        Tuple of embedding values (hashable for cache)
    """
    generator = get_embedding_generator(model_name)
    embedding = generator.encode_single(text)
    return tuple(embedding.tolist())


def batch_encode_with_metadata(
    texts: List[str],
    metadata: List[dict] = None,
    batch_size: int = 32
) -> List[dict]:
    """
    Encode texts and attach metadata
    
    Args:
        texts: List of texts to encode
        metadata: Optional metadata for each text
        batch_size: Batch size for encoding
        
    Returns:
        List of dicts with embeddings and metadata
    """
    generator = get_embedding_generator()
    embeddings = generator.encode(texts, batch_size=batch_size)
    
    if metadata is None:
        metadata = [{}] * len(texts)
    
    results = []
    for text, embedding, meta in zip(texts, embeddings, metadata):
        results.append({
            "text": text,
            "embedding": embedding,
            "metadata": meta
        })
    
    return results


def precompute_embeddings_for_dataset(
    dataset: List[dict],
    text_field: str = "text",
    batch_size: int = 64
) -> List[dict]:
    """
    Precompute embeddings for a dataset
    
    Args:
        dataset: List of dictionaries containing text
        text_field: Field name containing text
        batch_size: Batch size for encoding
        
    Returns:
        Dataset with embeddings added
    """
    texts = [item[text_field] for item in dataset]
    generator = get_embedding_generator()
    
    logger.info(f"Computing embeddings for {len(texts)} texts...")
    embeddings = generator.encode(texts, batch_size=batch_size, show_progress_bar=True)
    
    # Add embeddings to dataset
    for item, embedding in zip(dataset, embeddings):
        item["embedding"] = embedding
    
    logger.info("Embeddings computed successfully")
    return dataset

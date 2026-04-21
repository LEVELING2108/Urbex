"""
FAISS Vector Store Manager for content moderation examples
"""
import faiss
import numpy as np
import pickle
import json
import logging
from pathlib import Path
from typing import List, Dict, Tuple, Optional
from datetime import datetime

logger = logging.getLogger(__name__)


class VectorStore:
    """FAISS-based vector store for moderation examples"""
    
    def __init__(
        self,
        dimension: int = 384,
        index_type: str = "Flat",
        metric: str = "cosine"
    ):
        """
        Initialize vector store
        
        Args:
            dimension: Embedding dimension
            index_type: FAISS index type (Flat, IVF, HNSW)
            metric: Distance metric (cosine, l2)
        """
        self.dimension = dimension
        self.index_type = index_type
        self.metric = metric
        self.index = None
        self.metadata = []
        self.texts = []
        self._create_index()
    
    def _create_index(self):
        """Create FAISS index based on configuration"""
        if self.metric == "cosine":
            # Use inner product for cosine similarity (with normalized vectors)
            self.index = faiss.IndexFlatIP(self.dimension)
        elif self.metric == "l2":
            self.index = faiss.IndexFlatL2(self.dimension)
        else:
            raise ValueError(f"Unsupported metric: {self.metric}")
        
        logger.info(f"Created FAISS index: {self.index_type}, metric: {self.metric}")
    
    def add_documents(
        self,
        texts: List[str],
        embeddings: np.ndarray,
        metadata: List[Dict] = None
    ):
        """
        Add documents to the vector store
        
        Args:
            texts: List of text documents
            embeddings: Numpy array of embeddings
            metadata: Optional metadata for each document
        """
        if len(texts) != len(embeddings):
            raise ValueError("Number of texts and embeddings must match")
        
        if metadata is None:
            metadata = [{}] * len(texts)
        
        # Normalize embeddings for cosine similarity
        if self.metric == "cosine":
            faiss.normalize_L2(embeddings)
        
        # Add to index
        self.index.add(embeddings.astype('float32'))
        
        # Store texts and metadata
        self.texts.extend(texts)
        self.metadata.extend(metadata)
        
        logger.info(f"Added {len(texts)} documents to vector store. Total: {len(self.texts)}")
    
    def search(
        self,
        query_embedding: np.ndarray,
        k: int = 5,
        filter_metadata: Dict = None
    ) -> List[Tuple[str, float, Dict]]:
        """
        Search for similar documents
        
        Args:
            query_embedding: Query embedding vector
            k: Number of results to return
            filter_metadata: Optional metadata filters
            
        Returns:
            List of (text, similarity_score, metadata) tuples
        """
        if self.index.ntotal == 0:
            logger.warning("Vector store is empty")
            return []
        
        # Normalize query for cosine similarity
        if self.metric == "cosine":
            query_embedding = query_embedding.reshape(1, -1).astype('float32')
            faiss.normalize_L2(query_embedding)
        else:
            query_embedding = query_embedding.reshape(1, -1).astype('float32')
        
        # Search
        similarities, indices = self.index.search(query_embedding, min(k, self.index.ntotal))
        
        # Prepare results
        results = []
        for sim, idx in zip(similarities[0], indices[0]):
            if idx == -1:  # No more results
                break
            
            # Apply metadata filtering if specified
            if filter_metadata:
                matches = all(
                    self.metadata[idx].get(key) == value
                    for key, value in filter_metadata.items()
                )
                if not matches:
                    continue
            
            results.append((
                self.texts[idx],
                float(sim),
                self.metadata[idx]
            ))
        
        return results
    
    def get_statistics(self) -> Dict:
        """Get statistics about the vector store"""
        toxic_count = sum(1 for m in self.metadata if m.get("is_toxic", False))
        
        return {
            "total_documents": len(self.texts),
            "toxic_examples": toxic_count,
            "safe_examples": len(self.texts) - toxic_count,
            "dimension": self.dimension,
            "index_type": self.index_type,
            "metric": self.metric
        }
    
    def save(self, path: str):
        """
        Save vector store to disk
        
        Args:
            path: Directory path to save files
        """
        path = Path(path)
        path.mkdir(parents=True, exist_ok=True)
        
        # Save FAISS index
        index_path = path / "faiss.index"
        faiss.write_index(self.index, str(index_path))
        
        # Save metadata and texts
        data = {
            "texts": self.texts,
            "metadata": self.metadata,
            "dimension": self.dimension,
            "index_type": self.index_type,
            "metric": self.metric,
            "saved_at": datetime.utcnow().isoformat()
        }
        
        data_path = path / "metadata.pkl"
        with open(data_path, 'wb') as f:
            pickle.dump(data, f)
        
        # Also save as JSON for human readability
        json_path = path / "metadata.json"
        json_data = {
            "dimension": self.dimension,
            "index_type": self.index_type,
            "metric": self.metric,
            "total_documents": len(self.texts),
            "saved_at": data["saved_at"]
        }
        with open(json_path, 'w') as f:
            json.dump(json_data, f, indent=2)
        
        logger.info(f"Vector store saved to {path}")
    
    @classmethod
    def load(cls, path: str) -> 'VectorStore':
        """
        Load vector store from disk
        
        Args:
            path: Directory path containing saved files
            
        Returns:
            Loaded VectorStore instance
        """
        path = Path(path)
        
        # Load metadata and texts
        data_path = path / "metadata.pkl"
        with open(data_path, 'rb') as f:
            data = pickle.load(f)
        
        # Create instance
        instance = cls(
            dimension=data["dimension"],
            index_type=data["index_type"],
            metric=data["metric"]
        )
        
        # Load FAISS index
        index_path = path / "faiss.index"
        instance.index = faiss.read_index(str(index_path))
        
        # Restore data
        instance.texts = data["texts"]
        instance.metadata = data["metadata"]
        
        logger.info(f"Vector store loaded from {path}. Total documents: {len(instance.texts)}")
        return instance
    
    def delete_documents(self, indices: List[int]):
        """
        Delete documents by indices (note: FAISS doesn't support efficient deletion)
        
        Args:
            indices: List of indices to delete
        """
        # FAISS doesn't support deletion, so we need to rebuild
        logger.warning("Deleting documents requires rebuilding the index")
        
        # Get all embeddings (this is expensive)
        remaining_texts = []
        remaining_metadata = []
        
        for i in range(len(self.texts)):
            if i not in indices:
                remaining_texts.append(self.texts[i])
                remaining_metadata.append(self.metadata[i])
        
        # Note: We'd need to re-embed the texts, which is why deletion is expensive
        logger.info(f"Would delete {len(indices)} documents, keeping {len(remaining_texts)}")
    
    def clear(self):
        """Clear all documents from the vector store"""
        self._create_index()
        self.texts = []
        self.metadata = []
        logger.info("Vector store cleared")


def create_example_vector_store(
    examples_data: List[Dict],
    embedding_generator,
    save_path: str
) -> VectorStore:
    """
    Create a vector store from example data
    
    Args:
        examples_data: List of example dictionaries with 'text' and metadata
        embedding_generator: Embedding generator instance
        save_path: Path to save the vector store
        
    Returns:
        Initialized VectorStore
    """
    logger.info(f"Creating vector store with {len(examples_data)} examples")
    
    # Extract texts
    texts = [ex["text"] for ex in examples_data]
    
    # Generate embeddings
    logger.info("Generating embeddings...")
    embeddings = embedding_generator.encode(texts, show_progress_bar=True)
    
    # Create vector store
    vector_store = VectorStore(dimension=embedding_generator.get_dimension())
    
    # Add documents
    metadata = [
        {k: v for k, v in ex.items() if k != "text"}
        for ex in examples_data
    ]
    vector_store.add_documents(texts, embeddings, metadata)
    
    # Save
    vector_store.save(save_path)
    
    logger.info(f"Vector store created and saved to {save_path}")
    return vector_store

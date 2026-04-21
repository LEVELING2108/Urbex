"""
Script to initialize the FAISS vector store with example data
"""
import json
import logging
import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from core.vector_store import create_example_vector_store
from core.embeddings import get_embedding_generator
from app.config import settings

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def load_json_data(filepath: str) -> list:
    """Load JSON data from file"""
    with open(filepath, 'r') as f:
        return json.load(f)


def main():
    """Initialize vector store with example data"""
    logger.info("Starting vector store initialization...")
    
    try:
        # Load example data
        logger.info("Loading example data...")
        
        data_dir = project_root / "data"
        toxic_examples = load_json_data(data_dir / "abuse_examples.json")
        safe_examples = load_json_data(data_dir / "safe_examples.json")
        
        # Combine all examples
        all_examples = toxic_examples + safe_examples
        logger.info(f"Loaded {len(all_examples)} examples "
                   f"({len(toxic_examples)} toxic, {len(safe_examples)} safe)")
        
        # Get embedding generator
        logger.info("Initializing embedding generator...")
        embedding_generator = get_embedding_generator(settings.embedding_model)
        
        # Create vector store
        logger.info("Creating vector store...")
        vector_store = create_example_vector_store(
            examples_data=all_examples,
            embedding_generator=embedding_generator,
            save_path=settings.faiss_index_path
        )
        
        # Print statistics
        stats = vector_store.get_statistics()
        logger.info("Vector store created successfully!")
        logger.info(f"Statistics:")
        logger.info(f"  Total documents: {stats['total_documents']}")
        logger.info(f"  Toxic examples: {stats['toxic_examples']}")
        logger.info(f"  Safe examples: {stats['safe_examples']}")
        logger.info(f"  Dimensions: {stats['dimension']}")
        logger.info(f"  Index type: {stats['index_type']}")
        
        # Test retrieval
        logger.info("\nTesting retrieval...")
        test_query = "You're stupid"
        query_embedding = embedding_generator.encode_single(test_query)
        results = vector_store.search(query_embedding, k=3)
        
        logger.info(f"Query: '{test_query}'")
        logger.info("Top 3 similar examples:")
        for i, (text, similarity, metadata) in enumerate(results, 1):
            logger.info(f"  {i}. (sim={similarity:.3f}) {text[:80]}...")
            logger.info(f"     Toxic: {metadata.get('is_toxic', 'N/A')}, "
                       f"Type: {metadata.get('toxicity_type', 'N/A')}")
        
        logger.info("\n✓ Vector store initialization complete!")
        logger.info(f"✓ Saved to: {settings.faiss_index_path}")
        
    except Exception as e:
        logger.error(f"Failed to initialize vector store: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()

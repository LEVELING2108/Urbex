"""
Example Python client for URBEX Content Moderation API
"""
import requests
from typing import Dict, List, Optional
import json


class ModerationClient:
    """Client for URBEX Content Moderation API"""
    
    def __init__(self, base_url: str = "http://localhost:8000"):
        """
        Initialize the moderation client
        
        Args:
            base_url: Base URL of the API
        """
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
    
    def moderate(
        self,
        text: str,
        context: Optional[Dict] = None,
        check_only: bool = False
    ) -> Dict:
        """
        Moderate a single message
        
        Args:
            text: Message to moderate
            context: Optional context dictionary
            check_only: If True, don't log the request
            
        Returns:
            Moderation result dictionary
        """
        payload = {
            "text": text,
            "check_only": check_only
        }
        
        if context:
            payload["context"] = context
        
        response = self.session.post(
            f"{self.base_url}/api/v1/moderate",
            json=payload
        )
        response.raise_for_status()
        
        return response.json()
    
    def moderate_batch(self, messages: List[Dict]) -> Dict:
        """
        Moderate multiple messages in batch
        
        Args:
            messages: List of message dicts with 'id' and 'text' fields
            
        Returns:
            Batch moderation results
        """
        payload = {"messages": messages}
        
        response = self.session.post(
            f"{self.base_url}/api/v1/moderate/batch",
            json=payload
        )
        response.raise_for_status()
        
        return response.json()
    
    def submit_feedback(
        self,
        request_id: str,
        was_correct: bool,
        actual_toxicity_type: Optional[str] = None,
        comment: Optional[str] = None
    ) -> Dict:
        """
        Submit feedback on a moderation decision
        
        Args:
            request_id: ID of the moderation request
            was_correct: Whether the decision was correct
            actual_toxicity_type: Correct toxicity type if different
            comment: Optional feedback comment
            
        Returns:
            Response dictionary
        """
        payload = {
            "request_id": request_id,
            "was_correct": was_correct
        }
        
        if actual_toxicity_type:
            payload["actual_toxicity_type"] = actual_toxicity_type
        if comment:
            payload["comment"] = comment
        
        response = self.session.post(
            f"{self.base_url}/api/v1/feedback",
            json=payload
        )
        response.raise_for_status()
        
        return response.json()
    
    def get_stats(self) -> Dict:
        """
        Get system statistics
        
        Returns:
            Statistics dictionary
        """
        response = self.session.get(f"{self.base_url}/api/v1/stats")
        response.raise_for_status()
        
        return response.json()
    
    def health_check(self) -> Dict:
        """
        Check API health
        
        Returns:
            Health status dictionary
        """
        response = self.session.get(f"{self.base_url}/health")
        response.raise_for_status()
        
        return response.json()


# Example usage
def main():
    """Example usage of the moderation client"""
    
    # Initialize client
    client = ModerationClient()
    
    # Check if server is running
    print("Checking API health...")
    try:
        health = client.health_check()
        print(f"✓ API is {health['status']}")
        print(f"  Vector store loaded: {health['vector_store_loaded']}")
        print(f"  Model loaded: {health['model_loaded']}")
    except Exception as e:
        print(f"✗ API is not accessible: {e}")
        return
    
    print("\n" + "="*60)
    print("Testing single message moderation")
    print("="*60)
    
    # Test messages
    test_messages = [
        "Hello, how are you today?",
        "I disagree with your approach",
        "You're so stupid, I can't believe you did that",
        "I know where you live and I'm coming for you",
        "Your work needs significant improvement",
    ]
    
    for msg in test_messages:
        print(f"\nMessage: '{msg}'")
        
        try:
            result = client.moderate(msg, check_only=True)
            
            print(f"  Toxic: {result['is_toxic']}")
            print(f"  Confidence: {result['confidence']:.2f}")
            print(f"  Type: {result['toxicity_type']}")
            print(f"  Should Block: {result['should_block']}")
            print(f"  Latency: {result['latency_ms']}ms")
            print(f"  Explanation: {result['explanation'][:100]}...")
            
        except Exception as e:
            print(f"  Error: {e}")
    
    print("\n" + "="*60)
    print("Testing batch moderation")
    print("="*60)
    
    # Batch test
    batch_messages = [
        {"id": "msg1", "text": "Great job on the project!"},
        {"id": "msg2", "text": "I hate you so much"},
        {"id": "msg3", "text": "Could you explain this to me?"},
        {"id": "msg4", "text": "You're worthless and nobody likes you"},
    ]
    
    try:
        batch_result = client.moderate_batch(batch_messages)
        
        print(f"\nTotal processed: {batch_result['total_processed']}")
        print(f"Toxic detected: {batch_result['total_toxic']}")
        print(f"Total latency: {batch_result['total_latency_ms']}ms")
        
        print("\nResults:")
        for result in batch_result['results']:
            print(f"  {result['id']}: "
                  f"toxic={result['is_toxic']}, "
                  f"confidence={result['confidence']:.2f}")
        
    except Exception as e:
        print(f"Error in batch moderation: {e}")
    
    print("\n" + "="*60)
    print("Getting system statistics")
    print("="*60)
    
    try:
        stats = client.get_stats()
        print(f"\nVector Store:")
        print(f"  Total examples: {stats['total_examples']}")
        print(f"  Toxic examples: {stats['toxic_examples']}")
        print(f"  Safe examples: {stats['safe_examples']}")
        print(f"  Dimensions: {stats['dimensions']}")
    except Exception as e:
        print(f"Error getting stats: {e}")
    
    print("\n" + "="*60)
    print("Example complete!")
    print("="*60)


if __name__ == "__main__":
    main()

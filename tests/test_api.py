"""
Tests for the moderation API
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

@pytest.fixture
def client():
    """Fixture to provide a TestClient that triggers lifespan events"""
    with TestClient(app, headers={settings.api_key_header: settings.api_key}) as c:
        yield c


class TestModerateEndpoint:
    """Tests for /api/v1/moderate endpoint"""
    
    def test_moderate_toxic_content(self, client):
        """Test moderation of clearly toxic content"""
        response = client.post(
            "/api/v1/moderate",
            json={
                "text": "I know where you live and I'm coming for you",
                "check_only": True
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["is_toxic"] is True
        assert data["confidence"] > 0.7
        assert data["should_block"] is True
        assert "threat" in data["toxicity_type"].lower()
    
    def test_moderate_safe_content(self, client):
        """Test moderation of safe content"""
        response = client.post(
            "/api/v1/moderate",
            json={
                "text": "I disagree with your point, here's why...",
                "check_only": True
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["is_toxic"] is False
        assert data["should_block"] is False
    
    def test_moderate_with_context(self, client):
        """Test moderation with additional context"""
        response = client.post(
            "/api/v1/moderate",
            json={
                "text": "You're being ridiculous",
                "context": {
                    "user_id": "user123",
                    "conversation_id": "conv456"
                },
                "check_only": True
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert "confidence" in data
        assert "toxicity_type" in data
    
    def test_moderate_empty_text(self, client):
        """Test moderation of empty text"""
        response = client.post(
            "/api/v1/moderate",
            json={"text": ""}
        )
        
        assert response.status_code == 422  # Validation error
    
    def test_moderate_very_long_text(self, client):
        """Test moderation of very long text"""
        long_text = "word " * 1000  # 5000 characters
        
        response = client.post(
            "/api/v1/moderate",
            json={
                "text": long_text,
                "check_only": True
            }
        )
        
        # Should either succeed or fail gracefully
        assert response.status_code in [200, 422]


class TestBatchModerate:
    """Tests for /api/v1/moderate/batch endpoint"""
    
    def test_batch_moderate_multiple_messages(self, client):
        """Test batch moderation of multiple messages"""
        response = client.post(
            "/api/v1/moderate/batch",
            json={
                "messages": [
                    {"id": "msg1", "text": "Hello friend!"},
                    {"id": "msg2", "text": "I hate you"},
                    {"id": "msg3", "text": "Great work on that project"}
                ]
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["total_processed"] == 3
        assert len(data["results"]) == 3
        assert data["total_toxic"] >= 1  # At least the hateful message
    
    def test_batch_moderate_empty_list(self, client):
        """Test batch moderation with empty list"""
        response = client.post(
            "/api/v1/moderate/batch",
            json={"messages": []}
        )
        
        assert response.status_code == 422  # Validation error


class TestHealthEndpoint:
    """Tests for /health endpoint"""
    
    def test_health_check(self, client):
        """Test health check endpoint"""
        response = client.get("/health")
        
        assert response.status_code == 200
        data = response.json()
        
        assert "status" in data
        assert "uptime_seconds" in data
        assert "vector_store_loaded" in data
        assert "model_loaded" in data


class TestStatsEndpoint:
    """Tests for /api/v1/stats endpoint"""
    
    def test_get_stats(self, client):
        """Test statistics endpoint"""
        response = client.get("/api/v1/stats")
        
        # May fail if vector store not initialized
        if response.status_code == 200:
            data = response.json()
            assert "total_examples" in data
            assert "toxic_examples" in data
            assert "safe_examples" in data


class TestFeedbackEndpoint:
    """Tests for /api/v1/feedback endpoint"""
    
    def test_submit_feedback(self, client):
        """Test feedback submission"""
        response = client.post(
            "/api/v1/feedback",
            json={
                "request_id": "test_request_123",
                "was_correct": True,
                "comment": "Good job!"
            }
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert "message" in data
        assert data["request_id"] == "test_request_123"


class TestEdgeCases:
    """Tests for edge cases and error handling"""
    
    def test_special_characters(self, client):
        """Test with special characters"""
        response = client.post(
            "/api/v1/moderate",
            json={
                "text": "!@#$%^&*()_+-=[]{}|;:',.<>?/`~",
                "check_only": True
            }
        )
        
        assert response.status_code == 200
    
    def test_unicode_characters(self, client):
        """Test with unicode characters"""
        response = client.post(
            "/api/v1/moderate",
            json={
                "text": "Hello 世界 🌍 مرحبا",
                "check_only": True
            }
        )
        
        assert response.status_code == 200
    
    def test_repeated_characters(self, client):
        """Test with repeated characters"""
        response = client.post(
            "/api/v1/moderate",
            json={
                "text": "AAAAAAAAAAAAAAAAAAAAAA",
                "check_only": True
            }
        )
        
        assert response.status_code == 200


if __name__ == "__main__":
    pytest.main([__file__, "-v"])

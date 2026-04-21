# URBEX Quick Start Guide

This guide will help you get the URBEX Content Moderation System up and running quickly.

## Prerequisites

- Python 3.10 or higher
- OpenAI API key
- 4GB+ RAM (for embedding models)

## Step-by-Step Setup

### 1. Set up environment

```bash
# Navigate to project directory
cd urbex-content-moderation

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure environment variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your_actual_api_key_here
```

### 3. Initialize the vector database

This step creates the FAISS index with example moderation data:

```bash
# Run initialization script
python scripts/init_vectordb.py
```

Expected output:
```
Loading example data...
Loaded 55 examples (25 toxic, 30 safe)
Initializing embedding generator...
Creating vector store...
✓ Vector store initialization complete!
✓ Saved to: ./data/faiss_index
```

### 4. Start the API server

```bash
# Development mode (with auto-reload)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### 5. Verify the server is running

Open your browser and go to:
- API Documentation: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

## Basic Usage Examples

### Using cURL

**Moderate a single message:**
```bash
curl -X POST "http://localhost:8000/api/v1/moderate" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I know where you live",
    "check_only": true
  }'
```

**Batch moderation:**
```bash
curl -X POST "http://localhost:8000/api/v1/moderate/batch" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"id": "msg1", "text": "Hello friend!"},
      {"id": "msg2", "text": "You are stupid"},
      {"id": "msg3", "text": "Great work!"}
    ]
  }'
```

### Using Python

Create a file `test_api.py`:

```python
import requests

API_URL = "http://localhost:8000"

def moderate_message(text: str):
    """Moderate a single message"""
    response = requests.post(
        f"{API_URL}/api/v1/moderate",
        json={"text": text}
    )
    return response.json()

# Test with various messages
messages = [
    "Hello, how are you?",
    "I hate you",
    "Your work needs improvement",
    "I know where you live"
]

for msg in messages:
    result = moderate_message(msg)
    print(f"\nMessage: '{msg}'")
    print(f"Toxic: {result['is_toxic']}")
    print(f"Confidence: {result['confidence']:.2f}")
    print(f"Type: {result['toxicity_type']}")
    print(f"Should Block: {result['should_block']}")
    print(f"Explanation: {result['explanation']}")
```

Run it:
```bash
python test_api.py
```

### Using JavaScript/Node.js

Create a file `test_api.js`:

```javascript
const API_URL = "http://localhost:8000";

async function moderateMessage(text) {
  const response = await fetch(`${API_URL}/api/v1/moderate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return await response.json();
}

// Test
const messages = [
  "Hello, how are you?",
  "I hate you",
  "Your work needs improvement"
];

for (const msg of messages) {
  const result = await moderateMessage(msg);
  console.log(`\nMessage: '${msg}'`);
  console.log(`Toxic: ${result.is_toxic}`);
  console.log(`Confidence: ${result.confidence.toFixed(2)}`);
  console.log(`Should Block: ${result.should_block}`);
}
```

## Running Tests

```bash
# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ -v --cov=app --cov=core

# Run specific test file
pytest tests/test_api.py -v

# Run performance benchmark
python tests/benchmark.py
```

## Docker Deployment

```bash
# Build and start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## Troubleshooting

### Issue: "Vector store not found"
**Solution:** Run `python scripts/init_vectordb.py` to initialize the vector database.

### Issue: "OpenAI API key not set"
**Solution:** Make sure you've set `OPENAI_API_KEY` in your `.env` file.

### Issue: Out of memory
**Solution:** Reduce `API_WORKERS` in `.env` or use a smaller embedding model.

### Issue: Slow responses (>500ms)
**Solution:** 
- Check your OpenAI API quota
- Reduce `MAX_RETRIEVAL_DOCS` in configuration
- Consider using GPT-3.5-turbo instead of GPT-4

## Next Steps

1. **Customize Examples**: Add your own moderation examples to `data/abuse_examples.json` and `data/safe_examples.json`
2. **Adjust Thresholds**: Modify `TOXICITY_THRESHOLD` in `.env` based on your needs
3. **Integrate with Your App**: Use the API endpoints in your application
4. **Monitor Performance**: Set up metrics and logging
5. **Fine-tune**: Collect feedback and improve the system over time

## API Endpoints Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Root endpoint with service info |
| `/health` | GET | Health check |
| `/docs` | GET | Interactive API documentation |
| `/api/v1/moderate` | POST | Moderate single message |
| `/api/v1/moderate/batch` | POST | Moderate multiple messages |
| `/api/v1/feedback` | POST | Submit feedback on decisions |
| `/api/v1/stats` | GET | Get system statistics |
| `/metrics` | GET | Basic metrics |

## Support

For issues or questions:
1. Check the README.md
2. Review the API documentation at `/docs`
3. Check logs in `logs/urbex.log`
4. Review the example code in `tests/`

## Important Notes

⚠️ **Production Deployment:**
- Always use HTTPS in production
- Implement rate limiting
- Set up proper monitoring
- Use environment-specific API keys
- Enable authentication/authorization
- Regularly update dependencies

⚠️ **Privacy:**
- This system logs requests by default
- Consider privacy implications
- Implement data retention policies
- Follow applicable regulations (GDPR, CCPA, etc.)

Happy moderating! 🚀

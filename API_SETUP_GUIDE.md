# 🚀 URBEX API Setup Guide

Your content moderation system supports **multiple LLM providers**. Choose the one that works best for you!

---

## 📋 Quick Comparison

| Provider | Free Tier | Speed | Quality | Best For |
|----------|-----------|-------|---------|----------|
| **Mock Mode** | ✅ Unlimited | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ | Testing, Development |
| **Google Gemini** | ✅ 60 RPM free | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Production, Multi-modal |
| **Groq** | ✅ Limited/day | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Ultra-fast inference |
| **Together AI** | ✅ $25 credit | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Cost-effective production |
| **OpenAI** | ❌ Paid only | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | Highest quality |

---

## 🔑 Option 1: Google Gemini (Recommended - FREE)

### Get Your API Key:
1. Go to https://aistudio.google.com/apikey
2. Sign in with Google account
3. Click **"Create API Key"**
4. Copy the key

### Configure:
```bash
# In your .env file:
GEMINI_API_KEY=your_actual_gemini_key_here
GEMINI_MODEL=gemini-1.5-flash
ACTIVE_PROVIDER=gemini
USE_MOCK_MODE=false
```

### Pricing:
- **Free**: 60 requests per minute
- **Paid**: $0.000125 per 1K tokens (~$0.001 per moderation)

---

## ⚡ Option 2: Groq (Fastest - FREE Tier)

### Get Your API Key:
1. Go to https://console.groq.com/keys
2. Sign up / Log in
3. Create API key
4. Copy the key

### Configure:
```bash
# In your .env file:
GROQ_API_KEY=your_actual_groq_key_here
GROQ_MODEL=llama3-70b-8192
ACTIVE_PROVIDER=groq
USE_MOCK_MODE=false
```

### Pricing:
- **Free**: Limited requests per day
- **Paid**: ~$0.05 per 1M tokens (extremely cheap!)

---

## 🌟 Option 3: Together AI ($25 FREE Credit)

### Get Your API Key:
1. Go to https://api.together.ai/
2. Sign up
3. Get $25 free credit
4. Copy API key from dashboard

### Configure:
```bash
# In your .env file:
TOGETHER_API_KEY=your_actual_together_key_here
TOGETHER_MODEL=meta-llama/Llama-3-70b-chat-hf
ACTIVE_PROVIDER=together
USE_MOCK_MODE=false
```

### Pricing:
- **Free**: $25 credit on signup
- **Paid**: Very cheap open-source models

---

## 🔒 Option 4: OpenAI (Paid)

### Get Your API Key:
1. Go to https://platform.openai.com/api-keys
2. Add credits (minimum $5)
3. Create API key

### Configure:
```bash
# In your .env file:
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
ACTIVE_PROVIDER=openai
USE_MOCK_MODE=false
```

### Pricing:
- **Pay-as-you-go**: ~$0.01-0.03 per moderation
- **No free tier**

---

## 🎭 Option 5: Mock Mode (FREE - No API Key)

Perfect for testing and development!

### Configure:
```bash
# In your .env file:
ACTIVE_PROVIDER=mock
USE_MOCK_MODE=true
```

### Features:
- ✅ Rule-based toxicity detection
- ✅ Semantic similarity matching
- ✅ No API costs
- ✅ Unlimited requests
- ⚠️ Less accurate than LLM-based

---

## 🔄 Switching Between Providers

1. Edit `.env` file
2. Change `ACTIVE_PROVIDER` to: `mock`, `gemini`, `groq`, `together`, or `openai`
3. Set the corresponding API key
4. Set `USE_MOCK_MODE=false` (unless using mock)
5. Restart the server

```bash
# Restart command:
python -c "from app.main import app; import uvicorn; uvicorn.run(app, host='0.0.0.0', port=8000)"
```

---

## ✅ Verify Setup

After restarting, check the logs:
```
🔄 Loading Google Gemini agent: gemini-1.5-flash...
✅ Gemini moderation agent loaded: gemini-1.5-flash
✅ Application startup complete
```

Test the API:
```bash
curl http://localhost:8000/health
curl -X POST http://localhost:8000/api/v1/moderate \
  -H "Content-Type: application/json" \
  -d '{"text": "Test message"}'
```

---

## 💡 My Recommendation

**For Development**: Start with **Mock Mode** (free, instant)

**For Production**: 
- Budget option: **Groq** or **Together AI**
- Quality option: **Google Gemini** or **OpenAI GPT-4**

---

## 📞 Getting Help

If you have issues:
1. Check server logs for error messages
2. Verify API key is correct (no extra spaces)
3. Ensure you have credits/quota remaining
4. Check provider status pages for outages

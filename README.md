# 🛡️ URBEX: Advanced Context-Aware Moderation

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-Enabled-FFEE00?style=for-the-badge&logo=chainlink&logoColor=black)
![FAISS](https://img.shields.io/badge/FAISS-Vector_Store-0052CC?style=for-the-badge)
![OpenAI](https://img.shields.io/badge/GPT--4-Context_Aware-412991?style=for-the-badge&logo=openai&logoColor=white)

URBEX is a production-grade, RAG-augmented content moderation system designed to detect toxicity with semantic understanding. Unlike traditional keyword filters, URBEX understands **intent**, **nuance**, and **context**.

## 🚀 "Pro" Gatekeeper Features

### 1. ⚡ Tiered Filtering (Fast Path)
Reduces latency and costs by bypasssing the LLM for near-identical matches (>92% similarity) found in the local vector store.
*   **Latency:** ~10ms for known patterns.

### 2. 🧠 Contextual Memory
Analyzes the current message in the context of recent conversation history.
*   **Example:** Detects threats that are only visible when looking at previous messages.

### 3. 🔄 Active Learning Loop
A self-healing system that learns from human feedback. Incorrect predictions are automatically re-embedded into the vector store to prevent future errors.

### 4. 🔐 Enterprise Security
*   **API Key Auth:** Secure endpoints with `X-API-Key` validation.
*   **Persistent Logging:** Full audit trail of all moderation decisions in SQLAlchemy/SQLite.

---

## 🛠️ Tech Stack

*   **Core:** FastAPI, Pydantic v2, Python 3.12
*   **AI/RAG:** LangChain, FAISS, Sentence-Transformers (all-MiniLM-L6-v2)
*   **Providers:** Support for OpenAI, Google Gemini, and Groq
*   **Database:** SQLAlchemy (SQLite for logs/feedback)
*   **Frontend:** Bootstrap 5, Async JS

---

## 📡 API Reference

### Moderate Content
`POST /api/v1/moderate`

**Headers:**
`X-API-Key: your_secret_key`

**Body:**
```json
{
  "text": "I'm coming over now.",
  "history": [
    {"role": "user", "content": "I know where you live."},
    {"role": "user", "content": "I have a weapon."}
  ]
}
```

### Submit Feedback
`POST /api/v1/feedback`
Used to correct the system and trigger the **Active Learning Loop**.

---

## 🚦 Getting Started

1.  **Clone & Install:**
    ```bash
    pip install -r requirements.txt
    ```

2.  **Initialize Knowledge Base:**
    ```bash
    python scripts/init_vectordb.py
    ```

3.  **Run with Uvicorn:**
    ```bash
    uvicorn app.main:app --reload
    ```

4.  **Promote Learning:**
    Run this periodically to sync human feedback into the AI's memory:
    ```bash
    python scripts/promote_feedback.py
    ```

---

## 🧪 CI/CD Pipeline
The project includes a GitHub Actions workflow that:
1.  Lints code with **Flake8**.
2.  Runs security audits.
3.  Executes unit tests with **PyTest**.

---

### 2. 📊 Admin Monitoring Dashboard
A comprehensive UI for platform owners to visualize system performance.
*   **Real-time Analytics:** Track toxicity trends over time.
*   **Audit Logs:** Review every moderation decision with its semantic explanation.
*   **Access:** Available at `/admin` (requires API Key).

### 3. 🖼️ Multi-Modal Moderation (Vision)
Advanced safety for visual content using Gemini 1.5 Flash and GPT-4o.
*   **Image Analysis:** Detect prohibited visual content, NSFW, and text-in-image threats.
*   **Unified API:** Send text, images, or both for a single, context-aware decision.
*   **Frontend Integration:** Built-in image upload and preview in the live demo.

### 4. 🐳 Run with Docker

The easiest way to deploy URBEX in production:
```bash
docker-compose up -d --build
```
This will spin up the FastAPI service and a Redis cache for optimized performance.

---

**Built with ❤️ for safer digital communities.**

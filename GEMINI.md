# URBEX: Technical Architecture & Standards

## 🏛️ System Architecture
URBEX is a RAG-augmented moderation service built on FastAPI.

### Core Patterns
1.  **Tiered Filtering:** Always check the FAISS Vector Store first. If similarity > 0.92, bypass the LLM (Fast Path).
2.  **Contextual Analysis:** Moderation requests accept a `history` array to analyze conversation intent.
3.  **Multi-Modal Pipeline:** Supports `image_data` (Base64) for visual threat detection via Gemini/GPT-4o.
4.  **Active Learning:** User feedback triggers a re-embedding cycle via `scripts/promote_feedback.py`.

## 🛡️ Coding Standards
- **Validation:** Use Pydantic v2 `field_validator` and `model_dump()`.
- **Database:** Use SQLAlchemy 2.0 `declarative_base` from `sqlalchemy.orm`.
- **Time:** Always use timezone-aware UTC datetimes (`datetime.now(timezone.utc)`).
- **Security:** All `/api/v1/` routes require an `X-API-Key` header.

## 🐳 Deployment
- **Containerization:** Always maintain the `Dockerfile` and `docker-compose.yml`.
- **Caching:** Use Redis for frequent query deduplication.

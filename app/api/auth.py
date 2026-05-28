"""
Authentication dependencies for URBEX API
"""
from fastapi import Header, HTTPException, status
from app.config import settings

async def verify_api_key(x_api_key: str = Header(None)):
    """
    Verify the API key provided in the header
    """
    # Skip auth if api_key is empty (not recommended for production)
    if not settings.api_key:
        return
        
    if x_api_key != settings.api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API Key",
            headers={"WWW-Authenticate": "ApiKey"},
        )
    return x_api_key

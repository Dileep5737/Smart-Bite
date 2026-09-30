import hashlib
import hmac
import base64
import json
import time
from app.core.config import settings

def hash_password(password: str) -> str:
    """Hash password using PBKDF2 HMAC SHA-256 with salt."""
    salt = settings.SECRET_KEY[:16].encode('utf-8')
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return base64.b64encode(key).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password matches hash."""
    return hash_password(plain_password) == hashed_password

def create_access_token(data: dict) -> str:
    """Create a lightweight signed token for demo session."""
    payload = data.copy()
    payload["exp"] = time.time() + (settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60)
    payload_bytes = json.dumps(payload, sort_keys=True).encode('utf-8')
    encoded_payload = base64.urlsafe_b64encode(payload_bytes).decode('utf-8')
    
    signature = hmac.new(
        settings.SECRET_KEY.encode('utf-8'),
        encoded_payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return f"{encoded_payload}.{signature}"

def decode_access_token(token: str) -> dict | None:
    """Decode and verify signed token."""
    try:
        parts = token.split(".")
        if len(parts) != 2:
            return None
        encoded_payload, signature = parts
        expected_sig = hmac.new(
            settings.SECRET_KEY.encode('utf-8'),
            encoded_payload.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        if not hmac.compare_digest(signature, expected_sig):
            return None
            
        payload_bytes = base64.urlsafe_b64decode(encoded_payload.encode('utf-8'))
        payload = json.loads(payload_bytes.decode('utf-8'))
        if payload.get("exp", 0) < time.time():
            return None
        return payload
    except Exception:
        return None

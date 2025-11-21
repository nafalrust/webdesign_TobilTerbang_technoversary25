"""
Authentication utilities and middleware
"""
from functools import wraps
from flask import request, jsonify
import jwt
from app.config import Config
from app.supabase_client import get_supabase_client

def verify_token(token: str) -> dict:
    """
    Verify JWT token from Supabase
    
    Args:
        token: JWT token string
        
    Returns:
        Decoded token payload
        
    Raises:
        Exception: If token is invalid
    """
    try:
        # Verify with Supabase
        supabase = get_supabase_client()
        user = supabase.auth.get_user(token)
        return user
    except Exception as e:
        raise Exception(f"Invalid token: {str(e)}")

def get_token_from_header() -> str:
    """
    Extract token from Authorization header
    
    Returns:
        Token string
        
    Raises:
        Exception: If token is missing or invalid format
    """
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        raise Exception("Authorization header missing")
    
    parts = auth_header.split()
    
    if len(parts) != 2 or parts[0].lower() != 'bearer':
        raise Exception("Invalid authorization header format. Expected: Bearer <token>")
    
    return parts[1]

def require_auth(f):
    """
    Decorator to require authentication for routes
    
    Usage:
        @app.route('/protected')
        @require_auth
        def protected_route():
            return jsonify({"message": "This is protected"})
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            token = get_token_from_header()
            user = verify_token(token)
            
            # Add user to request context
            request.user = user
            
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({
                "error": "Unauthorized",
                "message": str(e)
            }), 401
    
    return decorated_function

def get_current_user():
    """
    Get current authenticated user from request context
    
    Returns:
        User object or None
    """
    return getattr(request, 'user', None)

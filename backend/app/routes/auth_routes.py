"""
Authentication routes
"""
from flask import Blueprint, request, jsonify
from app.supabase_client import get_supabase_client
from app.auth import require_auth, get_current_user

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/signup', methods=['POST'])
def signup():
    """
    Register a new user
    
    Request body:
        {
            "email": "user@example.com",
            "password": "password123",
            "full_name": "John Doe" (optional)
        }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        email = data.get('email')
        password = data.get('password')
        full_name = data.get('full_name', '')
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        supabase = get_supabase_client()
        
        # Sign up user
        response = supabase.auth.sign_up({
            "email": email,
            "password": password,
            "options": {
                "data": {
                    "full_name": full_name
                }
            }
        })
        
        return jsonify({
            "message": "User registered successfully",
            "user": response.user.model_dump() if response.user else None,
            "session": response.session.model_dump() if response.session else None
        }), 201
        
    except Exception as e:
        return jsonify({
            "error": "Registration failed",
            "message": str(e)
        }), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Login user
    
    Request body:
        {
            "email": "user@example.com",
            "password": "password123"
        }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        supabase = get_supabase_client()
        
        # Sign in user
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        return jsonify({
            "message": "Login successful",
            "user": response.user.model_dump() if response.user else None,
            "session": response.session.model_dump() if response.session else None,
            "access_token": response.session.access_token if response.session else None
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Login failed",
            "message": str(e)
        }), 401

@auth_bp.route('/logout', methods=['POST'])
@require_auth
def logout():
    """
    Logout user (requires authentication)
    """
    try:
        supabase = get_supabase_client()
        supabase.auth.sign_out()
        
        return jsonify({
            "message": "Logout successful"
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Logout failed",
            "message": str(e)
        }), 400

@auth_bp.route('/me', methods=['GET'])
@require_auth
def get_user_profile():
    """
    Get current user profile (requires authentication)
    """
    try:
        user = get_current_user()
        
        return jsonify({
            "user": user.user.model_dump() if user and user.user else None
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to get user profile",
            "message": str(e)
        }), 400

@auth_bp.route('/refresh', methods=['POST'])
def refresh_token():
    """
    Refresh access token
    
    Request body:
        {
            "refresh_token": "refresh_token_here"
        }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        refresh_token = data.get('refresh_token')
        
        if not refresh_token:
            return jsonify({"error": "Refresh token is required"}), 400
        
        supabase = get_supabase_client()
        
        # Refresh session
        response = supabase.auth.refresh_session(refresh_token)
        
        return jsonify({
            "message": "Token refreshed successfully",
            "session": response.session.model_dump() if response.session else None,
            "access_token": response.session.access_token if response.session else None
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Token refresh failed",
            "message": str(e)
        }), 401

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    """
    Send password reset email
    
    Request body:
        {
            "email": "user@example.com"
        }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        email = data.get('email')
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
        
        supabase = get_supabase_client()
        
        # Send password reset email
        supabase.auth.reset_password_email(email)
        
        return jsonify({
            "message": "Password reset email sent"
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Password reset failed",
            "message": str(e)
        }), 400

@auth_bp.route('/update-password', methods=['POST'])
@require_auth
def update_password():
    """
    Update user password (requires authentication)
    
    Request body:
        {
            "new_password": "newpassword123"
        }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is required"}), 400
        
        new_password = data.get('new_password')
        
        if not new_password:
            return jsonify({"error": "New password is required"}), 400
        
        supabase = get_supabase_client()
        
        # Update password
        response = supabase.auth.update_user({
            "password": new_password
        })
        
        return jsonify({
            "message": "Password updated successfully",
            "user": response.user.model_dump() if response.user else None
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Password update failed",
            "message": str(e)
        }), 400

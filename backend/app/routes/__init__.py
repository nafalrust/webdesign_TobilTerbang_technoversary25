"""
Routes package initialization
"""
from app.routes.auth_routes import auth_bp
from app.routes.db_routes import db_bp

# Export all blueprints
__all__ = ['auth_bp', 'db_bp']

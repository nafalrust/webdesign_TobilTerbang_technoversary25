"""
Supabase client initialization and utilities
"""
from supabase import create_client, Client
from app.config import Config

# Initialize Supabase client
supabase: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)

# Initialize Supabase client with service role (for admin operations)
supabase_admin: Client = None
if Config.SUPABASE_SERVICE_KEY:
    supabase_admin = create_client(Config.SUPABASE_URL, Config.SUPABASE_SERVICE_KEY)

def get_supabase_client() -> Client:
    """Get Supabase client instance"""
    return supabase

def get_supabase_admin() -> Client:
    """Get Supabase admin client instance"""
    if not supabase_admin:
        raise ValueError("Supabase service key not configured")
    return supabase_admin

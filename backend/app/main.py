"""
Technoversary Backend - Simple Version
Hanya 4 fungsi: Signup, Login, Simpan Data, Ambil Data
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client
import os
from dotenv import load_dotenv

# Load environment
load_dotenv()

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Initialize Supabase
supabase = create_client(
    os.getenv('SUPABASE_URL'),
    os.getenv('SUPABASE_KEY')
)

# ============================================
# AUTHENTICATION
# ============================================

@app.route('/api/signup', methods=['POST'])
def signup():
    """Register user baru"""
    data = request.json
    try:
        response = supabase.auth.sign_up({
            "email": data['email'],
            "password": data['password']
        })
        return jsonify({
            "success": True,
            "user": response.user.model_dump() if response.user else None,
            "message": "Registrasi berhasil"
        }), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route('/api/login', methods=['POST'])
def login():
    """Login user"""
    data = request.json
    try:
        response = supabase.auth.sign_in_with_password({
            "email": data['email'],
            "password": data['password']
        })
        return jsonify({
            "success": True,
            "token": response.session.access_token,
            "user": response.user.model_dump() if response.user else None,
            "message": "Login berhasil"
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 401

# ============================================
# DATABASE
# ============================================

@app.route('/api/data/<table_name>', methods=['POST'])
def save_data(table_name):
    """Simpan data ke tabel"""
    data = request.json
    try:
        response = supabase.table(table_name).insert(data).execute()
        return jsonify({
            "success": True,
            "data": response.data,
            "message": "Data berhasil disimpan"
        }), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route('/api/data/<table_name>', methods=['GET'])
def get_data(table_name):
    """Ambil semua data dari tabel"""
    try:
        response = supabase.table(table_name).select('*').execute()
        return jsonify({
            "success": True,
            "data": response.data,
            "count": len(response.data)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

# ============================================
# HEALTH CHECK
# ============================================

@app.route('/')
def home():
    return jsonify({
        "message": "Technoversary Backend API - Simple Version",
        "endpoints": {
            "signup": "POST /api/signup",
            "login": "POST /api/login",
            "save_data": "POST /api/data/<table_name>",
            "get_data": "GET /api/data/<table_name>"
        }
    })

if __name__ == '__main__':
    # Get port from environment (Railway sets PORT automatically)
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)

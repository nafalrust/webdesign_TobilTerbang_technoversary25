# Technoversary Backend API

Backend Flask untuk aplikasi Technoversary dengan integrasi Supabase dan autentikasi.

## 🚀 Features

- ✅ Autentikasi user (Sign up, Login, Logout)
- ✅ Integrasi Supabase
- ✅ JWT Token Management
- ✅ Password Reset
- ✅ Protected Routes dengan Decorator
- ✅ CORS Support
- ✅ Error Handling
- ✅ Health Check Endpoints

## 📋 Prerequisites

- Python 3.8+
- Supabase Account
- pip atau virtualenv

## 🛠️ Installation

1. **Clone repository dan masuk ke folder backend:**
   ```bash
   cd backend
   ```

2. **Buat virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # atau
   venv\Scripts\activate  # Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit file `.env` dan isi dengan kredensial Supabase Anda:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-key
   SUPABASE_SERVICE_KEY=your-service-role-key  # Optional
   SECRET_KEY=your-secret-key
   JWT_SECRET_KEY=your-jwt-secret
   ```

## 🏃 Running the Application

### Development Mode
```bash
python -m app.main
```

atau

```bash
flask --app app.main run --debug
```

### Production Mode
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app.main:app
```

Server akan berjalan di `http://localhost:5000`

## 📡 API Endpoints

### Health Check
- `GET /` - Info API
- `GET /api/health` - Health check status

### Authentication
- `POST /api/auth/signup` - Register user baru
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (requires auth)
- `GET /api/auth/me` - Get user profile (requires auth)
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/reset-password` - Request password reset
- `POST /api/auth/update-password` - Update password (requires auth)

## 📝 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "full_name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get User Profile (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🔒 Protected Routes

Untuk membuat route yang memerlukan autentikasi, gunakan decorator `@require_auth`:

```python
from app.auth import require_auth, get_current_user

@app.route('/protected')
@require_auth
def protected_route():
    user = get_current_user()
    return jsonify({"message": "This is protected", "user": user})
```

## 🐳 Docker Support

Build dan run dengan Docker:

```bash
docker build -t technoversary-backend .
docker run -p 5000:5000 --env-file .env technoversary-backend
```

## 📂 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Entry point
│   ├── config.py            # Configuration
│   ├── auth.py              # Auth utilities & middleware
│   ├── supabase_client.py   # Supabase client
│   └── routes/
│       ├── __init__.py
│       └── auth_routes.py   # Authentication routes
├── .env.example
├── .gitignore
├── Dockerfile
├── requirements.txt
└── README.md
```

## 🔧 Configuration

Semua konfigurasi diatur melalui environment variables di file `.env`:

- `SUPABASE_URL` - URL Supabase project Anda
- `SUPABASE_KEY` - Anon/public key dari Supabase
- `SUPABASE_SERVICE_KEY` - Service role key (optional, untuk admin operations)
- `SECRET_KEY` - Flask secret key
- `JWT_SECRET_KEY` - JWT secret key
- `CORS_ORIGINS` - Allowed CORS origins (comma-separated)

## 🧪 Testing

Jalankan tests (jika ada):
```bash
pytest
```

## 📚 Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Supabase Python Documentation](https://supabase.com/docs/reference/python)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

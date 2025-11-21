# API Documentation - Technoversary Backend

## Base URL
```
http://localhost:5000
```

## Authentication
Semua endpoint yang memerlukan autentikasi harus menyertakan header:
```
Authorization: Bearer <access_token>
```

---

## Endpoints

### 1. Health Check

#### GET /
Mendapatkan informasi API

**Response:**
```json
{
  "message": "Technoversary Backend API",
  "status": "running",
  "version": "1.0.0"
}
```

#### GET /api/health
Cek status kesehatan API

**Response:**
```json
{
  "status": "healthy",
  "supabase_connected": true
}
```

---

### 2. Authentication Endpoints

#### POST /api/auth/signup
Registrasi user baru

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "full_name": "John Doe"
    }
  },
  "session": {
    "access_token": "...",
    "refresh_token": "...",
    "expires_in": 3600
  }
}
```

#### POST /api/auth/login
Login user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "...",
    "refresh_token": "...",
    "expires_in": 3600
  },
  "access_token": "..."
}
```

#### POST /api/auth/logout
Logout user (requires authentication)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

#### GET /api/auth/me
Mendapatkan profil user yang sedang login (requires authentication)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "full_name": "John Doe"
    },
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### POST /api/auth/refresh
Refresh access token

**Request Body:**
```json
{
  "refresh_token": "refresh_token_here"
}
```

**Response (200 OK):**
```json
{
  "message": "Token refreshed successfully",
  "session": {
    "access_token": "...",
    "refresh_token": "...",
    "expires_in": 3600
  },
  "access_token": "..."
}
```

#### POST /api/auth/reset-password
Request password reset email

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "Password reset email sent"
}
```

#### POST /api/auth/update-password
Update password (requires authentication)

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "new_password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Password updated successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

---

### 3. Database Endpoints (CRUD Operations)

Semua endpoint database memerlukan autentikasi.

#### GET /api/db/<table_name>
Mendapatkan semua record dari tabel

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `limit` (optional): Jumlah maksimal hasil
- `offset` (optional): Offset untuk pagination
- `order` (optional): Kolom untuk sorting
- `ascending` (optional): true/false untuk arah sorting

**Example:**
```
GET /api/db/items?limit=10&order=created_at&ascending=false
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Item 1",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "count": 1
}
```

#### GET /api/db/<table_name>/<record_id>
Mendapatkan single record by ID

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "data": {
    "id": "uuid",
    "name": "Item 1",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### POST /api/db/<table_name>
Membuat record baru

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "name": "New Item",
  "description": "Item description",
  "status": "active"
}
```

**Response (201 Created):**
```json
{
  "message": "Record created successfully",
  "data": [
    {
      "id": "uuid",
      "name": "New Item",
      "description": "Item description",
      "status": "active",
      "user_id": "uuid",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### PUT/PATCH /api/db/<table_name>/<record_id>
Update record yang sudah ada

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "name": "Updated Item",
  "status": "inactive"
}
```

**Response (200 OK):**
```json
{
  "message": "Record updated successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Updated Item",
      "status": "inactive",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### DELETE /api/db/<table_name>/<record_id>
Hapus record

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "message": "Record deleted successfully",
  "data": []
}
```

#### POST /api/db/<table_name>/search
Search records dengan filter

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "filters": [
    {
      "column": "status",
      "operator": "eq",
      "value": "active"
    },
    {
      "column": "created_at",
      "operator": "gte",
      "value": "2024-01-01"
    }
  ],
  "limit": 10,
  "order": "created_at",
  "ascending": false
}
```

**Supported operators:**
- `eq`: Equal (=)
- `neq`: Not equal (!=)
- `gt`: Greater than (>)
- `gte`: Greater than or equal (>=)
- `lt`: Less than (<)
- `lte`: Less than or equal (<=)
- `like`: Pattern matching (case-sensitive)
- `ilike`: Pattern matching (case-insensitive)
- `in`: In array

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Item 1",
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "count": 1
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authorization header missing"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "The requested resource was not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Example Usage with cURL

### Signup
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

### Create Record
```bash
curl -X POST http://localhost:5000/api/db/items \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Item",
    "description": "Item description"
  }'
```

### Get All Records
```bash
curl -X GET "http://localhost:5000/api/db/items?limit=10&order=created_at" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Example Usage with Python

```python
import requests

BASE_URL = "http://localhost:5000"

# Login
response = requests.post(f"{BASE_URL}/api/auth/login", json={
    "email": "user@example.com",
    "password": "password123"
})
token = response.json()["access_token"]

# Get user profile
headers = {"Authorization": f"Bearer {token}"}
response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
print(response.json())

# Create record
response = requests.post(
    f"{BASE_URL}/api/db/items",
    headers=headers,
    json={"name": "New Item", "description": "Description"}
)
print(response.json())
```

---

## Example Usage with JavaScript (Fetch)

```javascript
const BASE_URL = "http://localhost:5000";

// Login
async function login() {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "user@example.com",
      password: "password123",
    }),
  });
  const data = await response.json();
  return data.access_token;
}

// Get user profile
async function getUserProfile(token) {
  const response = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

// Create record
async function createRecord(token, data) {
  const response = await fetch(`${BASE_URL}/api/db/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

// Usage
(async () => {
  const token = await login();
  const profile = await getUserProfile(token);
  console.log(profile);
  
  const newItem = await createRecord(token, {
    name: "New Item",
    description: "Description",
  });
  console.log(newItem);
})();
```

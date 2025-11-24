# Dokumentasi API Backend - Integrasi Frontend

Backend URL: 
- **Development**: `http://localhost:5000`
- **Production (Hugging Face Spaces)**: `https://nafalrust-technoversary.hf.space`

---

## 📋 Daftar Endpoint

1. [Health Check](#1-health-check)
2. [Signup - Registrasi User](#2-signup---registrasi-user)
3. [Login - Autentikasi User](#3-login---autentikasi-user)
4. [Save Data - Simpan Data ke Database](#4-save-data---simpan-data-ke-database)
5. [Get Data - Ambil Data dari Database](#5-get-data---ambil-data-dari-database)
6. [Detect Tumbler - Computer Vision](#6-detect-tumbler---computer-vision)

---

## 1. Health Check

### Endpoint
```
GET /
```

### Tujuan
Cek status backend dan melihat daftar endpoint yang tersedia.

### Request Frontend
**Method**: `GET`

**Headers**: Tidak perlu

**Body**: Tidak ada

### Response
```json
{
  "message": "Technoversary Backend API - Simple Version",
  "endpoints": {
    "signup": "POST /api/signup",
    "login": "POST /api/login",
    "save_data": "POST /api/data/<table_name>",
    "get_data": "GET /api/data/<table_name>",
    "tumbler_detect": "POST /api/tumbler/detect"
  }
}
```

### Contoh Kode Frontend

**JavaScript/Fetch:**
```javascript
async function checkBackend() {
  try {
    const response = await fetch('http://localhost:5000/');
    const data = await response.json();
    console.log('Backend aktif:', data.message);
  } catch (error) {
    console.error('Backend error:', error);
  }
}
```

**React:**
```jsx
import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => setStatus(data.message));
  }, []);

  return <div>{status || 'Loading...'}</div>;
}
```

---

## 2. Signup - Registrasi User

### Endpoint
```
POST /api/signup
```

### Tujuan
Mendaftarkan user baru ke database Supabase. Email akan diverifikasi melalui link yang dikirim ke email user.

### Request Frontend
**Method**: `POST`

**Headers**:
```
Content-Type: application/json
```

**Body** (JSON):
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response Success
**Status**: `201 Created`
```json
{
  "success": true,
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "created_at": "2025-11-24T...",
    ...
  },
  "message": "Registrasi berhasil"
}
```

### Response Error
**Status**: `400 Bad Request`
```json
{
  "success": false,
  "error": "User already registered"
}
```

### Contoh Kode Frontend

**JavaScript/Fetch:**
```javascript
async function signup(email, password) {
  try {
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Signup berhasil:', data.user);
      alert('Cek email untuk verifikasi!');
    } else {
      console.error('Signup gagal:', data.error);
      alert(data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Usage
signup('user@example.com', 'password123');
```

**React Form:**
```jsx
import { useState } from 'react';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Registrasi berhasil! Cek email Anda.');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

### Catatan Penting
- Password minimal 6 karakter (Supabase default)
- Email harus valid dan unique
- User akan menerima email verifikasi dari Supabase
- User object bisa `null` jika email confirmation required

---

## 3. Login - Autentikasi User

### Endpoint
```
POST /api/login
```

### Tujuan
Login user dengan email dan password. Mendapatkan access token untuk request yang membutuhkan autentikasi.

### Request Frontend
**Method**: `POST`

**Headers**:
```
Content-Type: application/json
```

**Body** (JSON):
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response Success
**Status**: `200 OK`
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "created_at": "2025-11-24T..."
  },
  "message": "Login berhasil"
}
```

### Response Error
**Status**: `401 Unauthorized`
```json
{
  "success": false,
  "error": "Invalid login credentials"
}
```

### Contoh Kode Frontend

**JavaScript/Fetch:**
```javascript
async function login(email, password) {
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (data.success) {
      // Simpan token ke localStorage
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      console.log('Login berhasil:', data.user);
      // Redirect ke dashboard
      window.location.href = '/dashboard';
    } else {
      alert(`Login gagal: ${data.error}`);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Usage
login('user@example.com', 'password123');
```

**React dengan Context:**
```jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (data.success) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('access_token', data.token);
      return true;
    }
    return false;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Usage dalam component
function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      alert('Login berhasil!');
    } else {
      alert('Login gagal!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Catatan Penting
- Token expires dalam 1 jam (Supabase default)
- Simpan token di localStorage atau sessionStorage
- Gunakan token untuk request yang butuh auth (belum diimplementasi di backend ini)

---

## 4. Save Data - Simpan Data ke Database

### Endpoint
```
POST /api/data/<table_name>
```

### Tujuan
Menyimpan data ke tabel tertentu di Supabase. Tabel harus sudah dibuat di Supabase Dashboard.

### Request Frontend
**Method**: `POST`

**Headers**:
```
Content-Type: application/json
```

**URL Parameter**:
- `table_name`: Nama tabel di Supabase (contoh: `users`, `products`, `submissions`)

**Body** (JSON):
```json
{
  "field1": "value1",
  "field2": "value2",
  "created_at": "2025-11-24T10:00:00Z"
}
```

### Response Success
**Status**: `201 Created`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "field1": "value1",
      "field2": "value2",
      "created_at": "2025-11-24T10:00:00Z"
    }
  ],
  "message": "Data berhasil disimpan"
}
```

### Response Error
**Status**: `400 Bad Request`
```json
{
  "success": false,
  "error": "relation \"table_name\" does not exist"
}
```

### Contoh Kode Frontend

**JavaScript - Simpan Data User:**
```javascript
async function saveUserData(name, age, city) {
  try {
    const response = await fetch('http://localhost:5000/api/data/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        age: age,
        city: city,
        created_at: new Date().toISOString()
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Data tersimpan:', data.data);
      return data.data[0];
    } else {
      console.error('Error:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}

// Usage
saveUserData('John Doe', 25, 'Jakarta');
```

**React - Form Submit Data:**
```jsx
import { useState } from 'react';

function SubmissionForm() {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    nim: '',
    fakultas: '',
    angkatan: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/data/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submitted_at: new Date().toISOString()
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Data berhasil disimpan!');
        // Reset form
        setFormData({ nama_lengkap: '', nim: '', fakultas: '', angkatan: '' });
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nama_lengkap"
        value={formData.nama_lengkap}
        onChange={handleChange}
        placeholder="Nama Lengkap"
        required
      />
      <input
        name="nim"
        value={formData.nim}
        onChange={handleChange}
        placeholder="NIM"
        required
      />
      <input
        name="fakultas"
        value={formData.fakultas}
        onChange={handleChange}
        placeholder="Fakultas"
        required
      />
      <input
        name="angkatan"
        value={formData.angkatan}
        onChange={handleChange}
        placeholder="Angkatan"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Menyimpan...' : 'Submit'}
      </button>
    </form>
  );
}
```

### Contoh Tabel di Supabase

Buat tabel `submissions` dengan struktur:
```sql
CREATE TABLE submissions (
  id BIGSERIAL PRIMARY KEY,
  nama_lengkap TEXT NOT NULL,
  nim TEXT NOT NULL,
  fakultas TEXT NOT NULL,
  angkatan TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Catatan Penting
- Tabel harus sudah dibuat di Supabase Dashboard
- Field dalam body JSON harus sesuai dengan kolom di tabel
- Auto-increment ID tidak perlu dikirim
- Gunakan ISO 8601 format untuk timestamp

---

## 5. Get Data - Ambil Data dari Database

### Endpoint
```
GET /api/data/<table_name>
```

### Tujuan
Mengambil semua data dari tabel tertentu di Supabase.

### Request Frontend
**Method**: `GET`

**Headers**: Tidak perlu

**URL Parameter**:
- `table_name`: Nama tabel di Supabase

### Response Success
**Status**: `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "field1": "value1",
      "field2": "value2"
    },
    {
      "id": 2,
      "field1": "value3",
      "field2": "value4"
    }
  ],
  "count": 2
}
```

### Response Error
**Status**: `400 Bad Request`
```json
{
  "success": false,
  "error": "relation \"table_name\" does not exist"
}
```

### Contoh Kode Frontend

**JavaScript - Fetch All Data:**
```javascript
async function getAllUsers() {
  try {
    const response = await fetch('http://localhost:5000/api/data/users');
    const data = await response.json();
    
    if (data.success) {
      console.log(`Total ${data.count} users:`, data.data);
      return data.data;
    } else {
      console.error('Error:', data.error);
      return [];
    }
  } catch (error) {
    console.error('Network error:', error);
    return [];
  }
}

// Usage
const users = await getAllUsers();
users.forEach(user => {
  console.log(user.name, user.email);
});
```

**React - Display Data List:**
```jsx
import { useEffect, useState } from 'react';

function SubmissionsList() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data/submissions');
      const result = await response.json();
      
      if (result.success) {
        setSubmissions(result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Total Submissions: {submissions.length}</h2>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>NIM</th>
            <th>Fakultas</th>
            <th>Angkatan</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(item => (
            <tr key={item.id}>
              <td>{item.nama_lengkap}</td>
              <td>{item.nim}</td>
              <td>{item.fakultas}</td>
              <td>{item.angkatan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

**React - dengan Auto-Refresh:**
```jsx
import { useEffect, useState } from 'react';

function LiveData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch pertama kali
    fetchData();
    
    // Auto-refresh setiap 5 detik
    const interval = setInterval(fetchData, 5000);
    
    // Cleanup
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/api/data/submissions');
    const result = await response.json();
    if (result.success) {
      setData(result.data);
    }
  };

  return (
    <div>
      <h3>Live Data ({data.length} items)</h3>
      {data.map(item => (
        <div key={item.id}>{item.nama_lengkap}</div>
      ))}
    </div>
  );
}
```

### Catatan Penting
- Endpoint ini return SEMUA data dari tabel (tidak ada pagination)
- Untuk data besar, pertimbangkan implementasi pagination
- Data sorted by ID ascending (default Supabase)

---

## 6. Detect Tumbler - Computer Vision

### Endpoint
```
POST /api/tumbler/detect
```

### Tujuan
Upload gambar, deteksi tumbler menggunakan Roboflow AI, dan dapatkan gambar dengan bounding box serta koordinat deteksi.

### Request Frontend
**Method**: `POST`

**Headers**:
```
Content-Type: multipart/form-data
```

**Body** (FormData):
- `file` (required): File gambar (jpg, jpeg, png)
- `model_id` (optional): Model Roboflow yang digunakan (default: `pendeteksi-tumbler/5`)

### Response Success (Tumbler Detected)
**Status**: `200 OK`
```json
{
  "success": true,
  "detected": true,
  "message": "Tumbler terdeteksi!",
  "count": 2,
  "objects": [
    {
      "class": "Tumbler",
      "confidence": 0.95,
      "bbox": {
        "x": 320,
        "y": 240,
        "width": 150,
        "height": 200
      }
    },
    {
      "class": "Tumbler",
      "confidence": 0.88,
      "bbox": {
        "x": 500,
        "y": 250,
        "width": 140,
        "height": 190
      }
    }
  ],
  "images": {
    "original_url": null,
    "bbox_url": "https://bwkjwflmaavnqaiqkdvf.supabase.co/storage/v1/object/public/TobilGambar/bbox_tumbler_xxx.jpeg",
    "bbox_base64": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
  },
  "raw_result": {
    "time": 0.015,
    "image": { "width": 640, "height": 480 },
    "predictions": [...]
  }
}
```

### Response Success (No Tumbler)
**Status**: `200 OK`
```json
{
  "success": false,
  "detected": false,
  "message": "Tidak ada tumbler terdeteksi",
  "count": 0,
  "objects": [],
  "images": {
    "original_url": null,
    "bbox_url": "https://...",
    "bbox_base64": "data:image/jpeg;base64,..."
  }
}
```

### Response Error
**Status**: `500 Internal Server Error`
```json
{
  "success": false,
  "error": "Error message"
}
```

### Contoh Kode Frontend

**JavaScript - File Upload:**
```javascript
async function detectTumbler(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  // formData.append('model_id', 'pendeteksi-tumbler/5'); // optional

  try {
    const response = await fetch('http://localhost:5000/api/tumbler/detect', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    
    if (result.success && result.detected) {
      console.log(`Terdeteksi ${result.count} tumbler!`);
      console.log('Objects:', result.objects);
      
      // Tampilkan gambar dengan bounding box
      const imgElement = document.getElementById('result-image');
      imgElement.src = result.images.bbox_base64; // atau bbox_url
      
      // Tampilkan detail deteksi
      result.objects.forEach((obj, i) => {
        console.log(`Tumbler ${i + 1}: ${(obj.confidence * 100).toFixed(2)}% confidence`);
      });
    } else {
      console.log('Tidak ada tumbler terdeteksi');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage dengan file input
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    detectTumbler(file);
  }
});
```

**React - Complete Detection Component:**
```jsx
import { useState } from 'react';

function TumblerDetector() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Preview original image
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = async () => {
    if (!selectedFile) {
      alert('Pilih gambar terlebih dahulu!');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/api/tumbler/detect', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tumbler-detector">
      <h2>Tumbler Detection</h2>
      
      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={loading}
      />
      
      {/* Preview */}
      {preview && (
        <div>
          <h3>Original Image</h3>
          <img src={preview} alt="Preview" style={{ maxWidth: '400px' }} />
        </div>
      )}
      
      {/* Detect Button */}
      <button onClick={handleDetect} disabled={loading || !selectedFile}>
        {loading ? 'Detecting...' : 'Detect Tumbler'}
      </button>
      
      {/* Result */}
      {result && (
        <div className="result">
          <h3>Result</h3>
          <p className={result.detected ? 'success' : 'warning'}>
            {result.message}
          </p>
          
          {result.detected && (
            <>
              <p>Jumlah tumbler terdeteksi: <strong>{result.count}</strong></p>
              
              {/* Detection Image with Bounding Box */}
              <div>
                <h4>Detection Result</h4>
                <img 
                  src={result.images.bbox_base64} 
                  alt="Detection result"
                  style={{ maxWidth: '100%', border: '2px solid #4CAF50' }}
                />
              </div>
              
              {/* Detection Details */}
              <div>
                <h4>Detection Details</h4>
                {result.objects.map((obj, idx) => (
                  <div key={idx} className="detection-item">
                    <p>
                      <strong>Tumbler {idx + 1}</strong>
                    </p>
                    <p>Confidence: {(obj.confidence * 100).toFixed(2)}%</p>
                    <p>Position: ({obj.bbox.x.toFixed(0)}, {obj.bbox.y.toFixed(0)})</p>
                    <p>Size: {obj.bbox.width.toFixed(0)} × {obj.bbox.height.toFixed(0)} px</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TumblerDetector;
```

**React - Drag & Drop Upload:**
```jsx
import { useState } from 'react';

function DragDropDetector() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await detectTumbler(file);
    } else {
      alert('Please drop an image file');
    }
  };

  const detectTumbler = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/tumbler/detect', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      style={{
        border: isDragging ? '3px dashed #4CAF50' : '2px dashed #ccc',
        padding: '40px',
        textAlign: 'center',
        minHeight: '200px'
      }}
    >
      {loading ? (
        <p>Detecting tumbler...</p>
      ) : result ? (
        <div>
          <p>{result.message}</p>
          {result.detected && (
            <img 
              src={result.images.bbox_base64} 
              alt="Result"
              style={{ maxWidth: '100%' }}
            />
          )}
        </div>
      ) : (
        <p>Drag & drop an image here</p>
      )}
    </div>
  );
}
```

**Next.js - API Route Handler:**
```javascript
// pages/api/detect.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const formData = new FormData();
  formData.append('file', req.body.file);

  try {
    const response = await fetch('http://localhost:5000/api/tumbler/detect', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Field Explanation

**Response Fields:**
- `success`: `true` jika ada tumbler terdeteksi, `false` jika tidak ada
- `detected`: Boolean, apakah tumbler terdeteksi
- `count`: Jumlah tumbler yang terdeteksi
- `message`: Pesan status deteksi
- `objects`: Array berisi detail setiap tumbler yang terdeteksi
  - `class`: Nama class objek (selalu "Tumbler")
  - `confidence`: Tingkat kepercayaan deteksi (0.0 - 1.0)
  - `bbox`: Koordinat bounding box
    - `x`: Center X coordinate
    - `y`: Center Y coordinate
    - `width`: Lebar bounding box
    - `height`: Tinggi bounding box
- `images`: Object berisi gambar hasil deteksi
  - `original_url`: URL gambar original (null, tidak disimpan)
  - `bbox_url`: URL publik gambar dengan bounding box dari Supabase Storage
  - `bbox_base64`: Base64 encoded image dengan bounding box (langsung bisa ditampilkan)
- `raw_result`: Raw response dari Roboflow API

### Catatan Penting
- Ukuran file maksimal: ~10MB (bisa disesuaikan)
- Format support: JPG, JPEG, PNG
- Gambar di-resize otomatis oleh Roboflow untuk inference
- Bounding box digambar dengan warna merah (width: 3px)
- Confidence threshold bisa diatur di model Roboflow
- `bbox_base64` bisa langsung digunakan di `<img src="">` tanpa request tambahan
- `bbox_url` memerlukan internet connection untuk load image

---

## 🔧 Environment Variables

### Backend (Development)

Untuk development, backend menggunakan file `.env`:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Flask
FLASK_ENV=development
FLASK_DEBUG=True

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Roboflow
ROBOFLOW_API_KEY=your-roboflow-key
```

### Backend (Production - Hugging Face Spaces)

Set environment variables di **Hugging Face Spaces Settings → Variables and secrets**:

1. Buka: https://huggingface.co/spaces/nafalrust/Technoversary/settings
2. Scroll ke **Variables and secrets**
3. Tambahkan sebagai **Secrets** (bukan Variables):
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `ROBOFLOW_API_KEY`
4. Restart Space

**⚠️ Penting**: 
- Jangan commit `.env` ke GitHub untuk keamanan
- Gunakan Secrets di Hugging Face, bukan Variables
- CORS_ORIGINS akan otomatis include domain frontend production

### Frontend Environment Variables

**Development (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Production:**
```env
NEXT_PUBLIC_API_URL=https://nafalrust-technoversary.hf.space
```

Atau buat logic auto-detect:
```javascript
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://nafalrust-technoversary.hf.space'
  : 'http://localhost:5000';
```

---

## 🌐 CORS Configuration

Backend sudah dikonfigurasi CORS untuk allow request dari:
- `http://localhost:3000` (Next.js default)
- `http://localhost:3001`

Untuk production, tambahkan domain frontend ke `CORS_ORIGINS` di environment variables.

### Setup Backend URL di Frontend

Buat environment variable untuk switch antara development dan production:

**Next.js (.env.local):**
```env
# Development
NEXT_PUBLIC_API_URL=http://localhost:5000

# Production
# NEXT_PUBLIC_API_URL=https://nafalrust-technoversary.hf.space
```

**Usage di Frontend:**
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function fetchData() {
  const response = await fetch(`${API_URL}/api/data/users`);
  return response.json();
}
```

**React/Vite (.env):**
```env
# Development
VITE_API_URL=http://localhost:5000

# Production
# VITE_API_URL=https://nafalrust-technoversary.hf.space
```

**Usage:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

---

## 🚨 Error Handling

Semua endpoint menggunakan format error yang konsisten:

```json
{
  "success": false,
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200 OK`: Request berhasil
- `201 Created`: Data berhasil dibuat
- `400 Bad Request`: Invalid request (missing fields, validation error)
- `401 Unauthorized`: Authentication failed
- `500 Internal Server Error`: Server error

**Best Practice Error Handling:**
```javascript
async function apiCall() {
  try {
    const response = await fetch('http://localhost:5000/api/endpoint');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    if (!data.success) {
      console.error('API error:', data.error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}
```

---

## 📦 Testing dengan curl

**Health Check:**
```bash
curl http://localhost:5000/
```

**Signup:**
```bash
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Save Data:**
```bash
curl -X POST http://localhost:5000/api/data/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","age":25,"city":"Jakarta"}'
```

**Get Data:**
```bash
curl http://localhost:5000/api/data/users
```

**Detect Tumbler:**
```bash
curl -X POST http://localhost:5000/api/tumbler/detect \
  -F "file=@/path/to/image.jpg"
```

---

## 🎨 Frontend Integration Checklist

- [ ] Setup base URL untuk API calls (gunakan environment variable)
- [ ] Implement error handling untuk network errors
- [ ] Implement loading states untuk semua API calls
- [ ] Store auth token di localStorage/sessionStorage
- [ ] Setup CORS di backend untuk domain production
- [ ] Implement retry logic untuk failed requests (optional)
- [ ] Add request timeout handling
- [ ] Validate file size & type sebelum upload (untuk tumbler detection)
- [ ] Display user-friendly error messages
- [ ] Implement success notifications/toasts

---

## 📚 Additional Resources

- [Supabase JavaScript Client Docs](https://supabase.com/docs/reference/javascript)
- [Roboflow Inference API Docs](https://docs.roboflow.com/inference)
- [Flask CORS Documentation](https://flask-cors.readthedocs.io/)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

---

**Last Updated**: November 24, 2025  
**Backend Version**: 1.0.0  
**Backend Deployment**: Hugging Face Spaces (Docker)  
**API Base URL**: 
- Development: `http://localhost:5000`
- Production: `https://nafalrust-technoversary.hf.space`

---

## 🚀 Deployment Notes

### Hugging Face Spaces Backend

Backend sudah di-deploy ke Hugging Face Spaces dengan konfigurasi:
- **Space**: https://huggingface.co/spaces/nafalrust/Technoversary
- **SDK**: Docker
- **Port**: 7860 (HF Spaces default)
- **Auto-deploy**: Push ke folder `backend/` untuk trigger rebuild

### Update Backend di HF Spaces

```bash
cd backend
git add .
git commit -m "Update backend"
git push hf main
```

Space akan otomatis rebuild dan restart (1-2 menit).

### Monitoring Backend

- **Status**: https://huggingface.co/spaces/nafalrust/Technoversary
- **Logs**: Klik tab "Logs" di HF Spaces
- **Health Check**: https://nafalrust-technoversary.hf.space/

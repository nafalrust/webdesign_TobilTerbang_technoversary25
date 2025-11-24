# Authentication System - EcoQuest

## Overview
Sistem autentikasi yang terintegrasi dengan backend API untuk login dan signup user.

## Fitur
- ✅ Login dengan email dan password
- ✅ Sign up (registrasi) user baru dengan nama lengkap, email, dan password
- ✅ Toggle antara mode Login dan Sign Up
- ✅ Tampilan yang konsisten dengan desain GameTransition
- ✅ Auto-redirect ke home page setelah berhasil login/signup
- ✅ Tombol Logout yang muncul di navbar ketika user sudah login
- ✅ Penyimpanan token di localStorage
- ✅ Menampilkan email user di navbar

## Cara Menggunakan

### 1. Setup Backend
Pastikan backend API sudah berjalan di `http://localhost:5000` (atau sesuaikan URL di `.env.local`)

### 2. Setup Frontend
```bash
cd frontend
# Copy file environment
cp .env.example .env.local

# Install dependencies (jika belum)
npm install

# Jalankan development server
npm run dev
```

### 3. Konfigurasi API URL
Edit file `.env.local` dan sesuaikan URL backend jika berbeda:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Flow Penggunaan

### Sign Up (Registrasi)
1. Klik tombol "Login" di navbar
2. Halaman auth akan muncul dengan form login default
3. Klik "Daftar sekarang" untuk beralih ke form sign up
4. Isi:
   - Nama Lengkap
   - Email
   - Password
5. Klik tombol "Daftar"
6. Setelah berhasil, user akan otomatis login dan diarahkan ke home page
7. Email user akan muncul di navbar dengan tombol Logout

### Login
1. Klik tombol "Login" di navbar
2. Isi email dan password
3. Klik tombol "Masuk"
4. Setelah berhasil, user diarahkan ke home page
5. Email user akan muncul di navbar dengan tombol Logout

### Logout
1. Klik tombol "Logout" di navbar
2. User akan logout dan token dihapus dari localStorage
3. Tampilan kembali ke state awal (tombol Login muncul)

## Struktur File

### Frontend
```
frontend/
├── src/
│   ├── app/
│   │   └── page.js              # Main app dengan state management
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.js        # Navbar dengan tombol Login/Logout
│   │   └── pages/
│   │       └── AuthPage.js      # Halaman Login/Sign Up
│   └── lib/
│       └── authService.js       # Service untuk komunikasi dengan backend API
└── .env.local                   # Konfigurasi environment
```

### Backend API Endpoints
- `POST /api/auth/signup` - Registrasi user baru
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get user profile

## Authentication Service API

### `authService.login(email, password)`
Login user dengan email dan password

**Returns:**
```javascript
{
  success: true,
  user: { id, email, ... },
  token: "access_token"
}
```

### `authService.signup(email, password, fullName)`
Registrasi user baru

**Returns:**
```javascript
{
  success: true,
  user: { id, email, ... },
  token: "access_token"
}
```

### `authService.logout()`
Logout user dan hapus token

**Returns:**
```javascript
{
  success: true
}
```

### `authService.getCurrentUser()`
Get data user yang sedang login dari API

**Returns:**
```javascript
{
  success: true,
  user: { id, email, ... }
}
```

### `authService.isAuthenticated()`
Cek apakah user sedang login

**Returns:** `boolean`

### `authService.getToken()`
Ambil access token dari localStorage

**Returns:** `string | null`

## Styling & Design
- Menggunakan desain yang mirip dengan `GameTransition`
- Background gradient dengan animasi particles
- Form dengan glass morphism effect
- Smooth transitions dan hover effects
- Responsive untuk mobile dan desktop

## Error Handling
- Error message ditampilkan di bawah form
- Validasi input di client-side (HTML5 validation)
- Error dari backend ditampilkan dengan pesan yang jelas

## Security Notes
- Password tidak pernah disimpan di localStorage
- Hanya access token dan refresh token yang disimpan
- Token otomatis dihapus saat logout
- HTTPS direkomendasikan untuk production

## Future Enhancements
- [ ] Password strength indicator
- [ ] Email verification
- [ ] Password reset/forgot password
- [ ] Remember me functionality
- [ ] Social login (Google, GitHub, etc.)
- [ ] Profile page untuk edit user data
- [ ] Token auto-refresh ketika expired

# 🚀 Quick Start - Backend Integration

## Langkah Cepat untuk Mulai Testing

### 1. Setup Environment Variables (30 detik)

```bash
cd /home/anthony05/webdesign_TobilTerbang_technoversary25/frontend
```

Edit file `.env.local` yang sudah dibuat, ganti:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
```

**Untuk sementara bisa dikosongi dulu jika belum setup Google OAuth!**

---

### 2. Start Backend (Wajib!)

```bash
# Terminal 1 - Backend
cd /home/anthony05/webdesign_TobilTerbang_technoversary25/backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 5000
```

**ATAU** kalau sudah setup Docker:

```bash
cd /home/anthony05/webdesign_TobilTerbang_technoversary25/backend
docker-compose up
```

Tunggu sampai muncul: `Uvicorn running on http://0.0.0.0:5000`

---

### 3. Start Frontend

```bash
# Terminal 2 - Frontend (terminal baru!)
cd /home/anthony05/webdesign_TobilTerbang_technoversary25/frontend
npm run dev
```

Buka browser: http://localhost:3000

---

### 4. Test Features

#### ✅ Test Signup/Login:

1. Klik tombol Auth/Login di homepage
2. Isi email dan password
3. Klik "Daftar" atau "Masuk"
4. Cek browser console (F12) untuk errors

#### ✅ Test Tumbler Detection:

1. Login terlebih dahulu
2. Masuk ke Game World
3. Klik mission "Pahlawan Tumbler" (ikon 🥤)
4. Upload foto tumbler
5. Klik "Deteksi Tumbler"
6. Lihat hasilnya!

---

### 5. Common Issues

**Error: "Failed to fetch" atau "Network Error"**
→ Backend belum running! Check terminal backend.

**Error: "CORS policy"**
→ Backend belum allow `localhost:3000`. Hubungi backend developer.

**Google Sign-In tidak muncul**
→ Normal! Setup Google OAuth dulu (lihat PANDUAN-INTEGRASI-LENGKAP.md)

---

### 6. Lihat Dokumentasi Lengkap

Untuk setup Google OAuth dan detail lainnya:

```bash
cat /home/anthony05/webdesign_TobilTerbang_technoversary25/PANDUAN-INTEGRASI-LENGKAP.md
```

Atau buka file: `PANDUAN-INTEGRASI-LENGKAP.md`

---

## ✨ Fitur yang Sudah Terintegrasi

✅ **POST /api/signup** - Registrasi user baru
✅ **POST /api/login** - Login dengan email/password  
✅ **POST /api/auth/google** - Login dengan Google (perlu setup)
✅ **POST /api/tumbler/detect** - Upload foto & deteksi tumbler

---

**Selamat mencoba! 🎉**

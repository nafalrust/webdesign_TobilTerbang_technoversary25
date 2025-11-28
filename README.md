# Webdesign Tobil Terbang - Technoversary 25

## Nama Anggota dan Asal Instansi

**Anggota Tim:**
- Shafiyah Nuril Hayya
- Yohanes Anthony Saputra
- Muhammad Nafal Zakin Rustanto

**Instansi:** Universitas Gadjah Mada

---

## Judul Website

**Eco-Quest: Petualangan Pahlawan Lingkungan** 🌍♻️

Website gamifikasi edukasi lingkungan yang mengajak pengguna untuk belajar tentang pengelolaan sampah melalui pengalaman interaktif dan menyenangkan.

---

## Deskripsi Website

Eco-Quest adalah platform web interaktif yang menggabungkan pembelajaran lingkungan dengan elemen gamifikasi. Website ini dirancang untuk meningkatkan kesadaran masyarakat tentang pentingnya pengelolaan sampah yang benar melalui pengalaman bermain game yang edukatif.

### Fitur Utama:
- 🎮 **Game World Interaktif** - Jelajahi dunia virtual dengan misi-misi lingkungan
- 🗑️ **Trash Sorting Game** - Belajar memilah sampah organik, anorganik, dan B3
- 🥤 **Tumbler Detection** - Deteksi tumbler menggunakan AI/ML untuk mendorong penggunaan wadah ramah lingkungan
- 👤 **User Authentication** - Sistem login dengan email/password dan Google OAuth
- 📊 **Profile & Progress Tracking** - Pantau pencapaian dan progres belajar
- 🌐 **Responsive Design** - Tampilan optimal di berbagai perangkat

### Teknologi yang Digunakan:

**Frontend:**
- Next.js 15 (React Framework)
- Tailwind CSS
- Framer Motion (Animations)
- Three.js (3D Graphics)

**Backend:**
- FastAPI (Python)
- Supabase (Database & Storage)
- TensorFlow/PyTorch (ML Model)
- Docker

---

## Cara Instalasi & Menjalankan Project

### Prasyarat

Pastikan sudah terinstall:
- Node.js (v18 atau lebih baru)
- Python 3.9+
- npm atau yarn
- Git

### 1. Clone Repository

```bash
git clone https://github.com/nafalrust/webdesign_TobilTerbang_technoversary25.git
cd webdesign_TobilTerbang_technoversary25
```

### 2. Setup Backend

#### A. Setup Environment Variables

```bash
cd backend
```

Buat file `.env` berdasarkan `.env.example`:

```env
# Supabase Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# JWT Configuration
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### B. Install Dependencies

```bash
pip install -r requirements.txt
```

#### C. Jalankan Backend

**Opsi 1: Menggunakan Python (Development)**

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 5000
```

**Opsi 2: Menggunakan Docker**

```bash
docker-compose up
```

Backend akan berjalan di: `http://localhost:5000`

### 3. Setup Frontend

#### A. Install Dependencies

```bash
cd frontend
npm install
```

#### B. Setup Environment Variables

Edit file `.env.local` (sudah tersedia di project):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com
```

**Catatan:** Google Client ID bersifat opsional untuk testing awal.

#### C. Jalankan Frontend

```bash
npm run dev
```

Frontend akan berjalan di: `http://localhost:3000`

### 4. Testing Fitur

#### ✅ Test Authentication:
1. Buka `http://localhost:3000`
2. Klik tombol "Auth/Login"
3. Daftar akun baru atau login dengan akun existing
4. Cek browser console (F12) untuk debugging

#### ✅ Test Trash Sorting Game:
1. Login terlebih dahulu
2. Navigasi ke "Game World"
3. Klik misi "Pemilah Sampah Cerdas"
4. Mainkan game pemilahan sampah

#### ✅ Test Tumbler Detection:
1. Login terlebih dahulu
2. Masuk ke "Game World"
3. Klik misi "Pahlawan Tumbler" (ikon 🥤)
4. Upload foto tumbler
5. Klik "Deteksi Tumbler"
6. Sistem akan menganalisis dan memberikan feedback

### 5. Troubleshooting

**Error: "Failed to fetch" atau "Network Error"**
- ✅ Pastikan backend sudah berjalan di port 5000
- ✅ Check terminal backend untuk error logs

**Error: "CORS policy"**
- ✅ Pastikan backend mengizinkan `localhost:3000` di CORS settings
- ✅ Restart backend setelah konfigurasi

**Google Sign-In tidak muncul**
- ✅ Setup Google OAuth credentials terlebih dahulu
- ✅ Tambahkan Client ID di `.env.local`

---

## Struktur Project

```
webdesign_TobilTerbang_technoversary25/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth_routes.py
│   │   │   ├── db_routes.py
│   │   │   └── waste_routes.py
│   │   ├── main.py
│   │   ├── auth.py
│   │   ├── config.py
│   │   └── supabase_client.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js
│   │   │   ├── layout.js
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── pages/
│   │   │   └── ui/
│   │   └── lib/
│   │       ├── apiService.js
│   │       └── authService.js
│   ├── package.json
│   └── next.config.mjs
└── README.md
```

---

## API Endpoints

### Authentication
- `POST /api/signup` - Registrasi user baru
- `POST /api/login` - Login dengan email/password
- `POST /api/auth/google` - Login dengan Google OAuth

### Waste Management
- `POST /api/tumbler/detect` - Upload dan deteksi tumbler
- `GET /api/waste/categories` - Dapatkan kategori sampah
- `POST /api/waste/sort` - Validasi pemilahan sampah

### User Profile
- `GET /api/user/profile` - Dapatkan profil user
- `PUT /api/user/profile` - Update profil user
- `GET /api/user/progress` - Dapatkan progress game

---

## Kontribusi

Kami terbuka untuk kontribusi! Jika Anda ingin berkontribusi:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## Lisensi

Project ini dibuat untuk keperluan Technoversary 25 - Universitas Gadjah Mada.

---

## Kontak

Untuk pertanyaan atau feedback, silakan hubungi:
- Repository: [webdesign_TobilTerbang_technoversary25](https://github.com/nafalrust/webdesign_TobilTerbang_technoversary25)

---

**Selamat mencoba! 🎉🌍**

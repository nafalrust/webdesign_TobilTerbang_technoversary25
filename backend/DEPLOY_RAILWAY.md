# 🚀 Deploy Backend ke Railway

## 📋 Persiapan

### 1. File sudah siap:
- ✅ `Dockerfile` - Sudah diupdate untuk production
- ✅ `railway.json` - Config Railway
- ✅ `requirements.txt` - Dependencies
- ✅ `.env` - Template environment variables

---

## 🎯 Langkah Deploy ke Railway

### **Step 1: Push ke GitHub**

```bash
# Di root project (bukan di folder backend)
cd /home/muhammad-nafal-zakin-rustanto/Project/Technoversary

# Add semua perubahan
git add .

# Commit
git commit -m "Prepare backend for Railway deployment"

# Push ke GitHub
git push origin main
```

---

### **Step 2: Deploy di Railway**

1. **Login ke Railway**
   - Buka: https://railway.app
   - Login dengan GitHub

2. **New Project**
   - Klik **"New Project"**
   - Pilih **"Deploy from GitHub repo"**
   - Pilih repository: `webdesign_TobilTerbang_technoversary25`

3. **Configure Service**
   - Railway akan detect Dockerfile otomatis
   - Klik **"Add variables"** atau **"Variables"** tab

4. **Set Environment Variables**
   
   Copy dan paste satu-satu:
   
   ```
   SUPABASE_URL=https://bwkjwflmaavnqaiqkdvf.supabase.co
   ```
   
   ```
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2p3ZmxtYWF2bnFhaXFrZHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDQzMjIsImV4cCI6MjA3OTEyMDMyMn0.r_SWpIK5d5MIOM8ki4a3-5iAzHMhThnh79WU2EiUFvU
   ```
   
   ```
   SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3a2p3ZmxtYWF2bnFhaXFrZHZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzU0NDMyMiwiZXhwIjoyMDc5MTIwMzIyfQ.PHaFU1jSfGsalbZgZdaUeV2MM-Y5SFiHrfbga3ahYhg
   ```
   
   ```
   SECRET_KEY=8580f485c23772dd4deda2770a2d4368a63d4d1a3377976f659138d8fe9f02fa
   ```
   
   ```
   JWT_SECRET_KEY=c90f51e1f7736944633b6747da1de6b463f8854212222d94f851fdd060dd6b4b
   ```
   
   ```
   FLASK_ENV=production
   ```
   
   ```
   FLASK_DEBUG=False
   ```

5. **Set Root Directory** (PENTING!)
   - Klik **"Settings"** tab
   - Scroll ke **"Root Directory"**
   - Set ke: `backend`
   - Klik **"Update"**

6. **Deploy**
   - Railway akan otomatis build dan deploy
   - Tunggu 2-5 menit
   - Klik **"View Logs"** untuk lihat progress

7. **Generate Domain**
   - Setelah deploy sukses
   - Klik **"Settings"** > **"Networking"**
   - Klik **"Generate Domain"**
   - Copy URL yang muncul (misal: `https://xxx.railway.app`)

---

### **Step 3: Update CORS**

Setelah dapat URL Railway, update CORS:

1. Di Railway Dashboard
2. Klik **"Variables"** tab
3. Edit variable `CORS_ORIGINS`
4. Tambahkan URL frontend production:
   ```
   CORS_ORIGINS=http://localhost:3000,https://xxx.railway.app,https://your-frontend.vercel.app
   ```
5. Klik **"Update Variables"**
6. Service akan auto-redeploy

---

### **Step 4: Test Deployment**

```bash
# Ganti URL dengan URL Railway kamu
curl https://xxx.railway.app/

# Test signup
curl -X POST https://xxx.railway.app/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"test123456"}'

# Test login (setelah disable email confirmation di Supabase)
curl -X POST https://xxx.railway.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"test123456"}'
```

---

## 🔧 Troubleshooting

### **Build Failed**

1. Check Logs di Railway
2. Pastikan Root Directory = `backend`
3. Pastikan Dockerfile ada di folder backend

### **Application Error**

1. Check Logs untuk error message
2. Pastikan semua environment variables sudah diset
3. Pastikan SUPABASE_URL dan SUPABASE_KEY benar

### **CORS Error**

1. Update `CORS_ORIGINS` di Railway Variables
2. Tambahkan URL frontend production
3. Format: `http://localhost:3000,https://frontend.vercel.app`

### **Connection Timeout**

1. Check Supabase credentials
2. Check Supabase project masih aktif
3. Restart service di Railway

---

## 📝 Checklist Deployment

- [ ] Push code ke GitHub
- [ ] Login ke Railway
- [ ] Create new project dari GitHub repo
- [ ] Set Root Directory = `backend`
- [ ] Add semua environment variables
- [ ] Wait for build & deploy
- [ ] Generate domain
- [ ] Update CORS_ORIGINS
- [ ] Test API endpoints
- [ ] Update frontend dengan URL Railway

---

## 🎯 URL Backend Production

Setelah deploy, URL backend kamu akan seperti:
```
https://xxx-xxx-xxx.railway.app
```

Gunakan URL ini di frontend untuk koneksi ke backend!

---

## 💡 Tips

1. **Free Tier Railway**: $5 credit per bulan (cukup untuk development)
2. **Auto-deploy**: Setiap push ke GitHub akan auto-deploy
3. **Logs**: Selalu cek logs kalau ada error
4. **Environment**: Jangan commit file `.env` ke GitHub!

---

## 🔗 Link Penting

- Railway Dashboard: https://railway.app/dashboard
- Railway Docs: https://docs.railway.app
- Supabase Dashboard: https://supabase.com/dashboard

---

**Selamat! Backend siap production! 🎉**

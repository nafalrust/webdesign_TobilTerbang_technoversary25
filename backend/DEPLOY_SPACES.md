# 🚀 Auto-Sync Backend ke Hugging Face Spaces

Backend akan otomatis deploy ke Hugging Face Spaces setiap kali ada perubahan di folder `backend/`.

## 📋 Setup (Hanya Sekali)

### 1️⃣ Generate SSH Key untuk Hugging Face

```bash
# Generate SSH key baru
ssh-keygen -t rsa -b 4096 -C "github-actions@youremail.com" -f ~/.ssh/hf_spaces_key -N ""

# Copy private key (untuk GitHub Secret)
cat ~/.ssh/hf_spaces_key

# Copy public key (untuk Hugging Face)
cat ~/.ssh/hf_spaces_key.pub
```

---

### 2️⃣ Add SSH Key ke Hugging Face

1. Login ke https://huggingface.co
2. Klik avatar → **Settings**
3. Klik **SSH Keys** di sidebar
4. Klik **Add SSH Key**
5. Paste **public key** (`hf_spaces_key.pub`)
6. Save

---

### 3️⃣ Create Space di Hugging Face

1. Buka https://huggingface.co/spaces
2. Klik **Create new Space**
3. Setting:
   - **Name**: `technoversary-backend` (atau nama lain)
   - **SDK**: Docker
   - **Hardware**: Free (CPU)
   - **Visibility**: Public/Private
4. Create Space

---

### 4️⃣ Add Secret ke GitHub

1. Buka repo GitHub: https://github.com/nafalrust/webdesign_TobilTerbang_technoversary25
2. Klik **Settings** → **Secrets and variables** → **Actions**
3. Klik **New repository secret**
4. Tambahkan:
   - **Name**: `HF_SSH_KEY`
   - **Value**: Paste **private key** (dari `cat ~/.ssh/hf_spaces_key`)
5. Save

---

### 5️⃣ Update Workflow File

Edit file `.github/workflows/deploy-spaces.yml`:

```yaml
# Ganti baris ini:
git remote add spaces git@hf.co:spaces/YOUR_USERNAME/YOUR_SPACE_NAME

# Menjadi (contoh):
git remote add spaces git@hf.co:spaces/nafalrust/technoversary-backend
```

**Format:** `git@hf.co:spaces/<username>/<space-name>`

---

## ✅ Testing

### Test Manual di GitHub:

1. Buka repo GitHub
2. Klik **Actions** tab
3. Pilih workflow **Deploy Backend to Hugging Face Spaces**
4. Klik **Run workflow**
5. Wait & check logs

### Test dengan Push:

```bash
# Edit file backend
echo "# Test" >> backend/README.md

# Commit & push
git add backend/
git commit -m "Test auto-deploy"
git push origin main

# GitHub Actions akan otomatis deploy ke Spaces! ✨
```

---

## 🔧 Troubleshooting

### Error: "Permission denied (publickey)"
- ✅ Check SSH key sudah ditambahkan ke Hugging Face
- ✅ Check private key di GitHub Secret benar (include `-----BEGIN` dan `-----END`)

### Error: "Repository not found"
- ✅ Check nama space di workflow file benar
- ✅ Format: `git@hf.co:spaces/username/space-name`

### Workflow tidak jalan
- ✅ Check ada perubahan di folder `backend/`
- ✅ Atau trigger manual di Actions tab

---

## 📊 Monitoring

**GitHub Actions:**
- Buka repo → **Actions** tab
- Lihat status deploy (✅ success / ❌ failed)

**Hugging Face:**
- Buka space Anda
- Klik **Settings** tab → lihat **Logs**
- Check build status

---

## 🎯 Workflow

```
Edit backend code
      ↓
git push origin main
      ↓
GitHub Actions triggered
      ↓
Auto push to Hugging Face Spaces
      ↓
Spaces auto rebuild & redeploy
      ↓
Done! 🎉
```

---

## 💡 Tips

1. **File besar**: Add ke `.gitignore` kalau ada file > 5GB
2. **Environment variables**: Set di Hugging Face Space Settings → Variables
3. **Manual trigger**: Actions → Deploy Backend → Run workflow
4. **Check logs**: Hugging Face Space → Settings → Logs

---

**Setelah setup, tinggal push ke GitHub dan otomatis deploy! ✨**

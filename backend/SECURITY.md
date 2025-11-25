# 🔒 SECURITY WARNING - Environment Variables Exposed!

## ⚠️ URGENT ACTION REQUIRED

File `.env` telah ter-push ke repository dan **TEREKSPOSE DI HUGGING FACE**!

### 🚨 Langkah Darurat (SEGERA):

#### 1. **Regenerate Supabase Keys** (PRIORITAS TERTINGGI)
```bash
# Login ke Supabase Dashboard:
# https://supabase.com/dashboard/project/bwkjwflmaavnqaiqkdvf/settings/api

1. Masuk ke Settings > API
2. Klik "Reset Service Role Key" 
3. Klik "Reset Anon Key" (optional, tapi disarankan)
4. Copy keys baru ke .env lokal
```

#### 2. **Regenerate Roboflow API Key**
```bash
# Login ke Roboflow:
# https://app.roboflow.com/settings/api

1. Revoke API key lama: lEVEUGwgqpdutnjlxr7C
2. Generate new API key
3. Update di .env lokal
```

#### 3. **Generate New Flask Secret Keys**
```bash
# Generate random secret keys:
python3 -c "import secrets; print(secrets.token_hex(32))"
# Run 2x untuk SECRET_KEY dan JWT_SECRET_KEY
```

#### 4. **Remove dari Git History**
```bash
cd /home/muhammad-nafal-zakin-rustanto/Project/Technoversary/backend

# .env sudah di-remove dari tracking
git status

# Commit perubahan
git add .gitignore .env.example SECURITY.md
git commit -m "security: remove .env from repository, add .env.example"

# Force push ke remote (WARNING: ini akan override history)
git push origin main --force

# Push ke Hugging Face
git push hf main --force
```

#### 5. **Setup Environment Variables di Hugging Face Spaces**

**JANGAN** upload `.env` ke git lagi!

Setup di Hugging Face Dashboard:
1. Buka: https://huggingface.co/spaces/nafalrust/technoversary/settings
2. Scroll ke "Repository secrets"
3. Add secrets satu per satu:

```
Name: SUPABASE_URL
Value: https://bwkjwflmaavnqaiqkdvf.supabase.co

Name: SUPABASE_KEY  
Value: <new-anon-key>

Name: SUPABASE_SERVICE_KEY
Value: <new-service-role-key>

Name: ROBOFLOW_API_KEY
Value: <new-roboflow-key>

Name: SECRET_KEY
Value: <generated-secret-key>

Name: JWT_SECRET_KEY
Value: <generated-jwt-secret>

Name: FLASK_ENV
Value: production

Name: FLASK_DEBUG
Value: False

Name: CORS_ORIGINS
Value: https://your-frontend-domain.com

Name: JWT_ALGORITHM
Value: HS256

Name: ACCESS_TOKEN_EXPIRE_MINUTES
Value: 30
```

#### 6. **Update Dockerfile untuk Environment Variables**

Dockerfile sudah benar menggunakan ENV variables, tapi pastikan tidak hardcode values.

---

## 📋 Checklist

- [ ] Reset Supabase Service Role Key
- [ ] Reset Supabase Anon Key (optional)
- [ ] Revoke & regenerate Roboflow API key
- [ ] Generate new SECRET_KEY dan JWT_SECRET_KEY
- [ ] Update .env lokal dengan keys baru
- [ ] Commit & force push untuk remove .env dari history
- [ ] Setup environment variables di Hugging Face Spaces Settings
- [ ] Test backend di HF Spaces dengan keys baru
- [ ] Monitor Supabase usage untuk aktivitas mencurigakan
- [ ] Update frontend dengan new CORS origins jika perlu

---

## 🔐 Best Practices Kedepan

1. **JANGAN PERNAH** commit file `.env` ke git
2. Gunakan `.env.example` sebagai template (tanpa values asli)
3. Setup environment variables di platform deployment (HF Spaces, Vercel, Railway, dll)
4. Rotate API keys secara berkala (minimal setiap 3 bulan)
5. Gunakan `.gitignore` untuk block sensitive files
6. Review git status sebelum commit: `git status`
7. Gunakan git hooks untuk prevent commit .env:

```bash
# .git/hooks/pre-commit
#!/bin/sh
if git diff --cached --name-only | grep -q "\.env$"; then
    echo "Error: Attempting to commit .env file!"
    exit 1
fi
```

---

## 📚 Resources

- [Supabase API Settings](https://supabase.com/dashboard/project/bwkjwflmaavnqaiqkdvf/settings/api)
- [Roboflow API Keys](https://app.roboflow.com/settings/api)
- [Hugging Face Spaces Secrets](https://huggingface.co/docs/hub/spaces-overview#managing-secrets)
- [Git Remove Sensitive Data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

---

## ⏰ Timeline

**Created**: November 24, 2025
**Status**: 🔴 CRITICAL - Immediate action required
**ETA to Fix**: 15-30 minutes

---

**IMPORTANT**: Setelah regenerate keys, test semua endpoint untuk ensure backend masih berfungsi!

# Setup Google OAuth - Supabase

## 1. Enable Google OAuth di Supabase

1. Buka Supabase Dashboard: https://supabase.com/dashboard/project/bwkjwflmaavnqaiqkdvf
2. Klik **Authentication** → **Providers**
3. Cari **Google** dan klik **Enable**
4. Akan muncul **Redirect URL**, copy URL ini:
   ```
   https://bwkjwflmaavnqaiqkdvf.supabase.co/auth/v1/callback
   ```

## 2. Setup Google Cloud Console

### A. Buat Project di Google Cloud

1. Buka: https://console.cloud.google.com/
2. Klik **Select a project** → **New Project**
3. Nama project: `Technoversary` (atau nama lain)
4. Klik **Create**

### B. Enable Google+ API

1. Di Google Cloud Console, klik **APIs & Services** → **Library**
2. Search: `Google+ API`
3. Klik **Enable**

### C. Create OAuth Credentials

1. Klik **APIs & Services** → **Credentials**
2. Klik **Create Credentials** → **OAuth client ID**
3. Jika diminta, configure OAuth consent screen:
   - User Type: **External**
   - App name: `Technoversary`
   - User support email: email kamu
   - Developer contact: email kamu
   - Klik **Save and Continue**
   - Scopes: Skip (Next)
   - Test users: Add email kamu (untuk testing)
   - Klik **Save and Continue**

4. Kembali ke **Create OAuth client ID**:
   - Application type: **Web application**
   - Name: `Technoversary Web`
   
5. **Authorized JavaScript origins**:
   - Development: `http://localhost:3000`
   - Production: `https://your-frontend-domain.com`
   
6. **Authorized redirect URIs**:
   - Paste URL dari Supabase (step 1):
   ```
   https://bwkjwflmaavnqaiqkdvf.supabase.co/auth/v1/callback
   ```
   - Juga tambahkan untuk frontend:
   ```
   http://localhost:3000
   https://your-frontend-domain.com
   ```

7. Klik **Create**

8. Copy **Client ID** dan **Client Secret** yang muncul

## 3. Configure Supabase dengan Google Credentials

1. Kembali ke Supabase → **Authentication** → **Providers** → **Google**
2. Paste:
   - **Client ID**: dari Google Cloud Console
   - **Client Secret**: dari Google Cloud Console
3. Klik **Save**

## 4. Test OAuth Flow

Kamu bisa test login dengan Google sekarang!

---

## Environment Variables

Tidak perlu tambah env variables di backend, semua sudah di-handle Supabase.

Tapi untuk frontend, simpan Google Client ID:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

---

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Pastikan redirect URI di Google Cloud Console sama persis dengan yang ada di Supabase
- Format: `https://PROJECT_REF.supabase.co/auth/v1/callback`

### Error: "Access blocked: App's request is invalid"
- Configure OAuth consent screen
- Add test users (development mode)
- Publish app (production mode)

### Error: "Invalid client"
- Client ID atau Secret salah
- Check copy-paste dari Google Cloud Console

---

## Production Checklist

- [ ] Publish OAuth consent screen di Google Cloud Console
- [ ] Add production domain ke Authorized JavaScript origins
- [ ] Add production redirect URI
- [ ] Update CORS di backend untuk production domain
- [ ] Test login dari production URL

# API Profile Photo Documentation

API untuk upload, get, dan delete foto profil user.

## Setup Supabase Storage

### 1. Buat Bucket
1. Buka Supabase Dashboard → Storage
2. Create new bucket: `TobilFotoProfil`
3. Set sebagai **Public** bucket
4. Enable file size limit (optional, misal 5MB)

### 2. Storage Policy (jika bucket private)
Jika ingin user hanya bisa akses foto mereka sendiri:

```sql
-- Policy untuk upload (INSERT)
CREATE POLICY "Users can upload their own profile photo"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'TobilFotoProfil' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy untuk read (SELECT)
CREATE POLICY "Anyone can view profile photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'TobilFotoProfil');

-- Policy untuk update
CREATE POLICY "Users can update their own profile photo"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'TobilFotoProfil' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy untuk delete
CREATE POLICY "Users can delete their own profile photo"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'TobilFotoProfil' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

---

## Endpoints

### 1. Upload Profile Photo

Upload atau update foto profil user.

**Endpoint:** `POST /api/profile/photo`

**Method:** Multipart Form Data

**Authentication:** 
- Option 1: Kirim `user_id` di form data
- Option 2: Kirim token di `Authorization: Bearer <token>` header

**Request:**

```bash
# Option 1: Dengan user_id
curl -X POST https://nafalrust-technoversary.hf.space/api/profile/photo \
  -F "file=@/path/to/photo.jpg" \
  -F "user_id=1184a6ff-a95e-47a2-828b-a0b287887802"

# Option 2: Dengan token
curl -X POST https://nafalrust-technoversary.hf.space/api/profile/photo \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/photo.jpg"
```

**Request Parameters:**
- `file` (required): Image file (jpg, jpeg, png, gif, webp)
- `user_id` (optional): User ID (required jika tidak ada token)

**Response Success (200):**
```json
{
  "success": true,
  "message": "Profile photo uploaded successfully",
  "user_id": "1184a6ff-a95e-47a2-828b-a0b287887802",
  "photo_url": "https://bwkjwflmaavnqaiqkdvf.supabase.co/storage/v1/object/public/TobilFotoProfil/1184a6ff-a95e-47a2-828b-a0b287887802.jpg",
  "filename": "1184a6ff-a95e-47a2-828b-a0b287887802.jpg"
}
```

**Response Error:**
```json
{
  "success": false,
  "error": "No file uploaded"
}
```

**JavaScript Example:**
```javascript
// Upload dengan fetch
async function uploadProfilePhoto(file, userId) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('user_id', userId);
  
  const response = await fetch('https://nafalrust-technoversary.hf.space/api/profile/photo', {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
}

// Atau dengan token
async function uploadProfilePhotoWithToken(file, token) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('https://nafalrust-technoversary.hf.space/api/profile/photo', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  return await response.json();
}

// React example
function ProfilePhotoUpload({ userId }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const result = await uploadProfilePhoto(file, userId);
      console.log(result);
    }
  };
  
  return (
    <input 
      type="file" 
      accept="image/*" 
      onChange={handleFileChange} 
    />
  );
}
```

---

### 2. Get Profile Photo URL

Mendapatkan URL foto profil user.

**Endpoint:** `GET /api/profile/photo/<user_id>`

**Method:** GET

**Request:**
```bash
curl https://nafalrust-technoversary.hf.space/api/profile/photo/1184a6ff-a95e-47a2-828b-a0b287887802
```

**Response Success (200):**
```json
{
  "success": true,
  "user_id": "1184a6ff-a95e-47a2-828b-a0b287887802",
  "photo_url": "https://bwkjwflmaavnqaiqkdvf.supabase.co/storage/v1/object/public/TobilFotoProfil/1184a6ff-a95e-47a2-828b-a0b287887802.jpg",
  "filename": "1184a6ff-a95e-47a2-828b-a0b287887802.jpg"
}
```

**Response Not Found (404):**
```json
{
  "success": false,
  "message": "Profile photo not found",
  "user_id": "1184a6ff-a95e-47a2-828b-a0b287887802"
}
```

**JavaScript Example:**
```javascript
async function getProfilePhoto(userId) {
  const response = await fetch(
    `https://nafalrust-technoversary.hf.space/api/profile/photo/${userId}`
  );
  return await response.json();
}

// React component
function ProfileImage({ userId }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  
  useEffect(() => {
    getProfilePhoto(userId).then(data => {
      if (data.success) {
        setPhotoUrl(data.photo_url);
      }
    });
  }, [userId]);
  
  return photoUrl ? (
    <img src={photoUrl} alt="Profile" />
  ) : (
    <div>No photo</div>
  );
}
```

---

### 3. Delete Profile Photo

Hapus foto profil user.

**Endpoint:** `DELETE /api/profile/photo/<user_id>`

**Method:** DELETE

**Request:**
```bash
curl -X DELETE https://nafalrust-technoversary.hf.space/api/profile/photo/1184a6ff-a95e-47a2-828b-a0b287887802
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Profile photo deleted successfully",
  "user_id": "1184a6ff-a95e-47a2-828b-a0b287887802"
}
```

**Response Not Found (404):**
```json
{
  "success": false,
  "message": "Profile photo not found"
}
```

**JavaScript Example:**
```javascript
async function deleteProfilePhoto(userId) {
  const response = await fetch(
    `https://nafalrust-technoversary.hf.space/api/profile/photo/${userId}`,
    { method: 'DELETE' }
  );
  return await response.json();
}
```

---

## File Structure di Storage

```
TobilFotoProfil/
├── 1184a6ff-a95e-47a2-828b-a0b287887802.jpg
├── 2198e9f4-24fd-4ed7-ba3d-4d28258b414d.png
└── abc123-def456-ghi789.webp
```

Setiap file dinamai dengan **user_id** dan ekstensi asli file.

---

## Notes

1. **File Size Limit**: Supabase free tier = 1GB total storage
2. **File Types**: jpg, jpeg, png, gif, webp
3. **Naming**: File dinamai dengan `user_id.ext` (otomatis overwrite jika upload ulang)
4. **Public Access**: Bucket harus public agar foto bisa diakses langsung
5. **Security**: Backend menggunakan `SUPABASE_SERVICE_KEY` untuk bypass RLS

---

## Error Handling

| Error Code | Message | Cause |
|------------|---------|-------|
| 400 | No file uploaded | Request tidak ada file |
| 400 | Empty filename | Filename kosong |
| 400 | Invalid file type | Ekstensi file tidak didukung |
| 400 | user_id atau Authorization token required | Tidak ada user_id atau token |
| 401 | Invalid token | Token tidak valid |
| 404 | Profile photo not found | Foto tidak ada |
| 500 | Internal error | Server error |

---

## Testing

```bash
# 1. Upload foto
curl -X POST https://nafalrust-technoversary.hf.space/api/profile/photo \
  -F "file=@/path/to/photo.jpg" \
  -F "user_id=YOUR_USER_ID"

# 2. Get foto URL
curl https://nafalrust-technoversary.hf.space/api/profile/photo/YOUR_USER_ID

# 3. Delete foto
curl -X DELETE https://nafalrust-technoversary.hf.space/api/profile/photo/YOUR_USER_ID
```

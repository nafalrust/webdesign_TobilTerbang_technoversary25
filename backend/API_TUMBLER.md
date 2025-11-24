# API Tumbler Detection

## Endpoint: Detect Tumbler

**URL:** `POST /api/tumbler/detect`

**Description:** Upload gambar, deteksi tumbler menggunakan Roboflow, simpan ke Supabase Storage, dan return hasil detection dengan bounding box.

### Request

**Content-Type:** `multipart/form-data`

**Parameters:**
- `file` (required): File gambar (jpg, jpeg, png)
- `model_id` (optional): Roboflow model ID (default: `pendeteksi-tumbler/5`)

### Response Success (Tumbler Detected)

```json
{
  "success": true,
  "detected": true,
  "message": "Tumbler terdeteksi!",
  "count": 2,
  "objects": [
    {
      "class": "tumbler",
      "confidence": 0.95,
      "bbox": {
        "x": 320,
        "y": 240,
        "width": 150,
        "height": 200
      }
    }
  ],
  "images": {
    "original_url": "https://your-supabase.co/storage/v1/object/public/images/tumblers/original/tumbler_xxx.jpg",
    "bbox_url": "https://your-supabase.co/storage/v1/object/public/images/tumblers/detected/bbox_tumbler_xxx.jpg",
    "bbox_base64": "data:image/jpeg;base64,/9j/4AAQ..."
  },
  "raw_result": {
    // Raw Roboflow response
  }
}
```

### Response Success (No Tumbler)

```json
{
  "success": false,
  "detected": false,
  "message": "Tidak ada tumbler terdeteksi",
  "count": 0,
  "objects": [],
  "images": {
    "original_url": "...",
    "bbox_url": "...",
    "bbox_base64": "..."
  },
  "raw_result": {...}
}
```

### Response Error

```json
{
  "success": false,
  "error": "Error message"
}
```

## Frontend Integration Example

### JavaScript/Fetch

```javascript
async function detectTumbler(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('model_id', 'pendeteksi-tumbler/5'); // optional

  try {
    const response = await fetch('http://localhost:7860/api/tumbler/detect', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    
    if (result.success && result.detected) {
      console.log(`Terdeteksi ${result.count} tumbler!`);
      console.log('Objects:', result.objects);
      
      // Tampilkan gambar dengan bounding box
      const img = document.getElementById('result-image');
      img.src = result.images.bbox_base64; // atau bbox_url
    } else {
      console.log('Tidak ada tumbler terdeteksi');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  detectTumbler(file);
});
```

### React Example

```jsx
import { useState } from 'react';

function TumblerDetector() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:7860/api/tumbler/detect', {
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
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={loading}
      />
      
      {loading && <p>Detecting...</p>}
      
      {result && (
        <div>
          <p>{result.message}</p>
          {result.detected && (
            <>
              <p>Jumlah tumbler: {result.count}</p>
              <img 
                src={result.images.bbox_base64} 
                alt="Detection result"
                style={{ maxWidth: '100%' }}
              />
              <div>
                {result.objects.map((obj, idx) => (
                  <p key={idx}>
                    {obj.class}: {(obj.confidence * 100).toFixed(2)}%
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
```

## Supabase Storage Setup

Buat bucket `images` di Supabase Storage dengan struktur:
```
images/
├── tumblers/
│   ├── original/     # Original uploaded images
│   └── detected/     # Images with bounding boxes
```

**Bucket Configuration:**
- Public: Yes (agar URL bisa diakses langsung)
- Allowed MIME types: `image/jpeg`, `image/jpg`, `image/png`

## Notes

1. Image dengan bounding box tersedia dalam 2 format:
   - `bbox_url`: URL publik Supabase Storage
   - `bbox_base64`: Base64 encoded (langsung bisa ditampilkan tanpa request tambahan)

2. Confidence threshold bisa disesuaikan di model Roboflow

3. File disimpan dengan format: `tumbler_{uuid}_{timestamp}.{ext}`

4. Status `success: true` hanya jika tumbler terdeteksi (`count > 0`)

"""
Technoversary Backend - Simple Version
Hanya 4 fungsi: Signup, Login, Simpan Data, Ambil Data
+ Computer Vision: Deteksi Tumbler & Deteksi Sampah
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client
import requests
import os
from dotenv import load_dotenv
import uuid
from datetime import datetime
from PIL import Image, ImageDraw
import io
import base64

# Load environment
load_dotenv()

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Initialize Supabase (gunakan service key untuk storage)
supabase = create_client(
    os.getenv('SUPABASE_URL'),
    os.getenv('SUPABASE_SERVICE_KEY')  # Service key bypass RLS
)

# Roboflow API configuration
ROBOFLOW_API_KEY = os.getenv('ROBOFLOW_API_KEY')
ROBOFLOW_MODEL = "tumbler-detection-0xfmo/3"  # Sesuaikan dengan model Anda

# Import and register waste routes
from app.routes.waste_routes import waste_bp
app.register_blueprint(waste_bp, url_prefix='/api/waste')

# ============================================
# AUTHENTICATION
# ============================================

@app.route('/api/signup', methods=['POST'])
def signup():
    """Register user baru"""
    data = request.json
    try:
        response = supabase.auth.sign_up({
            "email": data['email'],
            "password": data['password']
        })
        return jsonify({
            "success": True,
            "user": response.user.model_dump() if response.user else None,
            "message": "Registrasi berhasil"
        }), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route('/api/login', methods=['POST'])
def login():
    """Login user"""
    data = request.json
    try:
        response = supabase.auth.sign_in_with_password({
            "email": data['email'],
            "password": data['password']
        })
        return jsonify({
            "success": True,
            "token": response.session.access_token,
            "user": response.user.model_dump() if response.user else None,
            "message": "Login berhasil"
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 401

@app.route('/api/auth/google', methods=['POST'])
def google_auth():
    """Login/Signup dengan Google OAuth"""
    data = request.json
    
    # Frontend mengirim ID token dari Google
    id_token = data.get('id_token')
    
    if not id_token:
        return jsonify({
            "success": False,
            "error": "ID token required"
        }), 400
    
    try:
        # Verify dan sign in dengan Google token
        response = supabase.auth.sign_in_with_id_token({
            "provider": "google",
            "token": id_token
        })
        
        return jsonify({
            "success": True,
            "token": response.session.access_token,
            "user": response.user.model_dump() if response.user else None,
            "message": "Login dengan Google berhasil"
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 401

@app.route('/api/auth/session', methods=['POST'])
def set_session():
    """Set session dari access token & refresh token"""
    data = request.json
    
    access_token = data.get('access_token')
    refresh_token = data.get('refresh_token')
    
    if not access_token or not refresh_token:
        return jsonify({
            "success": False,
            "error": "Access token and refresh token required"
        }), 400
    
    try:
        # Set session di backend
        response = supabase.auth.set_session(access_token, refresh_token)
        
        return jsonify({
            "success": True,
            "user": response.user.model_dump() if response.user else None,
            "message": "Session set successfully"
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 401

# ============================================
# DATABASE
# ============================================

@app.route('/api/data/<table_name>', methods=['POST'])
def save_data(table_name):
    """Simpan data ke tabel"""
    data = request.json
    try:
        response = supabase.table(table_name).insert(data).execute()
        return jsonify({
            "success": True,
            "data": response.data,
            "message": "Data berhasil disimpan"
        }), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route('/api/data/<table_name>', methods=['GET'])
def get_data(table_name):
    """Ambil semua data dari tabel"""
    try:
        response = supabase.table(table_name).select('*').execute()
        return jsonify({
            "success": True,
            "data": response.data,
            "count": len(response.data)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

# ============================================
# COMPUTER VISION - TUMBLER DETECTION
# ============================================

@app.route('/api/tumbler/detect', methods=['POST'])
def detect_tumbler():
    """
    Upload gambar, detect tumbler, simpan ke Supabase Storage, return hasil + bounding box
    """
    try:
        # 1. Validasi file upload
        if 'file' not in request.files:
            return jsonify({
                "success": False,
                "error": "No file uploaded"
            }), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({
                "success": False,
                "error": "Empty filename"
            }), 400
        
        # 2. Generate unique filename
        file_ext = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else 'jpg'
        unique_filename = f"tumbler_{uuid.uuid4().hex}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.{file_ext}"
        
        # 3. Baca image untuk processing
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        # 4. Detect tumbler menggunakan Roboflow HTTP API
        model_id = request.form.get('model_id', ROBOFLOW_MODEL)
        
        # Encode image ke base64 untuk API request
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        # Call Roboflow API (POST base64 string directly)
        roboflow_url = f"https://detect.roboflow.com/{model_id}?api_key={ROBOFLOW_API_KEY}"
        response = requests.post(
            roboflow_url,
            data=img_str,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        
        if response.status_code != 200:
            return jsonify({
                "success": False,
                "error": f"Roboflow API error: {response.text}"
            }), 500
        
        detection_result = response.json()
        
        # 6. Check apakah ada tumbler terdeteksi
        predictions = detection_result.get('predictions', [])
        tumbler_detected = len(predictions) > 0
        
        # 7. Draw bounding boxes
        draw = ImageDraw.Draw(image)
        detected_objects = []
        
        for pred in predictions:
            # Ambil koordinat bounding box
            x = pred['x']
            y = pred['y']
            width = pred['width']
            height = pred['height']
            confidence = pred['confidence']
            class_name = pred['class']
            
            # Hitung koordinat box
            left = x - width / 2
            top = y - height / 2
            right = x + width / 2
            bottom = y + height / 2
            
            # Draw rectangle
            draw.rectangle([left, top, right, bottom], outline='red', width=3)
            
            # Draw label
            label = f"{class_name}: {confidence:.2f}"
            draw.text((left, top - 10), label, fill='red')
            
            detected_objects.append({
                "class": class_name,
                "confidence": confidence,
                "bbox": {
                    "x": x,
                    "y": y,
                    "width": width,
                    "height": height
                }
            })
        
        # 8. Convert image dengan bounding box ke bytes
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)
        
        # 9. Upload ke Supabase Storage (simple)
        try:
            bucket_name = 'TobilGambar'
            
            # Upload image dengan bounding box
            bbox_filename = f"bbox_{unique_filename}"
            supabase.storage.from_(bucket_name).upload(
                bbox_filename,
                img_byte_arr.getvalue(),
                file_options={"content-type": "image/jpeg"}
            )
            
            # Get public URL
            bbox_url = supabase.storage.from_(bucket_name).get_public_url(bbox_filename)
            original_url = None
            
        except Exception as storage_error:
            print(f"Storage error: {storage_error}")
            original_url = None
            bbox_url = None
        
        # 10. Convert image dengan bbox ke base64 (fallback jika storage gagal)
        img_base64 = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')
        
        # 11. Prepare response
        return jsonify({
            "success": tumbler_detected,
            "detected": tumbler_detected,
            "message": "Tumbler terdeteksi!" if tumbler_detected else "Tidak ada tumbler terdeteksi",
            "count": len(predictions),
            "objects": detected_objects,
            "images": {
                "original_url": original_url,
                "bbox_url": bbox_url,
                "bbox_base64": f"data:image/jpeg;base64,{img_base64}"
            },
            "raw_result": detection_result
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/api/waste/detect', methods=['POST'])
def detect_waste():


    try:
        # 1. Validasi file upload
        if 'file' not in request.files:
            return jsonify({
                "success": False,
                "error": "No file uploaded"
            }), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({
                "success": False,
                "error": "Empty filename"
            }), 400

        # 2. Baca image untuk processing
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes))
        # Konversi ke RGB jika perlu (untuk JPEG)
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")

        # 3. Roboflow waste model config
        waste_model_id = "sampah-organik-dan-anorganik/3"
        roboflow_url = f"https://detect.roboflow.com/{waste_model_id}?api_key={ROBOFLOW_API_KEY}"

        # 4. Encode image ke base64 untuk API request
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode()

        # 5. Call Roboflow API
        response = requests.post(
            roboflow_url,
            data=img_str,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )

        if response.status_code != 200:
            return jsonify({
                "success": False,
                "error": f"Roboflow API error: {response.text}"
            }), 500

        detection_result = response.json()
        predictions = detection_result.get('predictions', [])

        # 6. Ambil prediksi utama (class dengan confidence tertinggi)
        if predictions:
            top_pred = max(predictions, key=lambda x: x.get('confidence', 0))
            pred_class = top_pred.get('class', '').lower()
            if pred_class in ['organic', 'organik']:
                result = 'organik'
            elif pred_class in ['anorganic', 'anorganik', 'inorganic']:
                result = 'anorganik'
            else:
                result = pred_class or 'unknown'
            confidence = top_pred.get('confidence', 0)
        else:
            result = 'unknown'
            confidence = 0

        # 7. Tulis kelas di kanan bawah gambar
        from PIL import ImageDraw, ImageFont
        draw = ImageDraw.Draw(image)
        label = result
        # Pilih font default (tanpa eksternal font)
        try:
            font = ImageFont.truetype("arial.ttf", 32)
        except:
            font = ImageFont.load_default()
        text_w, text_h = draw.textsize(label, font=font)
        img_w, img_h = image.size
        margin = 10
        x = img_w - text_w - margin
        y = img_h - text_h - margin
        # Kotak background putih transparan
        draw.rectangle([x-margin, y-margin, x+text_w+margin, y+text_h+margin], fill=(255,255,255,200))
        draw.text((x, y), label, fill="black", font=font)

        # 8. Upload ke Supabase Storage (bucket sama dengan tumbler)
        bucket_name = 'TobilGambar'
        unique_filename = f"waste_{uuid.uuid4().hex}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpeg"
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)
        try:
            supabase.storage.from_(bucket_name).upload(
                unique_filename,
                img_byte_arr.getvalue(),
                file_options={"content-type": "image/jpeg"}
            )
            image_url = supabase.storage.from_(bucket_name).get_public_url(unique_filename)
        except Exception as storage_error:
            image_url = None

        return jsonify({
            "success": True,
            "prediction": result,
            "confidence": confidence,
            "image_url": image_url,
            "filename": unique_filename
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
    


# ============================================
# PROFILE PHOTO
# ============================================

@app.route('/api/profile/photo', methods=['POST'])
def upload_profile_photo():
    """Upload foto profil ke Supabase Storage"""
    try:
        # 1. Ambil user_id dari request (bisa dari token atau body)
        user_id = request.form.get('user_id')
        if not user_id:
            # Coba ambil dari Authorization header
            auth_header = request.headers.get('Authorization')
            if auth_header:
                token = auth_header.replace('Bearer ', '')
                try:
                    user_response = supabase.auth.get_user(token)
                    user_id = user_response.user.id
                except:
                    return jsonify({
                        "success": False,
                        "error": "Invalid token"
                    }), 401
            else:
                return jsonify({
                    "success": False,
                    "error": "user_id atau Authorization token required"
                }), 400
        
        # 2. Validasi file
        if 'file' not in request.files:
            return jsonify({
                "success": False,
                "error": "No file uploaded"
            }), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({
                "success": False,
                "error": "Empty filename"
            }), 400
        
        # 3. Validasi tipe file
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
        file_ext = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else ''
        if file_ext not in allowed_extensions:
            return jsonify({
                "success": False,
                "error": f"Invalid file type. Allowed: {', '.join(allowed_extensions)}"
            }), 400
        
        # 4. Baca file
        file_content = file.read()
        
        # 5. Upload ke Supabase Storage dengan nama random (tanpa user_id)
        bucket_name = 'TobilFotoProfil'
        unique_filename = f"photo_{uuid.uuid4().hex[:16]}.{file_ext}"
        
        # Upload foto baru (no delete, just new file)
        supabase.storage.from_(bucket_name).upload(
            unique_filename,
            file_content,
            file_options={"content-type": f"image/{file_ext}"}
        )
        
        # 6. Get public URL
        photo_url = supabase.storage.from_(bucket_name).get_public_url(unique_filename)
        
        return jsonify({
            "success": True,
            "message": "Profile photo uploaded successfully",
            "user_id": user_id,
            "photo_url": photo_url,
            "filename": unique_filename
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/profile/photo/<user_id>', methods=['GET'])
def get_profile_photo(user_id):
    """Get URL foto profil user"""
    try:
        bucket_name = 'TobilFotoProfil'
        
        # Cek semua ekstensi yang mungkin
        extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
        for ext in extensions:
            filename = f"{user_id}.{ext}"
            try:
                # Cek apakah file ada
                files = supabase.storage.from_(bucket_name).list()
                if any(f['name'] == filename for f in files):
                    photo_url = supabase.storage.from_(bucket_name).get_public_url(filename)
                    return jsonify({
                        "success": True,
                        "user_id": user_id,
                        "photo_url": photo_url,
                        "filename": filename
                    }), 200
            except:
                continue
        
        # Jika tidak ada foto
        return jsonify({
            "success": False,
            "message": "Profile photo not found",
            "user_id": user_id
        }), 404
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/profile/photo/<user_id>', methods=['DELETE'])
def delete_profile_photo(user_id):
    """Hapus foto profil user"""
    try:
        bucket_name = 'TobilFotoProfil'
        
        # Cek semua ekstensi yang mungkin dan hapus
        extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
        deleted = False
        for ext in extensions:
            filename = f"{user_id}.{ext}"
            try:
                supabase.storage.from_(bucket_name).remove([filename])
                deleted = True
            except:
                continue
        
        if deleted:
            return jsonify({
                "success": True,
                "message": "Profile photo deleted successfully",
                "user_id": user_id
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "Profile photo not found"
            }), 404
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# ============================================
# HEALTH CHECK
# ============================================

@app.route('/')
def home():
    return jsonify({
        "message": "Technoversary Backend API - Simple Version",
        "endpoints": {
            "signup": "POST /api/signup",
            "login": "POST /api/login",
            "google_auth": "POST /api/auth/google",
            "set_session": "POST /api/auth/session",
            "save_data": "POST /api/data/<table_name>",
            "get_data": "GET /api/data/<table_name>",
            "tumbler_detect": "POST /api/tumbler/detect",
            "waste_detect": "POST /api/waste/detect",
            "waste_categories": "GET /api/waste/categories",
            "waste_verify": "POST /api/waste/verify",
            "upload_profile_photo": "POST /api/profile/photo",
            "get_profile_photo": "GET /api/profile/photo/<user_id>",
            "delete_profile_photo": "DELETE /api/profile/photo/<user_id>"
        }
    })

if __name__ == '__main__':
    # Get port from environment (HF Spaces uses 7860)
    port = int(os.getenv('PORT', 7860))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)

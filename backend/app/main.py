"""
Technoversary Backend - Simple Version
Hanya 4 fungsi: Signup, Login, Simpan Data, Ambil Data
+ Computer Vision: Deteksi Tumbler
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client
from inference_sdk import InferenceHTTPClient
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

# Initialize Roboflow Client
roboflow_client = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key=os.getenv('ROBOFLOW_API_KEY')
)

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
        
        # 4. Save temporary untuk inference
        temp_path = f"/tmp/{unique_filename}"
        image.save(temp_path)
        
        # 5. Detect tumbler menggunakan Roboflow
        model_id = request.form.get('model_id', 'pendeteksi-tumbler/5')
        detection_result = roboflow_client.infer(temp_path, model_id=model_id)
        
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
        
        # 11. Cleanup
        os.remove(temp_path)
        
        # 12. Prepare response
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
            "save_data": "POST /api/data/<table_name>",
            "get_data": "GET /api/data/<table_name>",
            "tumbler_detect": "POST /api/tumbler/detect"
        }
    })

if __name__ == '__main__':
    # Get port from environment (HF Spaces uses 7860)
    port = int(os.getenv('PORT', 7860))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)

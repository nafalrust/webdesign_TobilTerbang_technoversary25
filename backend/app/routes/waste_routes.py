"""
Waste Detection Routes
Endpoint untuk deteksi sampah menggunakan model ML
"""
from flask import Blueprint, request, jsonify
import requests
import os
import base64
from io import BytesIO
from PIL import Image
import random

waste_bp = Blueprint('waste', __name__)

# Roboflow API configuration untuk waste detection
ROBOFLOW_API_KEY = os.getenv('ROBOFLOW_API_KEY')
# Model untuk waste classification (organic vs anorganic)
ROBOFLOW_WASTE_MODEL = os.getenv('ROBOFLOW_WASTE_MODEL', 'waste-classification/1')

# Kategori sampah yang bisa dipilih user
WASTE_CATEGORIES = [
    {"id": "organic", "label": "Organik (Sisa Makanan, Daun, dll)"},
    {"id": "anorganic", "label": "Anorganik (Plastik, Logam, Kaca)"},
    {"id": "b3", "label": "Limbah B3 (Baterai, Lampu, Obat)"},
    {"id": "paper", "label": "Kertas & Kardus"},
    {"id": "electronic", "label": "Elektronik (E-Waste)"}
]

def get_waste_category_from_prediction(prediction):
    """
    Mapping prediction dari model ke kategori sampah
    Model akan return organic atau anorganic, tapi kita simpan sebagai kategori lebih spesifik
    """
    # Ini adalah kategori dasar dari model
    predicted = prediction.lower()
    
    if 'organic' in predicted or 'food' in predicted or 'bio' in predicted:
        return 'organic'
    elif 'paper' in predicted or 'cardboard' in predicted:
        return 'paper'
    elif 'electronic' in predicted or 'battery' in predicted:
        return 'electronic'
    elif 'hazardous' in predicted or 'b3' in predicted:
        return 'b3'
    else:
        return 'anorganic'

@waste_bp.route('/detect', methods=['POST'])
def detect_waste():
    """
    Deteksi jenis sampah dari gambar
    
    Request:
    - image: base64 string atau file upload
    - use_mock: boolean (optional, untuk testing tanpa API key)
    
    Response:
    {
        "success": true,
        "detected_category": "organic",
        "confidence": 0.95,
        "categories": [...],
        "message": "Sampah terdeteksi sebagai Organik"
    }
    """
    try:
        use_mock = request.json.get('use_mock', False) if request.is_json else False
        
        # Check if image is provided
        image_data = None
        
        if request.is_json and 'image' in request.json:
            # Base64 image
            image_base64 = request.json['image']
            # Remove data URL prefix if present
            if 'base64,' in image_base64:
                image_base64 = image_base64.split('base64,')[1]
            image_data = image_base64
        elif 'image' in request.files:
            # File upload
            file = request.files['image']
            img = Image.open(file.stream)
            buffered = BytesIO()
            img.save(buffered, format="JPEG")
            image_data = base64.b64encode(buffered.getvalue()).decode()
        else:
            return jsonify({
                "success": False,
                "error": "No image provided"
            }), 400
        
        # Mock response untuk testing (jika tidak ada API key atau use_mock=true)
        if use_mock or not ROBOFLOW_API_KEY:
            # Random detection untuk testing
            mock_categories = ['organic', 'anorganic', 'paper']
            detected = random.choice(mock_categories)
            confidence = round(random.uniform(0.75, 0.98), 2)
            
            return jsonify({
                "success": True,
                "detected_category": detected,
                "confidence": confidence,
                "categories": WASTE_CATEGORIES,
                "message": f"Sampah terdeteksi sebagai {detected} (confidence: {confidence})",
                "mock": True
            })
        
        # Real API call to Roboflow
        try:
            roboflow_url = f"https://detect.roboflow.com/{ROBOFLOW_WASTE_MODEL}?api_key={ROBOFLOW_API_KEY}"
            
            response = requests.post(
                roboflow_url,
                data=image_data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'},
                timeout=10
            )
            
            if response.status_code != 200:
                raise Exception(f"Roboflow API error: {response.status_code}")
            
            result = response.json()
            
            # Parse result
            if 'predictions' in result and len(result['predictions']) > 0:
                # Get top prediction
                top_prediction = result['predictions'][0]
                detected_class = top_prediction.get('class', 'anorganic')
                confidence = top_prediction.get('confidence', 0.5)
                
                detected_category = get_waste_category_from_prediction(detected_class)
                
                return jsonify({
                    "success": True,
                    "detected_category": detected_category,
                    "confidence": confidence,
                    "categories": WASTE_CATEGORIES,
                    "raw_detection": detected_class,
                    "message": f"Sampah terdeteksi sebagai {detected_category}"
                })
            else:
                # No detection found, fallback to mock
                detected = 'anorganic'
                return jsonify({
                    "success": True,
                    "detected_category": detected,
                    "confidence": 0.6,
                    "categories": WASTE_CATEGORIES,
                    "message": "Tidak ada deteksi spesifik, menggunakan kategori default",
                    "fallback": True
                })
                
        except Exception as e:
            # Fallback to mock if API fails
            detected = random.choice(['organic', 'anorganic'])
            return jsonify({
                "success": True,
                "detected_category": detected,
                "confidence": 0.7,
                "categories": WASTE_CATEGORIES,
                "message": f"API error, menggunakan deteksi fallback",
                "error": str(e),
                "fallback": True
            })
            
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@waste_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all available waste categories"""
    return jsonify({
        "success": True,
        "categories": WASTE_CATEGORIES
    })

@waste_bp.route('/verify', methods=['POST'])
def verify_answer():
    """
    Verify user's answer for waste category
    
    Request:
    {
        "detected_category": "organic",
        "user_answer": "organic"
    }
    
    Response:
    {
        "success": true,
        "correct": true,
        "xp_earned": 100,
        "message": "Jawaban benar!"
    }
    """
    try:
        data = request.json
        detected_category = data.get('detected_category')
        user_answer = data.get('user_answer')
        
        if not detected_category or not user_answer:
            return jsonify({
                "success": False,
                "error": "Missing detected_category or user_answer"
            }), 400
        
        # Check if answer is correct
        is_correct = detected_category == user_answer
        
        # Calculate XP
        xp_earned = 100 if is_correct else 20  # Participation XP
        
        # Generate message
        if is_correct:
            messages = [
                "🎉 Sempurna! Jawabanmu benar!",
                "💚 Luar biasa! Kamu paham kategori sampah!",
                "✨ Benar sekali! Keep up the good work!",
                "🌟 Hebat! Pengetahuan sampahmu bagus!"
            ]
            message = random.choice(messages)
        else:
            correct_label = next(
                (cat['label'] for cat in WASTE_CATEGORIES if cat['id'] == detected_category),
                detected_category
            )
            message = f"❌ Kurang tepat. Sampah ini termasuk: {correct_label}"
        
        return jsonify({
            "success": True,
            "correct": is_correct,
            "xp_earned": xp_earned,
            "message": message,
            "correct_category": detected_category
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

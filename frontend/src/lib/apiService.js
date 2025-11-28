// API Service for Tumbler Detection and other API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class ApiService {
  // Detect Tumbler from Image
  async detectTumbler(imageFile, modelId = "pendeteksi-tumbler/5") {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("model_id", modelId);

      const response = await fetch(`${API_BASE_URL}/api/tumbler/detect`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Detection failed");
      }

      return {
        success: data.success,
        detected: data.detected,
        count: data.count,
        message: data.message,
        objects: data.objects || [],
        images: data.images || {},
        rawResult: data.raw_result,
      };
    } catch (error) {
      return {
        success: false,
        detected: false,
        error: error.message || "Terjadi kesalahan saat mendeteksi tumbler",
      };
    }
  }

  // Save data to database table
  async saveData(tableName, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/data/${tableName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save data");
      }

      return {
        success: true,
        data: result.data,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Terjadi kesalahan saat menyimpan data",
      };
    }
  }

  // Get data from database table
  async getData(tableName) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/data/${tableName}`);

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to get data");
      }

      return {
        success: true,
        data: result.data,
        count: result.count,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Terjadi kesalahan saat mengambil data",
      };
    }
  }

  // Helper: Validate image file
  validateImageFile(file) {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!file) {
      return { valid: false, error: "No file selected" };
    }

    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Invalid file type. Please upload JPG, PNG, or WEBP image.",
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: "File size too large. Maximum 10MB.",
      };
    }

    return { valid: true };
  }

  // Helper: Convert image to base64 preview
  async getImagePreview(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Detect waste from image
  async detectWaste(imageBase64, useMock = false) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/waste/detect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageBase64,
          use_mock: useMock,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Detection failed");
      }

      return {
        success: true,
        detectedCategory: data.detected_category,
        confidence: data.confidence,
        categories: data.categories,
        message: data.message,
        mock: data.mock,
        fallback: data.fallback,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Terjadi kesalahan saat mendeteksi sampah",
      };
    }
  }

  // Get waste categories
  async getWasteCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/waste/categories`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to get categories");
      }

      return {
        success: true,
        categories: data.categories,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Terjadi kesalahan saat mengambil kategori",
      };
    }
  }

  // Verify waste answer
  async verifyWasteAnswer(detectedCategory, userAnswer) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/waste/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          detected_category: detectedCategory,
          user_answer: userAnswer,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Verification failed");
      }

      return {
        success: true,
        correct: data.correct,
        xpEarned: data.xp_earned,
        message: data.message,
        correctCategory: data.correct_category,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Terjadi kesalahan saat verifikasi jawaban",
      };
    }
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;

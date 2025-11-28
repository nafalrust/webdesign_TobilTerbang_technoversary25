import { useState } from "react";
import { X, Upload, Camera, CheckCircle, XCircle, Loader } from "lucide-react";
import Button from "../ui/Button";
import apiService from "@/lib/apiService";

const TumblerDetectionModal = ({
  isOpen,
  onClose,
  onSuccess,
  missionTitle,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validation = apiService.validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setError("");
    setSelectedFile(file);
    setDetectionResult(null);

    // Create preview
    const previewUrl = await apiService.getImagePreview(file);
    setPreview(previewUrl);
  };

  const handleDetect = async () => {
    if (!selectedFile) {
      setError("Please select an image first");
      return;
    }

    setIsDetecting(true);
    setError("");

    try {
      const result = await apiService.detectTumbler(selectedFile);

      if (!result.success) {
        throw new Error(result.error || "Detection failed");
      }

      setDetectionResult(result);

      // If tumbler detected, call success callback after 2 seconds
      if (result.detected && onSuccess) {
        setTimeout(() => {
          onSuccess(result);
        }, 2000);
      }
    } catch (err) {
      setError(err.message || "Failed to detect tumbler");
    } finally {
      setIsDetecting(false);
    }
  };

  const resetModal = () => {
    setSelectedFile(null);
    setPreview(null);
    setDetectionResult(null);
    setError("");
    setIsDetecting(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-forest-card border-2 border-[#2E5C35] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-forest-card border-b border-[#2E5C35]/50 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Camera className="text-[#45FF90]" size={28} />
              Upload Bukti Tumbler
            </h2>
            {missionTitle && (
              <p className="text-sm text-[#A0C4A8] mt-1">
                Misi: {missionTitle}
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-[#A0C4A8] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Upload Area */}
          {!preview && (
            <div className="border-2 border-dashed border-[#2E5C35] rounded-xl p-8 text-center hover:border-[#45FF90] transition-colors">
              <input
                type="file"
                id="tumbler-upload"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <label
                htmlFor="tumbler-upload"
                className="cursor-pointer flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-[#2E5C35]/30 flex items-center justify-center">
                  <Upload className="text-[#45FF90]" size={32} />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">
                    Klik untuk upload foto
                  </p>
                  <p className="text-sm text-[#A0C4A8]">
                    JPG, PNG, atau WEBP (Max 10MB)
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Preview & Detection */}
          {preview && (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden border-2 border-[#2E5C35]">
                <img
                  src={
                    detectionResult?.images?.bbox_base64
                      ? `data:image/jpeg;base64,${detectionResult.images.bbox_base64}`
                      : preview
                  }
                  alt="Preview"
                  className="w-full h-auto"
                />
                {isDetecting && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="text-center">
                      <Loader
                        className="text-[#45FF90] animate-spin mx-auto mb-2"
                        size={48}
                      />
                      <p className="text-white font-semibold">
                        Mendeteksi tumbler...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Detection Result */}
              {detectionResult && (
                <div
                  className={`p-4 rounded-xl border-2 ${
                    detectionResult.detected
                      ? "bg-green-500/10 border-green-500/50"
                      : "bg-red-500/10 border-red-500/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {detectionResult.detected ? (
                      <>
                        <CheckCircle className="text-green-400" size={24} />
                        <div>
                          <p className="text-white font-bold">
                            Tumbler Terdeteksi! 🎉
                          </p>
                          <p className="text-sm text-green-300">
                            {detectionResult.message}
                          </p>
                          {detectionResult.count > 0 && (
                            <p className="text-sm text-green-300 mt-1">
                              Jumlah tumbler: {detectionResult.count}
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-400" size={24} />
                        <div>
                          <p className="text-white font-bold">
                            Tumbler Tidak Terdeteksi
                          </p>
                          <p className="text-sm text-red-300">
                            {detectionResult.message ||
                              "Pastikan tumbler terlihat jelas dalam foto"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={resetModal}
                  variant="secondary"
                  className="flex-1"
                >
                  Upload Ulang
                </Button>
                {!detectionResult && (
                  <Button
                    onClick={handleDetect}
                    variant="primary"
                    disabled={isDetecting}
                    className="flex-1"
                  >
                    {isDetecting ? "Mendeteksi..." : "Deteksi Tumbler"}
                  </Button>
                )}
                {detectionResult?.detected && (
                  <Button
                    onClick={handleClose}
                    variant="primary"
                    className="flex-1"
                  >
                    Selesai
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-[#2E5C35]/20 border border-[#2E5C35]/30 rounded-lg p-4">
            <p className="text-sm text-[#A0C4A8]">
              <span className="font-bold text-[#45FF90]">Tips:</span> Pastikan
              tumbler terlihat jelas dalam foto. Gunakan pencahayaan yang baik
              dan ambil foto dari jarak yang cukup dekat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TumblerDetectionModal;

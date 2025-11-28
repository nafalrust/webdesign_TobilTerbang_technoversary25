import { useState, useRef } from "react";
import { Camera, Upload, X, CheckCircle, XCircle, Loader2, HelpCircle } from "lucide-react";
import Button from "../ui/Button";
import apiService from "../../lib/apiService";

const WasteDetectionGame = ({ onScoreUpdate, onClose }) => {
  const [gameState, setGameState] = useState("intro"); // intro, capture, detecting, quiz, result
  const [capturedImage, setCapturedImage] = useState(null);
  const [detectedCategory, setDetectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const fileInputRef = useRef(null);

  const categoryColors = {
    organic: "bg-green-500 hover:bg-green-600 border-green-400",
    anorganic: "bg-orange-500 hover:bg-orange-600 border-orange-400",
    paper: "bg-yellow-500 hover:bg-yellow-600 border-yellow-400",
    b3: "bg-red-500 hover:bg-red-600 border-red-400",
    electronic: "bg-purple-500 hover:bg-purple-600 border-purple-400",
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setCapturedImage(e.target.result);
      setGameState("detecting");
      detectWaste(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const detectWaste = async (imageBase64) => {
    setIsLoading(true);
    try {
      const result = await apiService.detectWaste(imageBase64, true);

      if (result.success) {
        setDetectedCategory(result.detectedCategory);
        setCategories(result.categories);
        setGameState("quiz");
      } else {
        alert("Detection failed: " + result.error);
        setGameState("capture");
      }
    } catch (error) {
      console.error("Error detecting waste:", error);
      alert("Error connecting to server. Please try again.");
      setGameState("capture");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = async (categoryId) => {
    setSelectedAnswer(categoryId);
    setIsLoading(true);

    try {
      const result = await apiService.verifyWasteAnswer(detectedCategory, categoryId);

      if (result.success) {
        setFeedback({
          correct: result.correct,
          message: result.message,
          xp: result.xpEarned,
        });

        if (result.correct) {
          setScore((prev) => prev + result.xpEarned);
        }

        setGameState("result");
      } else {
        alert("Verification failed: " + result.error);
      }
    } catch (error) {
      console.error("Error verifying answer:", error);
      alert("Error verifying answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextRound = () => {
    if (round >= totalRounds) {
      // Game complete
      if (onScoreUpdate) {
        onScoreUpdate(score);
      }
      alert(`Game selesai! Total Score: ${score} XP`);
      resetGame();
    } else {
      // Next round
      setRound((prev) => prev + 1);
      setCapturedImage(null);
      setDetectedCategory(null);
      setSelectedAnswer(null);
      setFeedback(null);
      setGameState("capture");
    }
  };

  const resetGame = () => {
    setRound(1);
    setScore(0);
    setCapturedImage(null);
    setDetectedCategory(null);
    setSelectedAnswer(null);
    setFeedback(null);
    setGameState("intro");
  };

  const renderIntro = () => (
    <div className="text-center space-y-6 p-8">
      <div className="text-6xl mb-4">🗑️♻️</div>
      <h2 className="text-3xl font-bold text-[#45FF90] mb-4">
        Level 1: Waste Detective
      </h2>
      <div className="bg-[#020604]/80 backdrop-blur-sm border border-[#45FF90]/20 rounded-xl p-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-white mb-4">Cara Bermain:</h3>
        <div className="space-y-3 text-left text-gray-300">
          <p className="flex items-start gap-3">
            <span className="text-[#45FF90] font-bold">1.</span>
            <span>Ambil atau upload foto sampah di sekitarmu</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-[#45FF90] font-bold">2.</span>
            <span>AI akan mendeteksi jenis sampahnya</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-[#45FF90] font-bold">3.</span>
            <span>Pilih kategori sampah yang benar dari pilihan yang tersedia</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-[#45FF90] font-bold">4.</span>
            <span>Dapatkan XP untuk setiap jawaban benar!</span>
          </p>
        </div>
        <div className="mt-6 p-4 bg-[#45FF90]/10 border border-[#45FF90]/30 rounded-lg">
          <p className="text-sm text-[#45FF90]">
            ⚡ Bonus: Jawaban benar = 100 XP per round!
          </p>
        </div>
      </div>
      <Button
        onClick={() => setGameState("capture")}
        className="bg-[#45FF90] hover:bg-[#3de080] text-[#020604] font-bold py-4 px-8 text-lg"
      >
        Mulai Bermain
      </Button>
    </div>
  );

  const renderCapture = () => (
    <div className="text-center space-y-6 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-lg font-semibold text-white">
          Round {round}/{totalRounds}
        </div>
        <div className="text-xl font-bold text-[#45FF90]">Score: {score} XP</div>
      </div>

      <div className="text-4xl mb-4">📸</div>
      <h2 className="text-2xl font-bold text-white mb-4">
        Upload Foto Sampah
      </h2>
      <p className="text-gray-400 mb-6">
        Ambil atau upload foto sampah untuk dideteksi
      </p>

      <div className="flex flex-col items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <Button
          onClick={() => fileInputRef.current?.click()}
          className="bg-[#45FF90] hover:bg-[#3de080] text-[#020604] font-bold py-4 px-8 gap-2"
        >
          <Upload size={20} />
          Upload Foto
        </Button>

        {/* Camera capture for mobile devices */}
        <Button
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.capture = "environment";
            input.onchange = (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const event = { target: { files: [file] } };
                handleImageUpload(event);
              }
            };
            input.click();
          }}
          className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 gap-2"
        >
          <Camera size={20} />
          Ambil Foto
        </Button>
      </div>
    </div>
  );

  const renderDetecting = () => (
    <div className="text-center space-y-6 p-8">
      <Loader2 className="w-16 h-16 text-[#45FF90] mx-auto animate-spin" />
      <h2 className="text-2xl font-bold text-white">Mendeteksi Sampah...</h2>
      <p className="text-gray-400">AI sedang menganalisis gambar</p>
      {capturedImage && (
        <div className="max-w-md mx-auto">
          <img
            src={capturedImage}
            alt="Captured waste"
            className="w-full rounded-lg border-2 border-[#45FF90]/30"
          />
        </div>
      )}
    </div>
  );

  const renderQuiz = () => (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-lg font-semibold text-white">
          Round {round}/{totalRounds}
        </div>
        <div className="text-xl font-bold text-[#45FF90]">Score: {score} XP</div>
      </div>

      {capturedImage && (
        <div className="max-w-sm mx-auto mb-6">
          <img
            src={capturedImage}
            alt="Captured waste"
            className="w-full rounded-lg border-2 border-[#45FF90]/30"
          />
        </div>
      )}

      <div className="text-center mb-6">
        <HelpCircle className="w-12 h-12 text-[#45FF90] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Kategori Sampah Apa Ini?
        </h2>
        <p className="text-gray-400">Pilih kategori yang paling tepat</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleAnswerSelect(category.id)}
            disabled={isLoading}
            className={`
              ${categoryColors[category.id] || "bg-gray-500 hover:bg-gray-600"}
              text-white font-semibold py-4 px-6 rounded-xl
              border-2 transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:scale-105 active:scale-95
            `}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="text-center space-y-6 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-lg font-semibold text-white">
          Round {round}/{totalRounds}
        </div>
        <div className="text-xl font-bold text-[#45FF90]">Score: {score} XP</div>
      </div>

      {feedback?.correct ? (
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
      ) : (
        <XCircle className="w-20 h-20 text-red-500 mx-auto" />
      )}

      <div
        className={`p-6 rounded-xl ${
          feedback?.correct
            ? "bg-green-500/20 border-2 border-green-500"
            : "bg-red-500/20 border-2 border-red-500"
        }`}
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          {feedback?.correct ? "Benar! 🎉" : "Kurang Tepat"}
        </h2>
        <p className="text-gray-200 text-lg">{feedback?.message}</p>
        <p className="text-[#45FF90] font-bold text-xl mt-4">
          +{feedback?.xp} XP
        </p>
      </div>

      {capturedImage && (
        <div className="max-w-sm mx-auto">
          <img
            src={capturedImage}
            alt="Captured waste"
            className="w-full rounded-lg border-2 border-[#45FF90]/30"
          />
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <Button
          onClick={handleNextRound}
          className="bg-[#45FF90] hover:bg-[#3de080] text-[#020604] font-bold py-4 px-8"
        >
          {round >= totalRounds ? "Selesai" : "Round Berikutnya"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#020604] border-2 border-[#45FF90] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {gameState === "intro" && renderIntro()}
        {gameState === "capture" && renderCapture()}
        {gameState === "detecting" && renderDetecting()}
        {gameState === "quiz" && renderQuiz()}
        {gameState === "result" && renderResult()}
      </div>
    </div>
  );
};

export default WasteDetectionGame;

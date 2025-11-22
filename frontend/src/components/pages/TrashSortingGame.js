import { useState, useEffect, useCallback } from "react";
import { Trophy, RefreshCcw } from "lucide-react";

const TRASH_ITEMS = [
  {
    id: 1,
    name: "Botol Plastik",
    type: "plastic",
    icon: "🥤",
    color:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  },
  {
    id: 2,
    name: "Kulit Pisang",
    type: "organic",
    icon: "🍌",
    color:
      "bg-green-100 dark:bg-[#2E5C35]/30 text-green-600 dark:text-[#45FF90]",
  },
  {
    id: 3,
    name: "Kaleng Soda",
    type: "metal",
    icon: "🥫",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    id: 4,
    name: "Kardus Bekas",
    type: "paper",
    icon: "📦",
    color:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  },
  {
    id: 5,
    name: "Apel Busuk",
    type: "organic",
    icon: "🍎",
    color:
      "bg-green-100 dark:bg-[#2E5C35]/30 text-green-600 dark:text-[#45FF90]",
  },
  {
    id: 6,
    name: "Kantong Kresek",
    type: "plastic",
    icon: "🛍️",
    color:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  },
];

const BINS = [
  {
    type: "organic",
    label: "Organik",
    color: "bg-[#2E5C35] border-[#45FF90]",
    hover: "hover:bg-[#45FF90] hover:text-[#020604]",
  },
  {
    type: "plastic",
    label: "Plastik",
    color: "bg-orange-500 border-orange-400",
    hover: "hover:bg-orange-400",
  },
  {
    type: "metal",
    label: "Logam/Kaca",
    color: "bg-blue-500 border-blue-400",
    hover: "hover:bg-blue-400",
  },
  {
    type: "paper",
    label: "Kertas",
    color: "bg-yellow-500 border-yellow-400",
    hover: "hover:bg-yellow-400",
  },
];

const TrashSortingGame = ({ onScoreUpdate }) => {
  const [score, setScore] = useState(0);
  const [currentTrash, setCurrentTrash] = useState(TRASH_ITEMS[0]);
  const [message, setMessage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer reaching 0, trigger game over
            setIsPlaying(false);
            setIsGameOver(true);
            if (onScoreUpdate) onScoreUpdate(score);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, onScoreUpdate]);

  const spawnTrash = useCallback(() => {
    const random = TRASH_ITEMS[Math.floor(Math.random() * TRASH_ITEMS.length)];
    setCurrentTrash(random);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setIsPlaying(true);
    // Spawn trash using the callback
    spawnTrash();
  };

  const handleSort = (binType) => {
    if (!isPlaying) return;

    let isCorrect = false;

    if (currentTrash.type === binType) isCorrect = true;

    if (isCorrect) {
      setScore((prev) => prev + 100);
      setMessage({ text: "+100 Benar!", type: "success" });
      spawnTrash();
    } else {
      setScore((prev) => Math.max(0, prev - 50));
      setMessage({ text: "-50 Salah!", type: "error" });
    }

    setTimeout(() => setMessage(null), 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-[#112218] rounded-3xl shadow-2xl border-4 border-[#2E5C35] overflow-hidden relative min-h-[500px] flex flex-col">
        {/* Header HUD */}
        <div className="bg-[#2E5C35] p-4 flex justify-between items-center text-white">
          <div className="font-bold text-xl flex items-center gap-2">
            <Trophy size={20} className="text-[#45FF90]" />
            Score: {score}
          </div>
          <div
            className={`font-mono text-xl font-bold px-4 py-1 rounded-full ${
              timeLeft < 10 ? "bg-red-500 animate-pulse" : "bg-[#112218]"
            }`}
          >
            {timeLeft}s
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 bg-[#F2F9F5] dark:bg-[#020604] relative flex flex-col items-center justify-center p-4">
          {!isPlaying && !isGameOver && (
            <div className="text-center z-10">
              <h2 className="text-3xl font-bold text-[#0B1410] dark:text-white mb-4">
                Trash Sorter Game
              </h2>
              <p className="text-slate-600 dark:text-[#A0C4A8] mb-6">
                Pilah sampah ke tong yang benar secepat mungkin!
              </p>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-[#2E5C35] hover:bg-[#45FF90] hover:text-[#020604] text-white rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all"
              >
                Mulai Game
              </button>
            </div>
          )}

          {isGameOver && (
            <div className="text-center z-10 animate-in zoom-in duration-300">
              <h2 className="text-4xl font-bold text-[#0B1410] dark:text-white mb-2">
                Waktu Habis!
              </h2>
              <p className="text-2xl text-[#2E5C35] dark:text-[#45FF90] font-bold mb-6">
                Skor Akhir: {score}
              </p>
              <button
                onClick={startGame}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-[#2E5C35] hover:bg-[#45FF90] hover:text-[#020604] text-white rounded-xl font-bold transition-all"
              >
                <RefreshCcw size={20} /> Main Lagi
              </button>
            </div>
          )}

          {isPlaying && (
            <>
              {/* Floating Message */}
              {message && (
                <div
                  className={`absolute top-10 font-bold text-2xl animate-bounce ${
                    message.type === "success"
                      ? "text-[#2E5C35] dark:text-[#45FF90]"
                      : "text-red-500"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Current Trash Item */}
              <div className="mb-12 animate-in slide-in-from-top duration-500 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-xl border-4 border-white dark:border-[#112218] ${currentTrash.color}`}
                >
                  {currentTrash.icon}
                </div>
                <p className="text-center mt-4 font-bold text-[#0B1410] dark:text-[#A0C4A8] bg-white/50 dark:bg-[#112218]/50 rounded-full py-1 backdrop-blur-sm">
                  {currentTrash.name}
                </p>
              </div>

              {/* Bins */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-4 absolute bottom-4">
                {BINS.map((bin) => (
                  <button
                    key={bin.type}
                    onClick={() => handleSort(bin.type)}
                    className={`${bin.color} ${bin.hover} text-white py-8 rounded-xl font-bold shadow-lg border-b-4 active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center gap-2`}
                  >
                    <div className="w-12 h-1 bg-black/20 rounded-full"></div>
                    {bin.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <p className="text-center mt-4 text-slate-500 dark:text-[#A0C4A8] text-sm">
        Tips: Klik tong sampah yang sesuai dengan jenis sampah di layar.
      </p>
    </div>
  );
};

export default TrashSortingGame;

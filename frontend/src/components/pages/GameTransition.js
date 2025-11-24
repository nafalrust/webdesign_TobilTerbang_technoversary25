import { useEffect, useState } from "react";
import { Leaf, Sparkles } from "lucide-react";

// Generate particles outside component to avoid purity issues
const generateParticles = () => {
  return [...Array(20)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 2,
    animationDuration: 3 + Math.random() * 2,
  }));
};

const GameTransition = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("entering"); // entering, loading, complete
  // Use lazy initialization to generate particles only once
  const [particles] = useState(() => generateParticles());

  useEffect(() => {
    // Phase 1: Entering animation
    const enterTimer = setTimeout(() => {
      setPhase("loading");
    }, 800);

    // Phase 2: Loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setPhase("complete");
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Phase 3: Complete and transition out
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-deep-black via-[#0B1410] to-forest-card animate-pulse">
        {/* Animated particles */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-[#45FF90] rounded-full opacity-30 animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020604_100%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Logo Animation */}
        <div
          className={`transition-all duration-1000 ${
            phase === "entering"
              ? "scale-50 opacity-0"
              : "scale-100 opacity-100"
          }`}
        >
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 blur-2xl bg-[#45FF90]/30 animate-pulse"></div>
            <div className="relative bg-linear-to-br from-[#2E5C35] to-forest-card p-8 rounded-3xl border-2 border-[#45FF90]/30 shadow-2xl">
              <Leaf size={64} className="text-[#45FF90]" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-5xl md:text-6xl font-bold mb-4 transition-all duration-1000 delay-300 ${
            phase === "entering"
              ? "translate-y-10 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <span className="text-white">Entering </span>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#45FF90] to-[#2E5C35]">
            Game World
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-[#A0C4A8] text-lg mb-12 transition-all duration-1000 delay-500 ${
            phase === "entering"
              ? "translate-y-10 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          Memuat misi dan tantangan hijau untukmu...
        </p>

        {/* Progress Bar */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            phase === "entering"
              ? "translate-y-10 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <div className="bg-forest-card rounded-full h-3 overflow-hidden border border-[#2E5C35] mb-4 shadow-inner">
            <div
              className="h-full bg-linear-to-r from-[#2E5C35] via-[#45FF90] to-[#2E5C35] transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#45FF90] font-mono font-bold">
              {progress}%
            </span>
            <span className="text-[#A0C4A8] flex items-center gap-1">
              <Sparkles size={14} className="animate-pulse" />
              Loading...
            </span>
          </div>
        </div>

        {/* Status Messages */}
        <div
          className={`mt-8 text-[#2E5C35] text-sm font-mono transition-all duration-500 ${
            phase === "complete" ? "opacity-100" : "opacity-0"
          }`}
        >
          ✓ Misi dimuat • ✓ Level siap • ✓ Mari bermain!
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#45FF90]/20 rounded-tl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#45FF90]/20 rounded-br-3xl"></div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GameTransition;

import { useState } from "react";
import { Leaf, Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import authService from "@/lib/authService";

const AuthPage = ({ onAuthSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let result;

      if (isLogin) {
        result = await authService.login(formData.email, formData.password);
      } else {
        result = await authService.signup(
          formData.email,
          formData.password,
          formData.full_name
        );
      }

      if (!result.success) {
        throw new Error(result.error);
      }

      // Call success callback with user data
      onAuthSuccess(result.user, result.token);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ email: "", password: "", full_name: "" });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden">
      {/* Animated Background - Similar to GameTransition */}
      <div className="absolute inset-0 bg-linear-to-br from-deep-black via-[#0B1410] to-forest-card">
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#45FF90] rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020604_100%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-flex mb-4">
            <div className="absolute inset-0 blur-2xl bg-[#45FF90]/30 animate-pulse"></div>
            <div className="relative bg-linear-to-br from-[#2E5C35] to-forest-card p-6 rounded-3xl border-2 border-[#45FF90]/30 shadow-2xl">
              <Leaf size={48} className="text-[#45FF90]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-white">Eco</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#45FF90] to-[#2E5C35]">
              Quest
            </span>
          </h1>
          <p className="text-[#A0C4A8]">
            {isLogin
              ? "Selamat datang kembali!"
              : "Bergabung dengan misi hijau"}
          </p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-forest-card/80 backdrop-blur-xl border-2 border-[#2E5C35]/30 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name (Only for Sign Up) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[#A0C4A8] text-sm font-medium flex items-center gap-2">
                  <User size={16} />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-[#0B1410] border border-[#2E5C35]/50 rounded-lg text-white placeholder-[#A0C4A8]/50 focus:outline-none focus:border-[#45FF90] focus:ring-2 focus:ring-[#45FF90]/20 transition-all"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[#A0C4A8] text-sm font-medium flex items-center gap-2">
                <Mail size={16} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#0B1410] border border-[#2E5C35]/50 rounded-lg text-white placeholder-[#A0C4A8]/50 focus:outline-none focus:border-[#45FF90] focus:ring-2 focus:ring-[#45FF90]/20 transition-all"
                placeholder="nama@email.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[#A0C4A8] text-sm font-medium flex items-center gap-2">
                <Lock size={16} />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#0B1410] border border-[#2E5C35]/50 rounded-lg text-white placeholder-[#A0C4A8]/50 focus:outline-none focus:border-[#45FF90] focus:ring-2 focus:ring-[#45FF90]/20 transition-all"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0C4A8] hover:text-[#45FF90] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full py-3! text-base! font-bold relative overflow-hidden"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles size={18} className="animate-spin" />
                  Memproses...
                </span>
              ) : (
                <span>{isLogin ? "Masuk" : "Daftar"}</span>
              )}
            </Button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-[#A0C4A8] text-sm">
              {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
              <button
                onClick={toggleAuthMode}
                className="text-[#45FF90] font-bold hover:underline transition-all"
              >
                {isLogin ? "Daftar sekarang" : "Masuk di sini"}
              </button>
            </p>
          </div>

          {/* Back Button */}
          <div className="mt-4 text-center">
            <button
              onClick={onBack}
              className="text-[#A0C4A8] text-sm hover:text-[#45FF90] transition-colors"
            >
              ← Kembali ke beranda
            </button>
          </div>
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

export default AuthPage;

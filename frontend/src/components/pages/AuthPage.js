import { useState, useRef, useEffect } from "react";
import { Leaf, Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import authService from "@/lib/authService";
import { GoogleLogin } from "@react-oauth/google";

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

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.loginWithGoogle(
        credentialResponse.credential
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      // Call success callback with user data
      onAuthSuccess(result.user, result.token);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat login dengan Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Login dengan Google gagal. Silakan coba lagi.");
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ email: "", password: "", full_name: "" });
  };

  // Ref untuk hidden Google button
  const googleButtonRef = useRef(null);

  const handleCustomGoogleClick = () => {
    // Trigger click pada hidden Google button
    const googleBtn = googleButtonRef.current?.querySelector('[role="button"]');
    if (googleBtn) {
      googleBtn.click();
    }
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
      <div className="relative z-10 w-full max-w-sm mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-7">
          <div className="relative inline-flex mb-3">
            <div className="absolute inset-0 blur-xl bg-[#45FF90]/30 animate-pulse"></div>
            <div className="relative bg-linear-to-br from-[#2E5C35] to-forest-card p-4 rounded-2xl border-2 border-[#45FF90]/30 shadow-2xl">
              <Leaf size={32} className="text-[#45FF90]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-1.5">
            <span className="text-white">Eco</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#45FF90] to-[#2E5C35]">
              Quest
            </span>
          </h1>
          <p className="text-sm text-[#A0C4A8]">
            {isLogin
              ? "Selamat datang kembali!"
              : "Bergabung dengan misi hijau"}
          </p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-forest-card/80 backdrop-blur-xl border-2 border-[#2E5C35]/30 rounded-xl p-7 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name (Only for Sign Up) */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-[#A0C4A8] text-xs font-medium flex items-center gap-1.5">
                  <User size={15} />
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#0B1410] border border-[#2E5C35]/50 rounded-lg text-white placeholder-[#A0C4A8]/50 focus:outline-none focus:border-[#45FF90] focus:ring-2 focus:ring-[#45FF90]/20 transition-all"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[#A0C4A8] text-xs font-medium flex items-center gap-1.5">
                <Mail size={15} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3.5 py-2.5 text-sm bg-[#0B1410] border border-[#2E5C35]/50 rounded-lg text-white placeholder-[#A0C4A8]/50 focus:outline-none focus:border-[#45FF90] focus:ring-2 focus:ring-[#45FF90]/20 transition-all"
                placeholder="nama@email.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[#A0C4A8] text-xs font-medium flex items-center gap-1.5">
                <Lock size={15} />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-[#0B1410] border border-[#2E5C35]/50 rounded-lg text-white placeholder-[#A0C4A8]/50 focus:outline-none focus:border-[#45FF90] focus:ring-2 focus:ring-[#45FF90]/20 transition-all"
                  placeholder="Masukkan password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A0C4A8] hover:text-[#45FF90] transition-colors"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
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
              className="w-full py-2.5! text-sm! font-bold relative overflow-hidden flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles size={17} className="animate-spin" />
                  Memproses...
                </span>
              ) : (
                <span>{isLogin ? "Masuk" : "Daftar"}</span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#2E5C35]/30"></div>
            <span className="text-[#A0C4A8] text-xs">atau</span>
            <div className="flex-1 h-px bg-[#2E5C35]/30"></div>
          </div>

          {/* Google Sign In - Custom Styled Button */}
          <div className="mt-5">
            <button
              type="button"
              onClick={handleCustomGoogleClick}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-2.5 text-sm bg-[#0B1410] border-2 border-[#2E5C35]/50 rounded-lg text-[#45FF90] font-semibold hover:border-[#45FF90] hover:bg-[#0B1410]/80 transition-all duration-300 hover:shadow-lg hover:shadow-[#45FF90]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4.5 h-4.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>
                {isLogin ? "Login dengan Google" : "Daftar dengan Google"}
              </span>
            </button>

            {/* Hidden Google Login Button */}
            <div ref={googleButtonRef} className="hidden">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
              />
            </div>
          </div>

          {/* Toggle Auth Mode */}
          <div className="mt-4 text-center">
            <p className="text-[#A0C4A8] text-xs">
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
          <div className="mt-3 text-center">
            <button
              onClick={onBack}
              className="text-[#A0C4A8] text-xs hover:text-[#45FF90] transition-colors"
            >
              ← Kembali ke beranda
            </button>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#45FF90]/20 rounded-tl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#45FF90]/20 rounded-br-3xl"></div>
    </div>
  );
};

export default AuthPage;

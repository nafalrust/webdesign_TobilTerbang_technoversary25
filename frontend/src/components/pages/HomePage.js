import { Gamepad2, Users, MapPin, ShieldCheck } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

// 1. HOME PAGE
const HomePage = ({ setPage }) => (
  <div className="pb-20">
    {/* Hero Section with INTENSE Palette Gradients */}
    <section className="relative min-h-[100vh] flex items-center justify-center text-center px-4">
      {/* Animated Background Glows - Customized with Palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {/* Top Right - Neon Pop Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-[#45FF90]/20 dark:bg-[#45FF90]/10 rounded-full blur-[120px] animate-pulse"></div>
        {/* Bottom Left - Deep Leaf Green */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#2E5C35]/30 dark:bg-[#2E5C35]/20 rounded-full blur-[100px]"></div>
        {/* Center - Subtle White/Dark Moss */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-white/30 dark:bg-forest-card rounded-full blur-[80px] opacity-50"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 dark:bg-forest-card/50 border border-[#2E5C35]/20 dark:border-[#45FF90]/20 backdrop-blur-md shadow-sm animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#45FF90] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#45FF90]"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E5C35] dark:text-[#45FF90]">
            Gamified Action Platform
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] text-slate-900 dark:text-[#F2F9F5] drop-shadow-sm">
          Level Up Your <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2E5C35] via-[#45FF90] to-[#2E5C35] animate-gradient-x bg-size-[200%_auto]">
            Planet
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 dark:text-[#A0C4A8] max-w-2xl mx-auto font-light leading-relaxed">
          Mainkan gamenya, selamatkan dunianya. Ekosistem aksi lingkungan
          pertama dengan sistem{" "}
          <span className="font-bold text-[#2E5C35] dark:text-[#45FF90]">
            Real-World XP
          </span>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
          <Button
            variant="primary"
            onClick={() => setPage("game")}
            className="text-lg px-8"
          >
            <Gamepad2 size={24} /> Enter Game World
          </Button>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-[#2E5C35] dark:text-[#45FF90] animate-bounce z-10">
        ▼ Scroll untuk Melihat Bumi
      </div>
    </section>

    {/* 3D Earth & Stats Section */}
    <section className="relative min-h-[100vh] w-full flex items-center justify-center">
      {/* Gradient Background - matching current theme */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-200/50 via-slate-100 to-white dark:from-[#1e293b] dark:via-[#0f172a] dark:to-[#0B1410]"></div>

      {/* 3D Earth Container - positioned to overlap with hero */}
      <div className="absolute top-0 left-0 w-full h-full -translate-y-[25%] md:-translate-y-[25%] scale-110 md:scale-120 z-[1] pointer-events-none">
        <div className="w-full h-full">
          <iframe
            title="Earth"
            frameBorder="0"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking="true"
            execution-while-out-of-viewport="true"
            execution-while-not-rendered="true"
            web-share="true"
            src="https://sketchfab.com/models/41fc80d85dfd480281f21b74b2de2faa/embed?autospin=1&autostart=1&transparent=1&ui_hint=0"
            className="w-full h-full border-none"
          ></iframe>
        </div>
      </div>

      {/* Stats Grid - positioned around the Earth */}
      <div className="relative z-[5] w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left Panel - Stats Cards */}
          <div className="space-y-5 md:mt-[-100px]">
            <div className="group bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-xl border border-[#2E5C35]/20 dark:border-[#45FF90]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-[#45FF90] hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-bold text-[#2E5C35] dark:text-[#45FF90]">
                12.5K
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-[#A0C4A8] mt-2">
                Active Players
              </div>
            </div>
            <div className="group bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-xl border border-[#2E5C35]/20 dark:border-[#45FF90]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-[#45FF90] hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-bold text-[#2E5C35] dark:text-[#45FF90]">
                8,430
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-[#A0C4A8] mt-2">
                Trees Planted
              </div>
            </div>
          </div>

          {/* Center Spacer - untuk Earth */}
          <div className="hidden md:block"></div>

          {/* Right Panel - Stats Cards */}
          <div className="space-y-5 md:mt-[-100px]">
            <div className="group bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-xl border border-[#2E5C35]/20 dark:border-[#45FF90]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-[#45FF90] hover:translate-y-1 transition-all duration-300">
              <div className="text-4xl font-bold text-[#2E5C35] dark:text-[#45FF90]">
                50T
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-[#A0C4A8] mt-2">
                Carbon Saved
              </div>
            </div>
            <div className="group bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-xl border border-[#2E5C35]/20 dark:border-[#45FF90]/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-[#45FF90] hover:translate-y-1 transition-all duration-300">
              <div className="text-4xl font-bold text-[#2E5C35] dark:text-[#45FF90]">
                25K+
              </div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-[#A0C4A8] mt-2">
                Quests Done
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="max-w-7xl mx-auto px-4 mt-24">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="group">
          <div className="h-14 w-14 bg-linear-to-br from-[#2E5C35] to-[#0B1410] rounded-2xl flex items-center justify-center text-[#45FF90] mb-6 shadow-lg shadow-[#2E5C35]/20 group-hover:scale-110 transition-transform border border-[#45FF90]/20">
            <Gamepad2 size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-[#0B1410] dark:text-white">
            Edu-Game for Kids
          </h3>
          <p className="text-slate-600 dark:text-[#A0C4A8] leading-relaxed">
            Belajar memilah sampah dan ekosistem laut melalui mini-game
            interaktif yang seru dengan visual yang menarik.
          </p>
        </Card>

        <Card className="group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-24 bg-[#45FF90]/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-[#45FF90]/20"></div>
          <div className="h-14 w-14 bg-linear-to-br from-[#45FF90] to-[#2E5C35] rounded-2xl flex items-center justify-center text-deep-black mb-6 shadow-lg shadow-[#45FF90]/20 group-hover:scale-110 transition-transform relative z-10 border border-[#45FF90]/20">
            <MapPin size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-[#0B1410] dark:text-white relative z-10">
            Real World Quests
          </h3>
          <p className="text-slate-600 dark:text-[#A0C4A8] leading-relaxed relative z-10">
            Tantangan nyata untuk remaja & dewasa. Tanam pohon, bersihkan
            pantai, dapatkan XP sungguhan.
          </p>
        </Card>

        <Card className="group">
          <div className="h-14 w-14 bg-linear-to-br from-teal-400 to-[#2E5C35] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform border border-white/10">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-[#0B1410] dark:text-white">
            AI Verification
          </h3>
          <p className="text-slate-600 dark:text-[#A0C4A8] leading-relaxed">
            Upload foto aksi lingkunganmu. AI kami memverifikasi validitas aksi
            dan memberikan reward instan.
          </p>
        </Card>
      </div>
    </section>
  </div>
);

export default HomePage;

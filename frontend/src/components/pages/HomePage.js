import { Gamepad2, Users, MapPin, ShieldCheck } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

// 1. HOME PAGE
const HomePage = ({ setPage }) => (
  <div className="space-y-24 pb-20">
    {/* Hero Section with INTENSE Palette Gradients */}
    <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4">
      {/* Animated Background Glows - Customized with Palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {/* Top Right - Neon Pop Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-[#45FF90]/20 dark:bg-[#45FF90]/10 rounded-full blur-[120px] animate-pulse"></div>
        {/* Bottom Left - Deep Leaf Green */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#2E5C35]/30 dark:bg-[#2E5C35]/20 rounded-full blur-[100px]"></div>
        {/* Center - Subtle White/Dark Moss */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-white/30 dark:bg-[#112218] rounded-full blur-[80px] opacity-50"></div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 dark:bg-[#112218]/50 border border-[#2E5C35]/20 dark:border-[#45FF90]/20 backdrop-blur-md shadow-sm animate-fade-in-up">
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E5C35] via-[#45FF90] to-[#2E5C35] animate-gradient-x bg-[length:200%_auto]">
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
            onClick={() => setPage("content")}
            className="text-lg px-8"
          >
            <Gamepad2 size={24} /> Start Quest
          </Button>
          <Button
            variant="secondary"
            onClick={() => setPage("about")}
            className="text-lg px-8"
          >
            <Users size={24} /> Join Guild
          </Button>
        </div>

        {/* Glass Stats Bar - Using Palette Colors */}
        <div className="mt-16 p-1 rounded-2xl bg-white/30 dark:bg-[#020604]/40 backdrop-blur-xl border border-white/40 dark:border-[#45FF90]/20 inline-block shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#2E5C35]/10 dark:divide-[#45FF90]/10">
            {[
              { label: "Active Players", val: "12.5K" },
              { label: "Trees Planted", val: "8,430" },
              { label: "Carbon Saved", val: "50T" },
              { label: "Quests Done", val: "25K+" },
            ].map((stat, idx) => (
              <div key={idx} className="px-8 py-4 text-center">
                <h3 className="text-3xl font-bold text-[#0B1410] dark:text-white">
                  {stat.val}
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-[#2E5C35] dark:text-[#A0C4A8] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="group">
          <div className="h-14 w-14 bg-gradient-to-br from-[#2E5C35] to-[#0B1410] rounded-2xl flex items-center justify-center text-[#45FF90] mb-6 shadow-lg shadow-[#2E5C35]/20 group-hover:scale-110 transition-transform border border-[#45FF90]/20">
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
          <div className="h-14 w-14 bg-gradient-to-br from-[#45FF90] to-[#2E5C35] rounded-2xl flex items-center justify-center text-[#020604] mb-6 shadow-lg shadow-[#45FF90]/20 group-hover:scale-110 transition-transform relative z-10 border border-[#45FF90]/20">
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
          <div className="h-14 w-14 bg-gradient-to-br from-teal-400 to-[#2E5C35] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform border border-white/10">
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

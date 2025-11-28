import { Leaf, Users, Zap, ShieldCheck, Sparkles } from "lucide-react";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

// 2. ABOUT PAGE
const AboutPage = () => (
  <div className="relative max-w-5xl mx-auto px-4 py-12 space-y-16">
    {/* Animated Background Elements */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#45FF90] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slower"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-[#2E5C35] rounded-full mix-blend-screen filter blur-3xl opacity-12 animate-pulse-slower" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#45FF90] rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse-slower" style={{ animationDelay: '4s' }}></div>
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-[#45FF90] rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(69,255,144,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(69,255,144,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    </div>

    {/* Floating Animation Keyframes - Inject into head */}
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-30px) translateX(5px); }
      }
      
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(69, 255, 144, 0.3); }
        50% { box-shadow: 0 0 40px rgba(69, 255, 144, 0.6); }
      }
      
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-spin-slow {
        animation: spin-slow 8s linear infinite;
      }
      
      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
      
      .animate-bounce-slow {
        animation: bounce-slow 2s ease-in-out infinite;
      }
      
      .animate-fade-in {
        animation: fade-in 1s ease-out forwards;
      }
      
      .animate-pulse-slower {
        animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `}</style>
    <div className="relative text-center space-y-6 z-10">
      <div className="animate-bounce inline-block">
        <Badge>
          <Sparkles className="inline w-4 h-4 mr-1" />
          OUR MISSION
        </Badge>
      </div>
      <h2 className="text-5xl font-bold text-white animate-fade-in">
        Gamifying The Future
      </h2>
      <p className="text-xl text-[#A0C4A8] max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
        Menjembatani kesenjangan antara kesadaran digital dan aksi lingkungan
        nyata.
      </p>
    </div>

    {/* Team / Vision Card */}
    <div className="relative rounded-3xl overflow-hidden min-h-[400px] bg-[#0B1410] flex items-center justify-center group shadow-2xl border border-[#2E5C35]/30 hover:border-[#45FF90]/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(69,255,144,0.3)] z-10">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105 transform mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#020604] via-[#020604]/60 to-transparent"></div>
      
      {/* Animated Border Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#45FF90] via-[#2E5C35] to-[#45FF90] opacity-50 blur-xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 text-center text-white p-10 max-w-2xl">
        <div className="inline-block p-3 rounded-full bg-[#45FF90]/10 backdrop-blur-md mb-6 border border-[#45FF90]/30 animate-pulse-glow">
          <Leaf size={32} className="text-[#45FF90] animate-bounce-slow" />
        </div>
        <h3 className="text-4xl font-bold mb-6 group-hover:text-[#45FF90] transition-colors duration-300">
          Dibuat oleh Gen Z, Untuk Bumi
        </h3>
        <p className="text-lg text-[#A0C4A8] leading-relaxed">
          Kami percaya bahwa menyelamatkan bumi tidak harus membosankan. Dengan
          EcoQuest, setiap sampah yang dipungut dan setiap pohon yang ditanam
          adalah langkah menuju kemenangan bersama.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8 z-10 relative">
      <Card className="bg-gradient-to-br from-[#112218] to-[#2E5C35]/20 hover:from-[#1a3326] hover:to-[#2E5C35]/40 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(69,255,144,0.2)] border border-transparent hover:border-[#45FF90]/30">
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <Zap className="text-yellow-500 animate-pulse" /> Mengapa Gamifikasi?
        </h3>
        <p className="text-[#A0C4A8] leading-relaxed">
          Otak manusia menyukai reward. Dengan menerapkan sistem XP, Level, dan
          Leaderboard pada aksi lingkungan, kami menciptakan kebiasaan positif
          yang berkelanjutan. Bukan beban, tapi tantangan yang menyenangkan.
        </p>
      </Card>

      <div className="space-y-4">
        <Card className="flex items-center gap-6 py-4 bg-[#112218]/80 hover:bg-[#1a3326]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-transparent hover:border-[#45FF90]/20 group">
          <div className="bg-[#2E5C35]/10 p-4 rounded-full text-[#45FF90] group-hover:bg-[#45FF90]/20 group-hover:scale-110 transition-all duration-300">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg text-white group-hover:text-[#45FF90] transition-colors">
              Transparansi Total
            </h4>
            <p className="text-sm text-[#A0C4A8]">
              Setiap XP diverifikasi oleh AI dan komunitas.
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-6 py-4 bg-[#112218]/80 hover:bg-[#1a3326]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-transparent hover:border-[#45FF90]/20 group">
          <div className="bg-[#45FF90]/10 p-4 rounded-full text-[#45FF90] group-hover:bg-[#45FF90]/20 group-hover:scale-110 transition-all duration-300">
            <Users size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg text-white group-hover:text-[#45FF90] transition-colors">
              Komunitas Global
            </h4>
            <p className="text-sm text-[#A0C4A8]">
              Terhubung dengan Eco-Warriors di Leaderboard.
            </p>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export default AboutPage;

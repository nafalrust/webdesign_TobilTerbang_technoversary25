"use client";

import { Leaf, Gamepad2, Upload, Trophy, Users, Recycle, Sparkles } from "lucide-react";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useEffect } from "react";

// 2. ABOUT PAGE
const AboutPage = ({ setPage }) => {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-12");
          }
        });
      },
      { threshold: 0.2 }
    );

    const triggers = document.querySelectorAll(".scroll-trigger");
    triggers.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#45FF90] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slower"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#2E5C35] rounded-full mix-blend-screen filter blur-3xl opacity-12 animate-pulse-slower" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#45FF90] rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse-slower" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(69,255,144,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(69,255,144,0.03)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
      </div>

      {/* Floating Animation Keyframes */}
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

      {/* Main Content Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 space-y-24 sm:space-y-28 lg:space-y-32">
        
        {/* Header Section */}
        <section className="relative text-center space-y-6 sm:space-y-8 lg:space-y-10 z-10 pt-12 sm:pt-16 lg:pt-20">
          <div className="inline-block animate-bounce-slow">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#2E5C35]/30 border border-[#45FF90]/30 backdrop-blur-md shadow-lg shadow-[#45FF90]/10">
              <Sparkles className="w-4 h-4 text-[#45FF90] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#45FF90]">
                Tentang EcoQuest
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-ibm text-white animate-fade-in">
            Mengapa Kita Butuh <br className="hidden sm:block"/>
            <span className="text-light-sweep">EcoQuest?</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl font-inter text-[#A0C4A8] max-w-3xl mx-auto leading-relaxed animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
            Setiap hari, kamu buang <span className="font-bold text-[#45FF90]">0,5kg sampah</span>. Dalam setahun, itu <span className="font-bold text-[#45FF90]">182kg</span> — setara berat 2 manusia dewasa. Tapi siapa yang peduli kalau nggak ada rewardnya? 
            <span className="block mt-3 text-white font-semibold">Di sinilah EcoQuest hadir.</span>
          </p>
        </section>

        {/* How EcoQuest Works Section */}
        <section className="relative z-10 space-y-10 sm:space-y-12 lg:space-y-14">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold font-ibm text-white mb-3">
              Cara Kerja EcoQuest
            </h2>
            <p className="font-inter text-[#A0C4A8] text-sm sm:text-base">
              Tiga langkah sederhana untuk selamatkan bumi sambil bersenang-senang
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Card 1: Bermain */}
            <Card className="group scroll-trigger opacity-0 translate-y-12 transition-all duration-700 hover:shadow-2xl hover:shadow-[#45FF90]/30 hover:-translate-y-3 hover:border-[#45FF90]/50 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-[#45FF90]/5 via-transparent to-[#2E5C35]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
              <div className="h-14 w-14 sm:h-16 sm:w-16 bg-linear-to-br from-[#45FF90] to-[#2E5C35] rounded-2xl flex items-center justify-center text-deep-black mx-auto mb-4 sm:mb-6 shadow-lg shadow-[#45FF90]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-[#45FF90]/30">
                <Gamepad2 size={28} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-[#45FF90] transition-colors">
                Bermain
              </h3>
              <p className="text-[#A0C4A8] leading-relaxed group-hover:text-white/90 transition-colors text-sm sm:text-base">
                Mainkan mini-game seru untuk belajar pemilahan sampah yang benar. 
                Organik, anorganik, atau B3? Kamu akan jago!
              </p>
              </div>
            </Card>

            {/* Card 2: Upload */}
            <Card className="group scroll-trigger opacity-0 translate-y-12 transition-all duration-700 delay-100 hover:shadow-2xl hover:shadow-[#45FF90]/40 hover:-translate-y-3 hover:border-[#45FF90]/60 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-tl from-[#45FF90]/5 via-transparent to-[#2E5C35]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
              <div className="h-14 w-14 sm:h-16 sm:w-16 bg-linear-to-br from-[#45FF90] to-[#2E5C35] rounded-2xl flex items-center justify-center text-deep-black mx-auto mb-4 sm:mb-6 shadow-lg shadow-[#45FF90]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-[#45FF90]/30">
                <Upload size={28} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-[#45FF90] transition-colors">
                Upload
              </h3>
              <p className="text-[#A0C4A8] leading-relaxed group-hover:text-white/90 transition-colors text-sm sm:text-base">
                Foto aksi lingkunganmu (buang sampah, pakai tumbler, naik sepeda). 
                AI kami verifikasi dalam hitungan detik.
              </p>
              </div>
            </Card>

            {/* Card 3: XP & Reward */}
            <Card className="group scroll-trigger opacity-0 translate-y-12 transition-all duration-700 delay-200 hover:shadow-2xl hover:shadow-[#45FF90]/40 hover:-translate-y-3 hover:border-[#45FF90]/50 text-center sm:col-span-2 lg:col-span-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-[#45FF90]/5 via-transparent to-[#2E5C35]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
              <div className="h-14 w-14 sm:h-16 sm:w-16 bg-linear-to-br from-[#45FF90] to-[#2E5C35] rounded-2xl flex items-center justify-center text-deep-black mx-auto mb-4 sm:mb-6 shadow-lg shadow-[#45FF90]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border border-[#45FF90]/30">
                <Trophy size={28} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-[#45FF90] transition-colors">
                XP & Reward
              </h3>
              <p className="text-[#A0C4A8] leading-relaxed group-hover:text-white/90 transition-colors text-sm sm:text-base">
                Dapatkan XP, naik level, bersaing di leaderboard global. 
                Aksi nyata = reward konkret!
              </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Impact Metrics Section */}
        <section className="relative z-10 scroll-trigger opacity-0 translate-y-12 transition-all duration-700">
          <div className="group relative bg-linear-to-r from-[#0B1410]/80 via-[#1a2820]/80 to-[#0B1410]/80 backdrop-blur-md rounded-3xl border border-[#45FF90]/30 p-6 sm:p-8 lg:p-10 overflow-hidden hover:border-[#45FF90]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#45FF90]/20">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#45FF90]/5 blur-xl group-hover:bg-[#45FF90]/10 transition-all duration-500"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#45FF90]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#2E5C35]/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center space-y-8 sm:space-y-10 lg:space-y-12">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold font-ibm text-white mb-3">
                  Potensi Dampak Nyata
                </h2>
                <p className="font-inter text-[#A0C4A8] text-sm sm:text-base">
                  Proyeksi jika EcoQuest digunakan secara massal
                </p>
              </div>

              <div className="font-ibm grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/75" style={{ textShadow: "0 0 20px rgba(69, 255, 144, 0.5)" }}>
                      1000
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#A0C4A8]/80">
                    User Aktif
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/75" style={{ textShadow: "0 0 20px rgba(69, 255, 144, 0.5)" }}>
                      3
                    </h3>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/75" style={{ textShadow: "0 0 20px rgba(69, 255, 144, 0.5)" }}>ton</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#A0C4A8]/80">
                    Sampah Tertangani
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/75" style={{ textShadow: "0 0 20px rgba(69, 255, 144, 0.5)" }}>
                      30
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#A0C4A8]/80">
                    Hari Pertama
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/75" style={{ textShadow: "0 0 20px rgba(69, 255, 144, 0.5)" }}>
                      50K
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#A0C4A8]/80">
                    Quest Potensial
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#45FF90]/10">
                <p className="font-inter text-[#A0C4A8] italic text-sm sm:text-base max-w-3xl mx-auto">
                  "Jika 1000 user aktif bermain selama 30 hari pertama, maka kita bisa menangani hingga 3 ton sampah. Bayangkan dampaknya jika 1 juta orang ikut bermain..."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team/Founder Story Section */}
        <section className="relative z-10 scroll-trigger opacity-0 translate-y-12 transition-all duration-700">
          <div className="relative rounded-3xl overflow-hidden min-h-[350px] sm:min-h-[400px] bg-[#0B1410] flex items-center justify-center group shadow-2xl border border-[#2E5C35]/40 hover:border-[#45FF90]/60 transition-all duration-500 hover:shadow-[0_0_60px_rgba(69,255,144,0.4)] hover:scale-[1.02]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105 transform mix-blend-luminosity"></div>
            <div className="absolute inset-0 bg-linear-to-t from-deep-black via-deep-black/60 to-transparent"></div>
            
            {/* Animated Border Effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-[#45FF90] via-[#2E5C35] to-[#45FF90] opacity-50 blur-xl animate-spin-slow"></div>
            </div>

            <div className="relative z-10 text-center text-white p-6 sm:p-10 max-w-2xl">
              <div className="inline-block p-3 rounded-full bg-[#45FF90]/10 backdrop-blur-md mb-4 sm:mb-6 border border-[#45FF90]/30 animate-pulse-glow">
                <Users size={28} className="sm:w-8 sm:h-8 text-[#45FF90] animate-bounce-slow" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-ibm mb-4 sm:mb-6 group-hover:text-[#45FF90] transition-colors duration-300">
                Dibuat oleh Mahasiswa, <br className="hidden sm:block"/>Untuk Generasi Muda
              </h2>
              <p className="text-base sm:text-lg font-inter text-[#A0C4A8] leading-relaxed">
                EcoQuest dibuat oleh 3 mahasiswa yang concern dengan krisis sampah di Indonesia. 
                Kami bosan lihat banyak orang tahu soal lingkungan, tapi nggak ada yang action. 
                Jadi kami buat platform yang bikin aksi lingkungan <span className="font-bold text-[#45FF90]">seru, terukur, dan rewarding</span>. 
                Bukan sekadar kampanye, tapi <span className="font-bold text-white">gerakan nyata berbasis game</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="relative z-10 text-center space-y-8 sm:space-y-10 lg:space-y-12 py-8 sm:py-12 scroll-trigger opacity-0 translate-y-12 transition-all duration-700">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-ibm text-white mb-3 sm:mb-4">
              Siap Jadi <span className="text-light-sweep">Eco-Warrior?</span>
            </h2>
            <p className="text-base sm:text-lg font-inter text-[#A0C4A8] max-w-2xl mx-auto px-4">
              Setiap aksi kecilmu punya value. Setiap sampah yang dipilah adalah XP. 
              Setiap level yang naik adalah bukti kontribusimu untuk bumi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Button
              variant="primary"
              onClick={() => setPage("game")}
              className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 bg-fresh-green/10 border-2 border-fresh-green text-white hover:bg-leaf-green hover:text-white hover:shadow-[0_0_40px_rgba(74,222,128,0.6)] hover:scale-105 transition-all duration-300 backdrop-blur-sm animate-pulse-glow"
            >
              <Gamepad2 size={20} className="sm:w-6 sm:h-6" /> Mainkan Sekarang
            </Button>
          </div>

          <p className="text-xs sm:text-sm font-inter text-[#A0C4A8]/60 px-4">
            Gratis • No Download • Langsung Main
          </p>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;

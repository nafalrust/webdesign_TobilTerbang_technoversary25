import { Leaf, Users, Zap, ShieldCheck } from "lucide-react";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

// 2. ABOUT PAGE
const AboutPage = () => (
  <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
    <div className="text-center space-y-6">
      <Badge>OUR MISSION</Badge>
      <h2 className="text-5xl font-bold text-[#0B1410] dark:text-white">
        Gamifying The Future
      </h2>
      <p className="text-xl text-slate-600 dark:text-[#A0C4A8] max-w-2xl mx-auto">
        Menjembatani kesenjangan antara kesadaran digital dan aksi lingkungan
        nyata.
      </p>
    </div>

    {/* Team / Vision Card */}
    <div className="relative rounded-3xl overflow-hidden min-h-[400px] bg-[#0B1410] flex items-center justify-center group shadow-2xl border border-[#2E5C35]/30">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105 transform mix-blend-luminosity"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#020604] via-[#020604]/60 to-transparent"></div>

      <div className="relative z-10 text-center text-white p-10 max-w-2xl">
        <div className="inline-block p-3 rounded-full bg-[#45FF90]/10 backdrop-blur-md mb-6 border border-[#45FF90]/30">
          <Leaf size={32} className="text-[#45FF90]" />
        </div>
        <h3 className="text-4xl font-bold mb-6">
          Dibuat oleh Gen Z, Untuk Bumi
        </h3>
        <p className="text-lg text-[#A0C4A8] leading-relaxed">
          Kami percaya bahwa menyelamatkan bumi tidak harus membosankan. Dengan
          EcoQuest, setiap sampah yang dipungut dan setiap pohon yang ditanam
          adalah langkah menuju kemenangan bersama.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <Card className="bg-gradient-to-br from-[#F2F9F5] to-[#45FF90]/20 dark:from-[#112218] dark:to-[#2E5C35]/20">
        <h3 className="text-2xl font-bold text-[#0B1410] dark:text-white mb-4 flex items-center gap-3">
          <Zap className="text-yellow-500" /> Mengapa Gamifikasi?
        </h3>
        <p className="text-slate-600 dark:text-[#A0C4A8] leading-relaxed">
          Otak manusia menyukai reward. Dengan menerapkan sistem XP, Level, dan
          Leaderboard pada aksi lingkungan, kami menciptakan kebiasaan positif
          yang berkelanjutan. Bukan beban, tapi tantangan yang menyenangkan.
        </p>
      </Card>

      <div className="space-y-4">
        <Card className="flex items-center gap-6 py-4 bg-white/40 dark:bg-[#112218]/80">
          <div className="bg-[#2E5C35]/10 p-4 rounded-full text-[#2E5C35] dark:text-[#45FF90]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg text-[#0B1410] dark:text-white">
              Transparansi Total
            </h4>
            <p className="text-sm text-slate-600 dark:text-[#A0C4A8]">
              Setiap XP diverifikasi oleh AI dan komunitas.
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-6 py-4 bg-white/40 dark:bg-[#112218]/80">
          <div className="bg-[#45FF90]/10 p-4 rounded-full text-[#2E5C35] dark:text-[#45FF90]">
            <Users size={24} />
          </div>
          <div>
            <h4 className="font-bold text-lg text-[#0B1410] dark:text-white">
              Komunitas Global
            </h4>
            <p className="text-sm text-slate-600 dark:text-[#A0C4A8]">
              Terhubung dengan Eco-Warriors di Leaderboard.
            </p>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

export default AboutPage;

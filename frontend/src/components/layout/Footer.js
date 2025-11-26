import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#020604]/80 backdrop-blur-lg border-t border-[#45FF90]/10 py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#2E5C35] p-1.5 rounded-lg text-[#45FF90]">
              <Leaf size={16} />
            </div>
            <span className="text-xl font-bold tracking-tight">EcoQuest</span>
          </div>
          <p className="text-[#A0C4A8] text-sm max-w-xs leading-relaxed">
            Platform #1 untuk aksi lingkungan gamified. Bergabunglah dengan
            revolusi hijau digital.
          </p>
          <div className="flex gap-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-8 bg-[#112218] rounded-full flex items-center justify-center hover:bg-[#45FF90] hover:text-[#020604] text-[#A0C4A8] transition-all cursor-pointer"
              >
                <span className="text-xs font-bold">SOC</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">
            System
          </h4>
          <ul className="space-y-3 text-sm text-[#A0C4A8]">
            <li className="hover:text-[#45FF90] cursor-pointer transition-colors">
              Privacy Protocol
            </li>
            <li className="hover:text-[#45FF90] cursor-pointer transition-colors">
              User Agreement
            </li>
            <li className="hover:text-[#45FF90] cursor-pointer transition-colors">
              Global Leaderboard
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">
            Missions
          </h4>
          <ul className="space-y-3 text-sm text-[#A0C4A8]">
            <li className="hover:text-[#45FF90] cursor-pointer transition-colors">
              Daily Quests
            </li>
            <li className="hover:text-[#45FF90] cursor-pointer transition-colors">
              Raid Events
            </li>
            <li className="hover:text-[#45FF90] cursor-pointer transition-colors">
              Submit Report
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-16 pt-8 border-t border-[#2E5C35]/30 text-xs text-[#2E5C35] font-mono">
        © 2025 EcoQuest Platform. SYSTEM ONLINE.
      </div>
    </footer>
  );
};

export default Footer;

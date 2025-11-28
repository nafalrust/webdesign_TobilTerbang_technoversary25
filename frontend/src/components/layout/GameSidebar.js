import { useState } from "react";
import { Menu, X, Target, Map, Trophy, User, LogOut, Home, Star, Zap } from "lucide-react";

const GameSidebar = ({
  activeSection,
  setActiveSection,
  isLoggedIn,
  onLogout,
  onExit,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: "main-mission",
      label: "Main Mission",
      icon: Target,
      description: "Misi Utama",
    },
    {
      id: "side-quest",
      label: "Side Quest",
      icon: Map,
      description: "Tantangan Tambahan",
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: Trophy,
      description: "Ranking Global",
    },
  ];

  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    return (
      <button
        onClick={() => {
          setActiveSection(item.id);
          setIsOpen(false);
        }}
        className={`group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
          activeSection === item.id
            ? "bg-linear-to-br from-[#2E5C35] to-[#1a2820] text-white border border-[#45FF90]/30 shadow-lg shadow-[#45FF90]/20"
            : "text-[#A0C4A8] hover:bg-forest-card hover:text-white hover:border-[#45FF90]/20 border border-transparent"
        }`}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-[#45FF90]/0 group-hover:bg-[#45FF90]/5 transition-all duration-300"></div>
        
        <div
          className={`relative z-10 p-2.5 rounded-xl transition-all duration-300 ${
            activeSection === item.id 
              ? "bg-linear-to-br from-[#45FF90] to-[#2E5C35] text-deep-black shadow-lg shadow-[#45FF90]/30" 
              : "bg-forest-card group-hover:bg-[#2E5C35]/50 group-hover:scale-110"
          }`}
        >
          <Icon size={22} strokeWidth={2.5} />
        </div>
        <div className="relative z-10 text-left flex-1">
          <div className={`font-bold text-base font-grotesk tracking-tight transition-colors ${
            activeSection === item.id ? "text-[#45FF90]" : "group-hover:text-white"
          }`}>
            {item.label}
          </div>
          <div className={`text-xs font-inter transition-colors ${
            activeSection === item.id ? "text-white/80" : "text-[#A0C4A8]/60 group-hover:text-white/70"
          }`}>
            {item.description}
          </div>
        </div>
        
        {/* Active indicator */}
        {activeSection === item.id && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#45FF90] rounded-l-full shadow-[0_0_10px_rgba(69,255,144,0.5)]"></div>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Hamburger Button - Always visible on left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 left-6 z-60 p-3 rounded-xl transition-all duration-300 group ${
          isOpen
            ? "opacity-0 pointer-events-none"
            : "bg-forest-card/90 text-white backdrop-blur-md border border-[#45FF90]/20 hover:border-[#45FF90]/50"
        } hover:scale-110 hover:shadow-2xl hover:shadow-[#45FF90]/30`}
      >
        <Menu size={22} strokeWidth={2.5} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full w-80 bg-[#0B1410]/95 backdrop-blur-xl border-r border-[#45FF90]/20 shadow-2xl shadow-[#45FF90]/10 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#45FF90]/10">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2.5 rounded-xl bg-forest-card/80 text-white hover:bg-[#2E5C35] hover:text-[#45FF90] border border-[#45FF90]/20 hover:border-[#45FF90]/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#45FF90]/20 z-10"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
            
            {/* Profile Button - Clickable */}
            <button
              onClick={() => {
                setActiveSection("profile");
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 mb-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                activeSection === "profile"
                  ? "bg-linear-to-br from-[#2E5C35] to-[#1a2820] border border-[#45FF90]/30 shadow-lg shadow-[#45FF90]/20"
                  : "hover:bg-forest-card border border-transparent hover:border-[#45FF90]/20"
              }`}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-[#45FF90]/0 group-hover:bg-[#45FF90]/5 transition-all duration-300"></div>
              
              <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-[#45FF90] to-[#2E5C35] flex items-center justify-center shadow-lg shadow-[#45FF90]/30 border border-[#45FF90]/20 group-hover:scale-105 transition-transform duration-300">
                <User size={26} strokeWidth={2.5} className="text-deep-black" />
                {isLoggedIn && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#45FF90] rounded-full flex items-center justify-center border-2 border-deep-black">
                    <Star size={12} fill="#0B1410" className="text-deep-black" />
                  </div>
                )}
              </div>
              <div className="relative flex-1 text-left">
                <h3 className={`font-bold text-lg font-grotesk tracking-tight transition-colors ${
                  activeSection === "profile" ? "text-[#45FF90]" : "text-white group-hover:text-white"
                }`}>
                  {isLoggedIn ? "EcoWarrior" : "Guest"}
                </h3>
                <p className={`text-sm font-inter transition-colors ${
                  activeSection === "profile" ? "text-white/80" : "text-[#A0C4A8] group-hover:text-white/70"
                }`}>
                  {isLoggedIn ? "Level 3 • 1250 XP" : "Belum login"}
                </p>
              </div>
              
              {/* Active indicator */}
              {activeSection === "profile" && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#45FF90] rounded-l-full shadow-[0_0_10px_rgba(69,255,144,0.5)]"></div>
              )}
            </button>
            {!isLoggedIn && (
              <div className="mt-4 px-4 py-3 bg-linear-to-br from-[#2E5C35]/30 to-[#1a2820]/30 border border-[#45FF90]/30 rounded-xl text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap size={14} className="text-[#45FF90]" />
                  <p className="text-sm font-bold font-grotesk text-[#45FF90]">Login untuk bermain!</p>
                </div>
                <p className="text-xs text-white/60 font-inter">Mulai petualangan lingkunganmu</p>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-5 space-y-2 overflow-y-auto">
            <div className="text-xs uppercase tracking-[0.15em] text-[#45FF90]/60 font-bold font-ibm mb-4 px-2">
              ⚡ Menu Utama
            </div>
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-[#45FF90]/10">
            <div className="bg-linear-to-br from-forest-card to-[#0B1410] rounded-xl p-4 mb-3 border border-[#45FF90]/10 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-grotesk font-medium text-white/90">Progress Harian</span>
                <span className="text-sm font-bold font-ibm text-[#45FF90]">3/5</span>
              </div>
              <div className="h-2.5 bg-deep-black rounded-full overflow-hidden border border-[#2E5C35]/30">
                <div
                  className="h-full bg-linear-to-r from-[#2E5C35] to-[#45FF90] shadow-[0_0_10px_rgba(69,255,144,0.5)] transition-all duration-500"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            {/* Exit to Main Website Button */}
            {onExit && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onExit();
                }}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 mb-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/20 hover:border-blue-500/50 hover:scale-[1.02] transition-all duration-300 text-sm font-bold font-grotesk shadow-lg hover:shadow-blue-500/20"
              >
                <Home size={18} strokeWidth={2.5} />
                Kembali ke Website
              </button>
            )}

            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 hover:border-red-500/50 hover:scale-[1.02] transition-all duration-300 text-sm font-bold font-grotesk shadow-lg hover:shadow-red-500/20"
              >
                <LogOut size={18} strokeWidth={2.5} />
                Keluar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default GameSidebar;

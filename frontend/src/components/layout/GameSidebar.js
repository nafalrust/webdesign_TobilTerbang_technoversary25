import { useState } from "react";
import { Menu, X, Target, Map, Trophy, User, LogOut, Home } from "lucide-react";

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
      description: "Misi utama",
    },
    {
      id: "side-quest",
      label: "Side Quest",
      icon: Map,
      description: "Tantangan tambahan",
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: Trophy,
      description: "Ranking global",
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
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
          activeSection === item.id
            ? "bg-[#2E5C35] text-[#45FF90] shadow-lg shadow-[#2E5C35]/30"
            : "text-[#A0C4A8] hover:bg-[#112218] hover:text-white"
        }`}
      >
        <div
          className={`p-2 rounded-lg transition-colors ${
            activeSection === item.id ? "bg-[#45FF90]/20" : "bg-[#112218]"
          }`}
        >
          <Icon size={20} />
        </div>
        <div className="text-left">
          <div className="font-bold text-sm">{item.label}</div>
          <div className="text-xs opacity-60">{item.description}</div>
        </div>
      </button>
    );
  };

  return (
    <>
      {/* Hamburger Button - Always visible on left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 left-6 z-[60] p-3 rounded-xl transition-all duration-300 ${
          isOpen
            ? "bg-[#2E5C35] text-[#45FF90]"
            : "bg-[#112218]/80 text-white backdrop-blur-md border border-[#45FF90]/20"
        } shadow-lg hover:scale-110`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full w-72 bg-[#0B1410]/95 backdrop-blur-xl border-r border-[#2E5C35] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#2E5C35]/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5C35] to-[#45FF90] flex items-center justify-center">
                <User size={20} className="text-[#020604]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  {isLoggedIn ? "EcoWarrior" : "Guest"}
                </h3>
                <p className="text-xs text-[#A0C4A8]">
                  {isLoggedIn ? "Level 3 • 1250 XP" : "Belum login"}
                </p>
              </div>
            </div>
            {!isLoggedIn && (
              <div className="mt-3 px-3 py-2 bg-[#2E5C35]/20 border border-[#45FF90]/30 rounded-lg text-center">
                <p className="text-xs text-[#45FF90]">Login untuk bermain!</p>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="text-xs uppercase tracking-wider text-[#2E5C35] font-bold mb-3 px-2">
              Menu Utama
            </div>
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#2E5C35]/30">
            <div className="bg-[#112218] rounded-lg p-3 mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-[#A0C4A8]">Progress Harian</span>
                <span className="text-xs font-bold text-[#45FF90]">3/5</span>
              </div>
              <div className="h-2 bg-[#020604] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2E5C35] to-[#45FF90]"
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
                className="w-full flex items-center justify-center gap-2 px-4 py-2 mb-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm font-bold"
              >
                <Home size={16} />
                Kembali ke Website
              </button>
            )}

            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-bold"
              >
                <LogOut size={16} />
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

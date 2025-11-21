import { Leaf, Sun, Moon, Menu, X, Zap } from "lucide-react";
import Button from "../ui/Button";

const Navbar = ({
  darkMode,
  toggleTheme,
  page,
  setPage,
  menuOpen,
  setMenuOpen,
  xp,
}) => {
  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-[#2E5C35]/10 dark:border-[#45FF90]/10 bg-white/70 dark:bg-[#0B1410]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setPage("home")}
          >
            <div className="bg-gradient-to-br from-[#2E5C35] to-[#0B1410] p-2.5 rounded-xl text-[#45FF90] shadow-lg shadow-[#2E5C35]/30 group-hover:scale-105 transition-transform border border-[#45FF90]/30">
              <Leaf size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter group-hover:text-[#2E5C35] dark:group-hover:text-[#45FF90] transition-colors">
              Eco
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E5C35] to-[#45FF90]">
                Quest
              </span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 bg-white/50 dark:bg-[#112218]/50 p-1.5 rounded-full border border-[#2E5C35]/10 dark:border-[#45FF90]/10 backdrop-blur-md shadow-inner">
            {["Home", "About", "Content", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => setPage(item.toLowerCase())}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  page === item.toLowerCase()
                    ? "bg-white dark:bg-[#2E5C35] text-[#2E5C35] dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-[#A0C4A8] hover:text-[#2E5C35] dark:hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Glass XP Display */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100/50 dark:bg-[#112218]/50 border border-slate-200 dark:border-[#2E5C35] backdrop-blur-md">
              <Zap size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold font-mono text-[#0B1410] dark:text-[#45FF90]">
                {xp} XP
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-slate-200/50 dark:hover:bg-[#112218]/50 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-[#2E5C35]"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-[#2E5C35]" />
              )}
            </button>
            <Button
              variant="primary"
              className="!px-5 !py-2 !text-sm !rounded-lg text-[#020604]"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2">
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-[#2E5C35]" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#0B1410] dark:text-white p-2 bg-slate-100 dark:bg-[#112218] rounded-lg"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-[#020604]/95 backdrop-blur-xl border-b border-slate-200 dark:border-[#2E5C35] p-6 flex flex-col gap-4 animate-fade-in">
          {["Home", "About", "Content", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setPage(item.toLowerCase());
                setMenuOpen(false);
              }}
              className="text-left p-4 rounded-xl font-bold text-lg bg-slate-50 dark:bg-[#112218]/50 hover:bg-[#2E5C35]/10 dark:hover:bg-[#2E5C35]/30 text-[#0B1410] dark:text-white"
            >
              {item}
            </button>
          ))}
          <div className="h-px bg-slate-200 dark:bg-[#2E5C35] my-2"></div>
          <div className="flex items-center justify-between p-2">
            <span className="font-bold text-[#2E5C35] dark:text-[#45FF90] flex items-center gap-2">
              <Zap size={18} className="fill-current" /> {xp} XP
            </span>
            <Button variant="primary" className="!py-2 !px-6 !text-sm">
              Login System
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { Leaf, Menu, X, Zap, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "../ui/Button";

const Navbar = ({
  page,
  setPage,
  menuOpen,
  setMenuOpen,
  xp,
  user,
  onLogout,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-65 transition-all duration-300 ${
        scrolled
          ? "top-5 left-14 right-14 rounded-3xl glass-panel border border-[#45FF90]/20 bg-[#0B1410]/50 shadow-lg backdrop-blur-2xl"
          : "top-0 left-0 right-0 rounded-none glass-panel border-b border-[#45FF90]/0 bg-[#0B1410]/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setPage("home")}
          >
            <div className="bg-linear-to-br from-[#2E5C35] to-[#0B1410] p-2.5 rounded-xl text-[#45FF90] shadow-lg shadow-[#2E5C35]/30 group-hover:scale-105 transition-transform border border-[#45FF90]/30">
              <Leaf size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter group-hover:text-[#45FF90] transition-colors">
              Eco
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2E5C35] to-[#45FF90]">
                Quest
              </span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3 bg-forest-card/50 p-1.5 rounded-full border border-[#45FF90]/10 backdrop-blur-md shadow-inner">
            {["Home", "About", "Game", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => setPage(item.toLowerCase())}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  page === item.toLowerCase()
                    ? "bg-[#2b8c52]/50 text-white shadow-sm"
                    : "text-[#A0C4A8] hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">

            {/* Conditional Login/Logout Button */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#45FF90] font-medium">
                  {user.email}
                </span>
                <Button
                  variant="primary"
                  onClick={onLogout}
                  className="px-6 py-2 text-sm rounded-3xl text-deep-black flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={() => setPage("auth")}
                className="px-6 py-1.5 text-sm rounded-3xl"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2 bg-forest-card rounded-lg"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          className={`md:hidden absolute left-0 w-full bg-deep-black/95 backdrop-blur-xl border-b border-fresh-green p-6 flex flex-col gap-4 animate-fade-in transition-all duration-300 ${
            scrolled ? "top-[76px] rounded-b-2xl" : "top-20"
          }`}
        >
          {["Home", "About", "Game", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setPage(item.toLowerCase());
                setMenuOpen(false);
              }}
              className="text-left p-4 rounded-xl font-bold text-lg bg-forest-card/50 hover:bg-[#2E5C35]/30 text-white"
            >
              {item}
            </button>
          ))}
          <div className="h-px bg-fresh-green my-2"></div>
          <div className="flex items-center justify-between text-white p-2">
            {user ? (
              <Button
                variant="primary"
                onClick={onLogout}
                className="py-2! px-6! text-sm! rounded-2xl flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  setPage("auth");
                  setMenuOpen(false);
                }}
                className="py-2! px-6! text-sm!"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

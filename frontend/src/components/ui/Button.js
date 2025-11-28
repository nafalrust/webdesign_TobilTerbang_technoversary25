const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const baseStyle =
    "px-6 py-3 rounded-3xl font-bold transition-all duration-300 flex items-center gap-2 relative overflow-hidden group active:scale-95 tracking-wide";

  const variants = {
    // Primary: Gradient from Leaf Green to Neon Pop
    primary:
      " text-white backdrop-blur-sm hover:bg-leaf-green shadow-[0_0_10px_rgba(69,255,144,0.3)] hover:shadow-[0_0_40px_rgba(69,255,144,0.5)] rounded-2xl border border-[#45FF90]/30",

    // Secondary: Glassy Dark
    secondary:
      "bg-[#112218]/60 text-[#45FF90] border border-[#45FF90]/30 hover:bg-[#112218] backdrop-blur-md",

    // Accent: Solid Neon
    accent:
      "bg-[#45FF90] text-[#020604] hover:bg-[#3BE07D] shadow-lg shadow-[#45FF90]/20",

    outline:
      "border border-[#2E5C35] text-[#A0C4A8] hover:bg-[#112218]/50 backdrop-blur-sm",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Shine Effect */}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
    </button>
  );
};

export default Button;

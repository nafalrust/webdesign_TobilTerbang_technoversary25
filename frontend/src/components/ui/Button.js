const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const baseStyle =
    "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 relative overflow-hidden group active:scale-95 tracking-wide";

  const variants = {
    // Primary: Gradient from Leaf Green to Neon Pop
    primary:
      "bg-gradient-to-r from-[#2E5C35] to-[#45FF90] text-[#020604] shadow-[0_0_25px_rgba(69,255,144,0.3)] hover:shadow-[0_0_40px_rgba(69,255,144,0.5)] border border-[#45FF90]/30",

    // Secondary: Glassy Dark/Light
    secondary:
      "bg-white/60 dark:bg-[#112218]/60 text-[#2E5C35] dark:text-[#45FF90] border border-[#2E5C35]/20 dark:border-[#45FF90]/30 hover:bg-white dark:hover:bg-[#112218] backdrop-blur-md",

    // Accent: Solid Neon
    accent:
      "bg-[#45FF90] text-[#020604] hover:bg-[#3BE07D] shadow-lg shadow-[#45FF90]/20",

    outline:
      "border border-slate-300 dark:border-[#2E5C35] text-slate-600 dark:text-[#A0C4A8] hover:bg-slate-100 dark:hover:bg-[#112218]/50 backdrop-blur-sm",
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

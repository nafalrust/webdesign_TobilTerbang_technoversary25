const Badge = ({ children, color = "emerald" }) => {
  const colors = {
    emerald:
      "bg-[#45FF90]/10 text-[#45FF90] border-[#45FF90]/30",
    lime: "bg-lime-500/10 text-lime-300 border-lime-500/30",
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${
        colors[color] || colors.emerald
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;

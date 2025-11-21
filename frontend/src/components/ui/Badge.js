const Badge = ({ children, color = "emerald" }) => {
  // Adjusted colors to match palette
  const colors = {
    emerald:
      "bg-[#2E5C35]/10 text-[#2E5C35] border-[#2E5C35]/20 dark:bg-[#45FF90]/10 dark:text-[#45FF90] dark:border-[#45FF90]/30",
    lime: "bg-lime-100/80 text-lime-800 border-lime-200 dark:bg-lime-500/10 dark:text-lime-300 dark:border-lime-500/30",
    blue: "bg-blue-100/80 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30",
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

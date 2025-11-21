const Card = ({ children, className = "" }) => (
  <div
    className={`p-6 rounded-2xl border glass-panel glass-card-hover relative overflow-hidden
    bg-[#F2F9F5]/50 border-white/60 shadow-xl 
    dark:bg-[#112218]/60 dark:border-[#45FF90]/10 dark:shadow-[#020604]/50
    ${className}`}
  >
    {children}
  </div>
);

export default Card;

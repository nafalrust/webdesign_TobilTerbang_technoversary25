const Card = ({ children, className = "" }) => (
  <div
    className={`p-6 rounded-2xl border glass-panel glass-card-hover relative overflow-hidden
    bg-forest-card/60 border-[#45FF90]/10 shadow-[#020604]/50
    ${className}`}
  >
    {children}
  </div>
);

export default Card;

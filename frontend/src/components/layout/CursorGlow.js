"use client";

import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="cursor-glow fixed pointer-events-none z-0 mix-blend-screen"
      style={{
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(74, 222, 128, 0.2), transparent 70%)",
        borderRadius: "50%",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        transition: "transform 0.1s ease",
      }}
    />
  );
};

export default CursorGlow;

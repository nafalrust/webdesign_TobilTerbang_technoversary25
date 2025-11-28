"use client";

import { Gamepad2, Users, MapPin, ShieldCheck } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useEffect, useRef, useState } from "react";
import EarthBackground from "../layout/EarthBackground";
import CursorGlow from "../layout/CursorGlow";

// 1. HOME PAGE
const HomePage = ({ setPage }) => {
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            animateStats();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  // Intersection Observer for feature cards scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-12");
          }
        });
      },
      { threshold: 0.2 }
    );

    const triggers = document.querySelectorAll(".scroll-trigger");
    triggers.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const statElements = document.querySelectorAll(".stat-number");
    statElements.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target"));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps

      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          el.innerText = Math.ceil(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          el.innerText = target.toLocaleString();
        }
      };
      updateCounter();
    });
  };

  return (
    <div className="relative">
      {/* 3D Earth Background */}
      <EarthBackground />
      
      {/* Cursor Glow Effect */}
      <CursorGlow />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-start px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="my-30">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 mt-7 rounded-full bg-[#2E5C35]/30 border border-[#45FF90]/20 backdrop-blur-md shadow-sm">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#45FF90]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#45FF90]">
              Gamified Action Platform
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl text-light-sweep md:text-7xl my-3 lg:text-8xl font-bold font-ibm tracking-tight leading-[1.1] text-[#45FF90]/40" style={{ textShadow: "0 0 40px rgba(69, 255, 144, 0.3)" }}>
            Level Up Your
            <br />
            <span className="text-light-sweep bg-clip-text text-transparent bg-linear-to-r from-[#2E5C35]/30 to-[#45FF90]/25" style={{ textShadow: "0 0 40px rgba(69, 255, 144, 0.3)" }}>
              Planet
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg font-inter text-white max-w-xl font-medium leading-relaxed">
            Mainkan gamenya, selamatkan dunianya. Ekosistem aksi lingkungan
            pertama dengan sistem{" "}
            <span className="font-bold text-fresh-green">
              Real-World XP
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div className="inline-flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              variant="primary"
              onClick={() => setPage("game")}
              className="text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 whitespace-nowrap bg-fresh-green/10 border border-fresh-green text-white hover:bg-leaf-green hover:text-white hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] transition-all duration-300 backdrop-blur-sm"
            >
              <Gamepad2 size={20} className="sm:w-6 sm:h-6" /> Enter Game World
            </Button>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section
        ref={statsRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-2 py-10 my-10"
      >
        <div className="relative bg-linear-to-r from-[#0B1410]/50 via-[#1a2820]/50 to-[#0B1410]/50 backdrop-blur-md rounded-3xl border border-[#45FF90]/20 p-8 md:p-8 overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-[#45FF90]/2 blur-xl"></div>
          
          <div className="font-ibm relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { label: "ACTIVE PLAYERS", val: 12500, suffix: "K", displayVal: "12.5" },
              { label: "TREES PLANTED", val: 8430, suffix: "", displayVal: "8,430" },
              { label: "CARBON SAVED", val: 50, suffix: "T", displayVal: "50" },
              { label: "QUESTS DONE", val: 25000, suffix: "K+", displayVal: "25" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="text-center relative"
              >
                <div className="flex items-center justify-center gap-1 mb-2">
                  <h3
                    className="stat-number text-4xl md:text-5xl lg:text-4xl font-bold text-white/75 tracking-tight"
                    data-target={stat.val}
                    style={{ textShadow: "0 0 20px rgba(69, 255, 144, 0.5)" }}
                  >
                    {stat.displayVal}
                  </h3>
                  {stat.suffix && (
                    <span className="text-3xl md:text-4xl lg:text-4xl font-bold text-white/75" style={{ textShadow: "0 0 20px rgba(69, 255, 144, 0.5)" }}>
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#A0C4A8]/80">
                  {stat.label}
                </p>
                {/* Divider line (except last item) */}
                {idx < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-gradient-to-b from-transparent via-[#45FF90]/20 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Scroll Animations */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="group scroll-trigger opacity-0 translate-y-12 transition-all duration-700 hover:shadow-2xl hover:shadow-[#2E5C35]/40 hover:-translate-y-2 hover:border-[#45FF90]/40">
            <div className="h-14 w-14 bg-linear-to-br from-[#45FF90] to-[#2E5C35] rounded-2xl flex items-center justify-center text-deep-black mb-6 shadow-lg shadow-[#2E5C35]/20 group-hover:scale-110 transition-transform border border-[#45FF90]/20">
              <Gamepad2 size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#45FF90] transition-colors">
              Edu-Game for Kids
            </h3>
            <p className="text-[#A0C4A8] leading-relaxed group-hover:text-white/90 transition-colors">
              Belajar memilah sampah dan ekosistem laut melalui mini-game
              interaktif yang seru dengan visual yang menarik.
            </p>
          </Card>

          <Card className="group relative overflow-hidden scroll-trigger opacity-0 translate-y-12 transition-all duration-700 delay-100 hover:shadow-2xl hover:shadow-[#45FF90]/40 hover:-translate-y-2 hover:border-[#45FF90]/50">
            <div className="absolute top-0 right-0 p-24 bg-[#45FF90]/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-[#45FF90]/30"></div>
            <div className="h-14 w-14 bg-linear-to-br from-[#45FF90] to-[#2E5C35] rounded-2xl flex items-center justify-center text-deep-black mb-6 shadow-lg shadow-[#45FF90]/20 group-hover:scale-110 transition-transform relative z-10 border border-[#45FF90]/20">
              <MapPin size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white relative z-10 group-hover:text-[#45FF90] transition-colors">
              Real World Quests
            </h3>
            <p className="text-[#A0C4A8] leading-relaxed relative z-10 group-hover:text-white/90 transition-colors">
              Tantangan nyata untuk sehatkan dunia. Membuang dan memilah sampah,
              serta membawa tumbler setiap hari.
            </p>
          </Card>

          <Card className="group scroll-trigger opacity-0 translate-y-12 transition-all duration-700 delay-200 hover:shadow-2xl hover:shadow-[#45FF90]/40 hover:-translate-y-2 hover:border-[#45FF90]/40">
            <div className="h-14 w-14 bg-linear-to-br from-[#45FF90] to-[#2E5C35] rounded-2xl flex items-center justify-center text-deep-black mb-6 shadow-lg shadow-[#45FF90]/20 group-hover:scale-110 transition-transform border border-[#45FF90]/20">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#45FF90] transition-colors">
              AI Verification
            </h3>
            <p className="text-[#A0C4A8] leading-relaxed group-hover:text-white/90 transition-colors">
              Upload foto aksi lingkunganmu. AI kami memverifikasi validitas aksi
              dan memberikan reward instan.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

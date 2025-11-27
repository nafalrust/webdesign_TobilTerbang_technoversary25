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
      <section className="relative min-h-[90vh] flex items-center justify-start px-4 md:px-20 max-w-7xl mx-auto ml-18">
        <div className="my-30">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2E5C35]/30 border border-[#45FF90]/20 backdrop-blur-md shadow-sm">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#45FF90]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#45FF90]">
              Gamified Action Platform
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl my-3 lg:text-8xl font-bold font-ibm tracking-tight leading-[1.1] text-fresh-green">
            Level Up Your
            <br />
            <span className="text-light-sweep">
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
          <div className="flex flex-col sm:flex-row gap-5 pt-8">
            <Button
              variant="primary"
              onClick={() => setPage("game")}
              className="text-lg px-10 py-4 bg-fresh-green/10 border border-fresh-green text-white hover:bg-leaf-green hover:text-white hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] transition-all duration-300 backdrop-blur-sm"
            >
              <Gamepad2 size={24} /> Enter Game World
            </Button>
          </div>
        </div>
      </section>

      {/* Animated Stats Section - From SecondaryLayoutReference.txt */}
      <section
        ref={statsRef}
        className="max-w-7xl mx-auto px-4 py-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Dampak Nyata
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Players", val: 12500, suffix: "" },
            { label: "Trees Planted", val: 8430, suffix: "" },
            { label: "Carbon Saved", val: 50, suffix: "T" },
            { label: "Quests Done", val: 25000, suffix: "+" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-8 bg-[#2E5C35]/20 backdrop-blur-md rounded-2xl border border-[#45FF90]/10 hover:border-[#45FF90]/30 transition-all duration-300"
            >
              <h3
                className="stat-number text-5xl font-bold text-fresh-green mb-3"
                data-target={stat.val}
              >
                0
              </h3>
              {stat.suffix && (
                <span className="text-5xl font-bold text-fresh-green">
                  {stat.suffix}
                </span>
              )}
              <p className="text-xs font-bold uppercase tracking-widest text-[#A0C4A8] mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section with Scroll Animations */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
          Solusi Kami
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="group scroll-trigger opacity-0 translate-y-12 transition-all duration-700">
            <div className="h-14 w-14 bg-linear-to-br from-[#2E5C35] to-[#0B1410] rounded-2xl flex items-center justify-center text-[#45FF90] mb-6 shadow-lg shadow-[#2E5C35]/20 group-hover:scale-110 transition-transform border border-[#45FF90]/20">
              <Gamepad2 size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">
              Edu-Game for Kids
            </h3>
            <p className="text-[#A0C4A8] leading-relaxed">
              Belajar memilah sampah dan ekosistem laut melalui mini-game
              interaktif yang seru dengan visual yang menarik.
            </p>
          </Card>

          <Card className="group relative overflow-hidden scroll-trigger opacity-0 translate-y-12 transition-all duration-700 delay-100">
            <div className="absolute top-0 right-0 p-24 bg-[#45FF90]/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-[#45FF90]/20"></div>
            <div className="h-14 w-14 bg-linear-to-br from-[#45FF90] to-[#2E5C35] rounded-2xl flex items-center justify-center text-deep-black mb-6 shadow-lg shadow-[#45FF90]/20 group-hover:scale-110 transition-transform relative z-10 border border-[#45FF90]/20">
              <MapPin size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white relative z-10">
              Real World Quests
            </h3>
            <p className="text-[#A0C4A8] leading-relaxed relative z-10">
              Tantangan nyata untuk remaja & dewasa. Tanam pohon, bersihkan
              pantai, dapatkan XP sungguhan.
            </p>
          </Card>

          <Card className="group scroll-trigger opacity-0 translate-y-12 transition-all duration-700 delay-200">
            <div className="h-14 w-14 bg-linear-to-br from-teal-400 to-[#2E5C35] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform border border-white/10">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">
              AI Verification
            </h3>
            <p className="text-[#A0C4A8] leading-relaxed">
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

"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/components/pages/HomePage";
import AboutPage from "@/components/pages/AboutPage";
import GamePage from "@/components/pages/GamePage";
import ContactPage from "@/components/pages/ContactPage";
import GameTransition from "@/components/pages/GameTransition";

// --- MAIN APP ---

export default function EcoQuestApp() {
  const [darkMode, setDarkMode] = useState(true);
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(3);
  const [showTransition, setShowTransition] = useState(false);
  const [inGameWorld, setInGameWorld] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const addXp = (amount) => {
    setXp((prev) => {
      const newXp = prev + amount;
      if (Math.floor(newXp / 500) > Math.floor(prev / 500)) {
        alert(
          "🎉 LEVEL UP! You are now Level " + (Math.floor(newXp / 500) + 1)
        );
        setLevel((prevLvl) => prevLvl + 1);
      }
      return newXp;
    });
  };

  const handleNavigateToGame = () => {
    setShowTransition(true);
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setInGameWorld(true);
    setPage("game");
  };

  const handleExitGameWorld = () => {
    setInGameWorld(false);
    setPage("home");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* --- NEW GRADIENT SYSTEM --- */}
      {/* Background Wrapper with Palette Colors */}
      <div className="fixed inset-0 -z-50 transition-colors duration-700 bg-[#F2F9F5] dark:bg-[#020604]">
        {darkMode && (
          <>
            {/* Dark Mode: Deep Forest Space Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-[#112218] via-[#020604] to-[#020604] opacity-80"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-[#2E5C35]/20 via-transparent to-transparent"></div>
            {/* Subtle noise texture could go here */}
          </>
        )}
        {!darkMode && (
          <>
            {/* Light Mode: Fresh Morning Mist Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-[#E6F4EA] via-[#F2F9F5] to-white"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--tw-gradient-stops))] from-[#45FF90]/10 via-transparent to-transparent"></div>
          </>
        )}
      </div>

      {/* Transition Screen */}
      {showTransition && (
        <GameTransition onComplete={handleTransitionComplete} />
      )}

      <div className="dark:text-[#F2F9F5] text-[#0B1410] h-full">
        {/* Glass Navbar - Hide when in game world */}
        {!inGameWorld && (
          <Navbar
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            page={page}
            setPage={(newPage) => {
              if (newPage === "game") {
                handleNavigateToGame();
              } else {
                setPage(newPage);
              }
            }}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            xp={xp}
          />
        )}

        {/* Main Content */}
        <main className={inGameWorld ? "" : "min-h-[calc(100vh-80px)] pt-8"}>
          {page === "home" && (
            <HomePage
              setPage={(newPage) => {
                if (newPage === "game") {
                  handleNavigateToGame();
                } else {
                  setPage(newPage);
                }
              }}
            />
          )}
          {page === "about" && <AboutPage />}
          {page === "game" && inGameWorld && (
            <GamePage
              addXp={addXp}
              userXp={xp}
              userLevel={level}
              onExit={handleExitGameWorld}
            />
          )}
          {page === "contact" && <ContactPage />}
        </main>

        {/* Footer - Hide when in game world */}
        {!inGameWorld && <Footer />}
      </div>
    </div>
  );
}

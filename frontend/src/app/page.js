"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/components/pages/HomePage";
import AboutPage from "@/components/pages/AboutPage";
import GamePage from "@/components/pages/GamePage";
import ContactPage from "@/components/pages/ContactPage";
import GameTransition from "@/components/pages/GameTransition";
import AuthPage from "@/components/pages/AuthPage";
import authService from "@/lib/authService";

// --- MAIN APP ---

export default function EcoQuestApp() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(3);
  const [showTransition, setShowTransition] = useState(false);
  const [inGameWorld, setInGameWorld] = useState(false);
  // Initialize user state from stored data to avoid calling setState in effect
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = authService.getStoredUser();
      return storedUser && authService.isAuthenticated() ? storedUser : null;
    }
    return null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return authService.isAuthenticated();
    }
    return false;
  });
  const [pendingGameNavigation, setPendingGameNavigation] = useState(false);

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
    // Check if user is authenticated
    if (!isAuthenticated) {
      // If not authenticated, redirect to auth page and remember to go to game after login
      setPendingGameNavigation(true);
      setPage("auth");
    } else {
      // If authenticated, proceed to game world
      setInGameWorld(true);
      setPage("game");
    }
  };

  const handleExitGameWorld = () => {
    setInGameWorld(false);
    setPage("home");
  };

  const handleAuthSuccess = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);

    // If user was trying to access game before login, redirect to game world
    if (pendingGameNavigation) {
      setPendingGameNavigation(false);
      setInGameWorld(true);
      setPage("game");
    } else {
      setPage("home");
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setPage("home");
  };

  const handleBackFromAuth = () => {
    setPendingGameNavigation(false);
    setPage("home");
  };

  return (
    <div className="min-h-screen transition-colors duration-700">
      {/* Background Wrapper - Dark Mode Only */}
      <div className="fixed inset-0 -z-50 transition-colors duration-700 bg-deep-black">
        {/* Deep Forest Space Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-forest-card via-deep-black to-deep-black opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-[#2E5C35]/20 via-transparent to-transparent"></div>
      </div>

      {/* Transition Screen */}
      {showTransition && (
        <GameTransition onComplete={handleTransitionComplete} />
      )}

      <div className="text-[#F2F9F5] h-full">
        {/* Glass Navbar - Hide when in game world */}
        {!inGameWorld && (
          <Navbar
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
            user={user}
            onLogout={handleLogout}
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
          {page === "auth" && (
            <AuthPage
              onAuthSuccess={handleAuthSuccess}
              onBack={handleBackFromAuth}
            />
          )}
        </main>

        {/* Footer - Hide when in game world */}
        {!inGameWorld && <Footer />}
      </div>
    </div>
  );
}

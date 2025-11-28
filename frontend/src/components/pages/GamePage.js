import { useState } from "react";
import GameSidebar from "../layout/GameSidebar";
import TrashSortingGame from "./TrashSortingGame";
import TumblerDetectionModal from "./TumblerDetectionModal";
import ProfilePage from "./ProfilePage";
import WasteDetectionGame from "./WasteDetectionGame";
import Button from "../ui/Button";
import { Lock, MapPin, Star, Award, Zap, User } from "lucide-react";

const GamePage = ({ addXp, userXp, userLevel, onExit }) => {
  const [activeSection, setActiveSection] = useState("main-mission");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true to skip login gate
  const [showTumblerModal, setShowTumblerModal] = useState(false);
  const [showWasteDetectionGame, setShowWasteDetectionGame] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  const handleExitGameWorld = () => {
    if (
      window.confirm("Keluar dari game world dan kembali ke website utama?")
    ) {
      onExit();
    }
  };

  const missions = [
    {
      id: 1,
      title: "Waste Detective - Level 1",
      description: "Foto sampah dan tebak kategorinya dengan benar!",
      xp: 500,
      difficulty: "Easy",
      status: "available",
      icon: "🗑️",
      type: "waste-detection",
    },
    {
      id: 2,
      title: "Pahlawan Tumbler",
      description: "Gunakan tumbler selama 7 hari berturut-turut",
      xp: 200,
      difficulty: "Medium",
      status: "available",
      icon: "🥤",
    },
    {
      id: 3,
      title: "Zero Waste Warrior",
      description:
        "Hindari penggunaan plastik sekali pakai selama sehari penuh",
      xp: 250,
      difficulty: "Hard",
      status: "locked",
      icon: "♻️",
    },
  ];

  const sideQuests = [
    {
      id: 1,
      title: "Trash Sorting Master",
      description: "Main game pemilahan sampah dan dapatkan skor 1000+",
      xp: 100,
      type: "minigame",
      icon: "🎮",
    },
    {
      id: 2,
      title: "Penanam Pohon Pemula",
      description: "Tanam atau rawat tanaman di sekitarmu",
      xp: 150,
      type: "daily",
      icon: "🌱",
    },
    {
      id: 3,
      title: "Green Commuter",
      description: "Gunakan transportasi umum atau sepeda",
      xp: 75,
      type: "daily",
      icon: "🚌",
    },
  ];

  const leaderboardData = [
    { rank: 1, name: "EcoMaster2024", xp: 5420, level: 12, avatar: "🌟" },
    { rank: 2, name: "GreenNinja", xp: 4850, level: 11, avatar: "🥷" },
    { rank: 3, name: "TreeHugger", xp: 4200, level: 10, avatar: "🌳" },
    {
      rank: 4,
      name: "You",
      xp: userXp,
      level: userLevel,
      avatar: "👤",
      isCurrentUser: true,
    },
    { rank: 5, name: "PlasticFree", xp: 3100, level: 8, avatar: "♻️" },
  ];

  const handleLogin = () => {
    // Placeholder - will be connected to backend
    setIsLoggedIn(true);
  };

  const handleMissionStart = (mission) => {
    if (mission.status === "locked") {
      alert("Misi ini terkunci! Selesaikan misi sebelumnya untuk membuka.");
      return;
    }

    // For waste detection mission (Level 1)
    if (mission.type === "waste-detection" || mission.id === 1) {
      setSelectedMission(mission);
      setShowWasteDetectionGame(true);
    }
    // For tumbler mission
    else if (
      mission.id === 2 ||
      mission.title.toLowerCase().includes("tumbler")
    ) {
      setSelectedMission(mission);
      setShowTumblerModal(true);
    } else {
      const confirm = window.confirm(
        `Mulai misi: ${mission.title}?\n\nKamu akan diminta untuk upload bukti foto nanti.`
      );
      if (confirm) {
        alert(
          `🎯 Misi dimulai! Upload bukti foto aksimu untuk mendapatkan ${mission.xp} XP.`
        );
      }
    }
  };

  const handleTumblerDetectionSuccess = (result) => {
    // Award XP based on mission
    if (selectedMission) {
      addXp(selectedMission.xp);
      setTimeout(() => {
        alert(
          `🎉 Tumbler terdeteksi! Kamu mendapat ${selectedMission.xp} XP!\n\nTetap gunakan tumbler untuk menyelamatkan lingkungan!`
        );
        setShowTumblerModal(false);
        setSelectedMission(null);
      }, 100);
    }
  };

  const handleGameScoreUpdate = (score) => {
    // Use setTimeout to prevent setState during render
    setTimeout(() => {
      const xpEarned = Math.floor(score / 10);
      if (xpEarned > 0) {
        addXp(xpEarned);
        alert(
          `🎮 Game selesai! Kamu mendapat ${xpEarned} XP dari skor ${score}!`
        );
      }
    }, 0);
  };

  const handleWasteDetectionScoreUpdate = (score) => {
    setTimeout(() => {
      if (score > 0) {
        addXp(score);
        alert(
          `🗑️ Level 1 selesai! Kamu mendapat ${score} XP!\n\nTerus belajar tentang pemilahan sampah!`
        );
      }
      setShowWasteDetectionGame(false);
      setSelectedMission(null);
    }, 100);
  };

  // Login Gate
  if (!isLoggedIn) {
    return (
      <>
        <GameSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isLoggedIn={false}
          onLogout={() => setIsLoggedIn(false)}
          onExit={handleExitGameWorld}
        />

        <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-deep-black via-[#0B1410] to-forest-card">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="inline-flex p-6 bg-forest-card border-2 border-[#2E5C35] rounded-3xl mb-6">
                <Lock size={64} className="text-[#45FF90]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Area Terkunci
              </h2>
              <p className="text-[#A0C4A8] mb-8">
                Login terlebih dahulu untuk mengakses misi dan bermain game!
              </p>
            </div>

            <Button
              variant="primary"
              onClick={handleLogin}
              className="w-full py-4! text-lg!"
            >
              Login untuk Bermain
            </Button>

            <p className="text-sm text-[#2E5C35] mt-4">
              *Login sementara - integrasi backend menyusul
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <GameSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        onExit={handleExitGameWorld}
      />

      {/* Fixed Top Right - Profile & XP Bar */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-2">
        {/* XP Display */}
        <div className="bg-forest-card/90 backdrop-blur-xl border border-[#45FF90]/20 rounded-xl px-3 py-2 shadow-lg shadow-[#45FF90]/10">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-[#45FF90] fill-current" />
            <span className="text-sm font-bold text-[#45FF90]">{userXp.toLocaleString()}</span>
          </div>
        </div>

        {/* Profile Button */}
        <button
          onClick={() => setActiveSection("profile")}
          className={`bg-forest-card/90 backdrop-blur-xl border rounded-xl px-3 py-2 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[#45FF90]/20 ${
            activeSection === "profile"
              ? "border-[#45FF90]/50 shadow-[#45FF90]/30"
              : "border-[#45FF90]/20 hover:border-[#45FF90]/40"
          }`}
        >
          <User size={16} strokeWidth={2.5} className={`transition-colors ${
            activeSection === "profile" ? "text-[#45FF90]" : "text-white group-hover:text-[#45FF90]"
          }`} />
        </button>
      </div>

      <div className="min-h-screen pl-0 bg-linear-to-br from-deep-black via-[#0B1410] to-forest-card">
        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-12">
          {/* Main Mission Section */}
          {activeSection === "main-mission" && (
            <div className="animate-in fade-in duration-500">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Main Mission
                </h1>
                <p className="text-[#A0C4A8] text-lg">
                  Selesaikan misi untuk naik level dan dapatkan badge eksklusif!
                </p>
              </div>

              {/* Map Level Visualization */}
              <div className="mb-12 p-8 bg-forest-card/50 backdrop-blur-md border border-[#2E5C35]/30 rounded-3xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    MAP LEVEL
                  </h3>
                  <p className="text-[#A0C4A8]">Perjalanan hijau mu</p>
                </div>

                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {missions.map((mission, idx) => (
                    <div key={mission.id} className="flex items-center">
                      <div
                        className={`relative flex flex-col items-center ${
                          mission.status === "locked" ? "opacity-50" : ""
                        }`}
                      >
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl border-4 ${
                            mission.status === "locked"
                              ? "bg-[#0B1410] border-[#2E5C35]/30"
                              : "bg-[#2E5C35] border-[#45FF90] shadow-lg shadow-[#45FF90]/30"
                          } transition-all hover:scale-110 cursor-pointer`}
                          onClick={() => handleMissionStart(mission)}
                        >
                          {mission.status === "locked" ? "🔒" : mission.icon}
                        </div>
                        <span className="text-xs text-[#A0C4A8] mt-2 font-bold">
                          Level {idx + 1}
                        </span>
                      </div>
                      {idx < missions.length - 1 && (
                        <div className="w-12 h-1 bg-[#2E5C35]/30 mx-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {missions.map((mission) => (
                  <div
                    key={mission.id}
                    className={`bg-forest-card/80 backdrop-blur-md border border-[#2E5C35]/30 rounded-2xl p-6 transition-all hover:border-[#45FF90] hover:shadow-lg hover:shadow-[#45FF90]/20 ${
                      mission.status === "locked" ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{mission.icon}</div>
                      {mission.status === "locked" && (
                        <Lock size={20} className="text-[#2E5C35]" />
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {mission.title}
                    </h3>
                    <p className="text-sm text-[#A0C4A8] mb-4">
                      {mission.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          mission.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-400"
                            : mission.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {mission.difficulty}
                      </span>
                      <span className="text-[#45FF90] font-bold flex items-center gap-1">
                        <Zap size={16} className="fill-current" />+{mission.xp}{" "}
                        XP
                      </span>
                    </div>

                    <button
                      onClick={() => handleMissionStart(mission)}
                      disabled={mission.status === "locked"}
                      className="w-full mt-4 py-2 bg-[#2E5C35] text-white rounded-lg font-bold hover:bg-[#45FF90] hover:text-deep-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {mission.status === "locked" ? "Terkunci" : "Mulai Misi"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Side Quest Section */}
          {activeSection === "side-quest" && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Side Quest
                </h1>
                <p className="text-[#A0C4A8] text-lg">
                  Tantangan tambahan dan mini-games untuk XP ekstra!
                </p>
              </div>

              {/* Mini Game Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  🎮 Mini Game: Trash Sorting
                </h2>
                <TrashSortingGame onScoreUpdate={handleGameScoreUpdate} />
              </div>

              {/* Other Side Quests */}
              <div className="grid md:grid-cols-2 gap-6">
                {sideQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className="bg-forest-card/80 backdrop-blur-md border border-[#2E5C35]/30 rounded-2xl p-6 hover:border-[#45FF90] transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{quest.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {quest.title}
                        </h3>
                        <p className="text-sm text-[#A0C4A8] mb-4">
                          {quest.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                            {quest.type}
                          </span>
                          <span className="text-[#45FF90] font-bold">
                            +{quest.xp} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Section */}
          {activeSection === "leaderboard" && (
            <div className="animate-in fade-in duration-500">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Global Leaderboard
                </h1>
                <p className="text-[#A0C4A8] text-lg">
                  Lihat ranking pemain terbaik di seluruh dunia!
                </p>
              </div>

              <div className="bg-forest-card/80 backdrop-blur-md border border-[#2E5C35]/30 rounded-3xl overflow-hidden">
                {leaderboardData.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center gap-4 p-6 border-b border-[#2E5C35]/30 last:border-b-0 transition-all ${
                      player.isCurrentUser
                        ? "bg-[#2E5C35]/20 border-l-4 border-l-[#45FF90]"
                        : "hover:bg-[#0B1410]/50"
                    }`}
                  >
                    {/* Rank */}
                    <div className="w-12 text-center">
                      {player.rank <= 3 ? (
                        <div className="text-3xl">
                          {player.rank === 1
                            ? "🥇"
                            : player.rank === 2
                            ? "🥈"
                            : "🥉"}
                        </div>
                      ) : (
                        <div className="text-2xl font-bold text-[#A0C4A8]">
                          #{player.rank}
                        </div>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-[#0B1410] border-2 border-[#2E5C35] flex items-center justify-center text-3xl">
                      {player.avatar}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">
                        {player.name}
                        {player.isCurrentUser && (
                          <span className="ml-2 text-xs text-[#45FF90]">
                            (You)
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-[#A0C4A8]">
                        Level {player.level}
                      </p>
                    </div>

                    {/* XP */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#45FF90]">
                        {player.xp.toLocaleString()}
                      </div>
                      <div className="text-xs text-[#A0C4A8]">XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Section */}
          {activeSection === "profile" && (
            <ProfilePage 
              userXp={userXp} 
              userLevel={userLevel} 
              userName="EcoWarrior" 
            />
          )}
        </div>
      </div>

      {/* Tumbler Detection Modal */}
      <TumblerDetectionModal
        isOpen={showTumblerModal}
        onClose={() => {
          setShowTumblerModal(false);
          setSelectedMission(null);
        }}
        onSuccess={handleTumblerDetectionSuccess}
        missionTitle={selectedMission?.title}
      />

      {/* Waste Detection Game */}
      {showWasteDetectionGame && (
        <WasteDetectionGame
          onScoreUpdate={handleWasteDetectionScoreUpdate}
          onClose={() => setShowWasteDetectionGame(false)}
        />
      )}
    </>
  );
};

export default GamePage;

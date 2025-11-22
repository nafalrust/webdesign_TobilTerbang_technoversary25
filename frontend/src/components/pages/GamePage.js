import { useState } from "react";
import GameSidebar from "../layout/GameSidebar";
import TrashSortingGame from "./TrashSortingGame";
import Button from "../ui/Button";
import { Lock, MapPin, Star, Award, Zap } from "lucide-react";

const GamePage = ({ addXp, userXp, userLevel, onExit }) => {
  const [activeSection, setActiveSection] = useState("main-mission");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This will be connected to backend later

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
      title: "Penanam Pohon Pemula",
      description: "Tanam atau rawat tanaman di sekitarmu",
      xp: 150,
      difficulty: "Easy",
      status: "available",
      icon: "🌱",
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
    const confirm = window.confirm(
      `Mulai misi: ${mission.title}?\n\nKamu akan diminta untuk upload bukti foto nanti.`
    );
    if (confirm) {
      alert(
        `🎯 Misi dimulai! Upload bukti foto aksimu untuk mendapatkan ${mission.xp} XP.`
      );
      // TODO: Navigate to verification page
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

        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#020604] via-[#0B1410] to-[#112218]">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="inline-flex p-6 bg-[#112218] border-2 border-[#2E5C35] rounded-3xl mb-6">
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
              className="w-full !py-4 !text-lg"
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

      <div className="min-h-screen pl-0 bg-gradient-to-br from-[#020604] via-[#0B1410] to-[#112218]">
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
              <div className="mb-12 p-8 bg-[#112218]/50 backdrop-blur-md border border-[#2E5C35]/30 rounded-3xl">
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
                    className={`bg-[#112218]/80 backdrop-blur-md border border-[#2E5C35]/30 rounded-2xl p-6 transition-all hover:border-[#45FF90] hover:shadow-lg hover:shadow-[#45FF90]/20 ${
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
                      className="w-full mt-4 py-2 bg-[#2E5C35] text-white rounded-lg font-bold hover:bg-[#45FF90] hover:text-[#020604] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="bg-[#112218]/80 backdrop-blur-md border border-[#2E5C35]/30 rounded-2xl p-6 hover:border-[#45FF90] transition-all"
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

              <div className="bg-[#112218]/80 backdrop-blur-md border border-[#2E5C35]/30 rounded-3xl overflow-hidden">
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
        </div>
      </div>
    </>
  );
};

export default GamePage;

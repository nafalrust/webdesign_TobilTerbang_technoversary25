import { useState } from "react";
import { Trophy, Zap } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

// 3. CONTENT / GAME PAGE
const ContentPage = ({ addXp, userXp, userLevel }) => {
  const [activeTab, setActiveTab] = useState("quests");
  const [plasticCount, setPlasticCount] = useState(0);

  const quests = [
    {
      id: 1,
      title: "Bring Your Tumbler",
      xp: 50,
      difficulty: "Easy",
      type: "Daily",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Plant a Tree Seed",
      xp: 200,
      difficulty: "Hard",
      type: "Weekly",
      color: "bg-[#2E5C35]",
    },
    {
      id: 3,
      title: "No Plastic Day",
      xp: 150,
      difficulty: "Medium",
      type: "Daily",
      color: "bg-[#45FF90]",
    },
    {
      id: 4,
      title: "Public Transport Hero",
      xp: 100,
      difficulty: "Medium",
      type: "Daily",
      color: "bg-purple-500",
    },
  ];

  const handleComplete = (xp) => {
    const confirm = window.confirm("Open AI Camera for Verification?");
    if (confirm) {
      alert(
        `✅ AI Verification Success! Analysis: 98% Match. +${xp} XP Awarded.`
      );
      addXp(xp);
    }
  };

  const cleanOcean = () => {
    setPlasticCount((prev) => prev + 1);
    addXp(5);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Quest Hub
          </h2>
          <div className="flex gap-2 text-sm text-[#A0C4A8]">
            <span>Ready for action,</span>
            <span className="font-bold text-[#45FF90]">
              Cadet!
            </span>
          </div>
        </div>

        {/* Glass HUD */}
        <div className="bg-[#112218]/80 backdrop-blur-xl text-white p-5 rounded-2xl flex items-center gap-8 shadow-lg border border-[#45FF90]/20 w-full md:w-auto justify-between md:justify-start">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold text-[#A0C4A8]">
              Current Level
            </p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2E5C35] to-[#45FF90]">
              Lvl {userLevel}
            </p>
          </div>
          <div className="h-12 w-px bg-[#2E5C35]/30"></div>
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold text-[#A0C4A8]">
              Total XP
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold">{userXp}</p>
              <span className="text-xs text-[#45FF90]">
                XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 p-1.5 bg-[#020604]/50 rounded-2xl w-fit backdrop-blur-sm border border-[#45FF90]/10">
        <button
          onClick={() => setActiveTab("quests")}
          className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
            activeTab === "quests"
              ? "bg-[#2E5C35]/30 text-[#45FF90] shadow-md border border-[#45FF90]/20"
              : "text-[#A0C4A8] hover:text-white"
          }`}
        >
          Real World Quests
        </button>
        <button
          onClick={() => setActiveTab("minigame")}
          className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
            activeTab === "minigame"
              ? "bg-[#2E5C35]/30 text-[#45FF90] shadow-md border border-[#45FF90]/20"
              : "text-[#A0C4A8] hover:text-white"
          }`}
        >
          Mini-Games (Kids)
        </button>
      </div>

      {activeTab === "quests" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => (
            <Card
              key={quest.id}
              className="relative overflow-hidden group h-full flex flex-col justify-between border-l-4 border-l-[#45FF90]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <Badge color={quest.type === "Daily" ? "blue" : "emerald"}>
                    {quest.type}
                  </Badge>
                  <span className="font-bold text-[#45FF90] bg-[#45FF90]/10 px-2 py-1 rounded-lg">
                    +{quest.xp} XP
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#45FF90] transition-colors">
                  {quest.title}
                </h3>
                <p className="text-sm text-[#A0C4A8] mb-6">
                  Difficulty: {quest.difficulty}
                </p>
              </div>
              <Button
                variant="secondary"
                className="w-full justify-center group-hover:bg-[#45FF90] group-hover:text-[#020604]"
                onClick={() => handleComplete(quest.xp)}
              >
                <Zap size={16} className="group-hover:fill-current" /> Start
                Action
              </Button>
            </Card>
          ))}

          {/* Locked Quest */}
          <div className="border-2 border-dashed border-[#2E5C35]/30 bg-[#020604]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-[#2E5C35] min-h-[200px] hover:bg-[#020604]/50 transition-colors cursor-not-allowed">
            <div className="bg-[#112218] p-4 rounded-full mb-4">
              <Trophy size={32} className="opacity-50" />
            </div>
            <p className="font-bold text-lg">Community Raids</p>
            <p className="text-sm">Reach Level 5 to unlock</p>
          </div>
        </div>
      ) : (
        <Card className="bg-gradient-to-b from-[#0B1410] to-[#020604] border-[#45FF90]/20 overflow-hidden relative">
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce delay-700">
              🐟
            </div>
            <div className="absolute bottom-20 right-20 text-6xl opacity-20 animate-bounce">
              🐠
            </div>
          </div>

          <div className="text-center py-16 space-y-8 relative z-10">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                🌊 Ocean Cleanup Clicker
              </h3>
              <p className="text-[#A0C4A8]">
                Selamatkan laut dari sampah plastik! Klik area laut.
              </p>
            </div>

            <div className="flex justify-center items-center">
              <div
                className="relative w-72 h-72 rounded-full overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.5)] cursor-pointer hover:scale-105 active:scale-95 transition-all group border-4 border-[#45FF90]/20"
                onClick={cleanOcean}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 group-hover:from-blue-300 group-hover:to-blue-500 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl filter drop-shadow-lg">🌊</span>
                </div>
                <div className="absolute bottom-8 w-full text-center text-white font-bold text-lg tracking-widest opacity-80">
                  CLICK TO CLEAN
                </div>

                {/* Particle Effect Sim (Simplified) */}
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-10 transition-opacity mix-blend-overlay"></div>
              </div>
            </div>

            <div className="flex justify-center gap-12">
              <div className="text-center p-4 bg-[#112218]/50 rounded-xl backdrop-blur border border-[#2E5C35]">
                <p className="text-xs uppercase text-[#A0C4A8] font-bold">
                  Trash Collected
                </p>
                <p className="text-3xl font-bold text-red-500">
                  {plasticCount}
                </p>
              </div>
              <div className="text-center p-4 bg-[#112218]/50 rounded-xl backdrop-blur border border-[#45FF90]">
                <p className="text-xs uppercase text-[#A0C4A8] font-bold">
                  XP Earned
                </p>
                <p className="text-3xl font-bold text-[#45FF90]">
                  +{plasticCount * 5}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ContentPage;

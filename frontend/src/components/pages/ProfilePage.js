import { useState } from "react";
import { 
  User, 
  Star, 
  Award, 
  Trophy, 
  Zap, 
  Target, 
  Calendar,
  TrendingUp,
  Edit2,
  Save,
  X
} from "lucide-react";

const ProfilePage = ({ userXp, userLevel, userName = "EcoWarrior" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userName);

  // Calculate progress to next level
  const xpForNextLevel = (userLevel + 1) * 500;
  const xpProgress = userXp % 500;
  const progressPercentage = (xpProgress / 500) * 100;

  // User stats
  const stats = [
    { label: "Total XP", value: userXp.toLocaleString(), icon: Zap, color: "text-[#45FF90]" },
    { label: "Current Level", value: userLevel, icon: TrendingUp, color: "text-blue-400" },
    { label: "Missions Completed", value: 12, icon: Target, color: "text-purple-400" },
    { label: "Days Active", value: 45, icon: Calendar, color: "text-yellow-400" },
  ];

  // Achievements
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first mission",
      icon: "🌱",
      earned: true,
      earnedDate: "2025-10-15",
    },
    {
      id: 2,
      title: "Green Warrior",
      description: "Reach Level 3",
      icon: "⚔️",
      earned: true,
      earnedDate: "2025-11-20",
    },
    {
      id: 3,
      title: "Tumbler Champion",
      description: "Complete tumbler mission 5 times",
      icon: "🥤",
      earned: true,
      earnedDate: "2025-11-25",
    },
    {
      id: 4,
      title: "Zero Waste Hero",
      description: "Complete all main missions",
      icon: "♻️",
      earned: false,
    },
    {
      id: 5,
      title: "Game Master",
      description: "Score 2000+ in trash sorting game",
      icon: "🎮",
      earned: false,
    },
    {
      id: 6,
      title: "Top 10 Global",
      description: "Reach top 10 in leaderboard",
      icon: "🏆",
      earned: false,
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Completed mission",
      title: "Penanam Pohon Pemula",
      xp: 150,
      timestamp: "2 hours ago",
      icon: "🌱",
    },
    {
      id: 2,
      action: "Played mini-game",
      title: "Trash Sorting Game",
      xp: 85,
      timestamp: "5 hours ago",
      icon: "🎮",
    },
    {
      id: 3,
      action: "Level up!",
      title: "Reached Level 3",
      xp: 0,
      timestamp: "1 day ago",
      icon: "⭐",
    },
    {
      id: 4,
      action: "Earned achievement",
      title: "Tumbler Champion",
      xp: 100,
      timestamp: "2 days ago",
      icon: "🥤",
    },
  ];

  const handleSaveName = () => {
    // TODO: Save to backend
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedName(userName);
    setIsEditing(false);
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Profile
        </h1>
        <p className="text-[#A0C4A8] text-lg">
          Track your progress and achievements
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-forest-card/80 backdrop-blur-md border border-[#2E5C35]/30 rounded-3xl p-6">
            {/* Profile Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-[#45FF90] to-[#2E5C35] flex items-center justify-center shadow-2xl shadow-[#45FF90]/30 border-4 border-[#2E5C35]">
                  <User size={64} strokeWidth={2.5} className="text-deep-black" />
                </div>
                {/* Level Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-linear-to-r from-[#45FF90] to-[#2E5C35] rounded-full border-2 border-deep-black shadow-lg">
                  <span className="text-deep-black font-bold text-sm">
                    Level {userLevel}
                  </span>
                </div>
              </div>

              {/* Username */}
              <div className="w-full text-center">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0B1410] border border-[#2E5C35] rounded-xl text-white text-center font-bold focus:outline-none focus:border-[#45FF90] transition-all"
                      maxLength={20}
                    />
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={handleSaveName}
                        className="px-4 py-2 bg-[#2E5C35] text-white rounded-lg font-bold hover:bg-[#45FF90] hover:text-deep-black transition-all flex items-center gap-2"
                      >
                        <Save size={16} />
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-[#0B1410] text-[#A0C4A8] rounded-lg font-bold hover:bg-red-500/20 hover:text-red-400 transition-all flex items-center gap-2"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-bold text-white">{userName}</h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 hover:bg-[#2E5C35]/50 rounded-lg transition-all text-[#A0C4A8] hover:text-[#45FF90]"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                )}
                <p className="text-[#A0C4A8] text-sm mt-1">Environmental Warrior</p>
              </div>
            </div>

            {/* XP Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-white">Progress to Level {userLevel + 1}</span>
                <span className="text-sm font-bold text-[#45FF90]">
                  {xpProgress} / 500 XP
                </span>
              </div>
              <div className="h-3 bg-deep-black rounded-full overflow-hidden border border-[#2E5C35]/30">
                <div
                  className="h-full bg-linear-to-r from-[#2E5C35] to-[#45FF90] shadow-[0_0_10px_rgba(69,255,144,0.5)] transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-[#0B1410]/50 rounded-xl border border-[#2E5C35]/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-forest-card rounded-lg">
                        <Icon size={18} className={stat.color} />
                      </div>
                      <span className="text-sm text-[#A0C4A8]">{stat.label}</span>
                    </div>
                    <span className={`text-lg font-bold ${stat.color}`}>
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rank Card */}
          <div className="bg-forest-card/80 backdrop-blur-md border border-[#2E5C35]/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-br from-yellow-500/20 to-orange-500/20 rounded-xl">
                <Trophy size={24} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Global Rank</h3>
                <p className="text-sm text-[#A0C4A8]">Current standing</p>
              </div>
            </div>
            <div className="text-center py-4 bg-[#0B1410]/50 rounded-xl border border-[#2E5C35]/20">
              <div className="text-4xl font-bold text-yellow-400 mb-1">#4</div>
              <p className="text-xs text-[#A0C4A8]">Out of 10,000+ players</p>
            </div>
          </div>
        </div>

        {/* Right Column - Achievements & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Achievements Section */}
          <div className="bg-forest-card/80 backdrop-blur-md border border-[#2E5C35]/30 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-linear-to-br from-[#2E5C35] to-[#1a2820] rounded-xl">
                  <Award size={24} className="text-[#45FF90]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Achievements</h3>
                  <p className="text-sm text-[#A0C4A8]">
                    {achievements.filter(a => a.earned).length} / {achievements.length} unlocked
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    achievement.earned
                      ? "bg-[#2E5C35]/20 border-[#45FF90]/30 hover:border-[#45FF90]/50"
                      : "bg-[#0B1410]/50 border-[#2E5C35]/20 opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`text-4xl ${
                        achievement.earned ? "scale-100" : "grayscale scale-90"
                      } transition-all`}
                    >
                      {achievement.earned ? achievement.icon : "🔒"}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-[#A0C4A8] mb-2">
                        {achievement.description}
                      </p>
                      {achievement.earned && achievement.earnedDate && (
                        <p className="text-xs text-[#45FF90] font-bold">
                          Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-forest-card/80 backdrop-blur-md border border-[#2E5C35]/30 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                <Star size={24} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Recent Activity</h3>
                <p className="text-sm text-[#A0C4A8]">Your latest achievements</p>
              </div>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 bg-[#0B1410]/50 rounded-xl border border-[#2E5C35]/20 hover:border-[#45FF90]/30 transition-all"
                >
                  <div className="text-3xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-xs text-[#A0C4A8] mb-1">
                      {activity.action}
                    </p>
                    <h4 className="font-bold text-white text-sm">
                      {activity.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    {activity.xp > 0 && (
                      <div className="text-[#45FF90] font-bold text-sm mb-1">
                        +{activity.xp} XP
                      </div>
                    )}
                    <p className="text-xs text-[#A0C4A8]">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

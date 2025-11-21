import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Gamepad2, 
  Users, 
  Trophy, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck,
  Zap,
  Heart
} from 'lucide-react';

// --- COMPONENTS ---

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 transform hover:scale-105 shadow-lg";
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-emerald-500/30",
    secondary: "bg-white text-emerald-700 border-2 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 dark:bg-slate-800 dark:text-emerald-400 dark:border-slate-600",
    accent: "bg-lime-400 text-lime-900 hover:bg-lime-300 hover:shadow-lime-400/40",
    outline: "border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 
    bg-white/80 border-emerald-100/50 shadow-xl hover:shadow-2xl hover:-translate-y-1
    dark:bg-slate-900/60 dark:border-emerald-500/20 dark:shadow-emerald-900/20
    ${className}`}>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
    {children}
  </span>
);

// --- PAGES ---

// 1. HOME PAGE
const HomePage = ({ setPage, triggerConfetti }) => (
  <div className="space-y-20 pb-20">
    {/* Hero Section */}
    <section className="relative min-h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-lime-400/20 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <Badge>🌱 The Future of Environmental Action</Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-800 dark:text-white">
          Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-lime-500">Planet</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Gabungkan keseruan game dengan aksi nyata. Selamatkan bumi, kumpulkan XP, dan jadilah pahlawan lingkungan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button variant="primary" onClick={() => setPage('content')}>
            <Gamepad2 size={20} /> Mulai Quest
          </Button>
          <Button variant="secondary" onClick={() => setPage('about')}>
            <Users size={20} /> Pelajari Komunitas
          </Button>
        </div>

        {/* Stats Floating */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
          {[
            { label: 'Active Users', val: '12.5K' },
            { label: 'Trees Planted', val: '8,430' },
            { label: 'Carbon Saved', val: '50T' },
            { label: 'Quests Done', val: '25K+' }
          ].map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-emerald-100/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stat.val}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <Card>
          <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
            <Gamepad2 />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Edu-Game for Kids</h3>
          <p className="text-slate-600 dark:text-slate-400">Belajar memilah sampah dan ekosistem laut melalui mini-game interaktif yang seru.</p>
        </Card>
        <Card>
          <div className="h-12 w-12 bg-lime-100 dark:bg-lime-900 rounded-lg flex items-center justify-center text-lime-600 mb-4">
            <MapPin />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Real World Quests</h3>
          <p className="text-slate-600 dark:text-slate-400">Tantangan nyata untuk remaja & dewasa. Tanam pohon, bersihkan pantai, dapatkan XP.</p>
        </Card>
        <Card>
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <ShieldCheck />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">AI Verification</h3>
          <p className="text-slate-600 dark:text-slate-400">Upload foto aksi lingkunganmu, AI kami akan memverifikasi dan memberikan reward instan.</p>
        </Card>
      </div>
    </section>
  </div>
);

// 2. ABOUT PAGE
const AboutPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-bold text-slate-800 dark:text-white">Misi Kami</h2>
      <p className="text-lg text-slate-600 dark:text-slate-300">
        Menjembatani kesenjangan antara kesadaran digital dan aksi lingkungan nyata melalui gamifikasi.
      </p>
    </div>

    <div className="relative rounded-3xl overflow-hidden h-64 md:h-96 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
       {/* Placeholder for Team Image */}
       <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-lime-600 opacity-80"></div>
       <div className="relative z-10 text-center text-white p-8">
         <h3 className="text-3xl font-bold mb-4">Dibuat oleh Gen Z, Untuk Bumi</h3>
         <p className="max-w-xl mx-auto">Kami percaya bahwa menyelamatkan bumi tidak harus membosankan. Dengan EcoQuest, setiap tindakan kecil dihitung sebagai kemenangan besar.</p>
       </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Mengapa Gamifikasi?</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Otak manusia menyukai reward. Dengan menerapkan sistem XP, Level, dan Leaderboard pada aksi lingkungan, kami menciptakan kebiasaan positif yang berkelanjutan dan menyenangkan, bukan beban.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="mt-1 bg-emerald-500 p-2 rounded-full text-white"><CheckCircle size={16} /></div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white">Transparansi</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Laporan dampak yang terverifikasi secara digital.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
           <div className="mt-1 bg-emerald-500 p-2 rounded-full text-white"><CheckCircle size={16} /></div>
           <div>
             <h4 className="font-bold text-slate-800 dark:text-white">Komunitas Global</h4>
             <p className="text-sm text-slate-600 dark:text-slate-400">Terhubung dengan Eco-Warriors dari seluruh dunia.</p>
           </div>
        </div>
      </div>
    </div>
  </div>
);

// 3. CONTENT / GAME PAGE (The "EcoQuest Hub")
const ContentPage = ({ addXp, userXp, userLevel }) => {
  const [activeTab, setActiveTab] = useState('quests'); // 'quests' or 'minigame'
  const [plasticCount, setPlasticCount] = useState(0);
  
  const quests = [
    { id: 1, title: "Bring Your Tumbler", xp: 50, difficulty: "Easy", type: "Daily", color: "bg-blue-500" },
    { id: 2, title: "Plant a Tree Seed", xp: 200, difficulty: "Hard", type: "Weekly", color: "bg-emerald-500" },
    { id: 3, title: "No Plastic Day", xp: 150, difficulty: "Medium", type: "Daily", color: "bg-lime-500" },
    { id: 4, title: "Public Transport Hero", xp: 100, difficulty: "Medium", type: "Daily", color: "bg-purple-500" },
  ];

  // Mock AI Verification Handler
  const handleComplete = (xp) => {
    // In real app: Open camera -> AI Verify -> Success
    const confirm = window.confirm("Upload foto bukti aksi kamu untuk verifikasi AI?");
    if(confirm) {
      alert(`Verifikasi AI Berhasil! Aksi valid. Kamu mendapatkan +${xp} XP`);
      addXp(xp);
    }
  };

  // Mini Game Logic
  const cleanOcean = () => {
    setPlasticCount(prev => prev + 1);
    addXp(5);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Quest Hub</h2>
          <p className="text-slate-600 dark:text-slate-400">Pilih tantanganmu hari ini.</p>
        </div>
        <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center gap-6 shadow-lg border border-slate-700">
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-bold">Current Level</p>
            <p className="text-2xl font-bold text-lime-400">Lvl {userLevel}</p>
          </div>
          <div className="h-10 w-[1px] bg-slate-700"></div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold">Total XP</p>
            <p className="text-2xl font-bold text-emerald-400">{userXp}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('quests')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'quests' ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}
        >
          Real World Quests
        </button>
        <button 
          onClick={() => setActiveTab('minigame')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'minigame' ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`}
        >
          Mini-Games (Kids)
        </button>
      </div>

      {activeTab === 'quests' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {quests.map(quest => (
             <Card key={quest.id} className="relative overflow-hidden group">
               <div className={`absolute top-0 left-0 w-1 h-full ${quest.color}`}></div>
               <div className="flex justify-between items-start mb-4">
                 <Badge>{quest.type}</Badge>
                 <span className="font-bold text-emerald-600">+{quest.xp} XP</span>
               </div>
               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">{quest.title}</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Difficulty: {quest.difficulty}</p>
               <Button variant="secondary" className="w-full justify-center" onClick={() => handleComplete(quest.xp)}>
                 <Zap size={16} /> Start Action
               </Button>
             </Card>
           ))}
           {/* Locked Quest */}
           <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 min-h-[200px]">
             <Trophy size={40} className="mb-2 opacity-50" />
             <p>Reach Level 5 to unlock Community Raids</p>
           </div>
        </div>
      ) : (
        <Card className="bg-blue-50 dark:bg-slate-800/80 border-blue-200 dark:border-blue-900">
          <div className="text-center py-12 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">🌊 Ocean Cleanup Clicker</h3>
            <p>Klik sampah plastik untuk membersihkan laut dan dapatkan XP!</p>
            
            <div className="flex justify-center items-center gap-8 my-8">
               <div className="relative w-64 h-64 bg-blue-400 rounded-full overflow-hidden shadow-inner cursor-pointer hover:scale-105 transition-transform" onClick={cleanOcean}>
                 <div className="absolute inset-0 flex items-center justify-center text-blue-100 opacity-50 font-bold text-9xl select-none">
                    🌊
                 </div>
                 {/* Interactive element visualizer */}
                 <div className="absolute bottom-4 w-full text-center text-white font-bold">Click Me!</div>
               </div>
            </div>

            <div className="flex justify-center gap-8 text-xl font-bold">
              <div className="text-slate-600 dark:text-slate-300">Trash Collected: <span className="text-red-500">{plasticCount}</span></div>
              <div className="text-slate-600 dark:text-slate-300">XP Earned: <span className="text-emerald-500">{plasticCount * 5}</span></div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

// 4. CONTACT PAGE
const ContactPage = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <Card className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Hubungi Markas</h2>
          <p className="text-slate-600 dark:text-slate-400">Punya ide kolaborasi atau masalah teknis?</p>
        </div>

        {sent ? (
          <div className="text-center py-12 animate-bounce">
            <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-emerald-600">Pesan Terkirim!</h3>
            <p className="text-slate-500">+10 XP for Social Interaction</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Codename (Nama)</label>
              <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="EcoWarrior01" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <input required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Pesan Misi</label>
              <textarea required rows="4" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Jelaskan idemu..."></textarea>
            </div>
            <Button variant="primary" className="w-full justify-center">
              Kirim Pesan
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function EcoQuestApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState('home'); // home, about, content, contact
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Global Game State (Mock)
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(3);

  const toggleTheme = () => setDarkMode(!darkMode);

  const addXp = (amount) => {
    setXp(prev => {
      const newXp = prev + amount;
      // Simple level up logic: Level up every 500 XP
      if (Math.floor(newXp / 500) > Math.floor(prev / 500)) {
        alert("LEVEL UP! You are now Level " + (Math.floor(newXp / 500) + 1));
        setLevel(prevLvl => prevLvl + 1);
      }
      return newXp;
    });
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'dark bg-slate-950' : 'bg-emerald-50/30'}`}>
      <div className="dark:text-slate-200 text-slate-800 transition-colors duration-300">
        
        {/* Navbar */}
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-emerald-100/50 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              {/* Logo */}
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setPage('home')}
              >
                <div className="bg-gradient-to-br from-emerald-500 to-lime-500 p-2 rounded-lg text-white">
                  <Leaf size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tighter">
                  Eco<span className="text-emerald-600 dark:text-emerald-400">Quest</span>
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                {['Home', 'About', 'Content', 'Contact'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => setPage(item.toLowerCase())}
                    className={`font-medium transition-colors hover:text-emerald-500 ${page === item.toLowerCase() ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="hidden md:flex items-center gap-4">
                {/* Mini XP Display */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                   <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                   <span className="text-xs font-bold">{xp} XP</span>
                </div>

                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
                </button>
                <Button variant="primary" className="!px-4 !py-2 text-sm">Login</Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-4">
                 <button onClick={toggleTheme} className="p-2">
                  {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
                </button>
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-800 dark:text-white">
                  {menuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-4">
              {['Home', 'About', 'Content', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => { setPage(item.toLowerCase()); setMenuOpen(false); }}
                  className="text-left py-2 font-medium text-slate-700 dark:text-slate-300"
                >
                  {item}
                </button>
              ))}
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-500">{xp} XP</span>
                <Button variant="primary" className="!py-2 !text-sm">Login</Button>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content Area */}
        <main className="min-h-[calc(100vh-80px)]">
          {page === 'home' && <HomePage setPage={setPage} />}
          {page === 'about' && <AboutPage />}
          {page === 'content' && <ContentPage addXp={addXp} userXp={xp} userLevel={level} />}
          {page === 'contact' && <ContactPage />}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-900 border-t border-emerald-100/50 dark:border-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-500 p-1.5 rounded text-white"><Leaf size={16} /></div>
                <span className="text-xl font-bold">EcoQuest</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
                Platform aksi lingkungan berbasis gamifikasi pertama di Indonesia. Level Up Your Planet today.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800 dark:text-white">Links</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li className="hover:text-emerald-500 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-emerald-500 cursor-pointer">Terms of Service</li>
                <li className="hover:text-emerald-500 cursor-pointer">Leaderboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-800 dark:text-white">Connect</h4>
              <div className="flex gap-4 text-slate-400">
                <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer">IG</div>
                <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer">TW</div>
                <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer">YT</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
            © 2025 EcoQuest Platform. Built for a Greener Future.
          </div>
        </footer>

      </div>
    </div>
  );
}
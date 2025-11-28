import { useState } from "react";
import { CheckCircle, Send, MapPin, ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

// 4. CONTACT PAGE
const ContactPage = () => {
  const [sent, setSent] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "Game tidak bisa load di HP?",
      answer: "Pastikan browser kamu sudah update ke versi terbaru. Game ini optimal dimainkan di Chrome/Safari. Coba clear cache browser atau gunakan mode incognito jika masih bermasalah."
    },
    {
      question: "Bagaimana caranya naik level cepat?",
      answer: "Fokus selesaikan misi harian (+50 XP), mainkan mini-game Trash Sorting (+20 XP per game), dan upload foto aksi nyata (+100 XP). Konsistensi adalah kunci!"
    },
    {
      question: "Misi foto saya tidak terverifikasi?",
      answer: "Foto harus jelas menunjukkan aksi ramah lingkungan (misal: memegang sampah yang dipilah, di depan tong sampah, atau sedang menanam). Hindari foto blur atau tidak relevan. Tim kami verifikasi dalam 1x24 jam."
    }
  ];

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-12 min-h-[70vh]">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#45FF90] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slower"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#2E5C35] rounded-full mix-blend-screen filter blur-3xl opacity-12 animate-pulse-slower" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#45FF90] rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-pulse-slower" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#45FF90] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(69,255,144,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(69,255,144,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        
        .animate-pulse-slower {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>

      {/* Header Section */}
      <div className="text-center mt-7 mb-12 relative z-10">
        <div className="inline-block p-3 rounded-full bg-[#45FF90]/10 backdrop-blur-md mb-4 border border-[#45FF90]/30">
          <Send size={24} className="text-[#45FF90]" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">
          Hubungi Kami & Komunitas
        </h2>
        <p className="text-[#A0C4A8] text-lg">
          Laporkan bug, ajukan ide misi baru, atau kolaborasi dengan kami
        </p>
      </div>

      {/* 2 Column Layout */}
      <div className="grid md:grid-cols-5 gap-8 mb-16 relative z-10">
        {/* Left Column - Contact Form (60%) */}
        <Card className="md:col-span-3 p-8 relative overflow-hidden bg-[#0B1410]/90 border border-[#2E5C35]/30 hover:border-[#45FF90]/30 transition-all duration-500">
          {/* Decorative Gradient Blob */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#45FF90]/10 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#2E5C35]/10 rounded-full blur-[80px]"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-6">Form Kontak</h3>
            
            {sent ? (
              <div className="text-center py-12 animate-bounce-in">
                <div className="h-24 w-24 bg-linear-to-br from-[#2E5C35] to-[#45FF90] rounded-full flex items-center justify-center text-deep-black mx-auto mb-6 shadow-lg shadow-[#45FF90]/30">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Terima kasih!
                </h3>
                <p className="text-[#A0C4A8] mb-2">
                  Kami balas dalam 24 jam
                </p>
                <p className="text-[#45FF90] text-sm">
                  +10 XP Social Interaction
                </p>
                <Button
                  onClick={() => setSent(false)}
                  variant="secondary"
                  className="mx-auto mt-8 text-sm"
                >
                  Kirim Pesan Baru
                </Button>
              </div>
            ) : (
              <form
                action="https://formspree.io/f/YOUR_FORM_ID"
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0C4A8] mb-2">
                    Nama
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl bg-deep-black/50 border border-[#2E5C35] focus:ring-2 focus:ring-[#45FF90] focus:border-[#45FF90] outline-none transition-all placeholder-[#A0C4A8] text-white hover:border-[#45FF90]/50"
                    placeholder="Nama lengkap Anda"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0C4A8] mb-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl bg-deep-black/50 border border-[#2E5C35] focus:ring-2 focus:ring-[#45FF90] focus:border-[#45FF90] outline-none transition-all placeholder-[#A0C4A8] text-white hover:border-[#45FF90]/50"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0C4A8] mb-2">
                    Subjek
                  </label>
                  <select
                    required
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl bg-deep-black/50 border border-[#2E5C35] focus:ring-2 focus:ring-[#45FF90] focus:border-[#45FF90] outline-none transition-all text-white hover:border-[#45FF90]/50"
                  >
                    <option value="">Pilih subjek...</option>
                    <option value="bugs">🐛 Bugs</option>
                    <option value="ide-misi">💡 Ide Misi Baru</option>
                    <option value="partnership">🤝 Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0C4A8] mb-2">
                    Pesan
                  </label>
                  <textarea
                    required
                    name="message"
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl bg-deep-black/50 border border-[#2E5C35] focus:ring-2 focus:ring-[#45FF90] focus:border-[#45FF90] outline-none transition-all placeholder-[#A0C4A8] text-white resize-none hover:border-[#45FF90]/50"
                    placeholder="Jelaskan pesan Anda..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full justify-center shadow-xl shadow-[#45FF90]/10 hover:shadow-[#45FF90]/30 hover:scale-105 transition-all duration-300"
                >
                  Submit
                </Button>
              </form>
            )}
          </div>
        </Card>

        {/* Right Column - Community Info (40%) */}
        <Card className="md:col-span-2 p-8 relative overflow-hidden bg-[#0B1410]/90 border border-[#2E5C35]/30 hover:border-[#45FF90]/30 transition-all duration-500">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#45FF90]/10 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-6">Info Komunitas</h3>
            
            <div className="space-y-6">
              {/* Location Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={20} className="text-[#45FF90]" />
                  <h4 className="text-lg font-bold text-white">Lokasi Panitia</h4>
                </div>
                <p className="text-[#A0C4A8] text-sm mb-4">
                  Fakultas Teknik, Universitas Gadjah Mada
                </p>
                
                {/* Google Maps Embed */}
                <div className="relative w-full h-64 rounded-xl overflow-hidden border border-[#2E5C35] hover:border-[#45FF90]/50 transition-all duration-300">
                  <iframe
                    className="invert-[.9] hue-rotate-180 grayscale-[.2] contrast-[1.1]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.2315356764975!2d110.36993677476578!3d-7.765253292253952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a584e06f1ebf7%3A0xe4ad3fc475d7fbf8!2sFaculty%20of%20Engineering%20Universitas%20Gadjah%20Mada!5e0!3m2!1sen!2sid!4v1764301881383!5m2!1sen!2sid&style=element:geometry%7Ccolor:0x1d2c25&style=element:labels.text.fill%7Ccolor:0x8ec3b9&style=element:labels.text.stroke%7Ccolor:0x1a3646&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x2e5c35&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64a39e&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x2e5c35&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x0b1410&style=feature:poi%7Celement:geometry%7Ccolor:0x2e5c35&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x1e3a2e&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x45ff90&style=feature:road%7Celement:geometry%7Ccolor:0x304a5a&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c25&style=feature:road.highway%7Celement:geometry%7Ccolor:0x2e5c35&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x1f2835&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xa0c4a8&style=feature:transit%7Celement:geometry%7Ccolor:0x2f3948&style=feature:transit.station%7Celement:labels.text.fill%7Ccolor:0xa0c4a8&style=feature:water%7Celement:geometry%7Ccolor:0x0e2433&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Fakultas Teknik UGM"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10">
        <Card className="p-8 bg-[#0B1410]/90 border border-[#2E5C35]/30">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            FAQ - Pertanyaan Umum
          </h3>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#2E5C35]/50 rounded-xl overflow-hidden hover:border-[#45FF90]/30 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left bg-deep-black/30 hover:bg-deep-black/50 transition-all"
                >
                  <span className="font-bold text-white">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-[#45FF90] transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 py-4 text-[#A0C4A8] bg-deep-black/20">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;

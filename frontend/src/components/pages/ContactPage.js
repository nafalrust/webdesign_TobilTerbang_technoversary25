import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";

// 4. CONTACT PAGE
const ContactPage = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-xl mx-auto px-4 py-12 min-h-[70vh] flex items-center">
      <Card className="p-8 w-full relative overflow-hidden bg-[#0B1410]/90">
        {/* Decorative Gradient Blob */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#45FF90]/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#2E5C35]/10 rounded-full blur-[80px]"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Hubungi Markas
            </h2>
            <p className="text-[#A0C4A8]">
              Laporkan bug atau ajukan kolaborasi.
            </p>
          </div>

          {sent ? (
            <div className="text-center py-12 animate-bounce-in">
              <div className="h-24 w-24 bg-gradient-to-br from-[#2E5C35] to-[#45FF90] rounded-full flex items-center justify-center text-[#020604] mx-auto mb-6 shadow-lg shadow-[#45FF90]/30">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Transmisi Diterima!
              </h3>
              <p className="text-[#A0C4A8]">
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
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A0C4A8] mb-2">
                  Codename
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-[#020604]/50 border border-[#2E5C35] focus:ring-2 focus:ring-[#45FF90] focus:border-[#45FF90] outline-none transition-all placeholder-[#A0C4A8] text-white"
                  placeholder="EcoWarrior01"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A0C4A8] mb-2">
                  Secure Frequency (Email)
                </label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-[#020604]/50 border border-[#2E5C35] focus:ring-2 focus:ring-[#45FF90] focus:border-[#45FF90] outline-none transition-all placeholder-[#A0C4A8] text-white"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A0C4A8] mb-2">
                  Mission Brief
                </label>
                <textarea
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-[#020604]/50 border border-[#2E5C35] focus:ring-2 focus:ring-[#45FF90] focus:border-[#45FF90] outline-none transition-all placeholder-[#A0C4A8] text-white"
                  placeholder="Jelaskan idemu..."
                ></textarea>
              </div>
              <Button
                variant="primary"
                className="w-full justify-center shadow-xl shadow-[#45FF90]/10"
              >
                Kirim Transmisi
              </Button>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ContactPage;

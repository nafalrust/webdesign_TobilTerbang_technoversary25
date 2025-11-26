import "./globals.css";

export const metadata = {
  title: "EcoQuest - Gamified Environmental Action Platform",
  description:
    "Mainkan gamenya, selamatkan dunianya. Platform aksi lingkungan pertama dengan sistem Real-World XP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="dark">
      <body className="antialiased bg-deep-black text-white">{children}</body>
    </html>
  );
}

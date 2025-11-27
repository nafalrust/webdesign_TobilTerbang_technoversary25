import { Space_Grotesk, IBM_Plex_Mono, Inter } from 'next/font/google'
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: "EcoQuest - Gamified Environmental Action Platform",
  description:
    "Mainkan gamenya, selamatkan dunianya. Platform aksi lingkungan pertama dengan sistem Real-World XP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`dark ${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable}`}>
      <body className="antialiased bg-deep-black text-white">{children}</body>
    </html>
  );
}

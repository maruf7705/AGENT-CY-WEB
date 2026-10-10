import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MILADICODE | Digital Artist & Creative Technologist',
  description: 'Where Creativity Meets Technology — Portfolio of Miladicode. Immersive digital art, 3D speculative environments, motion, and generative creative systems.',
  keywords: ['Digital Artist', 'Creative Technologist', 'Portfolio', '3D Motion', 'Generative Art', 'Miladicode'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="font-sans antialiased bg-[#06070a] text-white selection:bg-purple-500/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}

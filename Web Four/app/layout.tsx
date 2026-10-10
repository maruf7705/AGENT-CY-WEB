import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans, Syne } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['500', '600', '700', '800'],
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
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable} ${syne.variable} dark scroll-smooth`}>
      <head>
        {/* Direct Google Fonts Links for immediate high-aesthetic typography & glowing reliability */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#06070a] text-white selection:bg-purple-600/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}

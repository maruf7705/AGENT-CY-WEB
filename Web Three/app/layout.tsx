import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  title: 'Agent-Cy | 2027-Ready Autonomous Operations',
  description: 'Enterprise AI Agent Agency delivering autonomous N8N automated workflows.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="font-sans antialiased bg-background text-white selection:bg-neonBlue selection:text-black">
        {children}
      </body>
    </html>
  );
}

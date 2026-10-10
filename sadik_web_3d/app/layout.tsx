import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DREAMFRAME | Next-Gen AI Image Generator",
  description:
    "Generate cinema-grade visuals and hyper-realistic images at the speed of thought with DreamFrame's neural rendering engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} ${plusJakarta.variable} font-sans bg-[#06050a] text-white antialiased selection:bg-purple-600/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}


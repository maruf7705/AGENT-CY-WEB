'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import AtmosphericShadow from '@/components/AtmosphericShadow';
import HeroContent from '@/components/HeroContent';
import RightIndicator from '@/components/RightIndicator';
import ScrollIndicator from '@/components/ScrollIndicator';
import PortfolioModal from '@/components/PortfolioModal';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeModal, setActiveModal] = useState<'Work' | 'About' | 'Contact' | null>(null);
  const [activeSection, setActiveSection] = useState('Home');
  const [soundActive, setSoundActive] = useState(false);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'Work' || section === 'About' || section === 'Contact') {
      setActiveModal(section as 'Work' | 'About' | 'Contact');
    } else {
      setActiveModal(null);
    }
  };

  const handleScrollClick = () => {
    // When clicking scroll, open work modal or smooth scroll
    setActiveModal('Work');
  };

  return (
    <main className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden select-none bg-[#06070a]">
      {/* 1. Preserved Background Image (Exact character, rainbow, flowers, lighting untouched) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt="Miladicode - Where Creativity Meets Technology cinematic artwork"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52%_42%] sm:object-center select-none pointer-events-none scale-[1.01]"
          quality={100}
        />
      </div>

      {/* 2. Soft Dark Atmospheric Gradient/Shadow (Feathered, subtle, fading toward center) */}
      <AtmosphericShadow />

      {/* 3. Top Navigation (Minimal MILADICODE Logo & Home/Work/About/Contact) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 4. Left-Side Main Content Area */}
      <div className="relative z-20 w-full h-full flex items-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24">
        <div className="pt-8 sm:pt-4 max-w-2xl lg:max-w-3xl">
          <HeroContent
            onViewWork={() => setActiveModal('Work')}
          />
        </div>
      </div>

      {/* 5. Right-Side Small Vertical Indicator (AI / 3D / MOTION / WEB) */}
      <RightIndicator />

      {/* 6. Bottom-Left "SCROLL TO EXPLORE" Indicator */}
      <ScrollIndicator onScrollClick={handleScrollClick} />

      {/* 7. Bottom-Right Subtle Ambient Sound / Status Pill */}
      <div className="fixed bottom-6 sm:bottom-10 right-6 sm:right-10 md:right-14 z-30 flex items-center gap-3">
        <button
          onClick={() => setSoundActive(!soundActive)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 backdrop-blur-md text-zinc-400 hover:text-white transition-all text-[11px] font-mono tracking-wider"
          title="Toggle Ambient Audio Experience"
          aria-label="Toggle Ambient Audio"
        >
          {soundActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-violet-300 animate-pulse" />
              <span className="hidden sm:inline text-violet-200">SOUND [ON]</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">SOUND [OFF]</span>
            </>
          )}
        </button>
      </div>

      {/* 8. Interactive Modals for Work, About, and Contact */}
      <PortfolioModal
        isOpen={activeModal !== null}
        type={activeModal}
        onClose={() => {
          setActiveModal(null);
          setActiveSection('Home');
        }}
      />
    </main>
  );
}

'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeroContentProps {
  onViewWork?: () => void;
}

export default function HeroContent({ onViewWork }: HeroContentProps) {
  return (
    <div className="relative z-20 flex flex-col justify-center max-w-3xl lg:max-w-4xl text-left select-none">
      {/* 1. Category / Eyebrow Badge */}
      <div className="mb-4 sm:mb-6 animate-[fadeIn_0.8s_ease-out]">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c4b5fd]" />
          <span className="text-[11px] sm:text-xs font-medium tracking-[0.24em] text-zinc-300 uppercase font-sans">
            DIGITAL ARTIST / CREATIVE TECHNOLOGIST
          </span>
        </div>
      </div>

      {/* 2. Large Main Heading — Always visible, clean, crisp, zero text glow */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[74px] xl:text-[82px] font-normal tracking-[-0.03em] leading-[1.05] text-white animate-[fadeIn_0.9s_ease-out]">
        <span className="block font-medium text-white">Where Creativity</span>
        <span className="block font-light text-white mt-1">
          Meets{' '}
          <span className="font-medium text-[#c4b5fd]">
            Technology
          </span>
        </span>
      </h1>

      {/* 3. Supporting Text — Always visible, clean, crisp */}
      <p className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-zinc-300 font-light leading-relaxed max-w-xl font-sans animate-[fadeIn_1s_ease-out]">
        Exploring the poetic friction between human consciousness and synthetic intelligence.
        Crafting speculative 3D worlds, real-time audio-visual experiences, and expressive
        interactive installations.
      </p>

      {/* 4. Circular-Arrow "View My Work" CTA */}
      <div className="mt-8 sm:mt-10 flex items-center animate-[fadeIn_1.1s_ease-out]">
        <button
          onClick={onViewWork}
          className="group inline-flex items-center gap-3.5 pl-6 sm:pl-7 pr-3 sm:pr-3.5 py-2.5 sm:py-3 rounded-full bg-white/[0.07] hover:bg-white/[0.14] border border-white/[0.18] hover:border-white/30 backdrop-blur-xl shadow-lg transition-all duration-300 focus:outline-none cursor-pointer"
        >
          {/* Button Text */}
          <span className="text-sm sm:text-[15px] font-medium tracking-[0.06em] text-white group-hover:text-zinc-100 transition-colors font-sans">
            View My Work
          </span>

          {/* Circular Arrow Disc */}
          <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.1] group-hover:bg-white/[0.2] border border-white/20 group-hover:border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface HeroContentProps {
  onViewWork?: () => void;
}

export default function HeroContent({ onViewWork }: HeroContentProps) {
  return (
    <div className="relative z-20 flex flex-col justify-center max-w-3xl lg:max-w-4xl text-left select-none">
      {/* 1. Category / Eyebrow Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 sm:mb-6"
      >
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(196,181,253,0.9)] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-zinc-300 uppercase font-sans">
            DIGITAL ARTIST / CREATIVE TECHNOLOGIST
          </span>
        </div>
      </motion.div>

      {/* 2. Large Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[80px] font-normal tracking-[-0.02em] leading-[1.06] text-white text-cinematic-shadow"
      >
        <span className="block font-medium">Where Creativity</span>
        <span className="block font-light">
          Meets{' '}
          <span className="font-medium text-violet-300 drop-shadow-[0_0_30px_rgba(196,181,253,0.7)]">
            Technology
          </span>
        </span>
      </motion.h1>

      {/* 3. Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-zinc-300/95 font-normal leading-relaxed max-w-xl text-cinematic-shadow"
      >
        Exploring the poetic friction between human consciousness and synthetic intelligence.
        Crafting speculative 3D worlds, real-time audio-visual experiences, and expressive
        interactive installations.
      </motion.p>

      {/* 4. Circular-Arrow "View My Work" CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 sm:mt-10 flex items-center"
      >
        <button
          onClick={onViewWork}
          className="group inline-flex items-center gap-3.5 pl-6 sm:pl-7 pr-3 sm:pr-3.5 py-2.5 sm:py-3 rounded-full bg-white/[0.07] hover:bg-white/[0.13] border border-white/[0.18] hover:border-violet-300/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(196,181,253,0.3)] focus:outline-none"
        >
          {/* Button Text */}
          <span className="text-sm sm:text-[15px] font-medium tracking-[0.06em] text-white group-hover:text-zinc-100 transition-colors">
            View My Work
          </span>

          {/* Circular Arrow Disc */}
          <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/[0.1] group-hover:bg-violet-500/30 border border-white/20 group-hover:border-violet-300/70 flex items-center justify-center transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.4)] group-hover:shadow-[0_0_20px_rgba(196,181,253,0.5)] group-hover:scale-105">
            <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white group-hover:text-violet-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </span>
        </button>
      </motion.div>
    </div>
  );
}

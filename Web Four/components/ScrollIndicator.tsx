'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  onScrollClick?: () => void;
}

export default function ScrollIndicator({ onScrollClick }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 sm:bottom-10 left-6 sm:left-10 md:left-16 z-30 select-none"
    >
      <button
        onClick={onScrollClick}
        className="group flex items-center gap-3.5 focus:outline-none cursor-pointer"
        aria-label="Scroll to explore"
      >
        {/* Animated Hairline Track */}
        <div className="relative w-[1.5px] h-9 bg-white/15 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-violet-300 to-indigo-400 rounded-full animate-scroll-line shadow-[0_0_8px_rgba(196,181,253,0.8)]" />
        </div>

        {/* Text */}
        <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.28em] uppercase text-zinc-400/80 group-hover:text-white transition-colors duration-300 font-sans">
          SCROLL TO EXPLORE
        </span>
      </button>
    </motion.div>
  );
}

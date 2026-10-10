'use client';

import React from 'react';

interface ScrollIndicatorProps {
  onScrollClick?: () => void;
}

export default function ScrollIndicator({ onScrollClick }: ScrollIndicatorProps) {
  return (
    <div className="fixed bottom-6 sm:bottom-10 left-6 sm:left-10 md:left-16 z-30 select-none">
      <button
        onClick={onScrollClick}
        className="group flex items-center gap-3.5 focus:outline-none cursor-pointer"
        aria-label="Scroll to explore"
      >
        {/* Animated Hairline Track */}
        <div className="relative w-[1.5px] h-9 bg-white/15 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-violet-300 to-indigo-400 rounded-full animate-scroll-line" />
        </div>

        {/* Text */}
        <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.28em] uppercase text-zinc-400/90 group-hover:text-white transition-colors duration-300 font-sans">
          SCROLL TO EXPLORE
        </span>
      </button>
    </div>
  );
}

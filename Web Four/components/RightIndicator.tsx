'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RightIndicator() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = ['AI', '3D', 'MOTION', 'WEB'];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-5 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center select-none"
      aria-label="Discipline Indicators"
    >
      {/* Decorative top hairline */}
      <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-white/20 mb-4" />

      {/* Vertical list of disciplines */}
      <div className="flex flex-col items-center space-y-4 md:space-y-5">
        {categories.map((cat, idx) => {
          const isSelected = activeCategory === cat;
          return (
            <React.Fragment key={cat}>
              <button
                onClick={() => setActiveCategory(isSelected ? null : cat)}
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
                className="group relative flex items-center justify-center p-1.5 focus:outline-none"
              >
                {/* Vertical text styling */}
                <span
                  className={`text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-mono transition-all duration-300 ${
                    isSelected
                      ? 'text-white font-medium drop-shadow-[0_0_10px_rgba(196,181,253,0.8)] scale-110'
                      : 'text-zinc-400/70 group-hover:text-zinc-200'
                  }`}
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {cat}
                </span>

                {/* Subtle side glowing pill indicator on hover/active */}
                {isSelected && (
                  <motion.span
                    layoutId="rightIndicatorGlow"
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-3 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(196,181,253,0.9)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                )}
              </button>

              {/* Minimal dot separator between categories */}
              {idx < categories.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-white/20" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Decorative bottom hairline */}
      <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent mt-4" />
    </motion.aside>
  );
}

'use client';

import React, { useState } from 'react';

export default function RightIndicator() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = ['AI', '3D', 'MOTION', 'WEB'];

  return (
    <aside
      className="fixed right-5 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center select-none"
      aria-label="Discipline Indicators"
    >
      {/* Decorative top hairline */}
      <div className="w-[1px] h-9 bg-gradient-to-b from-transparent to-white/25 mb-4" />

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
                className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
              >
                {/* Vertical text styling with aesthetic font — clean, crisp, always visible */}
                <span
                  className={`text-[10px] md:text-[11px] tracking-[0.32em] uppercase font-sans font-medium transition-all duration-300 ${
                    isSelected
                      ? 'text-white font-semibold scale-110'
                      : 'text-zinc-400/80 group-hover:text-white'
                  }`}
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {cat}
                </span>

                {/* Subtle side indicator on hover/active */}
                {isSelected && (
                  <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-3 rounded-full bg-[#c4b5fd]" />
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
      <div className="w-[1px] h-9 bg-gradient-to-b from-white/25 to-transparent mt-4" />
    </aside>
  );
}

'use client';

import React from 'react';

/**
 * AtmosphericShadow
 * 
 * Recreates the soft dark atmospheric gradient/shadow behind the left-side text.
 * A large, feathered, subtle shadow fading toward the center, NOT a visible rectangular overlay.
 * Its purpose is only to make the typography readable while keeping the original background
 * visible and its colors unchanged.
 */
export default function AtmosphericShadow() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary feathered radial shadow anchored behind left-side text block */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 85% at 15% 52%,
              rgba(5, 6, 11, 0.86) 0%,
              rgba(5, 6, 11, 0.72) 28%,
              rgba(5, 6, 11, 0.46) 48%,
              rgba(5, 6, 11, 0.18) 64%,
              rgba(5, 6, 11, 0) 80%
            )
          `,
        }}
      />

      {/* Subtle secondary left-edge atmospheric feather to ensure clean baseline contrast on ultra-wide screens */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to right,
              rgba(5, 6, 10, 0.78) 0%,
              rgba(5, 6, 10, 0.52) 18%,
              rgba(5, 6, 10, 0.22) 35%,
              rgba(5, 6, 10, 0.05) 50%,
              rgba(5, 6, 10, 0) 65%
            )
          `,
        }}
      />

      {/* Soft feather at very bottom-left for "SCROLL TO EXPLORE" readability */}
      <div
        className="absolute bottom-0 left-0 w-full sm:w-2/3 h-48"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 80% at 15% 100%,
              rgba(5, 6, 10, 0.7) 0%,
              rgba(5, 6, 10, 0.3) 50%,
              rgba(5, 6, 10, 0) 85%
            )
          `,
        }}
      />

      {/* Very faint top feather ensuring navigation readability on light stars */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(5, 6, 10, 0.55) 0%,
              rgba(5, 6, 10, 0.15) 60%,
              rgba(5, 6, 10, 0) 100%
            )
          `,
        }}
      />
    </div>
  );
}

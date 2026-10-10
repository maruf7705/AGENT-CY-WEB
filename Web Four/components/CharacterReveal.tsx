'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface CharacterRevealProps {
  containerRef?: React.RefObject<HTMLElement>;
}

/**
 * CharacterReveal Component
 * 
 * Reveals REVEAL_IMAGE (BG_IMAGEs_2.jpg) through a soft circular spotlight centered
 * exactly on the cursor with smooth easing/lerp.
 * - Radius: 260px
 * - Soft feathered/glowing edge
 * - pointer-events: none
 * - Pure CSS radial-gradient mask via mask-image and -webkit-mask-image
 * - Layer: above base hero background, below UI/text
 * - Completely invisible when cursor leaves the hero
 */
export default function CharacterReveal({ containerRef }: CharacterRevealProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);

  const stateRef = useRef({
    currentX: -1000,
    currentY: -1000,
    targetX: -1000,
    targetY: -1000,
    isHovered: false,
  });

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const updateMask = (x: number, y: number) => {
      // Reveal radius: 260px with soft feathered/glowing edge
      const maskGradient = `radial-gradient(circle 260px at ${x.toFixed(1)}px ${y.toFixed(1)}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 120px, rgba(0,0,0,0.8) 180px, rgba(0,0,0,0.25) 230px, transparent 260px)`;
      overlay.style.webkitMaskImage = maskGradient;
      overlay.style.maskImage = maskGradient;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef?.current || overlay.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        stateRef.current.targetX = x;
        stateRef.current.targetY = y;

        if (!stateRef.current.isHovered) {
          stateRef.current.currentX = x;
          stateRef.current.currentY = y;
          stateRef.current.isHovered = true;
          updateMask(x, y);
          overlay.style.opacity = '1';
        }
      } else {
        if (stateRef.current.isHovered) {
          stateRef.current.isHovered = false;
          overlay.style.opacity = '0';
        }
      }
    };

    const handleMouseLeave = () => {
      stateRef.current.isHovered = false;
      overlay.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Easing loop (lerp)
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const loop = () => {
      if (stateRef.current.isHovered) {
        const { currentX, currentY, targetX, targetY } = stateRef.current;
        const lerpFactor = 0.16; // Smooth responsive easing

        const dx = targetX - currentX;
        const dy = targetY - currentY;

        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
          const newX = lerp(currentX, targetX, lerpFactor);
          const newY = lerp(currentY, targetY, lerpFactor);

          stateRef.current.currentX = newX;
          stateRef.current.currentY = newY;

          updateMask(newX, newY);
        }
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [containerRef]);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 w-full h-full z-[3] overflow-hidden pointer-events-none transition-opacity duration-300 opacity-0"
      style={{
        WebkitMaskImage: 'radial-gradient(circle 0px at -1000px -1000px, transparent 0%, transparent 100%)',
        maskImage: 'radial-gradient(circle 0px at -1000px -1000px, transparent 0%, transparent 100%)',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
      aria-hidden="true"
    >
      <Image
        src="/BG_IMAGEs_2.jpg"
        alt="Miladicode - Character reveal spotlight"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[52%_42%] sm:object-center select-none pointer-events-none scale-[1.01]"
        quality={100}
      />
    </div>
  );
}

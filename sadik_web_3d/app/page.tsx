"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePrompt, setActivePrompt] = useState(
    "cyberpunk operative in sleek high-collar jacket, futuristic neon orange eyewear, cinematic lighting, 8k"
  );
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCopyPrompt = () => {
    navigator.clipboard?.writeText(activePrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#07060b] text-white overflow-x-hidden selection:bg-purple-600/30 selection:text-white flex flex-col justify-between">
      {/* Dynamic Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Core dark radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_35%,#120c22_0%,#07060b_85%)]" />

        {/* Violet / Purple ambient neon glow behind the subject */}
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `translate(calc(-50% + ${mousePos.x * 0.5}px), ${mousePos.y * 0.5}px)`,
          }}
        />

        {/* Orange subtle counter-glow reflecting eyewear */}
        <div
          className="absolute top-[32%] left-[48%] -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-orange-500/10 blur-[90px] pointer-events-none transition-transform duration-500 ease-out"
          style={{
            transform: `translate(calc(-50% + ${mousePos.x * -0.4}px), ${mousePos.y * -0.4}px)`,
          }}
        />

        {/* Subtle cyber grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-35" />

        {/* Atmospheric noise/vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#07060b] pointer-events-none" />
      </div>

      {/* TOP NAVIGATION / FLOATING PILL (Exact Reference Replication) */}
      <header className="relative z-40 w-full pt-6 sm:pt-8 px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        {/* Dominic-style Brand Pill */}
        <div className="relative group">
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3.5 bg-[#17161c]/85 hover:bg-[#1f1d26] border border-white/10 hover:border-white/20 backdrop-blur-xl px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 shadow-lg shadow-black/40 select-none"
          >
            {/* Striped Circle Brand Icon (Matching reference glyph) */}
            <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-[#ff5e28] to-[#ff7d45] flex items-center justify-center overflow-hidden shadow-[0_0_12px_rgba(255,94,40,0.45)]">
              {/* Vertical stripes inside icon */}
              <div className="flex items-center justify-center gap-[2.5px] w-full h-full px-1">
                <span className="w-[2px] h-3.5 bg-[#17161c] rounded-full"></span>
                <span className="w-[2.5px] h-4 bg-[#17161c] rounded-full"></span>
                <span className="w-[2px] h-3.5 bg-[#17161c] rounded-full"></span>
              </div>
            </div>

            {/* Brand Title */}
            <span className="text-sm sm:text-[15px] font-medium tracking-tight text-white/95 pr-1">
              DreamFrame
            </span>

            {/* Hamburger Icon */}
            <div className="flex flex-col gap-[3.5px] items-center justify-center pl-1 border-l border-white/10">
              <span
                className={`w-3.5 h-[1.8px] bg-white/90 rounded-full transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-[5.2px]" : ""
                }`}
              />
              <span
                className={`w-3.5 h-[1.8px] bg-white/90 rounded-full transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-3.5 h-[1.8px] bg-white/90 rounded-full transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-[5.2px]" : ""
                }`}
              />
            </div>
          </div>

          {/* Dropdown Menu Modal */}
          {isMenuOpen && (
            <div className="absolute top-14 left-0 w-64 bg-[#14131a]/95 border border-white/10 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl shadow-purple-950/40 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 px-3 pb-2 border-b border-white/10">
                AI Engine Navigation
              </div>
              <ul className="flex flex-col gap-1 pt-2">
                {[
                  { name: "Model Architecture (v4.2)", badge: "New" },
                  { name: "Prompt Canvas Studio", badge: "Live" },
                  { name: "Style Presets & LoRAs" },
                  { name: "Neural Upscaling" },
                  { name: "API Documentation" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#studio"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[10px] bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-300 border border-orange-500/30 px-1.5 py-0.5 rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between px-3">
                <span className="text-[11px] text-zinc-500">Latency: 1.1s</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Cluster Online
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Subtle Right Header Action (Clean minimal editorial pill) */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-zinc-400 backdrop-blur-md">
            Model: <span className="text-white font-semibold">DF-XL Hyper</span>
          </div>
          <button className="px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-xs font-medium text-white transition-all">
            Sign In
          </button>
        </div>
      </header>

      {/* HERO MAIN BODY */}
      <main className="relative z-20 w-full flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-2 pb-0">
        {/* Content Row: Left Column | Center Subject | Right Column */}
        <div className="relative w-full max-w-[1440px] mx-auto min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col lg:flex-row items-center justify-between">
          
          {/* LEFT COLUMN: Badge + Editorial Headline (Exact alignment with reference) */}
          <div className="w-full lg:w-1/3 z-30 pt-4 sm:pt-6 lg:pt-0 mb-8 lg:mb-16 flex flex-col items-start">
            {/* Availability-Style Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1b1922]/80 border border-white/10 backdrop-blur-md mb-5 sm:mb-7 shadow-sm transition-transform hover:scale-[1.02]">
              {/* Glowing Orange Pulse Dot (Matches Reference) */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5e28] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5e28] shadow-[0_0_8px_#ff5e28]"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-200 uppercase">
                AI IMAGE GENERATOR
              </span>
            </div>

            {/* Headline (3-Line Editorial Hierarchy) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] font-bold tracking-tight text-white leading-[1.08] max-w-sm sm:max-w-md">
              Cinema-Grade
              <br />
              AI Imagery for
              <br />
              Visionary Minds
            </h1>

            {/* Prompt Quick Preview Tag (Extra High-End AI Detail) */}
            <div className="mt-6 hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-[11px] text-zinc-400 backdrop-blur-md max-w-xs">
              <span className="text-orange-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                PROMPT
              </span>
              <span className="truncate text-zinc-300">
                cyberpunk operative, neon violet aura...
              </span>
              <button
                onClick={handleCopyPrompt}
                title="Copy prompt"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                {isCopied ? "✓" : "❐"}
              </button>
            </div>
          </div>

          {/* CENTER SUBJECT (Cyberpunk Character with 3D Depth Layering) */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-20 overflow-visible">
            <div
              className="relative w-[340px] sm:w-[460px] md:w-[540px] lg:w-[620px] xl:w-[680px] h-[480px] sm:h-[600px] md:h-[660px] lg:h-[720px] transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${mousePos.x * 0.4}px) translateY(${
                  mousePos.y * 0.2
                }px)`,
              }}
            >
              {/* Subtle Violet Backlight Halo */}
              <div className="absolute inset-0 -top-8 bg-gradient-to-t from-transparent via-purple-600/20 to-transparent blur-2xl rounded-full transform scale-90" />

              {/* The Cutout Persona (Woman in High-Collar Cyberpunk Jacket & Orange Glasses) */}
              <div className="relative w-full h-full flex items-end justify-center">
                <Image
                  src="/dreamframe-subject.png"
                  alt="DREAMFRAME AI generated character with cyberpunk jacket and orange eyewear"
                  fill
                  priority
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 540px, 680px"
                  className="object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] filter contrast-[1.03]"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 85%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, black 85%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Description + CTA Button (Exact Reference Replication) */}
          <div className="w-full lg:w-1/3 z-30 flex flex-col items-start lg:items-end text-left lg:text-right mt-auto mb-8 lg:mb-20">
            {/* Supporting Description */}
            <p className="text-sm sm:text-[15px] lg:text-[15.5px] text-zinc-300/90 font-normal leading-relaxed max-w-xs sm:max-w-sm mb-6 lg:mb-7">
              Generate photorealistic 8K visuals, cinematic concept art, and
              custom character designs in milliseconds with cutting-edge neural
              diffusion.
            </p>

            {/* CTA Button: Orange/Purple Pill with Arrow Icon (Reference Matching) */}
            <a
              href="#create"
              className="group relative inline-flex items-center gap-3.5 p-1.5 pr-6 sm:pr-7 rounded-full bg-gradient-to-r from-[#ff5e28] via-[#f95738] to-[#9333ea] hover:to-[#a855f7] text-white font-medium text-sm sm:text-[15px] transition-all duration-300 shadow-[0_4px_25px_rgba(255,94,40,0.35),0_0_40px_rgba(147,51,234,0.25)] hover:shadow-[0_6px_30px_rgba(255,94,40,0.5),0_0_50px_rgba(147,51,234,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Circular White Icon Badge with Right Arrow */}
              <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-[#ff5e28] shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
                <svg
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2.5]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>

              {/* CTA Label */}
              <span className="tracking-tight font-semibold text-white">
                Start Creating
              </span>
            </a>

            {/* Trust / Stats Sub-cue */}
            <div className="mt-3.5 flex items-center gap-2 text-[11px] text-zinc-400/80">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              <span>Unlimited prompts • 4K HDR Export</span>
            </div>
          </div>
        </div>

        {/* OVERSIZED BRAND TEXT: "DREAMFRAME" (The Signature Feature) */}
        {/* Layered at the bottom, directly behind the foreground character */}
        <div className="relative w-full z-10 select-none pointer-events-none mt-auto -mb-2 sm:-mb-4 lg:-mb-6 overflow-hidden flex justify-center">
          <h2
            className="w-full text-center font-extrabold tracking-[-0.035em] text-white leading-none whitespace-nowrap opacity-95"
            style={{
              fontSize: "clamp(4.2rem, 14.8vw, 15.5rem)",
              fontFamily: "var(--font-outfit), sans-serif",
            }}
          >
            DREAMFRAME
          </h2>
        </div>
      </main>

      {/* SUBTLE BOTTOM AMBIENT GLOW BAR */}
      <div className="relative z-30 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

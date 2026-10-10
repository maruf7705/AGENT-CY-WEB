'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Layers, Box, Cpu, Mail, Github, Twitter, Instagram } from 'lucide-react';

interface PortfolioModalProps {
  isOpen: boolean;
  type: 'Work' | 'About' | 'Contact' | null;
  onClose: () => void;
}

export default function PortfolioModal({ isOpen, type, onClose }: PortfolioModalProps) {
  if (!isOpen || !type) return null;

  const projects = [
    {
      title: 'Chroma Horizon & Floral CRT',
      category: 'Speculative 3D & AI',
      desc: 'An exploration of analog memory and digital ascension featuring real-time chromatic bloom and neural botany.',
      year: '2026',
      badge: 'Interactive Hero',
    },
    {
      title: 'Neural Synthesia 0.4',
      category: 'Generative AI / WebGL',
      desc: 'Autonomous audiovisual installation reacting to high-frequency ambient frequencies in real time.',
      year: '2025',
      badge: 'Exhibition',
    },
    {
      title: 'Synthetic Flora & Cybernetic Meadows',
      category: 'Houdini / Unreal Engine 5.4',
      desc: 'Computational generative growth simulations trained on rare alpine flower biome metrics.',
      year: '2025',
      badge: '3D Motion',
    },
    {
      title: 'Substratum Portal',
      category: 'Web Experience / Three.js',
      desc: 'Immersive spatial web installation connecting distributed physical sensors to a browser realm.',
      year: '2024',
      badge: 'Web',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-[#0b0d14]/95 border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden z-10 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(196,181,253,0.8)]" />
              <h2 className="text-base sm:text-lg font-medium tracking-[0.16em] uppercase text-white font-sans">
                {type === 'Work' && 'Selected Works & Archive'}
                {type === 'About' && 'Artist Profile & Philosophy'}
                {type === 'Contact' && 'Initiate Collaboration'}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-zinc-300 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-zinc-300">
            {type === 'Work' && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-zinc-400 font-light">
                  A curated selection of experiments, commercial installations, and speculative artifacts.
                </p>
                <div className="grid gap-3 sm:gap-4">
                  {projects.map((proj, i) => (
                    <div
                      key={i}
                      className="group p-4 sm:p-5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-violet-400/40 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-400/30">
                            {proj.badge}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">{proj.year}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-violet-200 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{proj.desc}</p>
                      </div>
                      <div className="shrink-0 flex items-center justify-end">
                        <span className="p-2 rounded-full bg-white/[0.04] group-hover:bg-violet-400/20 text-zinc-400 group-hover:text-violet-200 transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {type === 'About' && (
              <div className="space-y-5 text-sm sm:text-[15px] leading-relaxed font-light">
                <p>
                  <strong className="font-medium text-white">MILADICODE</strong> operates at the vanguard where computation transcends utility to become sensory poetry.
                </p>
                <p>
                  With roots in computational design, generative neural networks, and procedural world-building, I design systems that feel organic, mysterious, and cinematically alive.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <Sparkles className="w-4 h-4 mx-auto text-violet-400 mb-1.5" />
                    <span className="block text-[11px] uppercase tracking-wider text-zinc-400">Generative AI</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <Box className="w-4 h-4 mx-auto text-violet-400 mb-1.5" />
                    <span className="block text-[11px] uppercase tracking-wider text-zinc-400">3D Real-time</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <Layers className="w-4 h-4 mx-auto text-violet-400 mb-1.5" />
                    <span className="block text-[11px] uppercase tracking-wider text-zinc-400">Kinetic Motion</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <Cpu className="w-4 h-4 mx-auto text-violet-400 mb-1.5" />
                    <span className="block text-[11px] uppercase tracking-wider text-zinc-400">Creative Code</span>
                  </div>
                </div>
              </div>
            )}

            {type === 'Contact' && (
              <div className="space-y-6">
                <p className="text-sm font-light leading-relaxed">
                  Available for select commissions, spatial creative direction, stage visual systems, and speculative interactive design.
                </p>
                <a
                  href="mailto:contact@miladicode.art"
                  className="p-4 rounded-xl bg-white/[0.04] hover:bg-violet-500/10 border border-white/10 hover:border-violet-400/40 flex items-center justify-between text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-violet-300" />
                    <span className="text-sm sm:text-base font-mono">contact@miladicode.art</span>
                  </div>
                  <span className="text-xs text-violet-300 group-hover:translate-x-1 transition-transform">
                    Copy / Email &rarr;
                  </span>
                </a>
                <div className="flex items-center justify-center gap-4 pt-2">
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

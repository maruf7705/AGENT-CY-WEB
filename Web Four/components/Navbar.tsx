'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export default function Navbar({ activeSection = 'Home', onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ['Home', 'Work', 'About', 'Contact'];

  const handleClick = (item: string) => {
    if (onNavigate) {
      onNavigate(item);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 md:px-16 py-6 md:py-8 flex items-center justify-between transition-all duration-300">
      {/* Top-Left Minimal Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2.5 cursor-pointer group"
        onClick={() => handleClick('Home')}
      >
        <span className="text-sm md:text-[15px] font-semibold tracking-[0.28em] text-white/90 group-hover:text-white transition-colors uppercase font-sans">
          MILADICODE
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 shadow-[0_0_8px_rgba(196,181,253,0.8)]" />
      </motion.div>

      {/* Top-Right Navigation (Desktop) */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[13px] tracking-[0.16em] uppercase"
      >
        {navItems.map((item) => {
          const isActive = activeSection.toLowerCase() === item.toLowerCase();
          return (
            <button
              key={item}
              onClick={() => handleClick(item)}
              className="relative py-1 group text-left focus:outline-none transition-colors"
            >
              <span
                className={`transition-colors duration-300 ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-zinc-400 group-hover:text-white'
                }`}
              >
                {item}
              </span>

              {/* Minimal active / hover indicator underline */}
              {isActive ? (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 shadow-[0_0_8px_rgba(196,181,253,0.7)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : (
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-300" />
              )}
            </button>
          );
        })}
      </motion.nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="p-2 rounded-full bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.1] backdrop-blur-md transition-all"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-4 right-4 mt-2 py-6 px-6 bg-[#0a0c14]/95 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-2xl flex flex-col space-y-5 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleClick(item)}
                className="text-left text-sm tracking-[0.2em] uppercase text-zinc-300 hover:text-white py-2 flex items-center justify-between border-b border-white/5 last:border-b-0"
              >
                <span>{item}</span>
                {activeSection.toLowerCase() === item.toLowerCase() && (
                  <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(196,181,253,0.8)]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Bot, GitBranch, Cpu } from 'lucide-react';

export default function Hero() {
  return (
    <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
      <div className="max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-neonBlue/30 rounded-full bg-neonBlue/5 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-agentGreen animate-pulse"></span>
          <span className="font-mono text-xs text-neonBlue uppercase tracking-wider">Hermes 3 Engine Online</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6"
        >
          Scale Your Workforce to <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-cyberPurple">Infinity.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light"
        >
          We build autonomous business ecosystems. Combining bleeding-edge multi-agent systems via 
          <span className="font-mono text-white px-1">LangChain</span> and hyper-scalable orchestration via 
          <span className="font-mono text-white px-1">n8n</span> to replace legacy software with cognitive synthetic intelligence.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-neonBlue text-black font-semibold rounded-sm hover:shadow-[0_0_30px_#00F0FF] transition-all duration-300">
            Start Neural Audit 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="flex items-center justify-center gap-3 px-8 py-4 glass-panel text-white font-semibold rounded-sm hover:bg-white/5 transition-all duration-300 border border-white/10">
            View Autonomous Apps
          </button>
        </motion.div>
      </div>

      {/* Feature Grid representing N8N/Langchain concepts */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
      >
        <div className="glass-panel p-6 rounded-lg relative overflow-hidden group hover:border-agentGreen/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-agentGreen/10 rounded-bl-full blur-2xl"></div>
          <GitBranch className="w-8 h-8 text-agentGreen mb-4" />
          <h3 className="text-xl font-bold mb-2">n8n Neural Pipes</h3>
          <p className="text-sm text-gray-400 font-light">Custom orchestrated workflows binding your entire SaaS stack to autonomous agents replacing human middleware.</p>
        </div>

        <div className="glass-panel p-6 rounded-lg relative overflow-hidden group hover:border-neonBlue/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-neonBlue/10 rounded-bl-full blur-2xl"></div>
          <Bot className="w-8 h-8 text-neonBlue mb-4" />
          <h3 className="text-xl font-bold mb-2">LangChain Swarms</h3>
          <p className="text-sm text-gray-400 font-light">Self-correcting, goal-oriented multi-agent teams that research, code, and execute business logic 24/7.</p>
        </div>

        <div className="glass-panel p-6 rounded-lg relative overflow-hidden group hover:border-cyberPurple/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyberPurple/10 rounded-bl-full blur-2xl"></div>
          <Cpu className="w-8 h-8 text-cyberPurple mb-4" />
          <h3 className="text-xl font-bold mb-2">Hermes 3 Edge</h3>
          <p className="text-sm text-gray-400 font-light">Uncensored, localized LLM deployments guaranteeing sub-second latency and military-grade data privacy.</p>
        </div>
      </motion.div>
    </div>
  );
}

import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

// Dynamically import the 3D scene to prevent SSR issues with WebGL
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background flex items-center justify-center font-mono text-neonBlue/50 text-sm">INITIALIZING AI CORES...</div>
});

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ThreeScene />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full">
        <Hero />
      </div>
      
      {/* Navbar overlay (simplified) */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 glass-panel">
        <div className="text-2xl font-bold tracking-tighter">
          AGENT<span className="text-neonBlue">-CY</span>
        </div>
        <div className="hidden md:flex gap-8 font-mono text-sm text-gray-400">
          <a href="#agents" className="hover:text-neonBlue transition-colors">SWARMS</a>
          <a href="#n8n" className="hover:text-agentGreen transition-colors">WORKFLOWS</a>
          <a href="#audit" className="hover:text-white transition-colors">SYSTEM_AUDIT</a>
        </div>
        <button className="px-5 py-2.5 bg-white text-black font-semibold rounded-sm hover:bg-neonBlue hover:shadow-[0_0_20px_#00F0FF] transition-all duration-300">
          DEPLOY NOW
        </button>
      </nav>
    </main>
  );
}

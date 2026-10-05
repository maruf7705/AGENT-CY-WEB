"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import { useMemo, useRef, Suspense } from 'react';
import * as THREE from 'three';

function AgentSwarmParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  // Generate a galaxy/network like structure representing agents
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 * Math.cbrt(Math.random());
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Smooth dynamic rotation resembling a thinking brain / data flow
      ref.current.rotation.y -= delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00F0FF"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full absolute inset-0 opacity-80">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        {/* Subtle ambient lighting */}
        <ambientLight intensity={0.1} />
        
        <Suspense fallback={null}>
          <AgentSwarmParticles />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

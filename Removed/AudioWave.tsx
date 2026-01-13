import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- VARIANT 1: SIGNALS (Sine Wave) ---
const AudioWave = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 2000;
  
  const { positions, originalY } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origY = new Float32Array(count);
    const width = 40;
    const depth = 40;
    
    for(let i = 0; i < count; i++) {
       const x = (Math.random() - 0.5) * width;
       const z = (Math.random() - 0.5) * depth;
       const y = 0;
       
       pos[i*3] = x;
       pos[i*3+1] = y;
       pos[i*3+2] = z;
       origY[i] = y;
    }
    return { positions: pos, originalY: origY };
  }, []);

  useFrame((state) => {
    if(!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for(let i = 0; i < count; i++) {
       const x = positions[i*3];
       const z = positions[i*3+2];
       // Sine wave logic based on position and time
       positions[i*3+1] = Math.sin(x * 0.5 + t) * Math.cos(z * 0.5 + t) * 2;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
       <PointMaterial transparent color="#8E84F7" size={0.12} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  )
}

export default AudioWave;

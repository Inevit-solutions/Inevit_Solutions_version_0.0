import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

type BackgroundVariant = 'work' | 'services' | 'process' | 'blog' | 'about';

interface BackgroundCanvasProps {
  variant: BackgroundVariant;
}



// --- VARIANT 2: WORK (Digital Stream / Data Rain) ---
const DigitalStream = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 1200;

  const { positions, speeds } = useMemo(() => {
      const pos = new Float32Array(count * 3);
      const spd = new Float32Array(count);
      const width = 35;
      const height = 40;
      const depth = 25;

      for(let i=0; i<count; i++) {
          pos[i*3] = (Math.random() - 0.5) * width;
          pos[i*3+1] = (Math.random() - 0.5) * height;
          pos[i*3+2] = (Math.random() - 0.5) * depth;
          spd[i] = Math.random() * 0.15 + 0.05; // Random fall speed
      }
      return { positions: pos, speeds: spd };
  }, []);

  useFrame(() => {
      if(!pointsRef.current) return;
      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const height = 40;

      for(let i=0; i<count; i++) {
          // Move down
          pos[i*3+1] -= speeds[i];
          // Reset if below bottom
          if(pos[i*3+1] < -height/2) {
              pos[i*3+1] = height/2;
          }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial color="#8E84F7" size={0.08} transparent opacity={0.4} sizeAttenuation={true} depthWrite={false} />
      </Points>
  )
}

// --- VARIANT 3: SERVICES (Floating Modules) ---
const FloatingClusters = () => {
    const count = 15;
    
    // Generate random positions for shapes
    const shapes = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ] as [number, number, number],
            scale: Math.random() * 0.5 + 0.2,
            type: Math.random() > 0.5 ? 'box' : 'oct'
        }))
    }, []);

    return (
        <group>
            {shapes.map((s, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
                    <mesh position={s.position} scale={s.scale}>
                        {s.type === 'box' ? <boxGeometry /> : <octahedronGeometry />}
                        <meshStandardMaterial 
                            color={i % 2 === 0 ? "#F4B400" : "#444"} 
                            emissive={i % 2 === 0 ? "#F4B400" : "#222"}
                            emissiveIntensity={0.1}
                            wireframe 
                            transparent 
                            opacity={0.3} 
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    )
}

// --- VARIANT 4: PROCESS (Tunnel) ---
const TunnelFlow = () => {
    const rings = useMemo(() => new Array(10).fill(0).map((_, i) => i * 4), []);
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if(groupRef.current) {
            // Move rings towards camera
            groupRef.current.position.z = (state.clock.elapsedTime * 3) % 4;
        }
    });

    return (
        <group ref={groupRef}>
            {rings.map((z, i) => (
                <mesh key={i} position={[0, 0, -z - 10]} rotation={[0,0, i]}>
                    <torusGeometry args={[4, 0.02, 16, 50]} />
                    <meshBasicMaterial color="#8E84F7" transparent opacity={0.5 - (i * 0.05)} />
                </mesh>
            ))}
             {rings.map((z, i) => (
                <mesh key={`inner-${i}`} position={[0, 0, -z - 10]} rotation={[0,0, -i]}>
                    <torusGeometry args={[2, 0.01, 16, 3]} />
                    <meshBasicMaterial color="#FFCA28" transparent opacity={0.3} />
                </mesh>
            ))}
        </group>
    )
}

// --- VARIANT 5: ABOUT (Double Helix) ---
const DoubleHelix = () => {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = 400; // Total points
    
    const { positions } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const radius = 3.5;
        const height = 25;
        const turns = 4;
        const pointsPerStrand = count / 2;
        
        for(let i=0; i<pointsPerStrand; i++) {
            const t = i / pointsPerStrand;
            const angle = t * Math.PI * 2 * turns;
            const y = (t - 0.5) * height;
            
            // Strand 1
            pos[i*3] = Math.cos(angle) * radius;
            pos[i*3+1] = y;
            pos[i*3+2] = Math.sin(angle) * radius;

            // Strand 2 (Offset PI)
            const j = i + pointsPerStrand;
            pos[j*3] = Math.cos(angle + Math.PI) * radius;
            pos[j*3+1] = y;
            pos[j*3+2] = Math.sin(angle + Math.PI) * radius;
        }
        return { positions: pos };
    }, []);

    useFrame((state) => {
        if(pointsRef.current) {
            // Slow rotation
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
            // Slight tilt wobble
            pointsRef.current.rotation.z = Math.PI / 12 + Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
         <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial color="#F4B400" size={0.12} transparent opacity={0.3} sizeAttenuation={true} depthWrite={false} />
        </Points>
    )
}

const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ variant }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true }}>
        <fog attach="fog" args={['#050505', 8, 45]} />
        <ambientLight intensity={0.8} />
        

        {variant === 'work' && <DigitalStream />}
        {variant === 'services' && <FloatingClusters />}
        {variant === 'process' && <TunnelFlow />}
        {variant === 'about' && <DoubleHelix />}
        {variant === 'blog' && <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />}
        
      </Canvas>
      {/* Universal Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian/95 pointer-events-none" />
    </div>
  );
};

export default BackgroundCanvas;
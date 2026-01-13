import React, { useRef, useMemo, Suspense, ReactNode, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Ring, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const GLOBE_RADIUS = 5;
const EARTH_TEXTURE_URL = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg';

// Convert Lat/Lon to 3D Vector3
const getPosition = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
};

const IndiaMarker = () => {
    // India Approx: 20.5937° N, 78.9629° E
    const pos = useMemo(() => getPosition(20.5937, 78.9629, GLOBE_RADIUS), []);
    const ringRef = useRef<THREE.Mesh>(null!);
    const outerRingRef = useRef<THREE.Mesh>(null!);
    
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if(ringRef.current) {
            ringRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.2);
            ringRef.current.lookAt(new THREE.Vector3(0,0,0));
        }
        if(outerRingRef.current) {
            outerRingRef.current.scale.setScalar(1 + Math.cos(t * 2) * 0.3);
            outerRingRef.current.lookAt(new THREE.Vector3(0,0,0));
            outerRingRef.current.rotation.z += 0.02;
        }
    });

    return (
        <group position={pos}>
            <Sphere args={[0.08, 16, 16]}>
                <meshBasicMaterial color="#F4B400" toneMapped={false} />
            </Sphere>
            {/* Pulse Rings */}
            <Ring ref={ringRef} args={[0.15, 0.2, 32]} position={[0,0,0]}>
                 <meshBasicMaterial color="#F4B400" transparent opacity={0.6} side={THREE.DoubleSide} />
            </Ring>
            <Ring ref={outerRingRef} args={[0.25, 0.26, 32]} position={[0,0,0]}>
                 <meshBasicMaterial color="#F4B400" transparent opacity={0.4} side={THREE.DoubleSide} />
            </Ring>
        </group>
    );
}

const EarthGlobe = () => {
    const groupRef = useRef<THREE.Group>(null!);
    
    // Use useTexture for better loading handling and caching
    const map = useTexture(EARTH_TEXTURE_URL);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
        }
    });

    return (
        <group ref={groupRef} rotation={[0.2, 0, 0]}>
            <Sphere args={[GLOBE_RADIUS, 64, 64]}>
                <meshStandardMaterial 
                    map={map}
                    color="#cccccc" // Light gray tint on the white parts
                    roughness={0.7}
                    metalness={0.1}
                    emissiveMap={map}
                    emissive="#1a1a1a" // Slight glow on landmasses
                />
            </Sphere>

            {/* Wireframe Grid Overlay */}
            <Sphere args={[GLOBE_RADIUS + 0.05, 32, 32]}>
                 <meshBasicMaterial 
                    color="#333333" 
                    wireframe 
                    transparent 
                    opacity={0.15} 
                 />
            </Sphere>
            
            <IndiaMarker />
        </group>
    );
}

const FallbackGlobe = () => {
    const groupRef = useRef<THREE.Group>(null!);
    
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
        }
    });

    return (
         <group ref={groupRef} rotation={[0.2, 0, 0]}>
            {/* Main structural sphere */}
            <Sphere args={[GLOBE_RADIUS, 32, 32]}>
                 <meshBasicMaterial color="#222" wireframe transparent opacity={0.3} />
            </Sphere>
            {/* Inner solid core to block background stars */}
             <Sphere args={[GLOBE_RADIUS - 0.1, 32, 32]}>
                 <meshBasicMaterial color="#000000" />
            </Sphere>
            <IndiaMarker />
         </group>
    )
}

interface GlobeErrorBoundaryProps {
  fallback: ReactNode;
  children?: ReactNode;
}

interface GlobeErrorBoundaryState {
  hasError: boolean;
}

class GlobeErrorBoundary extends Component<GlobeErrorBoundaryProps, GlobeErrorBoundaryState> {
  constructor(props: GlobeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Globe Texture Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const ContactGlobe = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 16], fov: 45 }}>
        <fog attach="fog" args={['#050505', 15, 40]} />
        
        <ambientLight intensity={1.2} />
        <directionalLight position={[15, 10, 5]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-10, 0, 10]} intensity={1.0} color="#6D5EF6" />

        <GlobeErrorBoundary fallback={<FallbackGlobe />}>
             <Suspense fallback={<FallbackGlobe />}>
                <EarthGlobe />
             </Suspense>
        </GlobeErrorBoundary>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-obsidian opacity-80 pointer-events-none" />
    </div>
  );
};

// Preload texture to avoid suspense on mount if possible
useTexture.preload(EARTH_TEXTURE_URL);

export default ContactGlobe;
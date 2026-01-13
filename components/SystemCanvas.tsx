import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

// --- Configuration ---
const PARTICLE_COUNT = 100;
const CONNECT_DISTANCE = 4.5;
const AWAKENING_DURATION = 2.5; // Seconds
const MOVE_SPEED = 0.2;

/**
 * ConnectedNet: Handles the particles and the lines connecting them
 */
const ConnectedNet = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  // 1. Initial Data Generation
  const { positions, velocities, targetPositions } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vels = [];
    const targets = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Start near center for "Awakening"
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      // Random velocities for natural drift
      vels.push(new THREE.Vector3(
        (Math.random() - 0.5) * MOVE_SPEED,
        (Math.random() - 0.5) * MOVE_SPEED,
        (Math.random() - 0.5) * MOVE_SPEED
      ));

      // Target positions (Where they expand to)
      // Spherical cloud distribution
      const r = 15 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      targets.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
    }
    return { positions: pos, velocities: vels, targetPositions: targets };
  }, []);

  // Buffer for line positions (Max possible connections is N*N, but we limit for perf)
  // 100 particles * 10 max connections each = 1000 lines = 2000 vertices
  const linePositions = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 3), []);
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  // 2. Animation Loop
  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    const t = state.clock.elapsedTime;
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const currentPositions = posAttribute.array as Float32Array;
    
    // Awakening Logic: Interpolate from current to target
    // We use a simple lerp towards target for the "expansion" phase
    const isAwakening = t < AWAKENING_DURATION;
    const expansionSpeed = isAwakening ? delta * 2 : delta * 0.1;

    let lineVertexIndex = 0;

    // Update Particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Current pos
      let x = currentPositions[ix];
      let y = currentPositions[iy];
      let z = currentPositions[iz];

      // Target pos
      const tx = targetPositions[i].x;
      const ty = targetPositions[i].y;
      const tz = targetPositions[i].z;

      // Velocity drift (only after awakening or slight influence during)
      const vx = velocities[i].x * delta;
      const vy = velocities[i].y * delta;
      const vz = velocities[i].z * delta;

      // Move towards target (Expansion) + Drift
      if (isAwakening) {
        // Easing out function for expansion
        x += (tx - x) * expansionSpeed;
        y += (ty - y) * expansionSpeed;
        z += (tz - z) * expansionSpeed;
      } else {
        // Natural floating
        x += vx;
        y += vy;
        z += vz;

        // Boundary wrap / Soft bounce logic could go here, 
        // but for simplicity we let them drift and pull them back if too far
        if (x > 20 || x < -20) velocities[i].x *= -1;
        if (y > 20 || y < -20) velocities[i].y *= -1;
        if (z > 20 || z < -20) velocities[i].z *= -1;
      }

      // Update position array
      currentPositions[ix] = x;
      currentPositions[iy] = y;
      currentPositions[iz] = z;

      // CHECK CONNECTIONS (O(N^2/2) check)
      // Only draw lines if fully awakened or partially to prevent messy center
      if (t > 0.5) { 
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
            const jx = j * 3;
            const jy = j * 3 + 1;
            const jz = j * 3 + 2;

            const dx = x - currentPositions[jx];
            const dy = y - currentPositions[jy];
            const dz = z - currentPositions[jz];
            const distSq = dx*dx + dy*dy + dz*dz;

            if (distSq < CONNECT_DISTANCE * CONNECT_DISTANCE) {
                // Add line vertices
                linePositions[lineVertexIndex++] = x;
                linePositions[lineVertexIndex++] = y;
                linePositions[lineVertexIndex++] = z;
                linePositions[lineVertexIndex++] = currentPositions[jx];
                linePositions[lineVertexIndex++] = currentPositions[jy];
                linePositions[lineVertexIndex++] = currentPositions[jz];
            }
        }
      }
    }

    // Update Attributes
    posAttribute.needsUpdate = true;
    
    // Update Lines
    linesRef.current.geometry.setAttribute(
        'position', 
        new THREE.BufferAttribute(linePositions.subarray(0, lineVertexIndex), 3)
    );
    linesRef.current.geometry.computeBoundingSphere(); // vital for frustum culling prevention
  });

  return (
    <group>
      {/* Nodes */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#F4B400"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#6D5EF6" transparent opacity={0.15} linewidth={1} depthWrite={false} />
      </lineSegments>
    </group>
  );
};

/**
 * CameraRig: Handles Mouse Parallax and Scroll Movement
 */
const CameraRig = () => {
    const { camera, mouse } = useThree();
    
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const scrollY = window.scrollY;
        const height = window.innerHeight;
        
        // 1. Scroll Effect: Move camera forward/down
        const scrollProgress = Math.min(scrollY / height, 2);
        
        // Target positions
        const targetZ = 18 - (scrollProgress * 5); // Zoom in
        const targetY = -(scrollProgress * 2); // Pan down slightly
        
        // 2. Mouse Parallax
        const mouseX = mouse.x * 2; // -1 to 1
        const mouseY = mouse.y * 2; // -1 to 1

        // Smoothly interpolate camera
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (targetY + mouseY * 0.5 - camera.position.y) * 0.05;
        camera.position.z += (targetZ - camera.position.z) * 0.05;

        // Slight rotation to keep it dynamic
        camera.lookAt(0, 0, 0);
        camera.rotation.z = mouseX * 0.05; // Slight tilt
    });

    return null;
}

const SystemCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 18], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={['#050505', 10, 30]} />
        <ambientLight intensity={0.5} />
        
        <ConnectedNet />
        <CameraRig />
      </Canvas>
      {/* Vignette Overlay for focus */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian opacity-80" />
    </div>
  );
};

export default SystemCanvas;
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated starfield particle system.
 * 6000 random points slowly rotating on X and Y axes.
 */
function ParticleCloud({ count = 6000 }) {
  const meshRef = useRef(null);

  // Generate random sphere positions
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random points inside a sphere radius 3
      const r = 3 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.04;
    meshRef.current.rotation.y = t * 0.06;
  });

  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.008}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * Floating icosahedron that follows the mouse in 3D space.
 */
function FloatingShape() {
  const meshRef = useRef(null);
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Auto-spin
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.5;

    // Float up/down
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;

    // Follow mouse
    const mx = state.mouse.x * 0.5;
    const my = state.mouse.y * 0.5;
    groupRef.current.rotation.y += (mx - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (-my - groupRef.current.rotation.x) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={[2.5, 0, 0]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color="#7c3aed"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh position={[2.5, 0, 0]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Second shape */}
      <mesh position={[-2.2, 0.5, -0.5]} rotation={[0.4, 0.6, 0]}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

/**
 * Three.js canvas for the hero background.
 * Renders particles + floating wireframe shapes.
 */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#7c3aed" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#06b6d4" />

      <ParticleCloud />
      <FloatingShape />
    </Canvas>
  );
}

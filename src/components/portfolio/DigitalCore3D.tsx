"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Points } from "@react-three/drei";
import * as THREE from "three";

// Simplified Digital Core component
function DigitalCore({ isAudioPlaying, theme }: { isAudioPlaying: boolean; theme: "black" | "light" }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const particlePositions = useMemo(() => {
    return new Float32Array(
      Array.from({ length: 150 }, () => (Math.random() - 0.5) * 10)
    );
  }, []);

  const innerColor = theme === "black" ? "#FFFFFF" : "#000000";

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Rotation speed based on audio and hover
    const baseSpeed = isAudioPlaying ? 0.008 : 0.003;
    const rotationSpeed = hovered ? baseSpeed * 2 : baseSpeed;

    groupRef.current.rotation.y += rotationSpeed;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Inner core animation
    if (innerRef.current) {
      innerRef.current.rotation.y -= rotationSpeed * 1.5;
      innerRef.current.rotation.z = Math.sin(time * 0.3) * 0.2;
      
      const scale = isAudioPlaying ? 1.2 : (hovered ? 1.1 : 1.0);
      const breathing = 1 + Math.sin(time * 2) * 0.05;
      innerRef.current.scale.setScalar(scale * breathing);
    }

    // Core glow
    if (coreRef.current) {
      const glowScale = isAudioPlaying ? 1.5 : 1.2;
      coreRef.current.scale.setScalar(glowScale + Math.sin(time * 3) * 0.1);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central Wireframe Icosahedron */}
      <mesh>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial
          color="#FF6B35"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner Solid Octahedron */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color={innerColor}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glowing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color="#A3E635"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Orbiting Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshStandardMaterial color="#FF6B35" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.04, 16, 100]} />
        <meshStandardMaterial color="#7C3AED" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
        <torusGeometry args={[4, 0.03, 16, 100]} />
        <meshStandardMaterial color="#A3E635" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Particles */}
      <Points positions={particlePositions}>
        <pointsMaterial
          size={0.05}
          color="#FF6B35"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </Points>
    </group>
  );
}

// Scene component
function Scene({ isAudioPlaying, theme }: { isAudioPlaying: boolean; theme: "black" | "light" }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 12);
  }, [camera]);

  const gridColor = theme === "black" ? 0x333333 : 0x000000;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#A3E635" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#FF6B35" />
      
      <gridHelper args={[20, 20, gridColor, gridColor]} position={[0, -5, 0]} />
      
      <DigitalCore isAudioPlaying={isAudioPlaying} theme={theme} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        rotateSpeed={0.5}
      />
    </>
  );
}

// Main component
export function DigitalCore3D({ isAudioPlaying = false }: { isAudioPlaying?: boolean }) {
  const { theme } = useTheme();
  const bgColor = theme === "black" ? "#0A0A0F" : "#FFFBF0";

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={[bgColor]} />
        <Suspense fallback={null}>
          <Scene isAudioPlaying={isAudioPlaying} theme={theme} />
        </Suspense>
      </Canvas>
    </div>
  );
}

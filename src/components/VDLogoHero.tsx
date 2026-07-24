"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function LightningBolt() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [opacity, setOpacity] = useState(0);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Random lightning flashes
    if (Math.random() < 0.02) {
      setOpacity(1);
      setTimeout(() => setOpacity(0), 100);
    }

    if (meshRef.current) {
      meshRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[0.3, 8]} />
      <meshBasicMaterial
        color="#00E5FF"
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles}>
      <PointMaterial
        color="#38BDF8"
        size={0.02}
        transparent
        opacity={0.5}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function VDLogoHero() {
  const [showLogo, setShowLogo] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Show logo after preloader
    const logoTimer = setTimeout(() => setShowLogo(true), 500);
    
    // Show welcome and speak after logo appears
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
      
      // Use Web Speech API for audio
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Welcome to Vibecode Dan Portfolio');
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Try to get a good voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Google') || 
          voice.name.includes('Microsoft') ||
          voice.lang.includes('en')
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      }
    }, 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(welcomeTimer);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050816']} />
        
        {/* Ambient light */}
        <ambientLight intensity={0.5} />
        
        {/* Point lights for glow effect */}
        <pointLight position={[10, 10, 10]} color="#00E5FF" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#7C3AED" intensity={1} />
        
        {/* Background particles */}
        <BackgroundParticles />
        
        {/* Lightning bolts */}
        <LightningBolt />
        <LightningBolt />
        <LightningBolt />
        <LightningBolt />
      </Canvas>

      {/* VD Logo in center */}
      {showLogo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src="/vd-logo.png"
            alt="VD Logo"
            className="h-64 w-64 md:h-80 md:w-80 object-contain"
            style={{
              filter: "drop-shadow(0 0 40px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 80px rgba(124, 58, 237, 0.6))",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </motion.div>
      )}

      {/* Welcome text with audio */}
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          <p className="text-2xl md:text-4xl font-bold text-[#00E5FF] text-center mt-80" style={{ textShadow: "0 0 30px rgba(0, 229, 255, 0.8), 0 0 60px rgba(124, 58, 237, 0.6)" }}>
            Welcome to Vibecode Dan Portfolio
          </p>
        </motion.div>
      )}
    </div>
  );
}

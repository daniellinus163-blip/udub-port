"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

function RobotHead({ isSpeaking, colorScheme }: { isSpeaking: boolean; colorScheme: 'purple' | 'blue' }) {
  const groupRef = useRef<THREE.Group>(null);
  const brainRef = useRef<THREE.Mesh>(null);
  const wireMaterials = useRef<THREE.LineBasicMaterial[]>([]);
  const mouthRef = useRef<THREE.Mesh>(null);

  const primaryColor = colorScheme === 'purple' ? '#A855F7' : '#38BDF8';

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    }

    if (brainRef.current) {
      const material = brainRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.5 + Math.sin(t * 2) * 0.2;
    }

    // Animate mouth when speaking
    if (mouthRef.current && isSpeaking) {
      const mouthScale = 0.3 + Math.sin(t * 15) * 0.2;
      mouthRef.current.scale.y = mouthScale;
    } else if (mouthRef.current) {
      mouthRef.current.scale.y = 0.3;
    }

    // Animate wires
    wireMaterials.current.forEach((material, i) => {
      material.opacity = 0.3 + Math.sin(t * 3 + i) * 0.2;
    });
  });

  // Create brain geometry - very large to almost cover background
  const brainGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(5.0, 2);
    return geometry;
  }, []);

  // Create head shape - very large to almost cover background
  const headGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(7.0, 32, 32);
    return geometry;
  }, []);

  // Create wire paths
  const wirePaths = useMemo(() => {
    const paths: THREE.Vector3[][] = [];
    
    for (let i = 0; i < 8; i++) {
      const points: THREE.Vector3[] = [];
      const angle = (i / 8) * Math.PI * 2;
      for (let j = 0; j < 20; j++) {
        const radius = 6.0 + Math.random() * 2.0;
        const y = -4 + (j / 20) * 8;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        ));
      }
      paths.push(points);
    }
    return paths;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Robot head shell */}
      <mesh geometry={headGeometry}>
        <meshBasicMaterial
          color="#0B1120"
          transparent
          opacity={0.3}
          wireframe={true}
        />
      </mesh>

      {/* Brain - more visible */}
      <mesh ref={brainRef} geometry={brainGeometry}>
        <meshBasicMaterial
          color={primaryColor}
          transparent
          opacity={0.6}
          wireframe={true}
        />
      </mesh>

      {/* Wires */}
      {wireGeometries.map((geometry, i) => (
        <Line
          key={i}
          points={geometry.attributes.position.array as Float32Array}
          color={primaryColor}
          transparent
          opacity={0.4}
          lineWidth={1}
        />
      ))}

      {/* Talking mouth */}
      <mesh ref={mouthRef} position={[0, -1.2, 6.0]}>
        <boxGeometry args={[1.6, 1.2, 0.4]} />
        <meshBasicMaterial color={primaryColor} />
      </mesh>
    </group>
  );
}

function CircuitParticles({ colorScheme }: { colorScheme: 'purple' | 'blue' }) {
  const pointsRef = useRef<THREE.Points>(null);

  const primaryColor = colorScheme === 'purple' ? '#A855F7' : '#38BDF8';

  const particles = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={primaryColor}
        size={0.03}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function RobotHeadAnimation() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [colorScheme, setColorScheme] = useState<'purple' | 'blue'>('purple');

  useEffect(() => {
    // Speech synthesis for robot voice
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const speak = () => {
        const text = "Welcome to Vibecode Dan Portfolio. I'm glad you're here. Take your time exploring my work and discovering the solutions I've built. Start by visiting the About Me section to learn more about my journey, technical skills, and experience as a Full Stack Developer and AI Engineer. Next, head over to the Projects section, where you'll find a collection of applications and solutions I've designed and developed using modern technologies. Each project highlights my approach to solving real-world problems through clean, scalable, and innovative development. When you're ready to collaborate, simply visit the Contact Me section to get in touch. Whether you have a project in mind, a business opportunity, or just want to connect, I'd be happy to hear from you. Thank you for visiting Vibecode Dan Portfolio, and I hope you enjoy the experience.";

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;
        utterance.pitch = 0.8;
        utterance.volume = 1; // Maximum volume

        // Try to get a robotic/deep voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice =>
          voice.name.toLowerCase().includes('google') ||
          voice.name.toLowerCase().includes('microsoft') ||
          voice.lang.includes('en')
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      };

      // Speak after a short delay
      const speakTimer = setTimeout(speak, 2000);

      return () => {
        clearTimeout(speakTimer);
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050816']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00E5FF" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#7C3AED" intensity={1} />
        
        <CircuitParticles colorScheme={colorScheme} />
        <RobotHead isSpeaking={isSpeaking} colorScheme={colorScheme} />
      </Canvas>
    </div>
  );
}

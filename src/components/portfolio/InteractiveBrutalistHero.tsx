"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Interactive 3D geometric cube using CSS transforms
function InteractiveCube() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 30 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-64 h-64 md:w-80 md:h-80"
      >
        {/* Front face */}
        <motion.div
          style={{ transform: "translateZ(80px)" }}
          className="absolute inset-0 border-4 border-black bg-[#0066FF] flex items-center justify-center shadow-[4px_4px_0px_#000000]"
        >
          <span className="text-white text-6xl md:text-7xl font-bold">D</span>
        </motion.div>

        {/* Back face */}
        <motion.div
          style={{ transform: "rotateY(180deg) translateZ(80px)" }}
          className="absolute inset-0 border-4 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_#000000]"
        >
          <span className="text-black text-6xl md:text-7xl font-bold">A</span>
        </motion.div>

        {/* Right face */}
        <motion.div
          style={{ transform: "rotateY(90deg) translateZ(80px)" }}
          className="absolute inset-0 border-4 border-black bg-[#6B21A8] flex items-center justify-center shadow-[4px_4px_0px_#000000]"
        >
          <span className="text-white text-6xl md:text-7xl font-bold">N</span>
        </motion.div>

        {/* Left face */}
        <motion.div
          style={{ transform: "rotateY(-90deg) translateZ(80px)" }}
          className="absolute inset-0 border-4 border-black bg-[#EA580C] flex items-center justify-center shadow-[4px_4px_0px_#000000]"
        >
          <span className="text-white text-6xl md:text-7xl font-bold">I</span>
        </motion.div>

        {/* Top face */}
        <motion.div
          style={{ transform: "rotateX(90deg) translateZ(80px)" }}
          className="absolute inset-0 border-4 border-black bg-[#65A30D] flex items-center justify-center shadow-[4px_4px_0px_#000000]"
        >
          <span className="text-white text-6xl md:text-7xl font-bold">E</span>
        </motion.div>

        {/* Bottom face */}
        <motion.div
          style={{ transform: "rotateX(-90deg) translateZ(80px)" }}
          className="absolute inset-0 border-4 border-black bg-[#0066FF] flex items-center justify-center shadow-[4px_4px_0px_#000000]"
        >
          <span className="text-white text-6xl md:text-7xl font-bold">L</span>
        </motion.div>
      </motion.div>

      {/* Instruction text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-black border-2 border-black bg-white px-3 py-1 shadow-[2px_2px_0px_#000000]">
        Hover to rotate
      </div>
    </div>
  );
}

// Animated floating elements
function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-16 h-16 border-4 border-black bg-[#0066FF] shadow-[4px_4px_0px_#000000]"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-40 right-20 w-12 h-12 border-4 border-black bg-[#6B21A8] shadow-[4px_4px_0px_#000000]"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-32 left-20 w-20 h-20 border-4 border-black bg-[#EA580C] shadow-[4px_4px_0px_#000000]"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-20 right-10 w-14 h-14 border-4 border-black bg-[#65A30D] shadow-[4px_4px_0px_#000000]"
      />
    </div>
  );
}

export function InteractiveBrutalistHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full bg-transparent">
      {/* Dynamic background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #000 1px, transparent 1px),
            linear-gradient(#000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />

      {/* Floating decorative elements */}
      <FloatingElements />

      {/* Interactive 3D cube - positioned on the right */}
      <div className="relative z-10 flex items-center justify-center h-full lg:justify-end lg:pr-20">
        <InteractiveCube />
      </div>
    </div>
  );
}

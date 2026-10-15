"use client";

import { DigitalCore3D } from "@/components/portfolio/DigitalCore3D";
import { AudioPlayer } from "@/components/AudioPlayer";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function NeoBrutalistHero() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <DigitalCore3D isAudioPlaying={isAudioPlaying} />
      </div>

      {/* Editorial grid lines */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <div className="absolute top-0 left-1/4 w-px h-full opacity-20" style={{ backgroundColor: 'var(--foreground)' }} />
        <div className="absolute top-0 left-1/2 w-px h-full opacity-20" style={{ backgroundColor: 'var(--foreground)' }} />
        <div className="absolute top-0 left-3/4 w-px h-full opacity-20" style={{ backgroundColor: 'var(--foreground)' }} />
        <div className="absolute top-1/3 left-0 w-full h-px opacity-20" style={{ backgroundColor: 'var(--foreground)' }} />
        <div className="absolute top-2/3 left-0 w-full h-px opacity-20" style={{ backgroundColor: 'var(--foreground)' }} />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="pt-8 lg:pt-0 lg:pl-8 max-w-2xl">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              I BUILD DIGITAL THINGS THAT{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-white px-3 py-1 border-3 border-black inline-block" style={{ backgroundColor: 'var(--accent-orange)' }}>
                  MOVE
                </span>
              </span>
              .
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg leading-relaxed max-w-lg mb-8 border-l-4 border-black pl-4 font-medium"
              style={{ color: 'var(--foreground-secondary)' }}
            >
              I build websites and web apps, fix technical problems, connect APIs, and automate business workflows.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white border-4 border-black shadow-[4px_4px_0px_#000000] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000]"
                style={{ backgroundColor: 'var(--accent-orange)' }}
              >
                START A PROJECT
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold border-4 border-black shadow-[4px_4px_0px_#000000] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000]"
                style={{ backgroundColor: 'var(--surface-card)', color: 'var(--foreground)' }}
              >
                EXPLORE MY WORK
              </Link>
            </motion.div>

            {/* Audio Player */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <AudioPlayer onPlaybackStateChange={setIsAudioPlaying} />
            </motion.div>
          </div>

          {/* Right: 3D Scene Space with annotations */}
          <div className="hidden lg:block h-[500px] relative">
            {/* Technical annotation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute top-4 right-4 border-2 border-black px-3 py-2 text-xs font-bold"
              style={{ backgroundColor: 'var(--surface-card)', color: 'var(--foreground)' }}
            >
              INTERACTIVE OBJECT / 001
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
          style={{ color: 'var(--foreground)' }}
        >
          <span className="text-xs font-bold tracking-wider uppercase border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000000]" style={{ backgroundColor: 'var(--surface-card)', color: 'var(--foreground)' }}>SCROLL</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

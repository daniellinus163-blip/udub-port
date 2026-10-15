"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const VOICEOVER_SCRIPT = `Hello, and welcome to my portfolio!

My name is Daniel, also known as VibeCode Dan Builds. I'm a developer passionate about turning ideas into modern websites, powerful web applications, and digital solutions that help businesses work smarter.

Let me tell you a little about what I do and how I can help you.

First, I specialize in website development. Whether you need a professional business website, a landing page, an online store, or a custom website for your brand, I focus on creating responsive, user-friendly experiences that look great on desktop and mobile devices.

I also build web applications designed around specific business needs. From dashboards and interactive platforms to user accounts, authentication systems, and database-connected applications, I help transform ideas into functional digital products.

Already have a website or application that isn't working properly? I can help investigate and fix technical issues. This includes broken buttons, blank pages, login and signup errors, database problems, API failures, and other bugs that prevent your application from working as expected. My goal is to identify the cause and implement a practical, reliable fix.

Another major part of my work is API integration. Different applications often need to communicate, but connecting them can be challenging. I help integrate third-party services, payment providers, authentication systems, databases, and other tools so your applications can exchange information and work together more effectively.

I also help businesses improve their operations through CRM integration and business automation. Imagine spending less time manually updating customer records, transferring leads, sending notifications, or repeating the same administrative tasks every day.

With the right integrations and workflows, many of these processes can become more organized and efficient. Depending on your requirements, I can help connect customer relationship management systems, communication tools, webhooks, databases, and automation platforms to create workflows suited to your business.

I also work on AI-powered applications and modern digital experiences. This can include connecting AI services to websites, building intelligent features into applications, and creating interactive tools that provide practical value to users.

For projects that need something more visually engaging, I can develop interactive interfaces, browser-based games, and three-dimensional product configurators. These experiences can help visitors explore products, interact with content, and engage more deeply with a brand.

My approach is simple. I start by understanding your goals, identifying the problem you need solved, and recommending an appropriate solution. I then focus on building, fixing, or integrating the necessary components while keeping usability, functionality, and maintainability in mind.

Whether you're an entrepreneur with a new idea, a business owner looking to improve an existing website, or a team that needs its applications and tools to work together, I'm ready to discuss your project.

Take a look around my portfolio to explore my work. If you have an idea, a technical issue, or a process you'd like to improve, click the Start a Project button and tell me what you need.

I'm Daniel from VibeCode Dan Builds.

Let's build, fix, integrate, and automate something valuable together.

Thank you for listening, and I look forward to hearing about your project!`;

export function AudioPlayer({ onPlaybackStateChange }: { onPlaybackStateChange: (isPlaying: boolean) => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waveform, setWaveform] = useState<number[]>(Array(20).fill(0));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const waveformIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (waveformIntervalRef.current) {
        clearInterval(waveformIntervalRef.current);
      }
    };
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    } else {
      setError("Speech synthesis is not supported in this browser");
    }
  }, []);

  // Update waveform animation (skip if reduced motion)
  useEffect(() => {
    if (isPlaying && !isPaused && !prefersReducedMotion) {
      waveformIntervalRef.current = setInterval(() => {
        setWaveform(prev => prev.map(() => Math.random() * 100));
      }, 100);
    } else {
      if (waveformIntervalRef.current) {
        clearInterval(waveformIntervalRef.current);
      }
      setWaveform(Array(20).fill(0));
    }

    return () => {
      if (waveformIntervalRef.current) {
        clearInterval(waveformIntervalRef.current);
      }
    };
  }, [isPlaying, isPaused, prefersReducedMotion]);

  // Track progress
  useEffect(() => {
    if (isPlaying && !isPaused) {
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 100;
          }
          return prev + 0.5;
        });
      }, 500);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, isPaused]);

  // Notify parent of playback state changes
  useEffect(() => {
    onPlaybackStateChange(isPlaying && !isPaused);
  }, [isPlaying, isPaused, onPlaybackStateChange]);

  const selectVoice = useCallback(() => {
    if (!synthRef.current) return null;

    const voices = synthRef.current.getVoices();
    // Prefer English voices
    const englishVoices = voices.filter(voice => 
      voice.lang.startsWith("en-") || voice.lang.startsWith("en_")
    );
    
    if (englishVoices.length > 0) {
      // Prefer Google US English or Microsoft English
      const preferredVoice = englishVoices.find(voice =>
        voice.name.toLowerCase().includes("google") ||
        voice.name.toLowerCase().includes("microsoft") ||
        voice.name.toLowerCase().includes("samantha")
      ) || englishVoices[0];
      return preferredVoice;
    }
    
    return voices[0] || null;
  }, []);

  const play = useCallback(() => {
    if (!synthRef.current || error) return;

    // Always cancel first to prevent overlapping sessions
    synthRef.current.cancel();
    utteranceRef.current = null;

    const utterance = new SpeechSynthesisUtterance(VOICEOVER_SCRIPT);
    const voice = selectVoice();
    
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setHasStarted(true);
      setProgress(0);
      setError(null);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      setWaveform(Array(20).fill(0));
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsPlaying(false);
      setIsPaused(false);
      setError("An error occurred during playback");
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  }, [error, selectVoice]);

  const pause = useCallback(() => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
    }
  }, [isPlaying]);

  const resume = useCallback(() => {
    if (synthRef.current && isPaused) {
      synthRef.current.resume();
    }
  }, [isPaused]);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
      setHasStarted(false);
      setWaveform(Array(20).fill(0));
    }
  }, []);

  const replay = useCallback(() => {
    stop();
    setTimeout(() => {
      play();
    }, 100);
  }, [stop, play]);

  if (error) {
    return (
      <div className="border-2 border-black px-4 py-3 bg-white" style={{ backgroundColor: 'var(--surface-card)' }}>
        <p className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-black px-4 py-3" style={{ backgroundColor: 'var(--surface-card)' }}>
      {!hasStarted ? (
        <button
          onClick={play}
          className="flex items-center gap-2 text-sm font-bold"
          style={{ color: 'var(--foreground)' }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>Click here to hear what I do</span>
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>
              {isPaused ? "Paused" : isPlaying ? "Playing..." : "Finished"}
            </span>
            <div className="flex items-center gap-2">
              {isPlaying && !isPaused ? (
                <button
                  onClick={pause}
                  className="p-1 hover:opacity-70 transition-opacity"
                  title="Pause"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                </button>
              ) : isPaused ? (
                <button
                  onClick={resume}
                  className="p-1 hover:opacity-70 transition-opacity"
                  title="Resume"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={replay}
                  className="p-1 hover:opacity-70 transition-opacity"
                  title="Replay"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 5V1L7 6l5 5V5zM4 13v8h8v-8H4zm14 0h2v-2h-2v2zm-6 0h2v-2h-2v2z" />
                  </svg>
                </button>
              )}
              <button
                onClick={stop}
                className="p-1 hover:opacity-70 transition-opacity"
                title="Stop"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h12v12H6V6z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 border border-black overflow-hidden" style={{ backgroundColor: 'var(--background-secondary)' }}>
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: 'var(--accent-orange)'
              }}
            />
          </div>

          {/* Waveform visualization */}
          <div className="flex items-end gap-1 h-8">
            {waveform.map((height, i) => (
              <div
                key={i}
                className="w-1 transition-all duration-100"
                style={{
                  height: `${Math.max(4, height * 0.3)}px`,
                  backgroundColor: 'var(--accent-orange)'
                }}
              />
            ))}
          </div>

          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Listen to my 3-minute introduction
          </p>
        </div>
      )}
    </div>
  );
}

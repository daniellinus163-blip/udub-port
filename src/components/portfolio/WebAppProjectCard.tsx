"use client";

import type { PortfolioProject } from "@/data/portfolioData";
import { accentGradients } from "@/data/portfolioData";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { BrowserFrame } from "./BrowserFrame";

function isLive(url: string) {
  return /^https?:\/\//i.test(url.trim());
}

type Props = { project: PortfolioProject };

export function WebAppProjectCard({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 280, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 280, damping: 22 });
  const liveUrl = (project.liveDemoUrl || project.caseStudyVisitUrl || "").trim();
  const live = isLive(liveUrl);
  let hostname = "preview.local";
  if (live) {
    try {
      hostname = new URL(liveUrl).hostname;
    } catch {
      hostname = "live";
    }
  }

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.article
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", backgroundColor: 'var(--surface-card)', boxShadow: '4px 4px 0px #000000' }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col overflow-hidden border-4 border-black transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000]"
    >
      <div className={`bg-gradient-to-r ${accentGradients[project.accent]} p-[2px]`}>
        <div className="p-4" style={{ backgroundColor: 'var(--surface-card)' }}>
          <BrowserFrame src={project.image} alt={project.title} url={hostname} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          <span className="border-2 border-black px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white" style={{ backgroundColor: 'var(--accent-orange)' }}>
            {project.category}
          </span>
          {project.technologies.slice(0, 2).map((t) => (
            <span key={t} className="border-2 border-black px-2 py-1 text-[10px] font-bold" style={{ backgroundColor: 'var(--background-secondary)', color: 'var(--foreground)' }}>
              {t}
            </span>
          ))}
        </div>
        <h3 className="mt-3 text-xl font-bold" style={{ color: 'var(--foreground)' }}>{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: 'var(--foreground-secondary)' }}>{project.description}</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {live ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-black px-4 py-3 text-center text-xs font-bold text-white shadow-[2px_2px_0px_#000000] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000]"
              style={{ backgroundColor: 'var(--accent-orange)' }}
            >
              View live website
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center justify-center border-2 border-black px-4 py-3 text-center text-xs font-bold" style={{ backgroundColor: 'var(--background-secondary)', color: 'var(--foreground)' }}>
              Live site soon
            </span>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center border-2 border-black px-4 py-3 text-center text-xs font-bold shadow-[2px_2px_0px_#000000] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000]"
            style={{ backgroundColor: 'var(--surface-card)', color: 'var(--foreground)' }}
          >
            View project
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

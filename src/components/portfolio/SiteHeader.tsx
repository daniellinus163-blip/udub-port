"use client";

import { VDLogo } from "@/components/brand/VDLogo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { navLinks } from "@/data/portfolioData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b-2 border-black backdrop-blur-xl" style={{ backgroundColor: 'var(--surface-card)' }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <VDLogo size={36} priority />
          <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>VIBECODE DAN</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-sm px-3 py-2 text-xs font-bold uppercase tracking-wide transition border-2 border-transparent hover:border-black ${
                  active ? "border-black" : ""
                }`}
                style={{ color: active ? 'var(--foreground)' : 'var(--text-muted)' }}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-sm"
                    style={{ backgroundColor: 'var(--accent-orange)' }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <Link href="/contact" className="btn-primary hidden rounded-sm px-4 py-2 text-xs font-bold text-white md:inline-flex">
            Hire me
          </Link>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t-2 border-black px-3 py-2 md:hidden">
        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide border-2 border-transparent ${
              pathname === item.href ? "border-black" : ""
            }`}
            style={{ color: pathname === item.href ? 'var(--foreground)' : 'var(--text-muted)', backgroundColor: pathname === item.href ? 'var(--accent-orange)' : 'transparent' }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

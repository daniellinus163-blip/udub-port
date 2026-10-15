import Link from "next/link";
import { VDLogo } from "@/components/brand/VDLogo";
import { navLinks, profile, socialLinks } from "@/data/portfolioData";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-black px-5 py-12 backdrop-blur-md md:px-8" style={{ backgroundColor: 'var(--background-secondary)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <VDLogo size={40} />
            <div>
              <p className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
                VIBECODE DAN
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>{profile.role}</p>
            </div>
          </div>
          <div>
            <p className="section-label mb-3">Navigate</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-[#00E5FF]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="section-label mb-3">Connect</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.icon === "email" ? `mailto:${profile.email}` : link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="rounded-full px-4 py-2 text-xs font-semibold border-2 border-black transition hover:bg-[rgba(0,229,255,0.1)]"
                  style={{ backgroundColor: 'var(--surface-card)', color: 'var(--accent-blue)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

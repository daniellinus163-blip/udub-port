import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { ToolsCarousel } from "@/components/ToolsCarousel";
import { HeroHome } from "@/components/portfolio/HeroHome";
import { ScrollReveal } from "@/components/portfolio/ScrollReveal";
import { WebAppProjectCard } from "@/components/portfolio/WebAppProjectCard";
import { mobileApps, webApps } from "@/data/portfolioData";
import Link from "next/link";

export default function Home() {
  const featuredWeb = webApps.slice(0, 2);

  return (
    <>
      <HeroHome />

      <ToolsCarousel />

      <section className="section-spacing px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-label">Featured</p>
                <h2 className="mt-2 text-3xl font-bold" style={{ color: 'var(--foreground)' }}>Web app highlights</h2>
              </div>
              <Link href="/projects#web-apps" className="text-sm font-bold border-2 border-black px-4 py-2 transition-colors" style={{ backgroundColor: 'var(--surface-card)', color: 'var(--foreground)' }}>
                Full showcase →
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-2">
            {featuredWeb.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.08}>
                <WebAppProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing overflow-hidden border-y-4 border-black px-5 md:px-8" style={{ backgroundColor: 'var(--background-secondary)' }}>
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="text-center section-label">Client love</p>
            <h2 className="mt-2 text-center text-2xl font-bold md:text-3xl" style={{ color: 'var(--foreground)' }}>
              Fiverr & direct client reviews
            </h2>
          </ScrollReveal>
          <div className="mt-10">
            <TestimonialsSlider />
          </div>
        </div>
      </section>

      <section className="section-spacing px-5 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <ScrollReveal>
            <div className="glass-card border-4 border-black p-8 shadow-[4px_4px_0px_#000000]" style={{ backgroundColor: 'var(--surface-card)' }}>
              <p className="section-label">Web</p>
              <h3 className="mt-2 text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{webApps.length} web experiences</h3>
              <p className="mt-3 text-sm" style={{ color: 'var(--foreground-secondary)' }}>Marketplaces, configurators, and live storefronts.</p>
              <Link href="/web-apps" className="mt-6 inline-block text-sm font-bold border-2 border-black px-4 py-2 transition-colors" style={{ backgroundColor: 'var(--surface-card)', color: 'var(--foreground)' }}>
                Explore web apps →
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="glass-card border-4 border-black p-8 shadow-[4px_4px_0px_#000000]" style={{ backgroundColor: 'var(--surface-card)' }}>
              <p className="section-label">Mobile</p>
              <h3 className="mt-2 text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{mobileApps.length} mobile products</h3>
              <p className="mt-3 text-sm" style={{ color: 'var(--foreground-secondary)' }}>Native-feeling flows built for real usage.</p>
              <Link href="/mobile-apps" className="mt-6 inline-block text-sm font-bold border-2 border-black px-4 py-2 transition-colors" style={{ backgroundColor: 'var(--surface-card)', color: 'var(--foreground)' }}>
                Explore mobile apps →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

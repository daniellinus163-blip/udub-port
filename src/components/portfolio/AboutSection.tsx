"use client";

import { profile } from "@/data/portfolioData";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

export function AboutSection() {
  return (
    <section id="about" className="section-spacing px-5 md:px-8 border-y-4 border-black" style={{ backgroundColor: 'var(--background)' }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <ScrollReveal>
          <div className="relative mx-auto max-w-md lg:mx-0">
            <div className="glass-card relative overflow-hidden border-4 border-black p-2 shadow-[4px_4px_0px_#000000]" style={{ backgroundColor: 'var(--surface-card)' }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={profile.portrait}
                  alt={`${profile.name} — professional portrait`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div>
            <p className="section-label">About me</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: 'var(--foreground)' }}>
              Building products with clarity & craft
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed md:text-base" style={{ color: 'var(--foreground-secondary)' }}>
              <p>
                Hi, my name is <strong style={{ color: 'var(--foreground)' }}>Daniel</strong>. I'm a full-stack web developer specializing in website development, web app development, 3D configurators, bug fixing, API integrations, CRM, and business automation.
              </p>
              <p>
                I help businesses build responsive websites and powerful web applications, create interactive 3D product configurators, fix technical issues, connect third-party services, and automate repetitive tasks. From authentication errors, database issues, and payment integrations to ecommerce platforms, interactive applications, AI-powered tools, 3D visualizations, and CRM workflows, I deliver practical solutions tailored to your needs.
              </p>
              <p>
                I work with APIs, webhooks, databases, and automation tools to improve application functionality, streamline business processes, and help businesses save time.
              </p>
              <p>
                Whether you need a new application, an existing website fixed, seamless integrations, automated workflows, or 3D configurators, I'm ready to help turn your ideas into reliable digital solutions.
              </p>
              <p className="font-bold border-l-4 border-black pl-4" style={{ color: 'var(--accent-orange)' }}>
                Let's build, fix, integrate, and automate your next project!
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { label: "Experience", value: `${profile.yearsExperience}+ yrs` },
                { label: "Projects", value: profile.projectsDelivered },
                { label: "Clients", value: profile.marketplaces },
              ].map((stat) => (
                <div key={stat.label} className="border-4 border-black p-4 text-center shadow-[4px_4px_0px_#000000]" style={{ backgroundColor: 'var(--surface-card)' }}>
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>{stat.label}</p>
                  <p className="mt-1 text-sm font-bold" style={{ color: 'var(--foreground)' }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

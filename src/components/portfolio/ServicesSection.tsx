"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  accent: string;
  delay: number;
};

function ServiceCard({ title, description, icon, accent, delay }: ServiceCardProps) {
  const accentColors: Record<string, string> = {
    cyan: "bg-[#FF6B35]",
    purple: "bg-[#7C3AED]",
    orange: "bg-[#FF6B35]",
    lime: "bg-[#A3E635]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden border-4 border-black shadow-[4px_4px_0px_#000000] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000]"
      style={{ backgroundColor: 'var(--surface-card)' }}
    >
      <div className="relative p-6 md:p-8">
        {/* Icon */}
        <div className="mb-4 text-4xl">
          {icon}
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold" style={{ color: 'var(--foreground)' }}>{title}</h3>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-secondary)' }}>{description}</p>

        {/* Accent bar */}
        <div className={`absolute top-0 left-0 w-full h-2 ${accentColors[accent]}`} />
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const services = [
    {
      title: "Website Development",
      description: "Custom responsive websites built with modern frameworks, optimized for performance and conversion.",
      icon: "🌐",
      accent: "cyan",
    },
    {
      title: "Web App Development & Bug Fixes",
      description: "Complex web applications and quick fixes for broken functionality, UI issues, and performance problems.",
      icon: "⚡",
      accent: "purple",
    },
    {
      title: "API Integrations",
      description: "Seamless connections to third-party services, payment gateways, databases, and external systems.",
      icon: "🔌",
      accent: "orange",
    },
    {
      title: "CRM Automation",
      description: "Automated workflows, lead management, and system integrations to streamline your business processes.",
      icon: "🤖",
      accent: "lime",
    },
    {
      title: "Business Workflow Automation",
      description: "End-to-end automation solutions that save time, reduce errors, and improve operational efficiency.",
      icon: "⚙️",
      accent: "cyan",
    },
  ];

  return (
    <section className="section-spacing px-5 md:px-8 border-y-4 border-black" style={{ backgroundColor: 'var(--background-secondary)' }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-label">Services</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl" style={{ color: 'var(--foreground)' }}>
            What I Can Do For You
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

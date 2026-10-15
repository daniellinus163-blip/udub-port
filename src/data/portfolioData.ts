export type ProjectType = "web" | "mobile";

export type SkillSpotlight = {
  title: string;
  icon: string;
  tools: string[];
  problem: string;
  solution: string;
  result: string;
};

export type PortfolioProject = {
  slug: string;
  type: ProjectType;
  category: string;
  title: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
  technologies: string[];
  image: string;
  gallery: string[];
  videoUrl?: string;
  liveDemoUrl: string;
  codeUrl?: string;
  caseStudyVisitUrl?: string;
  accent: "violet" | "sky" | "coral" | "lime" | "orange";
};

export const profile = {
  name: "Daniel",
  role: "Full Stack Developer · AI Engineer · Creative Technologist",
  tagline:
    "I build modern web applications, AI-powered solutions, scalable backend systems, mobile applications, automation tools, and immersive digital experiences.",
  email: "yourname@email.com",
  yearsExperience: 6,
  projectsDelivered: "50+",
  marketplaces: "Fiverr & direct clients",
  portrait: "/profile/my-self.png",
};

/** Cinematic hero slideshow — dev / mobile / design scenes (Unsplash). */
export const heroScenes = [
  {
    id: "coding-laptop",
    label: "Web development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80",
  },
  {
    id: "developer-desk",
    label: "Modern workspace",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80",
  },
  {
    id: "programming-screen",
    label: "Programming in flow",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80",
  },
  {
    id: "analytics",
    label: "Product dashboards",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
  },
  {
    id: "mobile-dev",
    label: "Mobile development",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80",
  },
  {
    id: "ui-design",
    label: "UI / UX design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80",
  },
] as const;

export const heroToolSlides = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    tools: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    icons: ["⚛️", "▲", "📘", "🎨", "🎬"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    tools: ["Node.js", "REST APIs", "Supabase", "PostgreSQL", "Vercel"],
    icons: ["🟢", "🔌", "⚡", "🐘", "▲"],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    tools: ["React Native", "Expo", "iOS", "Android", "Mobile UX"],
    icons: ["📱", "🚀", "🍎", "🤖", "✨"],
  },
] as const;

export const heroBackgroundVideo = "/hero-bg.mp4";

export const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Fiverr", href: "https://www.fiverr.com", icon: "fiverr" },
  { label: "Email", href: "mailto:yourname@email.com", icon: "email" },
] as const;

export const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Mobile",
    skills: ["React Native", "Expo", "iOS & Android", "Mobile UX"],
  },
  {
    title: "Backend & tools",
    skills: ["Node.js", "REST APIs", "Supabase", "Vercel", "Figma"],
  },
] as const;

export const projects: PortfolioProject[] = [
  {
    slug: "deepsearch",
    type: "web",
    category: "Research Platform",
    title: "DeepSearch",
    description: "Research-focused web platform for exploring buyer intent, keyword opportunities, and market signals.",
    overview:
      "DeepSearch is a research-focused web platform designed to help users explore buyer intent, investigate keyword opportunities, analyze market signals, and organize findings for better service positioning.",
    problem:
      "Users need structured tools to organize business information and support better decisions through verified data integrations and automation workflows.",
    solution:
      "Web App Development: Creating structured research interfaces, dashboards, search experiences, and data-driven user workflows. Website & Web App Bug Fixing: Diagnosing search problems, incorrect filters, broken UI interactions, API request failures, and data display issues. API Integrations: Extending research workflows with authorized data sources, AI services, and external APIs to retrieve and process information. CRM & Automation: Developing workflows that transfer qualified research findings into CRM records, create follow-up tasks, and notify users about relevant opportunities.",
    result:
      "This project illustrates how research tools can organize business information and support better decisions. With verified data integrations and automation workflows, it can also connect opportunity research with lead management.",
    features: [
      "Structured research interfaces",
      "Data-driven dashboards",
      "Search experiences with filters",
      "API integrations for data sources",
      "CRM & automation workflows",
    ],
    technologies: ["Web App Development", "API Integrations", "CRM & Automation", "Bug Fixing", "Data-driven workflows"],
    image: "/projects/deepsearch.png",
    gallery: ["/projects/deepsearch.png"],
    liveDemoUrl: "https://deepsearch-website-a5ai.vercel.app/",
    caseStudyVisitUrl: "https://deepsearch-website-a5ai.vercel.app/",
    accent: "sky",
  },
  {
    slug: "vibecode-market",
    type: "web",
    category: "E-commerce",
    title: "VIBECODE Market",
    description: "Fashion ecommerce storefront with product discovery, category navigation, search, and shopping cart.",
    overview:
      "VibeCode Market is a fashion ecommerce storefront featuring product discovery, category navigation, search, price filtering, product options, favorites, and shopping cart interactions.",
    problem:
      "Template storefronts break down when you need age-based lanes, deals, and scan-friendly grids at scale.",
    solution:
      "Website Development: Creating responsive storefronts, product listings, navigation systems, and polished shopping experiences. Website & Web App Bug Fixing: Troubleshooting broken filters, cart inconsistencies, UI errors, product option issues, and responsive layout problems. API Integrations: Extending ecommerce functionality with payment gateways, inventory systems, order management, email services, and external product APIs. CRM & Automation: Connecting customer and order events to CRM systems, automating order notifications, creating follow-up tasks, and implementing appropriate customer re-engagement workflows.",
    result:
      "This project provides a foundation for demonstrating ecommerce development and business workflow integrations. With a working backend, payment integration, and CRM connection, it can illustrate how a storefront connects customer activity to sales and operational processes.",
    features: [
      "Product discovery & search",
      "Category navigation",
      "Price filtering & options",
      "Shopping cart interactions",
      "Favorites system",
    ],
    technologies: ["Website Development", "API Integrations", "CRM & Automation", "Bug Fixing", "E-commerce"],
    image: "/projects/vibecode-market-new.png",
    gallery: ["/projects/vibecode-market-new.png"],
    liveDemoUrl: "https://vibecode-market-web-s9jm.vercel.app/",
    caseStudyVisitUrl: "https://vibecode-market-web-s9jm.vercel.app/",
    accent: "violet",
  },
  {
    slug: "rolesphere",
    type: "web",
    category: "Web Application",
    title: "RoleSphere",
    description: "Role-based web application with user authentication, profile management, and differentiated access.",
    overview:
      "RoleSphere is a role-based web application project designed around user authentication, profile management, and differentiated access for Members, Admins, and Super Admins.",
    problem:
      "Applications need secure user management and permission models that can be extended into internal CRM or customer management portals.",
    solution:
      "Web App Development: Building authentication flows, user dashboards, profile management interfaces, and role-specific application experiences. Web App Bug Fixing: Troubleshooting login errors, authentication redirects, permission issues, profile update failures, and database access problems. API Integrations: Connecting frontend functionality to authentication services, database operations, and file storage. CRM & Automation: Extending the application with customer records, lead assignment, task tracking, activity histories, and automated notifications.",
    result:
      "This project demonstrates the foundations needed for secure business applications. Its user management and permission model can be extended into an internal CRM or customer management portal, with appropriate backend authorization and database policies.",
    features: [
      "User authentication flows",
      "Profile management",
      "Role-based access control",
      "Admin dashboards",
      "Database integrations",
    ],
    technologies: ["Web App Development", "Authentication", "Database", "API Integrations", "CRM & Automation"],
    image: "/projects/rolesphere.png",
    gallery: ["/projects/rolesphere.png"],
    liveDemoUrl: "https://danieel-web2-3gkr.vercel.app/",
    caseStudyVisitUrl: "https://danieel-web2-3gkr.vercel.app/",
    accent: "coral",
  },
  {
    slug: "arca-3d-configurator",
    type: "web",
    category: "3D Configurator",
    title: "ARCA — 3D Product Configurator",
    description: "Interactive 3D product configurator for customizing architectural designs and visualizing choices.",
    overview:
      "ARCA is an interactive 3D product configurator designed to let users customize architectural designs, explore different materials, and visualize their choices through a browser-based experience.",
    problem:
      "Businesses need interactive web applications to help present customizable products, improve customer engagement, and turn design selections into potential sales opportunities.",
    solution:
      "Web App Development: Building interactive interfaces with dynamic configuration options, responsive layouts, and real-time visual feedback. Website & Web App Bug Fixing: Troubleshooting rendering issues, broken interactions, incorrect configuration states, and responsive design problems. API Integrations: Extending the configurator to connect with backend services for saving designs, calculating quotes, and submitting customer requests. CRM & Automation: Connecting quote requests to a CRM, creating customer records, notifying sales teams, and automating follow-up tasks.",
    result:
      "This project demonstrates how interactive web applications can help businesses present customizable products, improve customer engagement, and turn design selections into potential sales opportunities.",
    features: [
      "3D architectural visualization",
      "Material customization",
      "Real-time visual feedback",
      "Design saving & sharing",
      "Quote calculation",
    ],
    technologies: ["Web App Development", "3D Rendering", "API Integrations", "CRM & Automation", "Bug Fixing"],
    image: "/projects/3d-configurator.png",
    gallery: ["/projects/3d-configurator.png"],
    liveDemoUrl: "https://3d-product-configurator-opal.vercel.app/",
    caseStudyVisitUrl: "https://3d-product-configurator-opal.vercel.app/",
    accent: "lime",
  },
  {
    slug: "dr-parking",
    type: "web",
    category: "Web Game",
    title: "Dr. Parking",
    description: "Browser-based parking game demonstrating interactive web development and state-driven experiences.",
    overview:
      "Dr. Parking is a browser-based parking game project that demonstrates interactive web development and the challenges involved in building responsive, state-driven user experiences.",
    problem:
      "Browser-based applications require reliable interactions, responsive interfaces, and careful debugging to ensure smooth user experiences.",
    solution:
      "Web App Bug Fixing: Investigating broken interactions, incorrect state updates, unexpected behavior, and application errors. Website Bug Fixing: Troubleshooting layout problems, responsiveness, browser compatibility, and rendering issues. Web App Development: Implementing interactive controls, game logic, user feedback, and responsive gameplay experiences. API Integrations: Extending the application with backend services for features such as player profiles, saved progress, or leaderboards, where required.",
    result:
      "This project demonstrates the importance of reliable interactions, responsive interfaces, and careful debugging in browser-based applications. These same development principles apply to interactive business tools and web applications.",
    features: [
      "Interactive game controls",
      "State-driven gameplay",
      "Responsive design",
      "User feedback systems",
      "Browser compatibility",
    ],
    technologies: ["Web App Development", "Game Logic", "Bug Fixing", "Responsive Design", "State Management"],
    image: "/projects/dr-parking.png",
    gallery: ["/projects/dr-parking.png"],
    liveDemoUrl: "https://dr-parking-webgame.vercel.app/",
    caseStudyVisitUrl: "https://dr-parking-webgame.vercel.app/",
    accent: "orange",
  },
  {
    slug: "drivedash",
    type: "mobile",
    category: "Transportation",
    title: "DriveDash",
    description: "Modern ride-hailing and transportation app with real-time tracking and booking features.",
    overview:
      "A comprehensive mobile application for ride-hailing services featuring real-time driver tracking, seamless booking, and secure payment integration.",
    problem:
      "Users need a reliable and intuitive mobile app to book rides and track their drivers in real-time.",
    solution:
      "Built a full-featured mobile app with React Native and Expo, incorporating real-time location tracking, secure payments, and an intuitive user interface.",
    result:
      "Users can easily book rides, track their drivers in real-time, and complete payments securely within the app.",
    features: [
      "Real-time driver tracking",
      "Secure in-app payments",
      "Ride booking and scheduling",
      "User-friendly interface",
      "Driver rating system",
    ],
    technologies: ["React Native", "Expo", "Real-time tracking", "Payment integration", "Mobile UX"],
    image: "/projects/drivedash.png",
    gallery: ["/projects/drivedash.png"],
    liveDemoUrl: "https://expo.dev/accounts/youngdaylan/projects/drivedash/builds/be856a69-b1e9-4496-8e77-b140b24043fd",
    caseStudyVisitUrl: "https://expo.dev/accounts/youngdaylan/projects/drivedash/builds/be856a69-b1e9-4496-8e77-b140b24043fd",
    accent: "lime",
  },
];

export const webApps = projects.filter((p) => p.type === "web");
export const mobileApps = projects.filter((p) => p.type === "mobile");

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return projects.find((p) => p.slug === slug);
}

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/web-apps", label: "Web Apps" },
  { href: "/mobile-apps", label: "Mobile Apps" },
  { href: "/contact", label: "Contact" },
] as const;

export const accentGradients: Record<PortfolioProject["accent"], string> = {
  violet: "from-[#7C3AED] to-[#7C3AED]",
  sky: "from-[#FF6B35] to-[#FF6B35]",
  coral: "from-[#FF6B35] to-[#FF6B35]",
  lime: "from-[#A3E635] to-[#A3E635]",
  orange: "from-[#FF6B35] to-[#FF6B35]",
};

export const services = [
  { title: "Web Development", description: "High-performance web apps with modern React and polished UI.", icon: "🌐" },
  { title: "Mobile Apps", description: "Cross-platform mobile experiences that feel native and fast.", icon: "📱" },
  { title: "UI/UX Design", description: "Clean, conversion-focused interfaces and design systems.", icon: "🎨" },
];

export const skillSpotlights: SkillSpotlight[] = [
  {
    title: "Frontend Engineering",
    icon: "⚡",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    problem: "Products need speed and clarity without sacrificing visual craft.",
    solution: "Component-driven UI with motion, accessibility, and performance budgets.",
    result: "Interfaces that feel premium and stay maintainable as features grow.",
  },
];

export const allTools = ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native", "Expo", "Figma", "Framer Motion"];

export const testimonials = [
  { image: "/testimonials/t1.png", alt: "Fiverr five-star review — automation workflow" },
  { image: "/testimonials/t2.png", alt: "Fiverr five-star review — automation setup" },
  { image: "/testimonials/t3.png", alt: "Fiverr five-star review — automation system" },
  { image: "/testimonials/t4.png", alt: "Fiverr five-star review — mobile app" },
  { image: "/testimonials/t5.png", alt: "Fiverr five-star review — mobile app" },
  { image: "/testimonials/t6.png", alt: "Fiverr five-star review — app functionality" },
];

export const caseStudies = [
  {
    title: "Retail Lead Automation",
    problem: "Slow manual follow-up lost high-intent leads.",
    solution: "Automated capture, enrichment, and instant outreach flows.",
    result: "Response time dropped from hours to seconds; conversion improved.",
  },
];

export const toolStack = allTools;

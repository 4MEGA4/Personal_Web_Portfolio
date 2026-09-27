export interface ProjectItem {
  id: string;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  category: "live" | "soon" | "core";
  status: "OPERATIONAL" | "IN_ORBIT" | "R&D / #SOON" | "DECOMMISSIONED";
  technologies: string[];
  features: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  badge?: string;
  accentColor: "white" | "black" | "gray";
}

export interface SkillCategory {
  id: string;
  subsystem: string;
  name: string;
  tagline: string;
  color: string;
  skills: {
    name: string;
    level: number; // 1-100
    tier: "NOVICE" | "ADEPT" | "EXPERT" | "MASTER";
    icon?: string;
    description: string;
  }[];
}

export interface AnimeItem {
  id: string;
  title: string;
  jpTitle: string;
  role: string;
  quote: string;
  vibe: string;
  rating: string;
  tags: string[];
}

export interface HobbyItem {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  description: string;
  stats: string;
  favoriteGear?: string;
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  category: "HACKATHON" | "ACADEMIC" | "CERTIFICATION" | "CODING";
  description: string;
  badgeText: string;
}

export interface FactItem {
  id: number;
  fact: string;
  category: "CODING_LORE" | "AEROSPACE" | "HABITS" | "ANIME_TRIVIA";
  rarity: "COMMON" | "RARE" | "LEGENDARY";
}

export const PILOT_PROFILE = {
  callsign: "[name]",
  fullName: "[name]",
  age: "[age]",
  phone: "[phone number]",
  status: "ONLINE // READY_FOR_DEPLOYMENT",
  role: "AERO-CYBER WEB ARCHITECT & FULL-STACK PILOT",
  subRole: "Crafting High-Performance Digital Experiences & Futuristic Web Applications",
  location: "[location]",
  currentObjective: "Engineering Next-Gen Web Platforms & Scalable Systems",
  coordinates: "[location]",
  flightHours: "2,400+ HRS CODING LOGGED",
  experienceLevel: "LEVEL 01: INITIAL LAUNCH",
  bio: "A passionate full-stack software engineer fueled by mecha anime aesthetics, cyberpunk UI/UX, and deep-space telemetry. I specialize in building blazing-fast, visually captivating, and resilient web applications.",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    discord: "[discord]",
    email: "[email]@example.com",
  },
  missionTags: ["Next.js", "TypeScript", "React", "Node.js", "TailwindCSS", "Cyber UI", "Aerospace Theme"],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "aero-portfolio",
    title: "Aerospace Cockpit Portfolio v1",
    codename: "PROJECT_[name]_ZERO",
    tagline: "High-octane mecha-themed personal web portfolio with interactive starfield.",
    description:
      "A futuristic aerospace & anime-themed developer portfolio equipped with Web Audio SFX, warp speed canvas rendering, interactive command terminal, and modular pilot dossier.",
    category: "live",
    status: "OPERATIONAL",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Audio API"],
    features: [
      "Dynamic Canvas Starfield with Scroll-Warp physics",
      "Procedural Web Audio API sound synthesizer",
      "Interactive Pilot HUD Command Terminal",
      "Responsive Glassmorphic Mecha design language",
    ],
    metrics: "100% Client Performance // 60 FPS Canvas",
    githubUrl: "https://github.com",
    liveUrl: "#",
    badge: "CURRENT FLAGSHIP",
    accentColor: "white",
  },
  {
    id: "cyber-vault",
    title: "Neural Mecha Task Engine",
    codename: "PROJECT_VALKYRIE_01",
    tagline: "Autonomous project orchestrator and productivity cockpit.",
    description:
      "An aerospace-grade project management dashboard integrating real-time telemetry, interactive Kanban radar nodes, and automated workflow triggers.",
    category: "soon",
    status: "R&D / #SOON",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS"],
    features: [
      "Real-time telemetry event bus",
      "Mecha HUD layout with customizable modular widgets",
      "Encrypted cloud sync and zero-latency state handling",
    ],
    metrics: "Target Launch: Q3 2026",
    githubUrl: "https://github.com",
    badge: "IN ACTIVE R&D",
    accentColor: "gray",
  },
  {
    id: "anime-pulse",
    title: "Chrono Anime Sync & Tracker",
    codename: "PROJECT_EVA_SYNC",
    tagline: "Real-time anime episode tracker and character database explorer.",
    description:
      "A sleek cyberpunk anime discovery platform powered by public GraphQL APIs with custom tier-listing and OST audio visualizer.",
    category: "soon",
    status: "R&D / #SOON",
    technologies: ["Next.js", "GraphQL", "Tailwind CSS", "Lucide", "Framer Motion"],
    features: [
      "Instant fuzzy search across 10,000+ anime titles",
      "Interactive tier-list generator with canvas export",
      "Cyber-glow OST audio visualizer",
    ],
    metrics: "Phase 2 Blueprint",
    githubUrl: "https://github.com",
    badge: "BLUEPRINT PHASE",
    accentColor: "white",
  },
  {
    id: "aero-cli",
    title: "HyperDrive CLI Tool",
    codename: "PROJECT_THRUSTER",
    tagline: "Terminal productivity CLI with aerospace status readouts.",
    description:
      "A terminal utility crafted for developers to streamline Git commits, project bootstrapping, and environment checks with colorful ASCII flight logs.",
    category: "core",
    status: "IN_ORBIT",
    technologies: ["Node.js", "TypeScript", "Chalk", "Commander"],
    features: [
      "Automated semantic release & conventional commits",
      "Interactive terminal dashboards and ASCII art banners",
      "Ultra-fast parallel project scaffolding",
    ],
    metrics: "450+ Daily Command Executions",
    githubUrl: "https://github.com",
    badge: "DEV TOOLING",
    accentColor: "gray",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    subsystem: "SUB-SYS 01: PROPULSION",
    name: "Frontend & UI Matrix",
    tagline: "Visual interface rendering, reactive state engines, and cyber styling.",
    color: "#ffffff",
    skills: [
      { name: "React & Next.js", level: 92, tier: "EXPERT", description: "App Router, SSR, Server Actions, Dynamic UI" },
      { name: "TypeScript", level: 88, tier: "EXPERT", description: "Strict typing, generics, interfaces & contracts" },
      { name: "Tailwind CSS & Styling", level: 95, tier: "MASTER", description: "Design systems, responsive layout, animations" },
      { name: "Framer Motion & Canvas", level: 82, tier: "ADEPT", description: "Physics-based animation, starfields, smooth transitions" },
      { name: "HTML5 / Modern JS (ES6+)", level: 95, tier: "MASTER", description: "DOM architecture, async/await, modern Web APIs" },
    ],
  },
  {
    id: "backend",
    subsystem: "SUB-SYS 02: REACTOR CORE",
    name: "Backend & Systems",
    tagline: "Data pipelines, API routing, server architecture, and persistence.",
    color: "#e5e5e5",
    skills: [
      { name: "Node.js & Express", level: 85, tier: "EXPERT", description: "REST APIs, middleware, event loops, streaming" },
      { name: "Database Engineering", level: 78, tier: "ADEPT", description: "PostgreSQL, MongoDB, Prisma ORM, schema design" },
      { name: "REST & GraphQL APIs", level: 84, tier: "EXPERT", description: "API design, error handling, rate limiting" },
      { name: "Auth & Security", level: 80, tier: "ADEPT", description: "JWT, OAuth2, session management, secure headers" },
    ],
  },
  {
    id: "devops",
    subsystem: "SUB-SYS 03: AVIONICS",
    name: "DevOps & Infrastructure",
    tagline: "Deployment pipelines, version control, and system telemetry.",
    color: "#a3a3a3",
    skills: [
      { name: "Git & GitHub Workflows", level: 90, tier: "EXPERT", description: "Branching strategies, CI/CD actions, PR reviews" },
      { name: "Vercel & Cloudflare", level: 88, tier: "EXPERT", description: "Edge hosting, DNS management, serverless functions" },
      { name: "Docker & Containers", level: 72, tier: "ADEPT", description: "Containerization, compose files, multi-stage builds" },
      { name: "Linux & Bash Scripting", level: 80, tier: "ADEPT", description: "Shell automation, server config, CLI workflows" },
    ],
  },
  {
    id: "copilot",
    subsystem: "SUB-SYS 04: AI CO-PILOT",
    name: "AI & Modern Tooling",
    tagline: "Augmenting developer throughput with AI assistance and prompt engineering.",
    color: "#737373",
    skills: [
      { name: "AI Agent Orchestration", level: 90, tier: "EXPERT", description: "LLM integration, automated workflows, context design" },
      { name: "VS Code & Neovim Mastery", level: 92, tier: "EXPERT", description: "Keybindings, custom snippets, productivity stack" },
      { name: "Figma UI/UX Prototyping", level: 78, tier: "ADEPT", description: "Wireframes, design tokens, mockups, asset exports" },
    ],
  },
];

export const ANIME_LOGS: AnimeItem[] = [
  {
    id: "eva",
    title: "Neon Genesis Evangelion",
    jpTitle: "新世紀エヴァンゲリオン",
    role: "Aesthetic Blueprint",
    quote: "The fate of destruction is also the joy of rebirth.",
    vibe: "Mecha cockpit HUDs, monochrome telemetry, synchro-rate graphs",
    rating: "GOD TIER // S-RANK",
    tags: ["Mecha", "Cyberpunk", "Psychological", "Retro Sci-Fi"],
  },
  {
    id: "cyberpunk",
    title: "Cyberpunk: Edgerunners",
    jpTitle: "サイバーパンク エッジランナーズ",
    role: "Color Palette & Energy",
    quote: "I'm gonna take you there myself. Fly you to the moon.",
    vibe: "Monochromatic contrast, stark harsh silhouettes, brutalist typography",
    rating: "S-RANK",
    tags: ["Cyberpunk", "Action", "Monochrome", "Sci-Fi"],
  },
  {
    id: "gundam",
    title: "Mobile Suit Gundam: Witch from Mercury",
    jpTitle: "機動戦士ガンダム 水星の魔女",
    role: "Aerospace Interface Inspiration",
    quote: "If you run, you gain one. If you move forward, you gain two.",
    vibe: "Clean aerospace OS, GUND-format holographic data clouds",
    rating: "S-RANK",
    tags: ["Aerospace", "Mecha", "Futuristic UI", "Sci-Fi"],
  },
  {
    id: "cowboy",
    title: "Cowboy Bebop",
    jpTitle: "カウボーイビバップ",
    role: "Space Bounty Lore",
    quote: "Whatever happens, happens.",
    vibe: "Lo-fi space travel, retro-futuristic displays, smooth jazz rhythm",
    rating: "CLASSIC S-RANK",
    tags: ["Space Western", "Noir", "Soundtrack", "Retro"],
  },
];

export const HOBBIES: HobbyItem[] = [
  {
    id: "coding-jam",
    name: "Speed Coding & UI Prototyping",
    subtitle: "Building slick interfaces late at night",
    icon: "Code2",
    description:
      "Turning wild design concepts into fully working interactive web prototypes while exploring bleeding-edge frontend libraries.",
    stats: "2,000+ Commits Across Repos",
    favoriteGear: "Mechanical Keyboard + Dark Mode",
  },
  {
    id: "gaming",
    name: "Tactical & Sci-Fi Gaming",
    subtitle: "Strategy, reflex, and deep-lore adventures",
    icon: "Gamepad2",
    description:
      "Exploring immersive sci-fi universes, tactical mecha battles, and high-adrenaline multiplayer strategy games.",
    stats: "Top 5% Reflex Calibration",
    favoriteGear: "Ultra-wide Display & Low-latency Mouse",
  },
  {
    id: "anime-music",
    name: "Anime Soundtracks & Synthwave",
    subtitle: "Acoustic fuel for flow-state development",
    icon: "Headphones",
    description:
      "Immersing in futuristic synthwave, mecha anime battle OSTs, and chill Lo-Fi beats that power multi-hour deep focus sessions.",
    stats: "15,000+ Minutes Streamed / Year",
    favoriteGear: "Studio Monitor Headphones",
  },
  {
    id: "pc-building",
    name: "Custom Tech & Rig Building",
    subtitle: "Hardware optimization & cable management",
    icon: "Cpu",
    description:
      "Tinkering with computer hardware, optimizing thermal airflow, and styling stark monochromatic setups for the ultimate battle station.",
    stats: "[PC information]",
    favoriteGear: "Custom Cable Sleeves & Stark Telemetry",
  },
];

export const RANDOM_FACTS: FactItem[] = [
  {
    id: 1,
    fact: "My coding playlist is 80% mecha anime battle themes and 20% dark synthwave.",
    category: "CODING_LORE",
    rarity: "COMMON",
  },
  {
    id: 2,
    fact: "I believe the best debugging tool is a 10-minute walk followed by checking semicolon and variable scope.",
    category: "HABITS",
    rarity: "COMMON",
  },
  {
    id: 3,
    fact: "The callsign '[name]' is inspired by mecha pilot aesthetics and tactical flight telemetry.",
    category: "CODING_LORE",
    rarity: "RARE",
  },
  {
    id: 4,
    fact: "I can spot a 1px visual misalignment on a button from across the room.",
    category: "AEROSPACE",
    rarity: "RARE",
  },
  {
    id: 5,
    fact: "First program ever written was a text-based spaceship battle simulator in terminal.",
    category: "AEROSPACE",
    rarity: "LEGENDARY",
  },
  {
    id: 6,
    fact: "Favorite anime quote of all time: 'If you move forward, you gain two.' - Gundam Witch from Mercury.",
    category: "ANIME_TRIVIA",
    rarity: "RARE",
  },
  {
    id: 7,
    fact: "I treat every frontend component like a cockpit instrument: high precision, zero lag, beautiful feedback.",
    category: "CODING_LORE",
    rarity: "LEGENDARY",
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-1",
    year: "2026",
    title: "Portfolio Mission Zero Launch",
    organization: "Personal Flagship",
    category: "CODING",
    description: "Designed and engineered an anime & aerospace themed personal web portfolio with custom Web Audio and interactive physics canvas.",
    badgeText: "MISSION SUCCESS",
  },
  {
    id: "ach-2",
    year: "2025-2026",
    title: "Full-Stack Web Engineering Mastery",
    organization: "Self-Directed & Project Driven",
    category: "CERTIFICATION",
    description: "Built scalable web applications utilizing Next.js, React, Node.js, and TypeScript with clean architectural patterns.",
    badgeText: "VERIFIED PROTOCOL",
  },
  {
    id: "ach-3",
    year: "2025",
    title: "100+ Days of Deep Coding Streak",
    organization: "Developer Log",
    category: "CODING",
    description: "Maintained daily commit consistency, solving complex algorithmic challenges and crafting responsive UI systems.",
    badgeText: "PERSISTENCE TIER 1",
  },
  {
    id: "ach-4",
    year: "2024",
    title: "Computer Science & Engineering Foundations",
    organization: "Academic Sector",
    category: "ACADEMIC",
    description: "Mastered data structures, algorithm design, software engineering methodologies, and database systems.",
    badgeText: "HONORS MERIT",
  },
];

// Single source of truth for portfolio content (homepage and /links).
// Source: "Alan Truong — Master Career Profile" (Nov 4, 2026). Dates and
// titles follow the resume; the current employer is shown as Fidorn.

import type { StaticImageData } from "next/image";
import crushieImg from "../../public/assets/img/crushie.jpg";
import finhackImg from "../../public/assets/img/finhack.png";
import forkifyImg from "../../public/assets/img/forkify.png";
import bankistImg from "../../public/assets/img/bankist.png";
import omnifoodImg from "../../public/assets/img/omnifood.png";
import pigGameImg from "../../public/assets/img/pig-game-thumbnail.png";

export const RESUME_URL =
  "https://firebasestorage.googleapis.com/v0/b/lam-anh-truong-portfolio.firebasestorage.app/o/portfolio%2FTruong_Resume.pdf?alt=media";

export const profile = {
  name: "Alan (Lam Anh) Truong",
  shortName: "Alan Truong",
  pronouns: "He/Him",
  role: "AI Software Engineer",
  company: "Fidorn Technologies",
  location: "Washington DC – Baltimore Area",
  email: "alantruong.swe@gmail.com",
  summary:
    "I build multi-agent systems that ship software: orchestration, LLM routing that cuts inference cost, and the AWS serverless and data platforms underneath them.",
  now: [
    { label: "AI Software Engineer", at: "Fidorn Technologies" },
    { label: "Founder", at: "Chuchube" },
    { label: "MS Computer Science", at: "George Mason University" },
  ],
  focus: [
    "Multi-agent orchestration",
    "LLM routing & inference cost",
    "AWS serverless & data platforms",
    "Full-stack TypeScript / Python",
  ],
} as const;

export const metrics = [
  { value: "837+", label: "merged PRs in 45 days" },
  { value: "8.7×", label: "lower LLM inference cost" },
  { value: "13,000+", label: "hackathon field: semifinalist + prize" },
  { value: "2,400+", label: "tests behind an unattended agent pipeline" },
] as const;

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  kind: "github" | "linkedin" | "email" | "resume" | "web";
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/anhlamtruong",
    handle: "anhlamtruong",
    kind: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lam-anh-truong/",
    handle: "lam-anh-truong",
    kind: "linkedin",
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    handle: profile.email,
    kind: "email",
  },
  { label: "Resume", href: RESUME_URL, handle: "PDF", kind: "resume" },
  {
    label: "Chuchube",
    href: "https://workflow.chuchube.co/",
    handle: "workflow.chuchube.co",
    kind: "web",
  },
];

export type Experience = {
  role: string;
  company: string;
  place: string;
  dates: string;
  type?: string;
  link?: string;
  points: string[];
  stack?: string[];
};

export const experience: Experience[] = [
  {
    role: "AI Software Engineer",
    company: "Fidorn Technologies Inc.",
    place: "Washington, DC",
    dates: "Sep 2026 – Present",
    points: [
      "Partnered with the CEO to ship 837+ merged PRs in 45 days: a centralized AI assistant and computer-use tax filing agents that secured a 500+ enterprise client pipeline and multimillion-dollar deals.",
      "Engineered a desktop recording AI pipeline on 16 AWS CDK stacks storing 2.4 TB / 11.3M objects, plus serverless RAG and practice workflows.",
      "Built a 48 vCPU / 28 TB NVMe EC2 AI data platform indexing 6.18M files.",
      "Cut LLM inference costs 8.7× vs. a Claude/Codex-only setup with no accuracy loss by routing workloads to DeepSeek and Kimi on Fireworks AI, validated with LLM-judge benchmarks.",
    ],
    stack: [
      "Python",
      "TypeScript",
      "Lit",
      "MCP",
      "Rust",
      "AWS CDK",
      "ECS Fargate",
      "Kinesis",
      "Step Functions",
      "Aurora Serverless v2",
      "FastAPI",
      "DuckDB",
      "LiteLLM",
    ],
  },
  {
    role: "Founder",
    company: "Chuchube",
    place: "Arlington, VA · remote",
    dates: "Feb 2026 – Present",
    link: "https://workflow.chuchube.co/",
    points: [
      "Built an AI orchestrator that turns a plain-English feature request into a dependency graph of tasks, runs coding-agent CLIs (Claude Code, Codex, Gemini CLI) in parallel across isolated git worktrees, and merges results in dependency order behind tests.",
      "Shipped customizable agent rules and personas and AI Lasso Summaries of canvas sub-workflows; public beta since Sep 2026.",
    ],
    stack: ["Claude Code", "Codex", "Gemini CLI", "git worktrees"],
  },
  {
    role: "Software Development Engineer Intern",
    company: "Amazon Web Services",
    place: "Arlington, VA · Route 53 DNS Firewall",
    dates: "May – Aug 2026",
    points: [
      "Architected an agentic monitoring system that eliminated silent pipeline drops for Route 53 DNS Firewall (Tier 0) across all active regions.",
      "Saved 2 weeks of developer debugging per incident and protected millions of dollars in pending launch dates.",
    ],
    stack: ["Bedrock AgentCore", "Lambda", "DynamoDB", "EKS"],
  },
  {
    role: "Software Engineer",
    company: "Bay Atlantic University",
    place: "Washington, DC",
    dates: "Oct 2023 – Jun 2025",
    points: [
      "Owned end-to-end SIS and LMS reporting services on PostgreSQL (RDS) and Lambda with 100% data integrity across 4K+ student records.",
      "Built a RAG natural-language-to-SQL engine that automated 50+ real-time operational reports.",
    ],
    stack: ["Python", "SQLAlchemy", "Node.js", "Sequelize", "Ollama", "DeepSeek"],
  },
  {
    role: "Full Stack Software Developer",
    company: "OpenKnect, Inc.",
    place: "Baltimore, MD · hybrid",
    dates: "Feb – Sep 2023",
    points: [
      "Led a 7-developer Agile team integrating job posting platforms for 10 clients; rebuilt the UI as a modular React + Relay app, lifting engagement 20% across 10K+ active users.",
      "Designed an event-driven GCP architecture that automated 500+ monthly job postings, boosting posting efficiency 80%.",
    ],
    stack: ["React", "Relay", "Pub/Sub", "Cloud Functions", "Cloud Run", "Firestore"],
  },
  {
    role: "Data Structures & Algorithms Tutor",
    company: "California State University, East Bay",
    place: "Hayward, CA",
    dates: "Aug 2020 – May 2023",
    type: "part-time",
    points: [
      "Taught C++ data structures and algorithms to 300+ students with an 80% success rate and a 3.6/4.0 average GPA.",
    ],
  },
  {
    role: "C++ Language Tutor",
    company: "California State University, East Bay",
    place: "California",
    dates: "Jan – Aug 2022",
    type: "part-time",
    points: [
      "Supported the professor teaching C++ fundamentals and coached students through algorithm practice.",
    ],
  },
  {
    role: "Editor",
    company: "CafeLienMinh (YouTube)",
    place: "Vietnam",
    dates: "2018 – May 2019",
    type: "part-time",
    points: [
      "Edited 40+ broadcast-ready videos and cast 10+ e-sports matches.",
    ],
  },
];

export type Project = {
  title: string;
  tagline: string;
  dates: string;
  description: string;
  stack: string[];
  result?: string;
  badge?: string;
  links: { label: string; href: string }[];
  image?: StaticImageData;
  /** Looping clip in public/videos/<video>.{webm,mp4,webp}, made with HyperFrames (see /video). */
  video?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Autonomous Multi-Agent Workflow",
    tagline: "Headless orchestrator · acquired by Fidorn",
    dates: "Aug – Nov 2026",
    description:
      "Multi-agent orchestration engine with 7 role agents and 12 skills for unattended software shipping, plus a low-latency web and mobile terminal for hands-free smart-glasses workflows.",
    stack: [
      "Claude Code plugins",
      "Subagents",
      "Node.js",
      "GitHub Actions",
      "tmux",
      "Tailscale",
      "node-pty",
      "xterm.js",
    ],
    result: "2,400+ tests · drove 23% of 837+ company PRs to merge overnight",
    badge: "Acquired",
    links: [],
    video: "proj-orchestrator",
    featured: true,
  },
  {
    title: "AI Hire AI",
    tagline: "Multi-agent hiring platform · Amazon Nova AI Hackathon",
    dates: "Mar – Apr 2026",
    description:
      "Dual-sided recruiting platform: a recruiter agent on Discord for triage, micro-screening and risk checks, and a candidate agent for prioritization, resume tailoring and recruiter messaging. Team of 7, one-month sprint.",
    stack: ["OpenClaw", "GPT-5.4 Codex", "Amazon Nova", "AWS Bedrock", "Redis", "Express"],
    result: "Semifinalist + Amazon Nova Feedback Prize among 13,000+ participants",
    badge: "Prize",
    links: [{ label: "Devpost", href: "https://devpost.com/software/my-valentine" }],
    video: "proj-aihire",
    featured: true,
  },
  {
    title: "Crushie",
    tagline: "Real-time conversation coaching · Microsoft Hackathon",
    dates: "Feb – Mar 2026",
    description:
      "Coaching platform with real-time vision and voice feedback and gamified SIQ scoring.",
    stack: ["Next.js", "tRPC", "Azure OpenAI", "ElevenLabs", "Supabase pgvector"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/crushie" }],
    image: crushieImg,
    video: "proj-crushie",
    featured: true,
  },
  {
    title: "FinHack",
    tagline: "AI financial platform · Capital One Hackathon",
    dates: "Jan – Feb 2026",
    description:
      "Voice-enabled financial platform with forecasting and on-chain auditing.",
    stack: ["Gemini", "Claude", "ElevenLabs", "Snowflake ML", "Docker", "Terraform", "Solana"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/finance-queens" }],
    image: finhackImg,
    video: "proj-finhack",
    featured: true,
  },
  {
    title: "Cookit",
    tagline: "Recipe & food e-commerce",
    dates: "Jan 2024 – Dec 2025",
    description:
      "E-commerce platform for recipes, food products and culinary items, with secure auth and online payments.",
    stack: ["Next.js", "Prisma", "NextAuth", "Neon", "Stripe", "React Query", "Zustand"],
    result: "Launched · about $1,000 initial revenue",
    links: [],
  },
  {
    title: "Sassy Authy",
    tagline: "Drop-in auth for Next.js",
    dates: "Nov 2023 – Dec 2025",
    description:
      "Authentication service that removes auth boilerplate from Next.js projects.",
    stack: ["Next.js", "NextAuth"],
    result: "Live on Vercel",
    links: [
      {
        label: "Live",
        href: "https://sassy-authy-mlh627018-anhlamtruong.vercel.app/",
      },
    ],
  },
  {
    title: "Forkify",
    tagline: "Recipe app",
    dates: "Aug – Nov 2022",
    description: "MVC recipe app with API fetching and DOM rendering.",
    stack: ["JavaScript", "SASS"],
    result: "Async refactor cut execution time 80%+",
    links: [
      { label: "Live", href: "https://forkify-application-anh-portfolio.netlify.app/" },
    ],
    image: forkifyImg,
  },
  {
    title: "Bankist",
    tagline: "Banking demo",
    dates: "Jul – Aug 2022",
    description: "Front-end banking demo focused on DOM manipulation.",
    stack: ["JavaScript", "CSS"],
    links: [{ label: "Live", href: "https://anhlamtruong.github.io/banklist-app/" }],
    image: bankistImg,
  },
  {
    title: "Omnifood",
    tagline: "Responsive marketing site",
    dates: "May – Jul 2022",
    description: "A web design study project: responsive marketing website.",
    stack: ["HTML", "CSS"],
    links: [
      {
        label: "Live",
        href: "https://anhlamtruong.github.io/Omnifood-Project-Desktop-/",
      },
      {
        label: "GitHub",
        href: "https://github.com/AnhLamTruong/Omnifood-Project-Desktop-",
      },
    ],
    image: omnifoodImg,
  },
  {
    title: "Pig Game",
    tagline: "Two-player dice game",
    dates: "May – Jun 2022",
    description: "A small two-player dice game.",
    stack: ["JavaScript", "HTML", "CSS"],
    links: [{ label: "Live", href: "https://anhlamtruong.github.io/The-Pig-Game/" }],
    image: pigGameImg,
  },
];

export const skillGroups: { name: string; items: string[] }[] = [
  {
    name: "AI & agents",
    items: [
      "Multi-agent orchestration",
      "Claude Code (plugins, subagents)",
      "MCP",
      "RAG pipelines",
      "Computer-use agents",
      "LLM-judge eval",
      "LLM routing",
      "Bedrock AgentCore",
      "Amazon Nova",
      "Fireworks AI",
      "Azure OpenAI",
      "Gemini",
      "DeepSeek",
      "Kimi",
      "LiteLLM",
      "Ollama",
      "ElevenLabs",
    ],
  },
  {
    name: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Rust", "Go", "C++", "SQL"],
  },
  {
    name: "Frameworks",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
      "Flask",
      "Express",
      "Lit",
      "Relay",
      "tRPC",
      "Tailwind CSS",
      "Prisma",
      "SQLAlchemy",
      "React Query",
      "Zustand",
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      "AWS CDK",
      "ECS Fargate",
      "Lambda",
      "EC2",
      "S3",
      "DynamoDB",
      "RDS / Aurora",
      "Step Functions",
      "Kinesis",
      "EKS",
      "Cognito",
      "GCP",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "Vercel",
      "Tailscale",
    ],
  },
  {
    name: "Data",
    items: [
      "PostgreSQL",
      "DuckDB",
      "Parquet",
      "MongoDB",
      "Redis",
      "Supabase pgvector",
      "Snowflake ML",
      "Neon",
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  issued: string;
  status: "active" | "expired";
  expired?: string;
  href?: string;
};

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issued: "Aug 2023",
    status: "expired",
    expired: "Aug 2026",
    href: "https://cp.certmetrics.com/amazon/en/public/verify/credential/KP71RW6C4M1Q1EWK",
  },
  {
    name: "General Coding Framework · 600/600",
    issuer: "CodeSignal",
    issued: "Jan 2026",
    status: "expired",
    expired: "Jun 2026",
  },
  {
    name: "Google IT Automation with Python",
    issuer: "Google",
    issued: "Apr 2025",
    status: "active",
    href: "https://www.coursera.org/account/accomplishments/professional-cert/A1498HCBE0ED",
  },
  {
    name: "Meta Front-End Developer",
    issuer: "Meta",
    issued: "Oct 2024",
    status: "active",
    href: "https://www.coursera.org/account/accomplishments/professional-cert/9Q4LRT7VCCVO",
  },
  {
    name: "Google Cloud: Cloud Developer",
    issuer: "Google Cloud Skills Boost",
    issued: "Aug 2024",
    status: "active",
    href: "https://www.coursera.org/account/accomplishments/specialization/PMUATOWH1TZP",
  },
  {
    name: "Google Cloud Digital Leader Training",
    issuer: "Google Cloud",
    issued: "Jul 2024",
    status: "active",
    href: "https://www.coursera.org/account/accomplishments/specialization/YXEJRM2ELTNG",
  },
  {
    name: "Google UX Design",
    issuer: "Google",
    issued: "May 2024",
    status: "active",
    href: "https://www.coursera.org/account/accomplishments/professional-cert/CJKM3JF96EZB",
  },
];

export const education = [
  {
    school: "George Mason University",
    degree: "M.S. Computer Science",
    dates: "Jan 2026 – Dec 2027",
    place: "Fairfax, VA",
    detail:
      "Analysis of Algorithms · Database Systems · OO Software Construction · Secure Software Design · Systems Programming",
  },
  {
    school: "California State University, East Bay",
    degree: "B.S. Computer Science · GPA 3.5",
    dates: "Aug 2019 – May 2023",
    place: "Hayward, CA",
    detail:
      "Computer Architecture · Operating Systems · Artificial Intelligence · Computer Networks",
  },
] as const;

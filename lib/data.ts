import { GraduationCap, Award, Briefcase, Rocket, type LucideIcon, IdCard } from "lucide-react"

// Hero Section Data
export interface HeroData {
  badge: string
  headline: {
    line1: string
    highlight: string
    line2: string
  }
  description: string
  avatarSrc: string
  avatarAlt: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta: {
    label: string
    href: string
  }
  socials: {
    github?: string
    linkedin?: string
    email?: string
    twitter?: string
  }
}

export const heroData: HeroData = {
  badge: "Software Engineer • Data Engineer • Data Analyst",
  headline: {
    line1: "Building digital",
    highlight: "experiences",
    line2: "that make a difference.",
  },
  description:
    "I'm Andy Quach, a Software Engineer, Data Engineer, and Data Analyst passionate about building high-performance systems with clean architecture and thoughtful design. Currently focused on developing scalable, data-driven applications at the intersection of software engineering, data pipelines, and user experience.",
  avatarSrc: "/avatar.jpg",
  avatarAlt: "Andy Quach - Software Engineer",
  primaryCta: {
    label: "View Projects",
    href: "#projects",
  },
  secondaryCta: {
    label: "Download Resume",
    href: "/resume.pdf",
  },
  socials: {
    github: "https://github.com/quanquach512",
    linkedin: "https://www.linkedin.com/in/quanquach0512/",
    email: "qmquan90@gmail.com",
  },
}

// Navigation Data
export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Milestones", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
]

export interface NavbarData {
  logo: string
  logoAccent: string
  links: NavLink[]
  ctaLabel: string
  ctaHref: string
}

export const navbarData: NavbarData = {
  logo: "AQ",
  logoAccent: ".dev",
  links: navLinks,
  ctaLabel: "Get in Touch",
  ctaHref: "#contact",
}

// Projects Data
export type ProjectCategory = "Data Engineering" | "Analytics" | "Software Engineering" | "DevOps" | "AI/ML"
export type ProjectStatus = "Completed" | "In Progress" | "Planned"

export interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  category: string
  status: ProjectStatus
  github?: string
  live?: string
  // Detailed fields for project page
  problem: string
  solution: string
  architecture: string[]
  results: string[]
  screenshots: string[]
  isPinned: boolean
  order: number
}


export const projectsData: Project[] = [
  {
    id: 1,
    title: "CloudSync Platform",
    description:
      "A real-time collaboration platform enabling teams to sync and share documents seamlessly across devices with end-to-end encryption.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    category: "Software Engineering",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    problem: "Remote teams struggle with document version conflicts and lack of real-time collaboration capabilities. Existing solutions are either too expensive for small teams or lack proper security measures for sensitive documents.",
    solution: "Built a real-time collaboration platform using WebSockets for instant sync, conflict-free replicated data types (CRDTs) for offline support, and end-to-end encryption for security. The platform supports multiple file formats and provides granular access control.",
    architecture: [
      "Next.js frontend with optimistic UI updates for instant feedback",
      "WebSocket server using Socket.io for real-time bidirectional communication",
      "PostgreSQL database with row-level security for multi-tenant isolation",
      "Redis for caching active sessions and presence indicators",
      "AWS S3 with client-side encryption for secure file storage"
    ],
    results: [
      "Reduced document sync time by 95% compared to traditional file sharing",
      "Zero data breaches since launch with end-to-end encryption",
      "Serving 5,000+ daily active users across 50+ organizations",
      "99.9% uptime with automatic failover and horizontal scaling"
    ],
    screenshots: ["/projects/cloudsync-1.jpg"]
  },
  {
    id: 2,
    title: "DevMetrics Dashboard",
    description:
      "Analytics dashboard for development teams to track code quality, deployment frequency, and team performance metrics.",
    techStack: ["React", "Node.js", "GraphQL", "Redis"],
    category: "Analytics",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    problem: "Engineering managers lack visibility into team productivity and code health. Existing tools provide raw data but fail to surface actionable insights or track DORA metrics effectively.",
    solution: "Created a comprehensive analytics platform that integrates with GitHub, GitLab, and Jira to aggregate engineering metrics. Uses machine learning to identify bottlenecks and predict deployment risks.",
    architecture: [
      "React dashboard with D3.js for interactive data visualizations",
      "GraphQL API layer for flexible data querying and aggregation",
      "Node.js workers for background data processing and ETL",
      "Redis for caching computed metrics and real-time leaderboards",
      "PostgreSQL with TimescaleDB extension for time-series analytics"
    ],
    results: [
      "Improved deployment frequency by 40% for adopting teams",
      "Reduced mean time to recovery (MTTR) by 60%",
      "Processing 10M+ events daily from connected repositories",
      "Adopted by 200+ engineering teams globally"
    ],
    screenshots: ["/projects/devmetrics-1.jpg"]
  },
  {
    id: 3,
    title: "AI Content Studio",
    description:
      "AI-powered content generation tool that helps creators produce high-quality articles, social posts, and marketing copy.",
    techStack: ["Python", "FastAPI", "OpenAI", "React"],
    category: "AI/ML",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    problem: "Content creators spend hours writing and editing copy. Existing AI tools produce generic, low-quality content that requires extensive manual editing and lacks brand voice consistency.",
    solution: "Developed an AI content platform that learns brand voice from existing content, generates contextually relevant copy, and provides a collaborative editing interface with AI suggestions.",
    architecture: [
      "React frontend with rich text editor and real-time AI suggestions",
      "FastAPI backend for high-performance async API handling",
      "OpenAI GPT-4 with fine-tuned prompts for content generation",
      "Vector database (Pinecone) for semantic search and brand voice matching",
      "Celery workers for async content processing and queue management"
    ],
    results: [
      "Reduced content creation time by 70% for users",
      "Generated 500K+ pieces of content with 4.5/5 quality rating",
      "95% user retention rate with monthly active usage",
      "Integrated with 15+ publishing platforms via API"
    ],
    screenshots: ["/projects/ai-content-1.jpg"]
  },
  {
    id: 4,
    title: "SecureVault API",
    description:
      "Enterprise-grade secrets management API with role-based access control, audit logging, and automatic rotation.",
    techStack: ["Go", "gRPC", "Kubernetes", "Vault"],
    category: "DevOps",
    status: "Completed",
    github: "https://github.com",
    problem: "Developers hardcode secrets or use insecure methods to manage credentials. Enterprise solutions are complex to deploy and lack developer-friendly APIs for modern cloud-native applications.",
    solution: "Built a lightweight secrets management service with a simple REST/gRPC API, automatic secret rotation, and seamless Kubernetes integration through a custom operator.",
    architecture: [
      "Go microservice with both REST and gRPC interfaces",
      "HashiCorp Vault backend for secure secret storage",
      "Kubernetes operator for automatic secret injection",
      "Audit logging with tamper-proof event streaming",
      "OIDC integration for SSO and identity federation"
    ],
    results: [
      "Eliminated hardcoded secrets in 100% of adopting codebases",
      "Reduced secret rotation time from days to minutes",
      "Processing 1M+ secret requests daily with <5ms latency",
      "SOC 2 Type II certified for enterprise compliance"
    ],
    screenshots: ["/projects/cloudsync-1.jpg"]
  },
  {
    id: 5,
    title: "StreamFlow",
    description:
      "Event-driven microservices framework for building scalable, fault-tolerant distributed systems.",
    techStack: ["Rust", "Kafka", "Docker", "AWS"],
    category: "Data Engineering",
    status: "In Progress",
    github: "https://github.com",
    problem: "Building event-driven systems requires significant boilerplate and deep expertise in distributed systems. Existing frameworks are either too opinionated or lack proper tooling for debugging.",
    solution: "Creating a batteries-included framework in Rust that provides event sourcing, saga orchestration, and observability out of the box with minimal configuration.",
    architecture: [
      "Rust core library with async runtime (Tokio)",
      "Apache Kafka for event streaming and persistence",
      "Built-in saga orchestrator for distributed transactions",
      "OpenTelemetry integration for distributed tracing",
      "CLI tooling for local development and debugging"
    ],
    results: [
      "Alpha release with 500+ GitHub stars",
      "10x faster message processing vs Java alternatives",
      "Active community with 50+ contributors",
      "Targeting production-ready release Q2 2026"
    ],
    screenshots: ["/projects/devmetrics-1.jpg"]
  },
  {
    id: 6,
    title: "DesignKit UI",
    description:
      "Open-source component library with 50+ accessible, customizable React components for modern web applications.",
    techStack: ["React", "Tailwind CSS", "Storybook", "Testing Library"],
    category: "Software Engineering",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    problem: "Developers waste time building common UI components from scratch. Existing libraries lack accessibility, customization options, or have bloated bundle sizes.",
    solution: "Created a tree-shakeable component library focused on accessibility, customization through CSS variables, and comprehensive documentation with live examples.",
    architecture: [
      "React 18 with TypeScript for type-safe components",
      "Tailwind CSS for utility-first styling with theme support",
      "Storybook for interactive documentation and visual testing",
      "Testing Library + Playwright for unit and e2e testing",
      "Changesets for automated versioning and changelog generation"
    ],
    results: [
      "10K+ GitHub stars and 500K+ monthly npm downloads",
      "WCAG 2.1 AA compliant across all components",
      "Average bundle size of 2KB per component",
      "Used by 1,000+ production applications"
    ],
    screenshots: ["/projects/ai-content-1.jpg"]
  },
  {
    id: 7,
    title: "DataLake Pipeline",
    description:
      "Scalable ETL pipeline for processing and transforming petabytes of raw data into actionable insights.",
    techStack: ["Apache Spark", "Python", "AWS S3", "Airflow"],
    category: "Data Engineering",
    status: "Completed",
    github: "https://github.com",
    problem: "Organizations struggle to process massive datasets efficiently. Traditional ETL tools cannot handle petabyte-scale data and lack proper monitoring and recovery mechanisms.",
    solution: "Designed a modular ETL framework using Apache Spark with automatic schema evolution, data quality checks, and self-healing capabilities for failed jobs.",
    architecture: [
      "Apache Spark on EMR for distributed data processing",
      "Apache Airflow for workflow orchestration and scheduling",
      "AWS S3 with Delta Lake for ACID transactions on data lakes",
      "Great Expectations for data quality validation",
      "Custom Spark connectors for legacy system integration"
    ],
    results: [
      "Processing 5PB of data daily with 99.9% reliability",
      "Reduced data processing costs by 60% vs previous solution",
      "Sub-hour data freshness for real-time analytics",
      "Automated recovery reduced manual intervention by 90%"
    ],
    screenshots: ["/projects/devmetrics-1.jpg"]
  },
  {
    id: 8,
    title: "Real-time Fraud Detection",
    description:
      "Machine learning system that detects fraudulent transactions in real-time with 99.5% accuracy.",
    techStack: ["Python", "TensorFlow", "Kafka", "Redis"],
    category: "AI/ML",
    status: "Completed",
    github: "https://github.com",
    live: "https://example.com",
    problem: "Financial institutions lose billions to fraud annually. Traditional rule-based systems generate too many false positives and cannot adapt to new fraud patterns quickly.",
    solution: "Built an ML pipeline combining gradient boosting and neural networks for real-time fraud scoring, with continuous learning to adapt to emerging fraud patterns.",
    architecture: [
      "TensorFlow Serving for low-latency model inference",
      "Apache Kafka for streaming transaction events",
      "Feature store (Feast) for real-time feature computation",
      "Redis for caching user behavior profiles",
      "MLflow for model versioning and A/B testing"
    ],
    results: [
      "99.5% fraud detection accuracy with 0.1% false positive rate",
      "Processing 10,000 transactions per second at <50ms latency",
      "Prevented $50M+ in fraudulent transactions annually",
      "Model retraining pipeline updates production in <4 hours"
    ],
    screenshots: ["/projects/ai-content-1.jpg"]
  },
  {
    id: 9,
    title: "Sales Analytics Platform",
    description:
      "Business intelligence platform providing real-time sales insights, forecasting, and performance tracking.",
    techStack: ["Power BI", "Python", "SQL Server", "Azure"],
    category: "Analytics",
    status: "In Progress",
    github: "https://github.com",
    problem: "Sales teams rely on spreadsheets and outdated reports. Lack of real-time visibility into pipeline health leads to missed forecasts and poor resource allocation.",
    solution: "Building an integrated BI platform with automated data pipelines, AI-powered forecasting, and role-based dashboards for different stakeholder needs.",
    architecture: [
      "Power BI for interactive dashboards and self-service analytics",
      "Azure Data Factory for ETL orchestration",
      "Python + scikit-learn for sales forecasting models",
      "SQL Server with columnstore indexes for fast aggregations",
      "Azure Functions for automated report distribution"
    ],
    results: [
      "Beta deployment with 3 enterprise customers",
      "Forecast accuracy improved by 25% over spreadsheet methods",
      "Reduced monthly reporting time from 2 weeks to 2 hours",
      "Real-time pipeline visibility for 500+ sales reps"
    ],
    screenshots: ["/projects/cloudsync-1.jpg"]
  },
  {
    id: 10,
    title: "Infrastructure as Code Toolkit",
    description:
      "Comprehensive Terraform modules and scripts for deploying multi-cloud infrastructure with best practices.",
    techStack: ["Terraform", "AWS", "GCP", "GitHub Actions"],
    category: "DevOps",
    status: "Completed",
    github: "https://github.com",
    problem: "Teams copy-paste infrastructure code without understanding security implications. Cloud deployments lack consistency and compliance with organizational standards.",
    solution: "Created a library of battle-tested Terraform modules with built-in security controls, compliance checks, and automated documentation generation.",
    architecture: [
      "Terraform modules with semantic versioning",
      "GitHub Actions workflows for CI/CD integration",
      "Checkov and tfsec for security scanning",
      "Terraform Cloud for state management and team collaboration",
      "Auto-generated docs using terraform-docs"
    ],
    results: [
      "3,000+ GitHub stars with active community contributions",
      "Reduced infrastructure deployment time by 80%",
      "Zero critical security findings in adopting organizations",
      "Used by Fortune 500 companies for cloud migrations"
    ],
    screenshots: ["/projects/devmetrics-1.jpg"]
  },
]

// Helper function to get project by slug
export function getProjectById(id: number): Project | undefined {
  return projectsData.find(project => project.id === id)
}

// Get all project slugs for static generation
export function getAllProjectIds(): number[] {
  return projectsData.map(project => project.id)
}

// Get unique project categories
export const projectCategories: ProjectCategory[] = [
  "Software Engineering",
  "Data Engineering",
  "Analytics",
  "AI/ML",
  "DevOps",
]

// Tech Stack Data
export type TechStackData = Record<string, string[]>

export const techStackData: TechStackData = {
  Languages: ["TypeScript", "Python", "Go", "Rust", "JavaScript"],
  Frontend: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "FastAPI", "Express", "GraphQL", "gRPC"],
  Database: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"],
  DevOps: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform"],
  Tools: ["Git", "Figma", "Vim", "VS Code", "Linear"],
}

// Achievements Data
export type AchievementCategory = "Education" | "Certification" | "Project" | "Career"

export interface Achievement {
  category: AchievementCategory
  title: string
  description: string
  date: string
  image: string
  icon: LucideIcon
  link: string | null
}

export const achievementsData: Achievement[] = [
  {
    category: "Education",
    title: "Master of Engineering, University of Waterloo",
    description:
      "Completed my MEng in Electrical and Computer Engineering with a Software specialization.",
    date: "2024",
    image: "/achievements/convocation.jpg",
    icon: GraduationCap,
    link: null,
  },
  {
    category: "Certification",
    title: "AWS Certified Cloud Practitioner",
    description:
      "Validated foundational AWS cloud knowledge including compute, storage, networking, and security concepts.",
    date: "2026",
    image: "/achievements/aws-cert.jpg",
    icon: Award,
    link: "https://aws.amazon.com/certification/",
  },
  {
    category: "Certification",
    title: "Microsoft Power BI Data Analyst Associate",
    description:
      "Demonstrated skills in data preparation, modeling, visualization, and analytics using Power BI.",
    date: "Planned",
    image: "/achievements/powerbi-cert.jpg",
    icon: Award,
    link: "https://learn.microsoft.com/en-us/certifications/",
  },
  {
    category: "Career",
    title: "Joined TechCorp as Senior Engineer",
    description:
      "Started a new role leading the platform engineering team, focusing on scalability and developer experience.",
    date: "2025",
    image: "/achievements/convocation.jpg",
    icon: Briefcase,
    link: null,
  },
  {
    category: "Project",
    title: "Open Source Project Hit 10k Stars",
    description:
      "DesignKit UI reached 10,000 GitHub stars, becoming one of the top React component libraries.",
    date: "2025",
    image: "/achievements/aws-cert.jpg",
    icon: Rocket,
    link: "https://github.com",
  },
  {
    category: "Education",
    title: "Bachelor of Science, Computer Science",
    description:
      "Graduated with honors from University of Toronto with a focus on distributed systems and algorithms.",
    date: "2022",
    image: "/achievements/convocation.jpg",
    icon: GraduationCap,
    link: null,
  },
]

// Get unique achievement categories
export const achievementCategories: AchievementCategory[] = [
  "Education",
  "Certification",
  "Project",
  "Career",
]

// Certifications Data
export type CertificationStatus = "Completed" | "In Progress" | "Planned"

export interface Certification {
  name: string
  issuer: string
  date: string
  status: CertificationStatus
  credentialUrl: string
  badgeImage?: string
}

export const certificationsData: Certification[] = [
  {
    name: "AWS Solutions Architect Professional",
    issuer: "Amazon Web Services",
    date: "2024",
    status: "Completed",
    credentialUrl: "https://aws.amazon.com",
    badgeImage: "/achievements/aws-cert.jpg",
  },
  {
    name: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2024",
    status: "Completed",
    credentialUrl: "https://cloud.google.com",
    badgeImage: "/achievements/aws-cert.jpg",
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2023",
    status: "Completed",
    credentialUrl: "https://cncf.io",
    badgeImage: "/achievements/aws-cert.jpg",
  },
  {
    name: "MongoDB Developer Associate",
    issuer: "MongoDB University",
    date: "2023",
    status: "Completed",
    credentialUrl: "https://mongodb.com",
    badgeImage: "/achievements/aws-cert.jpg",
  },
  {
    name: "Microsoft Azure Data Engineer",
    issuer: "Microsoft",
    date: "2025",
    status: "In Progress",
    credentialUrl: "https://learn.microsoft.com",
    badgeImage: "/achievements/powerbi-cert.jpg",
  },
  {
    name: "Terraform Associate",
    issuer: "HashiCorp",
    date: "2025",
    status: "Planned",
    credentialUrl: "https://hashicorp.com",
    badgeImage: "/achievements/aws-cert.jpg",
  },
  {
    name: "Databricks Data Engineer Professional",
    issuer: "Databricks",
    date: "2025",
    status: "Planned",
    credentialUrl: "https://databricks.com",
    badgeImage: "/achievements/powerbi-cert.jpg",
  },
]

// Contact Data
export interface ContactData {
  badge: string
  headline: string
  description: string
  email: string
  location: string
  socials: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export const contactData: ContactData = {
  badge: "Get in Touch",
  headline: "Let's work together",
  description:
    "Have a project in mind or want to discuss opportunities? I'd love to hear from you. Let's create something amazing together.",
  email: "alex@example.com",
  location: "San Francisco, CA",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
}

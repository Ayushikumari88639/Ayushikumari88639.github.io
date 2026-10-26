// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS — the single source of truth for the Projects section, filters,
// the hero preview and every project detail page (?project=<slug>).
//
// To add a project: copy one object, give it a unique id + slug, fill what you
// know and leave the rest out. Optional fields that are missing are simply not
// rendered — no empty buttons, no dead links.
//
// Images: put files in /public/projects/<slug>/ and reference them as
// 'projects/<slug>/file.webp' (no leading slash).
//
// Everything below is taken from the resume. Nothing is invented: no links,
// metrics or screenshots that were not supplied.
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | 'fullstack'
  | 'web'
  | 'java-db'
  | 'android'
  | 'security'
  | 'analytics'
  | 'research'
  | 'concept'
  | 'programming'
  | 'mini';

export type ProjectStatus = 'Built' | 'Hackathon prototype' | 'Workshop concept' | 'In progress';

export type Motif =
  | 'verify'
  | 'shield'
  | 'document'
  | 'cart'
  | 'plane'
  | 'location'
  | 'vr'
  | 'chart'
  | 'grid'
  | 'research'
  | 'code';

export interface FlowStep {
  label: string;
  detail?: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  /** Short name used in cards and navigation. */
  name: string;
  /** One-line positioning under the title. */
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  features: string[];
  status: ProjectStatus;
  /** Where/with whom it was built (hackathon, workshop, coursework…). */
  context?: string;
  contribution?: string[];
  problem?: string;
  objective?: string;
  /** Primary workflow (e.g. a verification chain or data flow). */
  flow?: { title: string; steps: FlowStep[]; note?: string };
  /** High-level architecture shown as a layered diagram. */
  architecture?: { steps: FlowStep[]; note?: string };
  database?: string[];
  challenges?: { challenge: string; solution: string }[];
  /** Free-form extra sections for project-specific content. */
  sections?: { heading: string; body?: string; items?: string[] }[];
  thumbnail?: string;
  screenshots?: Screenshot[];
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  featured?: boolean;
  /** Small mini-projects render as compact rows instead of full cards. */
  compact?: boolean;
  ctaLabel?: string;
  motif: Motif;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  fullstack: 'Full Stack',
  web: 'Web Development',
  'java-db': 'Java & Database',
  android: 'Android',
  security: 'Security',
  analytics: 'Data Analytics',
  research: 'Research',
  concept: 'Concepts & Workshops',
  programming: 'Programming',
  mini: 'Mini Projects',
};

const GH = 'https://github.com/Ayushikumari88639';

export const projects: Project[] = [
  {
    id: 1,
    slug: 'verisync',
    name: 'VeriSync',
    title: 'VeriSync — Multi-Factor Attendance Management System',
    tagline: 'Attendance that has to be earned three times: face, QR code and OTP.',
    description:
      'A secure attendance management platform built around multi-factor verification and role-based access for students, faculty and administrators.',
    categories: ['fullstack', 'security'],
    technologies: ['Python', 'Flask', 'MySQL', 'OpenCV', 'face_recognition (dlib)', 'JWT', 'AES', 'QR verification', 'OTP'],
    features: [
      'Separate student, faculty and administrator roles with role-based access control',
      'JWT-based login and session handling',
      'Facial verification through a face-matching pipeline (OpenCV · face_recognition)',
      'QR-code verification as the second factor',
      'OTP check as the final factor before attendance is recorded',
      'Faculty dashboards and an administrator panel',
      'Attendance reports',
      'Digital ID cards and timetables',
      'AES encryption for stored data',
      'MySQL database schema designed for the platform',
    ],
    status: 'Built',
    contribution: [
      'Designed the MySQL schema.',
      'Built JWT-based login and role-based access.',
      'Built the face-matching pipeline, faculty dashboards, admin panel, attendance reports, digital ID cards and timetables.',
      'Secured stored data with AES encryption.',
    ],
    problem:
      'A single check such as a roll call or one shared QR code is easy to mark on someone else’s behalf. Attendance records are only useful if the platform can be confident the right person was present.',
    objective:
      'Build a complete attendance platform where every attendance mark must pass three independent checks, and where students, faculty and administrators each see only what their role allows.',
    flow: {
      title: 'Verification flow — every attendance mark',
      steps: [
        { label: 'Face verification', detail: 'Factor 1 · face-matching pipeline' },
        { label: 'QR-code scan', detail: 'Factor 2' },
        { label: 'OTP check', detail: 'Factor 3 · one-time password' },
        { label: 'Attendance recorded', detail: 'Stored in MySQL; visible in reports' },
      ],
      note: 'If any step fails, the mark is not recorded.',
    },
    architecture: {
      steps: [
        { label: 'Browser UI', detail: 'Student · Faculty · Admin views' },
        { label: 'Flask application', detail: 'Routes, JWT auth, RBAC' },
        { label: 'Verification services', detail: 'OpenCV face match · QR · OTP' },
        { label: 'MySQL', detail: 'Schema design · AES-encrypted data' },
      ],
      note: 'High-level overview drawn from the project’s documented stack.',
    },
    database: [
      'Relational MySQL schema designed for users across three roles, attendance records, timetables and ID-card data.',
      'Sensitive data encrypted with AES before storage.',
    ],
    githubUrl: undefined, // Add the VeriSync repository URL when it is public.
    featured: true,
    ctaLabel: 'Explore VeriSync',
    motif: 'verify',
  },
  {
    id: 2,
    slug: 'surakshacheck',
    name: 'SurakshaCheck',
    title: 'SurakshaCheck — Scam and Fraud Verification Tool',
    tagline: 'A simple place for elderly people to check a suspicious call, message or link.',
    description:
      'A hackathon project that helps people — especially elderly citizens — check suspicious calls, messages and links through a website and a WhatsApp chatbot.',
    categories: ['web', 'security'],
    technologies: ['Website', 'WhatsApp chatbot'],
    features: [
      'Website interface for checking suspicious calls, messages and links',
      'WhatsApp chatbot so users can check from an app they already use',
      'Designed with elderly citizens in mind',
    ],
    status: 'Hackathon prototype',
    context: 'Built as a hackathon participant.',
    problem:
      'Scam calls, fake messages and phishing links often target elderly people, who may not know how to judge whether something is genuine — or whom to ask.',
    objective:
      'Give people a familiar, low-effort way to check something suspicious before acting on it, with practical cybersecurity awareness built into the experience.',
    flow: {
      title: 'How someone uses it',
      steps: [
        { label: 'Receive something suspicious', detail: 'A call, message or link' },
        { label: 'Check it', detail: 'On the website or through WhatsApp' },
        { label: 'Get guidance', detail: 'Before replying, clicking or paying' },
      ],
    },
    sections: [
      {
        heading: 'Why WhatsApp',
        body: 'Many elderly users already use WhatsApp every day. Meeting them inside a familiar app removes the need to learn a new tool at the exact moment they are unsure what to trust.',
      },
    ],
    featured: true,
    ctaLabel: 'Explore SurakshaCheck',
    motif: 'shield',
  },
  {
    id: 3,
    slug: 'smartcv',
    name: 'SmartCV',
    title: 'SmartCV — Full-Stack Resume Builder',
    tagline: 'From a form to a finished resume, through a real backend and database.',
    description:
      'A resume-building web app: users enter their details, the Flask backend validates and stores them in MySQL, and the resume layout is generated dynamically from the saved data.',
    categories: ['fullstack', 'web'],
    technologies: ['Flask', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Form-based input of personal, education and experience details',
      'Server-side validation in Flask',
      'Persistent storage in MySQL',
      'Resume layout generated dynamically from saved data',
    ],
    status: 'Built',
    contribution: [
      'Handled the complete flow end to end — form input → backend routes → database storage → rendered resume page.',
    ],
    problem:
      'Writing and formatting a resume by hand is slow, and every edit means re-doing the layout.',
    objective:
      'Separate content from presentation: store a person’s details once and generate the resume layout from that data.',
    flow: {
      title: 'Data flow',
      steps: [
        { label: 'User input', detail: 'HTML form' },
        { label: 'Flask backend', detail: 'Routes + validation' },
        { label: 'MySQL database', detail: 'Stored details' },
        { label: 'Generated resume', detail: 'Rendered page' },
      ],
    },
    featured: true,
    ctaLabel: 'Explore SmartCV',
    motif: 'document',
  },
  {
    id: 4,
    slug: 'ecommerce-website',
    name: 'eCommerce Website',
    title: 'eCommerce Website',
    tagline: 'A responsive shop with a catalogue API, persistent cart and order handling.',
    description:
      'A responsive shopping site built with a Flask backend, featuring a product catalogue API, cart persistence and order handling.',
    categories: ['fullstack', 'web'],
    technologies: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript'],
    features: ['Responsive interface', 'Product catalogue', 'Product catalogue API', 'Cart persistence', 'Order handling'],
    status: 'Built',
    architecture: {
      steps: [
        { label: 'Responsive frontend', detail: 'HTML · CSS · JavaScript' },
        { label: 'Flask routes', detail: 'Catalogue API · cart · orders' },
        { label: 'Persistence', detail: 'Cart kept between visits' },
      ],
      note: 'High-level overview drawn from the project description.',
    },
    githubUrl: `${GH}/Ecommerce_Website`,
    motif: 'cart',
  },
  {
    id: 5,
    slug: 'airlines-reservation-system',
    name: 'Airlines Reservation System',
    title: 'Airlines Reservation System',
    tagline: 'A complete booking workflow on Java, JDBC and a normalized MySQL schema.',
    description:
      'A complete airline booking workflow with JDBC integration, a normalized database schema and modular, object-oriented backend logic.',
    categories: ['java-db'],
    technologies: ['Java', 'JDBC', 'MySQL'],
    features: [
      'End-to-end booking workflow',
      'Database integration through JDBC',
      'Normalized relational schema',
      'Modular, object-oriented backend logic',
    ],
    status: 'Built',
    architecture: {
      steps: [
        { label: 'Booking workflow', detail: 'User-facing flow' },
        { label: 'Java service classes', detail: 'Modular OOP logic' },
        { label: 'JDBC', detail: 'Database access layer' },
        { label: 'MySQL', detail: 'Normalized schema' },
      ],
      note: 'High-level overview. A schema diagram can be added when available.',
    },
    database: ['Normalized relational schema in MySQL, accessed through JDBC.'],
    motif: 'plane',
  },
  {
    id: 6,
    slug: 'women-safety-app',
    name: 'Women Safety App',
    title: 'Women Safety App',
    tagline: 'An Android app for moments when help needs to be one tap away.',
    description:
      'An Android application focused on personal safety, with emergency SOS alerts, live location sharing and built-in safety tips.',
    categories: ['android'],
    technologies: ['Android'],
    features: ['Emergency SOS alerts', 'Live location sharing', 'Built-in safety tips'],
    status: 'Built',
    problem:
      'In an emergency there is little time to unlock a phone, find contacts and explain where you are.',
    objective:
      'Reduce the steps between feeling unsafe and reaching help: one SOS action, a shared live location, and safety guidance in the same app.',
    sections: [
      {
        heading: 'Related experience',
        body: 'During my Android Development internship I identified and fixed user-facing issues in a Women Safety App involving SOS alerts and live-location sharing.',
      },
      {
        heading: 'Privacy note',
        body: 'Any screenshots added here will use test data only — no real contacts or locations.',
      },
    ],
    motif: 'location',
  },
  {
    id: 7,
    slug: 'lifebridge',
    name: 'LifeBridge',
    title: 'LifeBridge — AR/VR Emergency Support Concept',
    tagline: 'A team concept for guiding bystanders through the first minutes after an accident.',
    description:
      'A team concept (Team Infinity) for an AR/VR emergency-support system that guides bystanders through the critical first minutes after an accident, while alerting emergency services and sharing the accident location.',
    categories: ['concept'],
    technologies: ['AR/VR', 'WebXR', 'A-Frame', 'Stanford Design Thinking'],
    features: [
      'AR/VR guidance for bystanders in the first critical minutes',
      'Alerting emergency services',
      'Sharing the accident location',
    ],
    status: 'Workshop concept',
    context:
      'Young Innovators STEM Lab (YISL) workshop, IIT Patna · September 2026. A team workshop concept and pitch — not a deployed emergency-response service.',
    contribution: [
      'Ideated the concept with a 6-member team (Team Infinity).',
      'Applied Stanford Design Thinking: empathize → define → prototype → test.',
      'Delivered a 2-minute startup pitch among ~20 teams.',
    ],
    problem:
      'Bystanders at an accident often want to help but do not know what to do in the first minutes, which are frequently the most critical.',
    objective:
      'Explore how AR/VR guidance could turn untrained bystanders into useful first responders while emergency services are alerted.',
    flow: {
      title: 'Design-thinking process',
      steps: [
        { label: 'Empathize' },
        { label: 'Define' },
        { label: 'Prototype' },
        { label: 'Test' },
      ],
    },
    motif: 'vr',
  },
  {
    id: 8,
    slug: 'power-bi-dashboard',
    name: 'Power BI Dashboard',
    title: 'Power BI Dashboard',
    tagline: 'Interactive dashboards that turn raw data into clear visual insight.',
    description:
      'Interactive Power BI dashboards that turn raw data into clear visual insights for analysis and reporting.',
    categories: ['analytics'],
    technologies: ['Power BI'],
    features: ['Data visualization', 'Reporting', 'Interactive dashboards'],
    status: 'Built',
    sections: [
      {
        heading: 'Dataset',
        body: 'Dashboard screenshots and a description of the dataset will be added here. No figures are shown until the real dashboard is uploaded.',
      },
    ],
    motif: 'chart',
  },
  {
    id: 9,
    slug: 'connect-4',
    name: 'Connect 4',
    title: 'Connect 4 Game',
    tagline: 'A two-player game built on object-oriented design and a 2D array.',
    description: 'A two-player Connect 4 game built with object-oriented concepts and two-dimensional arrays.',
    categories: ['programming'],
    technologies: ['Object-oriented programming', '2D arrays'],
    features: ['Two-player turns', 'Board modelled as a 2D array', 'Object-oriented structure'],
    status: 'Built',
    sections: [
      {
        heading: 'Core logic',
        items: [
          'The board is a 6 × 7 two-dimensional array; each cell is empty or holds a player’s piece.',
          'Dropping a piece scans the chosen column from the bottom row upward and places it in the first empty cell.',
          'After each move, the game checks four directions from the new piece — horizontal, vertical and both diagonals — for four in a row.',
          'If the board fills with no winner, the game is a draw.',
        ],
      },
    ],
    motif: 'grid',
  },
  {
    id: 10,
    slug: 'genai-competency-gap',
    name: 'GenAI Dependency Research',
    title: 'Generative AI Dependency and the AI Competency Gap',
    tagline: 'A student research study on what Generative AI use does to learning.',
    description:
      'A team research study examining how Generative AI use may relate to knowledge retention, independent problem-solving and career readiness among higher-education students.',
    categories: ['research'],
    technologies: ['Mixed-method research', 'Questionnaire', 'Knowledge tests', 'Interviews'],
    features: [
      'Mixed-method research design',
      'Questionnaire on Generative AI use',
      'Knowledge tests',
      'Interviews',
    ],
    status: 'In progress',
    context: 'MCA student research project, 2026–27 · team study guided by Ms. Richa Verma.',
    problem:
      'Generative AI tools can produce answers instantly. It is less clear whether students who rely on them retain knowledge and can still solve problems independently.',
    objective:
      'Understand how reliance on Generative AI relates to knowledge retention, independent problem-solving and career readiness — the “AI competency gap”.',
    sections: [
      {
        heading: 'Research question',
        body: 'How does the use of Generative AI tools relate to knowledge retention, independent problem-solving and career readiness among higher-education students?',
      },
      {
        heading: 'Objectives',
        items: [
          'Examine the relationship between Generative AI use and knowledge retention.',
          'Examine its relationship with independent problem-solving.',
          'Explore how it relates to students’ career readiness.',
        ],
      },
      {
        heading: 'Planned methodology',
        items: [
          'Mixed-method design.',
          'Questionnaire on patterns of Generative AI use.',
          'Knowledge tests.',
          'Interviews.',
          'Target sample: 120–200 students (planned, not yet achieved).',
        ],
      },
      {
        heading: 'Findings',
        body: 'This study is ongoing. No results are reported yet — findings will appear here only once the analysis is complete.',
      },
    ],
    motif: 'research',
  },
  // ── Web mini-projects (compact rows) ──────────────────────────────────────
  {
    id: 11,
    slug: 'portfolio-mini',
    name: 'Portfolio',
    title: 'Portfolio (earlier version)',
    tagline: 'An earlier personal portfolio page.',
    description: 'An earlier personal portfolio built with HTML, CSS and JavaScript.',
    categories: ['mini', 'web'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: [],
    status: 'Built',
    githubUrl: `${GH}/portfolio`,
    compact: true,
    motif: 'code',
  },
  {
    id: 12,
    slug: 'ai-resume-page',
    name: 'AI Resume Page',
    title: 'AI Resume Page',
    tagline: 'A resume page built as a web mini-project.',
    description: 'A resume page built with HTML, CSS and JavaScript.',
    categories: ['mini', 'web'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: [],
    status: 'Built',
    githubUrl: `${GH}/Artificial-Intelligence_resume`,
    compact: true,
    motif: 'code',
  },
  {
    id: 13,
    slug: 'calculator',
    name: 'Calculator',
    title: 'Calculator',
    tagline: 'A browser calculator.',
    description: 'A calculator built with HTML, CSS and JavaScript.',
    categories: ['mini', 'web'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: [],
    status: 'Built',
    githubUrl: `${GH}/calculator`,
    compact: true,
    motif: 'code',
  },
  {
    id: 14,
    slug: 'javascript-game',
    name: 'JavaScript Game',
    title: 'JavaScript Game',
    tagline: 'A small browser game.',
    description: 'A browser game written in JavaScript.',
    categories: ['mini', 'web'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: [],
    status: 'Built',
    githubUrl: `${GH}/game_`,
    compact: true,
    motif: 'code',
  },
  {
    id: 15,
    slug: 'webtask',
    name: 'WebTask',
    title: 'WebTask',
    tagline: 'A web task mini-project.',
    description: 'A web mini-project built with HTML, CSS and JavaScript.',
    categories: ['mini', 'web'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: [],
    status: 'Built',
    githubUrl: `${GH}/webtask.github.io`,
    compact: true,
    motif: 'code',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const researchProject = projects.find((p) => p.categories.includes('research'));

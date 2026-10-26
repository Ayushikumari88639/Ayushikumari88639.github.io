// Certificate & training records from the resume.
//
// No certificate files have been added yet, so every record renders as text.
// To attach a file: put it in /public/certificates/ and set
//   file:  'certificates/coding-quiz.pdf'   (PDF or image — opened/downloaded)
//   thumb: 'certificates/coding-quiz.webp'  (optional image preview)
// Only add files you are happy to make public. Never add ID documents.

export type CertGroup = 'Competitions' | 'Training & courses' | 'Internships';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  note?: string;
  group: CertGroup;
  file?: string;
  thumb?: string;
}

export const certifications: Certification[] = [
  {
    id: 'coding-quiz',
    title: 'Online Coding Quiz — Winner’s Certificate (1st Prize)',
    issuer: "Patna Women's College · National Coding Week",
    date: '19 Sep 2026',
    group: 'Competitions',
  },
  {
    id: 'promptathon',
    title: 'Promptathon 5.0 — L5 Master Architect, Rank #2',
    issuer: 'PromptNexus · NexusAI',
    date: 'Sep 2026',
    group: 'Competitions',
  },
  {
    id: 'cdac-drone',
    title: 'Bootcamp on Drone and Allied Technology',
    issuer: 'C-DAC Patna (MeitY, Govt. of India)',
    date: '18–24 Aug 2026',
    note: 'Grade A+',
    group: 'Training & courses',
  },
  {
    id: 'android-course',
    title: 'Android Application Development',
    issuer: "Patna Women's College · Vocational Certificate Course",
    date: 'Mar 2026',
    note: 'A Grade',
    group: 'Training & courses',
  },
  {
    id: 'yisl',
    title: 'Young Innovators STEM Lab (YISL) Workshop — AR/VR',
    issuer: 'IIT Patna · supported by U.S. Dept. of State & IUSSTF',
    date: '1 Sep 2026',
    group: 'Training & courses',
  },
  { id: 'cyber-fundamentals', title: 'Cybersecurity Fundamentals', issuer: '', group: 'Training & courses' },
  { id: 'cyber-bootcamp', title: 'Cybersecurity Bootcamp', issuer: '', group: 'Training & courses' },
  { id: 'powerbi', title: 'Power BI Data Visualization', issuer: '', group: 'Training & courses' },
  { id: 'deo', title: 'Data Entry Operator (DEO)', issuer: '', group: 'Training & courses' },
  { id: 'java-internship', title: 'Java Development Internship', issuer: 'Industry Internship Program', group: 'Internships' },
  { id: 'web-internship', title: 'Web Development Internship', issuer: 'Industry Internship Program', group: 'Internships' },
  { id: 'android-internship', title: 'Android Development Internship', issuer: 'Industry Internship Program', group: 'Internships' },
];

export const getCertificate = (id?: string) => (id ? certifications.find((c) => c.id === id) : undefined);

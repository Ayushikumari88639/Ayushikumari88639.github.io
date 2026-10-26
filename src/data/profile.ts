// Personal details — taken from Ayushi_Kumari_Resume.docx.
// Edit here and every section (hero, contact, footer, meta) updates.

export const profile = {
  name: 'Ayushi Kumari',
  initials: 'AK',
  headline: 'MCA Student · Web Developer · Full-Stack in Progress',
  descriptor: 'MCA student and aspiring full-stack developer building practical web applications.',
  location: 'Jehanabad, Bihar, India',
  email: 'ayushisharma88639@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayushi-kumari-734838308',
  github: 'https://github.com/Ayushikumari88639',
  githubHandle: 'Ayushikumari88639',
  /** Path inside /public. Set to '' to hide every resume button. */
  resumePdf: 'resume/Ayushi_Kumari_Resume.pdf',
  /** Career interest stated in the resume — deliberately not time-bound. */
  careerInterest: 'Seeking web & full-stack development internships',
};

export type NavItem = { id: string; label: string };

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
];

/** Compact, resume-verified facts for the snapshot strip. */
export const snapshot = [
  { value: 'MCA', label: "Patna Women's College", note: '2025 – 2027 · pursuing' },
  { value: '80.2%', label: 'BCA graduate', note: 'First Division' },
  { value: '3', label: 'Technical internships', note: 'Java · Android · Web' },
  { value: '#1', label: 'Online Coding Quiz', note: 'First Prize · 58/60' },
  { value: '#2', label: 'Promptathon 5.0', note: 'Top 3%' },
];

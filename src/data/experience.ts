// Internships exactly as stated in the resume. Organisation and dates are not
// listed there, so none are shown. Add `period` and `certificateId` when
// verified details or certificate files are available.

export interface Experience {
  id: string;
  role: string;
  organisation: string;
  mode?: string;
  period?: string;
  summary: string;
  tags: string[];
  /** Links to an entry in certifications.ts (shown when that file exists). */
  certificateId?: string;
}

export const experience: Experience[] = [
  {
    id: 'java-intern',
    role: 'Java Development Intern',
    organisation: 'Industry Internship Program, India',
    mode: 'Remote',
    summary: 'Built Java applications with MySQL integration as part of a remote development team.',
    tags: ['Java', 'MySQL', 'Remote team'],
    certificateId: 'java-internship',
  },
  {
    id: 'android-intern',
    role: 'Android Development Intern',
    organisation: 'Industry Internship Program, India',
    summary:
      'Identified and fixed user-facing issues in a Women Safety App involving SOS alerts and live-location sharing.',
    tags: ['Android', 'Debugging', 'SOS & location features'],
    certificateId: 'android-internship',
  },
  {
    id: 'web-intern',
    role: 'Web Development Intern',
    organisation: 'Industry Internship Program, India',
    summary: 'Gathered requirements and implemented frontend and functional changes across multiple feedback rounds.',
    tags: ['Requirements', 'Frontend', 'Iteration'],
    certificateId: 'web-internship',
  },
];

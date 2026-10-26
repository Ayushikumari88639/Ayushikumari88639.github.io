// Skills grouped by area. `studied` marks technologies covered in MCA
// coursework but not yet used in a shipped project — kept honest on purpose.

export type Skill = { name: string; studied?: boolean };
export type SkillGroup = { id: string; title: string; summary: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    summary: 'The languages I write projects and coursework in.',
    skills: ['Java', 'Python', 'C', 'C++', 'SQL', 'JavaScript', 'HTML5', 'CSS3'].map((name) => ({ name })),
  },
  {
    id: 'frontend',
    title: 'Frontend',
    summary: 'Interfaces that work on every screen size.',
    skills: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'Bootstrap' },
      { name: 'Responsive UI' },
      { name: 'React.js', studied: true },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    summary: 'Application logic, APIs and access control.',
    skills: [
      { name: 'Python' },
      { name: 'Flask' },
      { name: 'REST APIs' },
      { name: 'JWT authentication' },
      { name: 'Role-based access control' },
      { name: 'Java backend' },
      { name: 'Node.js', studied: true },
      { name: 'Express.js', studied: true },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    summary: 'Designing schemas before writing queries.',
    skills: [
      { name: 'MySQL' },
      { name: 'JDBC' },
      { name: 'Schema design' },
      { name: 'ER modelling' },
      { name: 'Normalization (1NF–BCNF)' },
      { name: 'SQL & PL/SQL' },
    ],
  },
  {
    id: 'security',
    title: 'Computer Vision & Security',
    summary: 'Verifying who a user is, and protecting their data.',
    skills: [
      { name: 'OpenCV' },
      { name: 'face_recognition (dlib)' },
      { name: 'NumPy' },
      { name: 'AES encryption' },
      { name: 'OTP verification' },
      { name: 'QR-code verification' },
      { name: 'Authentication & authorization' },
      { name: 'Cybersecurity fundamentals' },
    ],
  },
  {
    id: 'analytics',
    title: 'Data & AI',
    summary: 'Turning data into something people can read.',
    skills: [
      { name: 'Power BI' },
      { name: 'Data visualization' },
      { name: 'Prompt engineering' },
      { name: 'Pandas', studied: true },
      { name: 'Matplotlib', studied: true },
      { name: 'scikit-learn', studied: true },
      { name: 'TensorFlow / Keras', studied: true },
      { name: 'Tableau', studied: true },
      { name: 'Excel', studied: true },
      { name: 'R', studied: true },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile & Emerging Tech',
    summary: 'Beyond the browser.',
    skills: [
      { name: 'Android development' },
      { name: 'Drone & allied technology (C-DAC bootcamp)' },
      { name: 'AR/VR fundamentals — WebXR, A-Frame' },
      { name: 'Stanford Design Thinking' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    summary: 'Everyday development workflow.',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Anaconda / Conda'].map((name) => ({ name })),
  },
];

export const fundamentals = [
  'Object-oriented programming',
  'Data structures & algorithms',
  'Software engineering (SDLC, UML, testing)',
  'Computer networks',
];

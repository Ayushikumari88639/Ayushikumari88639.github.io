// Competitive results are `highlight: true`; training and workshops are
// labelled as such so participation is never presented as a prize.

export interface Achievement {
  id: string;
  mark: string;
  kind: string;
  title: string;
  organiser: string;
  date: string;
  details: string[];
  highlight?: boolean;
  certificateId?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'coding-quiz',
    mark: '#1',
    kind: 'First Prize · Competition',
    title: 'Online Coding Quiz',
    organiser: "National Coding Week 2026 · Dept. of Computer Applications, Patna Women's College",
    date: '19 September 2026',
    details: [
      'Scored 58/60 (97%) — Rank #1 on the SkillNexus platform',
      'Questions on C pointers, memory management and debugging',
      'Received the winner’s certificate',
    ],
    highlight: true,
    certificateId: 'coding-quiz',
  },
  {
    id: 'promptathon',
    mark: '#2',
    kind: 'Rank #2 · Top 3%',
    title: 'Promptathon 5.0',
    organiser: 'PromptNexus · NexusAI',
    date: 'September 2026',
    details: [
      'L5 Master Architect in Narrative & Storytelling AI',
      '100 PNXP · 85% domain score',
      'Special recognition for “Speed Sync”',
    ],
    highlight: true,
    certificateId: 'promptathon',
  },
  {
    id: 'cdac',
    mark: 'A+',
    kind: 'Bootcamp · Grade A+',
    title: 'Drone & Allied Technology Bootcamp',
    organiser: 'C-DAC Patna · MeitY project SwaYaan',
    date: 'August 2026',
    details: ['Completed with Grade A+'],
    certificateId: 'cdac-drone',
  },
  {
    id: 'android-course',
    mark: 'A',
    kind: 'Certificate course · A Grade',
    title: 'Android Application Development',
    organiser: "Patna Women's College · Vocational certificate course (6 credits)",
    date: 'March 2026',
    details: ['Completed with A Grade'],
    certificateId: 'android-course',
  },
  {
    id: 'yisl',
    mark: 'XR',
    kind: 'Workshop · Participation',
    title: 'Young Innovators STEM Lab — AR/VR',
    organiser: 'IIT Patna',
    date: 'September 2026',
    details: ['Exposure to WebXR, A-Frame, Meta Quest and Stanford Design Thinking', 'Team pitch: LifeBridge'],
    certificateId: 'yisl',
  },
  {
    id: 'hackathon',
    mark: 'H',
    kind: 'Hackathon · Participant',
    title: 'SurakshaCheck',
    organiser: 'Hackathon project',
    date: '',
    details: ['Built a scam/fraud verification tool (website + WhatsApp chatbot) for elderly citizens'],
  },
];

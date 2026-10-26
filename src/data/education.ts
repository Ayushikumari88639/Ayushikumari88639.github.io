export interface Education {
  degree: string;
  institution: string;
  period: string;
  result: string;
  current?: boolean;
}

export const education: Education[] = [
  {
    degree: 'MCA',
    institution: "Patna Women's College (Autonomous), Patna University",
    period: '2025 – 2027',
    result: 'Pursuing',
    current: true,
  },
  { degree: 'BCA', institution: 'Satyanarayan Sinha College', period: '2021 – 2024', result: '80.2% · First Division' },
  { degree: 'Intermediate', institution: 'Swami Sahajanand College', period: '2019 – 2021', result: '75.8% · First Division' },
  { degree: 'Matriculation', institution: 'Manas International School', period: '2019', result: '70.8% · First Division' },
];

export const coursework = [
  {
    term: 'Semester I',
    subjects: [
      'Software Engineering',
      'Advanced DBMS (SQL, PL/SQL, normalization, transactions)',
      'Design & Analysis of Algorithms',
      'Data Communications & Computer Networks',
      'Python Programming (OOP, NumPy, Pandas, Flask)',
      'Data Visualization (Tableau / Power BI)',
    ],
  },
  {
    term: 'Semester II',
    subjects: [
      'UI/UX Designing & API Development (React.js, Node.js, Express.js, REST, JWT/OAuth)',
      'Data & Web Mining',
      'AI & Machine Learning',
      'Optimization Techniques',
      'Statistical Analysis using R',
      'Mini Project I',
    ],
  },
  {
    term: 'Semester III · current',
    subjects: [
      'Advanced Web Designing using J2EE (Servlets, JSP, JDBC, MVC)',
      'Cloud Computing',
      'Big Data Analytics (Hadoop, HDFS, MapReduce, NoSQL)',
      'Digital Marketing & E-Commerce',
      'Mini Project II',
    ],
  },
];

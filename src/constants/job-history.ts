import moment from 'moment';

export interface JobHistory {
  readonly current: boolean;
  readonly company: string;
  readonly website: string;
  readonly title: string;
  readonly subtitle?: any;
  readonly startDate: Date;
  readonly endDate?: Date;
  readonly projects: string[];
  readonly technologies: string[];
}

export const jobHistory: JobHistory[] = [
  {
    current: false,
    company: 'Bufete de Tecnología y Soluciones Avanzadas',
    website: 'https://www.bts.com.mx/',
    title: 'Lead Developer - Fullstack',
    subtitle: null,
    startDate: moment('05/01/2014', 'DD/MM/YYYY').toDate(),
    endDate: moment('01/08/2017', 'DD/MM/YYYY').toDate(),
    projects: [
      'Public Registry of Property Core Product, used in many states in Mexico for managing property of citizens.',
      'JusticiaOne, application for building applications related with goverment documents.',
    ],
    technologies: [
      'ExtJs Framework',
      'JavaScript',
      'CSS',
      'HTML',
      'NodeJs',
      'C#',
      'OracleSql',
      'MsSql',
    ],
  },
  {
    current: false,
    company: 'Sonatafy',
    website: 'https://sonatafy.com/',
    title: 'Frontend Developer',
    subtitle: null,
    startDate: moment('01/08/2017', 'DD/MM/YYYY').toDate(),
    endDate: moment('2019', 'YYYY').toDate(),
    projects: [
      'Application for reporting city issues such as failures or damages in Tijuana.',
    ],
    technologies: ['AngularJs', 'JavaScript', 'CSS', 'HTML'],
  },
  {
    current: false,
    company: 'Parallel 6/PRA Health Sciences',
    website: 'https://prahs.com/',
    title: 'Software Engineer',
    subtitle: 'Frontend Developer',
    startDate: moment('01/08/2017', 'DD/MM/YYYY').toDate(),
    endDate: moment('22/01/2019', 'DD/MM/YYYY').toDate(),
    projects: [
      'Multiple clinical trial applications.',
      'Core components library.',
      'Application generator CLI tool, to generate different projects based on arguments.',
    ],
    technologies: ['TypeScript', 'Angular', 'NodeJs', 'Yeoman', 'HTML', 'CSS'],
  },
  {
    current: true,
    company: 'Semantic AI',
    website: 'https://www.semantic-ai.com/',
    title: 'Sr. Software Engineer',
    subtitle: 'Frontend Developer',
    startDate: moment('23/01/2019', 'DD/MM/YYYY').toDate(),
    endDate: null,
    projects: [
      'Main web application for data analysis.',
      'Other assigned web projects.',
    ],
    technologies: [
      'TypeScript',
      'Angular',
      'React',
      'NodeJs',
      'Java',
      'Docker',
    ],
  },
];

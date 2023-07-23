import moment from 'moment';

export interface JobHistory {
  readonly current: boolean;
  readonly company: string;
  readonly website: string;
  readonly title: string;
  readonly subtitle?: any;
  readonly startDate: Date;
  readonly endDate?: Date;
}

export const jobHistory: JobHistory[] = [
  {
    current: false,
    company: 'Bufete de Tecnología y Soluciones Avanzadas',
    website: 'https://www.bts.com.mx/',
    title: 'Lead Developer',
    subtitle: null,
    startDate: moment('05/01/2014', 'DD/MM/YYYY').toDate(),
    endDate: moment('01/08/2017', 'DD/MM/YYYY').toDate(),
  },
  {
    current: false,
    company: 'Sonata Services',
    website: 'https://sonataservices.com/',
    title: 'Javascript Developer',
    subtitle: null,
    startDate: moment('01/08/2017', 'DD/MM/YYYY').toDate(),
    endDate: moment('2019', 'YYYY').toDate(),
  },
  {
    current: false,
    company: 'Parallel 6/PRA Health Sciences',
    website: 'https://prahs.com/',
    title: 'Software Engineer',
    subtitle: 'Frontend Developer',
    startDate: moment('01/08/2017', 'DD/MM/YYYY').toDate(),
    endDate: moment('22/01/2019', 'DD/MM/YYYY').toDate(),
  },
  {
    current: true,
    company: 'Semantic AI',
    website: 'https://www.semantic-ai.com/',
    title: 'Sr. Software Engineer',
    subtitle: 'Frontend Developer',
    startDate: moment('23/01/2019', 'DD/MM/YYYY').toDate(),
    endDate: null,
  },
];

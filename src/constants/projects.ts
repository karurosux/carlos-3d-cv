export interface Project {
  readonly name: string;
  readonly company: string;
  readonly detail: string;
  readonly year: number;
}

export const projects: Project[] = [
  {
    name: 'Public Registry of the Property of Chihuahua',
    company: 'Bufete de Tecnología y Soluciones Avanzadas',
    detail: 'Developed System Modules using ExtJs and C# for the backend.',
    year: 2014,
  },
  {
    name: 'BTS ONE',
    company: 'Bufete de Tecnología y Soluciones Avanzadas',
    detail:
      'Lead Developer of Front End cell, development of some modules, such as form creator.',
    year: 2016,
  },
  {
    name: 'myDNA System',
    company: 'myDNA Thailand',
    detail:
      'Developed the entire System using Angular, AngularJs, PHP and NodeJs.',
    year: 2016,
  },
  {
    name: 'LEO Pharma Clinical Trial System',
    company: 'Parallel 6',
    detail: 'Partially developed frontend application using Angular.',
    year: 2017,
  },
  {
    name: 'Sanofi Clinical Trial System',
    company: 'Parallel 6',
    detail: 'Partially developed frontend application using Angular.',
    year: 2017,
  },
  {
    name: 'NIH eyeGENE Clinical Trial System',
    company: 'Parallel 6',
    detail: 'Partially developed frontend application using Angular.',
    year: 2018,
  },
  {
    name: 'Core System',
    company: 'Parallel 6',
    detail:
      'Partially developed frontend application and library using Angular.',
    year: 2018,
  },
];

export interface Education {
  readonly place: string;
  readonly title: string;
  readonly website: string;
  readonly achievements: string[];
}

export const education: Education[] = [
  {
    place: 'Universidad Politécnica de Baja California',
    title: 'Information Technologies Engineer',
    website: 'http://www.upbc.edu.mx/',
    achievements: [
      '3rd Place in Engineering Contest with Educational Game.',
      '1st Place in Engineering Contest with Improved Educational Game.',
    ],
  },
  {
    place: 'Microsoft Virtual Academy',
    title: 'Programming in HTML5 with JavaScript and CSS3',
    website: 'https://mva.microsoft.com/',
    achievements: [],
  },
];

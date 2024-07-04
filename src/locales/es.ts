import {Language} from './en';

export const es: Language = {
  name: 'Español',
  general: {
    menu: 'Menú',
    controls: 'Controles',
    movement: 'Movimiento',
    place: 'Lugar',
    contact: 'Contacto',
    education: 'Educación',
    projects: 'Proyectos',
    technologies: 'Tecnologías',
    current: 'Actual',
    company: 'Compañía',
    website: 'Sitio Web',
    today: 'Hoy',
    interact: 'Interacción',
    general: 'General',
    exit: 'Salir',
  },
  interactionText: 'Presiona {{iconHere}} para interactuar',
  continuationText: 'Presiona {{iconHere}} para continuar',
  togglePostProcess: 'Alternar Post Processing',
  jobHistory: {title: 'Historial de Trabajo'},
  generalInformation: {
    title: 'Informacion General',
    message:
      'Me llamo {{firstName}} {{lastName}}, pero puedes llamarme {{nickName}}, Soy un {{currentTitle}} y trabajo como {{currentRole}} en {{currentCompany}}. Soy de {{birthPlace}}, actualmente viviendo en {{currentLocation}} a la espera de nuevas aventuras.',
  },
  indications: {
    general:
      'Intenta interactuar con los objetos de la escena, especialmente el escritorio del computador, ahí encontraras información acerca de mí.',
    spaceBarMessage: 'Usa la BARRA ESPACIADORA para interactuar.',
  },
  introDialog: {
    line1: 'Hola!',
    line2: 'Bienvenido a mi sitio personal.',
    line3: 'Me llamo {{firstName}} {{lastName}}.',
    line4:
      'Adelante, explora mi espacio y siéntete libre de interactuar con el entorno.',
  },
  shelveDialog: {
    line1: 'Hay muchas cosas...',
    line2: 'Bueno, es solo un buro.',
  },
  desktopDialog: {
    line1: 'Interesante...',
    line2: 'Hay un menú en la pantalla, habra que explorarlo.',
  },
  thrashDialog: {line1: 'Solo algunas envolturas y latas de monster.'},
  dateFormats: {short: 'MMM YYYY'},
};

export const en = {
  name: 'English',
  general: {
    menu: 'Menu',
    controls: 'Controls',
    movement: 'Movement',
    place: 'Place',
    contact: 'Contact',
    education: 'Education',
    projects: 'Projects',
    technologies: 'Technologies',
    current: 'Current',
    company: 'Company',
    website: 'Website',
    today: 'Today',
    interact: 'Interact',
    general: 'General',
    exit: 'Exit',
  },
  interactionText: 'Press {{iconHere}} to interact',
  continuationText: 'Press {{iconHere}} to continue',
  togglePostProcess: 'Toggle Post Process',
  jobHistory: {
    title: 'Job History',
  },
  generalInformation: {
    title: 'General Information',
    message:
      'My name is {{firstName}} {{lastName}} and you can call me {{nickName}}, I am a {{currentTitle}} who currently work mostly as a {{currentRole}} <a className="underline" target="_blank" href="{{currentCompanyWebsite}}">{{currentCompany}}</a>.</br></br><span className="inline-block mt-8">I am from {{birthPlace}}, currently living at {{currentLocation}} waiting for new adventures.</span>',
  },
  indications: {
    general:
      'Try to interact with the objects, specially computer desk, you can find info about me there.',
    spaceBarMessage: 'Use the SPACE BAR to interact.',
  },
  introDialog: {
    line1: 'Hey!',
    line2: 'Welcome to my personal website.',
    line3: 'My name is {{firstName}} {{lastName}}.',
    line4: 'Feel free to explore my space.',
  },
  shelveDialog: {
    line1: 'A lot of stuff here...',
    line2: 'This is my shelve.',
  },
  desktopDialog: {
    line1: 'Mmmm...',
    line2: 'There is a menu on the screen.',
  },
  thrashDialog: {
    line1: 'Just a bunch of monster cans and snack packages.',
  },
  dateFormats: {
    short: 'MMM YYYY',
  },
};

export type Language = typeof en;

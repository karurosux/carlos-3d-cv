import {MenuSelection} from '../models/menu-selection';
import {Contact} from './Contact';
import {Education} from './Education';
import {Exit} from './Exit';
import {GeneralInformation} from './GeneralInformation';
import {JobHistory} from './JobHistory';

export const computerMenuViewMap: Partial<
  Record<MenuSelection, React.ElementType>
> = {
  general: GeneralInformation,
  education: Education,
  'job-history': JobHistory,
  contact: Contact,
  exit: Exit,
};

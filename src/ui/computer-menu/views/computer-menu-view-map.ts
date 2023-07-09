import {MenuSelection} from '../models/menu-selection';
import {Achievements} from './Achievements';
import {GeneralInformation} from './GeneralInformation';
import {JobHistory} from './JobHistory';

export const computerMenuViewMap: Partial<
  Record<MenuSelection, React.ElementType>
> = {
  general: GeneralInformation,
  'job-history': JobHistory,
  achievements: Achievements,
};

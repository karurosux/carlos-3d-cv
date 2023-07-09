import {MenuSelection} from './menu-selection';

export type MenuOption = {
  label: string;
  value: MenuSelection;
  action?: (value: MenuSelection) => void;
};

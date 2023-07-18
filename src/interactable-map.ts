import { GameStateConstructor } from './game-state/game-state-constructor';
import {GameStateContext} from './game-state/game-state-context';
import {ShowComputerMenuState} from './game-state/states/show-computer-menu-state';

export interface InteractableActionBase {
  type: 'dialog' | 'callback' | 'state';
}

export interface InteractableDialogAction extends InteractableActionBase {
  type: 'dialog';
  lines: string[];
}

export interface InteractableCallbackAction extends InteractableActionBase {
  type: 'callback';
  callback: (context: GameStateContext) => void;
}

export interface InteractableStateAction {
  type: 'state';
  data: any;
  state: GameStateConstructor;
}

export type InteractableAction =
  | InteractableDialogAction
  | InteractableCallbackAction
  | InteractableStateAction;

export const interactableMap: Record<string, InteractableAction> = {
  'lamp-collider': {
    type: 'callback',
    callback: (context) => {
      context.room.toggleLight();
    },
  },
  'shelve-collider': {
    type: 'dialog',
    lines: ['A lot of stuff here...', 'This is my shelve.'],
  },
  'desktop-collider': {
    type: 'state',
    state: ShowComputerMenuState,
    data: ['Mmmm...', 'There is a menu on the screen.'],
  },
  'thrash-collider': {
    type: 'dialog',
    lines: ['Just a bunch of monster cans and snack packages.'],
  },
};

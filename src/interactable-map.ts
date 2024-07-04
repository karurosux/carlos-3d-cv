import {GameStateConstructor} from './game-state/game-state-constructor';
import {GameStateContext} from './game-state/game-state-context';
import {ShowComputerMenuState} from './game-state/states/show-computer-menu-state';
import {AudioEffects} from './utils/audio-effects';

export interface InteractableActionBase {
  type: 'dialog' | 'callback' | 'state';
}

export type InteractableComplexLine = {
  context: any;
  key: string;
};

export interface InteractableDialogAction extends InteractableActionBase {
  type: 'dialog';
  lines: (string | InteractableComplexLine)[];
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
    lines: ['shelveDialog.line1', 'shelveDialog.line2'],
  },
  'desktop-collider': {
    type: 'state',
    state: ShowComputerMenuState,
    data: ['desktopDialog.line1', 'desktopDialog.line2'],
  },
  'thrash-collider': {
    type: 'dialog',
    lines: ['thrashDialog.line1'],
  },
  'left-wall-collider': {
    type: 'callback',
    callback: () => {
      AudioEffects.play('lockedDoor');
    },
  },
};

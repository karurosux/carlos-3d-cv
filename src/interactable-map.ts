import {GameStateContext} from './game-state/game-state-context';

export interface InteractableActionBase {
  type: 'dialog' | 'callback';
}

export interface InteractableDialogAction extends InteractableActionBase {
  type: 'dialog';
  lines: string[];
}

export interface InteractableCallbackAction extends InteractableActionBase {
  type: 'callback';
  callback: (context: GameStateContext) => void;
}

export type InteractableAction =
  | InteractableDialogAction
  | InteractableCallbackAction;

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
    type: 'dialog',
    lines: [
      'This is the place where I work...',
      'All the magic happens here.',
      'Including this space!',
    ],
  },
  'thrash-collider': {
    type: 'dialog',
    lines: ['Just a bunch of monster cans and snack packages.'],
  },
};

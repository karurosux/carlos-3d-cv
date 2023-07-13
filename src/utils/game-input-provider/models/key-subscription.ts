import {GameInput} from './game-input';

export type KeySubscription = {
  id: string;
  valid: (input: GameInput) => boolean;
  callback: () => void;
};

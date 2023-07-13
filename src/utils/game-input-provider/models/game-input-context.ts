import {GameInput} from './game-input';
import {KeySubscription} from './key-subscription';

export interface GameInputContext {
  getInput: () => GameInput;
  subscribeKey: (
    valid: KeySubscription['valid'],
    callback: KeySubscription['callback']
  ) => Function;
}

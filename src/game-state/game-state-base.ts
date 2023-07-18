import {RootState} from '@react-three/fiber';
import {GameStateContext} from './game-state-context';

export abstract class GameStateBase<T = any> {
  constructor(protected context: GameStateContext, protected data?: T) {}

  abstract frame(state: RootState, delta: number, frame?: any): void;

  init?(): void;
  unmount?(): void;
  action?(): void;
}

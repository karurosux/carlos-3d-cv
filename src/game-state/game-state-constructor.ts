import {GameStateBase} from './game-state-base';

export type GameStateConstructor<T = any> = {
  new (context: T, data?: any): GameStateBase;
};

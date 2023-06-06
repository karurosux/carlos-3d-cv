import { RootState } from "@react-three/fiber";
import { GameStateContext } from "./game-state-context";

export type GameStateConstructor = {
  new (context: GameStateContext): GameStateBase;
};

export abstract class GameStateBase {
  constructor(protected context: GameStateContext) {}

  abstract frame(state: RootState, delta: number, frame?: any): void;

  init?(): void;
  unmount?(): void;
  action?(): void;
}

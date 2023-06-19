import * as THREE from "three";
import { CharaterRef } from "../actors/Character";
import { GameStateConstructor } from "./game-state-base";

export interface GameStateContext {
  character: CharaterRef;
  getKeys: () => Record<string, boolean>;
  subscribeKey: (
    keys: (keys: Record<string, boolean>) => boolean,
    callback: (down: boolean) => void
  ) => void;
  setCameraOffset: (offset: THREE.Vector3) => void;
  setGameState: (state: GameStateConstructor, data?: any) => void;
}

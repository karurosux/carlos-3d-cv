import * as THREE from "three";
import { CharaterRef } from "../actors/Character";
import { GameStateConstructor } from "./game-state-base";
import { RoomRef } from "../actors/Room";

export interface GameStateContext {
  character: CharaterRef;
  room: RoomRef;
  getKeys: () => Record<string, boolean>;
  subscribeKey: (
    keys: (keys: Record<string, boolean>) => boolean,
    callback: (down: boolean) => void
  ) => void;
  setCameraOffset: (offset: THREE.Vector3) => void;
  setGameState: (state: GameStateConstructor, data?: any) => void;
}

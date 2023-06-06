import { RootState } from "@react-three/fiber";
import { GameStateBase } from "../game-state-base";
import * as THREE from "three";

export class PlayableState extends GameStateBase {
  init() {
    this.context.setCameraOffset(new THREE.Vector3(0, 8, 10));
  }

  action() {
    this.context.character.interact();
  }

  frame(_: RootState, delta: number): void {
    this.context.character.checkMovement(delta);
  }
}

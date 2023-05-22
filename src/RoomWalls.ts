import * as THREE from "three"
import {GLTFModelHandler} from "./GLTFModelHandler"

export class RoomWalls extends GLTFModelHandler {
  constructor(private scene: THREE.Scene) {
    super("CVRoom.gltf")
  }

  init(): void {
    this.model.position.y = 0.23
    this.scene.add(this.model)
  }
}

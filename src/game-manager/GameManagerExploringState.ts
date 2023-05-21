import {GameManagerBaseState} from "./GameManagerBaseState"
import * as THREE from "three"

export class GameManagerExploringState extends GameManagerBaseState {
  init() {
    this.context.cameraManager.cameraOffset = new THREE.Vector3(0, 4, 5)
  }

  tick(): void {
    this.context.cameraManager.followCharacter(this.context.character)

    this.performMovement()
  }

  private performMovement() {
    const {xAxis, zAxis} = this.context.inputManager.getMovementAxis()
    this.context.character.performMovement(xAxis, zAxis)
  }
}

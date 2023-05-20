import { GameManagerBaseState } from "./GameManagerBaseState";
import * as THREE from "three"

export class GameManagerExploringState extends GameManagerBaseState {

    init() {
        this.context.cameraManager.cameraOffset = new THREE.Vector3(0, 4, 5)
    }

    tick(): void {
        this.context.cameraManager.followCharacter(this.context.character)

        this.performMovement();
    }

    private performMovement() {
        if (!this.context.inputManager.isPressingAnyKey()) {
            // No need to continue if nothing is being pressed.
            this.context.character.stopMovement()
            return
        }

        if (this.context.inputManager.keypress['KeyW']) {
            this.context.character.moveUp()
        } else if (this.context.inputManager.keypress['KeyS']) {
            this.context.character.moveDown()
        }
        if (this.context.inputManager.keypress['KeyA']) {
            this.context.character.moveLeft()
        } else if (this.context.inputManager.keypress['KeyD']) {
            this.context.character.moveRight()
        }
    }
}
import { GameManagerBaseState } from "./GameManagerBaseState";

export class GameManagerDefaultState extends GameManagerBaseState {
    tick(): void {
        if (!this.context.character.loaded) {
            return
        }
        this.context.cameraManager.followCharacter(this.context.character)

        if (this.context.inputManager.keypress['KeyW']) {
            this.context.character.moveUp()
        }
        if (this.context.inputManager.keypress['KeyS']) {
            this.context.character.moveDown()
        }
        if (this.context.inputManager.keypress['KeyA']) {
            this.context.character.moveLeft()
        }
        if (this.context.inputManager.keypress['KeyD']) {
            this.context.character.moveRight()
        }

        if (this.context.inputManager.singlePress("Space")) {
            console.log("SPACE PRESSED")
        }
    }
}
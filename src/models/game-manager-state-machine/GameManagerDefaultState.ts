import { PersonInformation } from "../../constants/PersonInformation";
import { GameManagerBaseState } from "./GameManagerBaseState";

export class GameManagerDefaultState extends GameManagerBaseState {
    init() {
        this.context.textLineManager.setTextLines([
            "Hey there!",
            "Welcome to my personal website.",
            `My name is <b>${PersonInformation.FULL_NAME}</b>, nice to meet you!`,
            "Feel free to explore my space."
        ]);
    }

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
            this.context.textLineManager.nextLine()
        }
    }
}
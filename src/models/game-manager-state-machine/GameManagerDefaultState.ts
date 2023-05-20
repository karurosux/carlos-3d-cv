import { PersonInformation } from "../../constants/PersonInformation";
import { DialogTextLinesManager } from "../../dialog-system/DialogTextLinesManager";
import { GameManagerBaseState } from "./GameManagerBaseState";
import { GameManagerExploringState } from "./GameManagerExploringState";

export class GameManagerDefaultState extends GameManagerBaseState {
    init() {
        this.context.textLineManager.setTextLines([
            "Hey there!",
            "Welcome to my personal website.",
            `My name is ${PersonInformation.FULL_NAME}, nice to meet you!`,
            "Feel free to explore my space."
        ]);

        DialogTextLinesManager.onTextLinesFinish.push(() => {
            this.context.setState(GameManagerExploringState)
        });
    }

    detach() {
        DialogTextLinesManager.onTextLinesFinish.pop();
    }

    tick(): void {
        if (!this.context.character.loaded) {
            return
        }
        this.context.cameraManager.followCharacter(this.context.character)

        if (this.context.inputManager.singlePress("Space")) {
            this.context.textLineManager.nextLine()
        }
    }
}
import { DialogBoxController } from "../../ui/dialog-box/DialogBoxController";
import { GameStateBase } from "../game-state-base";
import { PlayableState } from "./playable-state";

export class InitialState extends GameStateBase {
  init(): void {
    DialogBoxController.onAfterLastLine =
      this.afterLastTextLineHandle.bind(this);
    DialogBoxController.setTextLines([
      "Hey!",
      "Welcome to my personal website.",
      "My name is Carlos Gonzalez.",
    ]);
  }

  action() {
    DialogBoxController.nextLine();
  }

  unmount() {
    DialogBoxController.onAfterLastLine = null;
  }

  frame(): void {}

  afterLastTextLineHandle() {
    this.context.setGameState(PlayableState);
  }
}

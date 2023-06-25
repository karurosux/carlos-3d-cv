import { DialogBoxController } from "../../ui/dialog-box/DialogBoxController";
import { InteractionTextController } from "../../ui/interaction-text/InteractionTextController";
import { GameStateBase } from "../game-state-base";
import { PlayableState } from "./playable-state";

export class ShowDialogState extends GameStateBase<string[]> {
  init(): void {
    InteractionTextController.showInteractionText(false);
    DialogBoxController.onAfterLastLine =
      this.afterLastTextLineHandle.bind(this);
    DialogBoxController.setTextLines(this.data);
    this.context.character?.startIdleAnim();
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

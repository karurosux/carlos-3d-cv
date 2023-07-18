import {DialogBoxController} from '../../ui/dialog-box/dialog-box-controller';
import {InteractionTextController} from '../../ui/interaction-text/interaction-text-controller';
import {GameStateBase} from '../game-state-base';

export abstract class ShowDialogBaseState extends GameStateBase<string[]> {
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

  abstract afterLastTextLineHandle(): void;
}

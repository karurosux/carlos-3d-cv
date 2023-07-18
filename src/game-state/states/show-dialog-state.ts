import {PlayableState} from './playable-state';
import {ShowDialogBaseState} from './show-dialog-base-state';

export class ShowDialogState extends ShowDialogBaseState {
  afterLastTextLineHandle(): void {
    this.context.setGameState(PlayableState);
  }
}

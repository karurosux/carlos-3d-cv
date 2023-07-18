import {ComputerMenuManager} from '../../ui/computer-menu/computer-menu-manager';
import {PlayableState} from './playable-state';
import {ShowDialogBaseState} from './show-dialog-base-state';

export class ShowComputerMenuState extends ShowDialogBaseState {
  override init() {
    super.init();
    ComputerMenuManager.onComputerMenuExit = () => {
      this.context.setGameState(PlayableState);
    };
  }

  override unmount() {
    super.unmount();
    ComputerMenuManager.onComputerMenuExit = null;
  }
  afterLastTextLineHandle(): void {
    ComputerMenuManager.openComputerMenu();
  }
}

import {ComputerMenuManager} from '../../ui/computer-menu/computer-menu-manager';
import {PlayableState} from './playable-state';
import {ShowDialogBaseState} from './show-dialog-base-state';
import * as THREE from 'three';

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
    this.context.character.setTempCameraTarget(null);
    this.context.character.setTempCameraOffset(null);
  }

  override afterLastTextLineHandle(): void {
    ComputerMenuManager.openComputerMenu();
    this.context.character.setTempCameraTarget(
      this.context.room.findRoomObject('monitor')
    );
    this.context.character.setTempCameraOffset(new THREE.Vector3(1, 0, 1));
  }
}

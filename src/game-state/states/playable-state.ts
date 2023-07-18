import {RootState} from '@react-three/fiber';
import {GameStateBase} from '../game-state-base';
import * as THREE from 'three';
import {InteractionTextController} from '../../ui/interaction-text/interaction-text-controller';
import {InteractableAction, interactableMap} from '../../interactable-map';
import {ShowDialogState} from './show-dialog-state';

export class PlayableState extends GameStateBase {
  init() {
    this.context.setCameraOffset(new THREE.Vector3(0, 8, 10));
  }

  action() {
    const interactableAction = this.getInteractable();
    if (interactableAction) {
      switch (interactableAction.type) {
        case 'dialog':
          this.context.setGameState(ShowDialogState, interactableAction.lines);
          break;
        case 'state':
          this.context.setGameState(
            interactableAction.state,
            interactableAction.data
          );
          break;
        case 'callback':
          interactableAction.callback(this.context);
          break;
      }
    }
  }

  frame(_: RootState, delta: number): void {
    InteractionTextController.showInteractionText(
      this.isColldingInteractable()
    );
    this.context.character.checkMovement(delta);
  }

  private getInteractable(): InteractableAction {
    const colliding = this.context.character.colliding();
    return colliding && interactableMap[colliding.name];
  }

  private isColldingInteractable() {
    return !!this.getInteractable();
  }
}

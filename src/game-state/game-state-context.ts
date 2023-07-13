import * as THREE from 'three';
import {CharaterRef} from '../actors/Character';
import {GameStateConstructor} from './game-state-base';
import {RoomRef} from '../actors/Room';
import {GameInputContext} from '../utils/game-input-provider/models/game-input-context';

export interface GameStateContext {
  character: CharaterRef;
  room: RoomRef;
  getKeys: GameInputContext['getInput'];
  subscribeKey: GameInputContext['subscribeKey'];
  setCameraOffset: (offset: THREE.Vector3) => void;
  setGameState: (state: GameStateConstructor, data?: any) => void;
}

import * as THREE from 'three';
import {CharaterRef} from '../actors/Character';
import {RoomRef} from '../actors/Room';
import {GameInputContext} from '../utils/game-input-provider/models/game-input-context';
import {GameStateConstructor} from './game-state-constructor';

export interface GameStateContext {
  character: CharaterRef;
  room: RoomRef;
  getKeys: GameInputContext['getInput'];
  subscribeKey: GameInputContext['subscribeKey'];
  setCameraOffset: (offset: THREE.Vector3) => void;
  setGameState: (state: GameStateConstructor<GameStateContext>, data?: any) => void;
}

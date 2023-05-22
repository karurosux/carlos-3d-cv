import * as THREE from "three"
import {CameraManager} from "../CameraManager"
import {Character} from "../Character"
import {InputManager} from "../InputManager"
import {LightsManager} from "../LightManager"
import {DialogTextLinesManager} from "../dialog-system/DialogTextLinesManager"
import {GameManagerContext} from "./GameManagerContext"
import {
  GameManagerBaseState,
  GameManagerBaseStateCtor,
} from "./GameManagerBaseState"
import {GameManagerDefaultState} from "./GameManagerDefaultState"
import {RoomWalls} from "../RoomWalls"

export class GameManager implements GameManagerContext {
  deltaTime = 0

  readonly character: Character
  readonly cameraManager: CameraManager
  readonly inputManager: InputManager
  readonly lightsManager: LightsManager
  readonly textLineManager: DialogTextLinesManager
  readonly room: RoomWalls

  private currentState: GameManagerBaseState

  constructor(public aspectRatio: number, private scene: THREE.Scene) {
    this.inputManager = new InputManager()
    this.character = new Character(this.scene)
    this.room = new RoomWalls(this.scene)
    this.cameraManager = new CameraManager(this.scene, {
      aspectRatio: this.aspectRatio,
    })
    this.lightsManager = new LightsManager(this.scene)
    this.currentState = new GameManagerDefaultState(this)

    this.textLineManager = new DialogTextLinesManager()
  }

  init() {
    this.currentState.init?.()
  }

  tick() {
    this.currentState?.updateDeltas()
    this.currentState?.callSubTicks()
    this.currentState?.tick()
  }

  getCamera() {
    return this.cameraManager.camera
  }

  setState(clazz: GameManagerBaseStateCtor): void {
    this.currentState?.detach?.()
    this.currentState = new clazz(this)
    this.currentState.init?.()
  }
}

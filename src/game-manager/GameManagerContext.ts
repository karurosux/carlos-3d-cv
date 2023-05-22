import {CameraManager} from "../CameraManager"
import {Character} from "../Character"
import {InputManager} from "../InputManager"
import {LightsManager} from "../LightManager"
import {RoomWalls} from "../RoomWalls"
import {DialogTextLinesManager} from "../dialog-system/DialogTextLinesManager"
import {GameManagerBaseStateCtor} from "./GameManagerBaseState"

export interface GameManagerContext {
  deltaTime: number
  aspectRatio: number
  character: Character
  cameraManager: CameraManager
  inputManager: InputManager
  lightsManager: LightsManager
  textLineManager: DialogTextLinesManager
  room: RoomWalls

  setState(clazz: GameManagerBaseStateCtor): void
}

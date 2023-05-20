import * as THREE from "three";
import { CameraManager } from "./CameraManager";
import { Character } from "./Character";
import { InputManager } from "./InputManager";
import { LightsManager } from "./LightManager";
import { DialogTextLinesManager } from "./dialog-system/DialogTextLinesManager";
import { GameManagerBaseState, GameManagerBaseStateCtor } from "./models/game-manager-state-machine/GameManagerBaseState";
import { GameManagerContext } from "./models/game-manager-state-machine/GameManagerContext";
import { GameManagerDefaultState } from "./models/game-manager-state-machine/GameManagerDefaultState";

export class GameManager implements GameManagerContext {
    deltaTime = 0

    readonly character: Character
    readonly cameraManager: CameraManager
    readonly inputManager: InputManager
    readonly lightsManager: LightsManager
    readonly textLineManager: DialogTextLinesManager

    private currentState: GameManagerBaseState

    constructor(public aspectRatio: number, private scene: THREE.Scene) {
        this.inputManager = new InputManager()
        this.character = new Character(this.scene)
        this.cameraManager = new CameraManager(this.scene, {
            aspectRatio: this.aspectRatio
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
        this.currentState = new clazz(this)
        this.currentState.init?.()
    }
}
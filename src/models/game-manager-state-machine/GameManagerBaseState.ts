import { GameManagerContext } from "./GameManagerContext";

export abstract class GameManagerBaseState {
    constructor(protected context: GameManagerContext) { }

    init?(): void;
    abstract tick(): void

    updateDeltas() {
        this.context.cameraManager.deltaTime = this.context.deltaTime
        this.context.character.deltaTime = this.context.deltaTime
    }

    callSubTicks() {
        this.context.character.tick()
    }
}

export type GameManagerBaseStateCtor = { new(context: GameManagerContext): GameManagerBaseState }
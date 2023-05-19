export class InputManager {
    readonly keypress: Record<string, boolean> = {}

    constructor() {
        this.setupInput()
    }

    private setupInput() {
        window.addEventListener("keydown", this.handleKeyDown.bind(this))
        window.addEventListener("keyup", this.handleKeyUp.bind(this))
    }

    singlePress(code: string) {
        const result = this.keypress[code] || false
        this.keypress[code] = false
        return result
    }

    private handleKeyDown(e: KeyboardEvent) {
        this.keypress[e.code] = true
    }

    private handleKeyUp(e: KeyboardEvent) {
        this.keypress[e.code] = false
    }
}
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

  getMovementAxis() {
    const xAxis = this.keypress["KeyD"] ? 1 : this.keypress["KeyA"] ? -1 : 0
    const zAxis = this.keypress["KeyS"] ? 1 : this.keypress["KeyW"] ? -1 : 0
    return {xAxis, zAxis}
  }

  isPressingAnyKey() {
    return Object.values(this.keypress).some((val) => val)
  }

  private handleKeyDown(e: KeyboardEvent) {
    this.keypress[e.code] = true
  }

  private handleKeyUp(e: KeyboardEvent) {
    this.keypress[e.code] = false
  }
}

export class DialogTextLinesManager {
    currentIndex = 0
    textLines: string[] = []

    // Events
    static onTextLineChange: ((textLine: string) => void)[] = []
    
    // Global States
    static renderingText = false

    get isShowingText() {
        return this.textLines.length && this.currentIndex > 0
    }

    setTextLines(textLines: string[]) {
        this.currentIndex = 0
        this.textLines = textLines
        this.nextLine();
    }

    nextLine() {
        if (!this.textLines.length || DialogTextLinesManager.renderingText) {
            return
        }
        const textLine = this.textLines[this.currentIndex++] || ''
        DialogTextLinesManager.onTextLineChange.forEach(callback => callback(textLine))
    }
}

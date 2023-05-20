export class DialogTextLinesManager {
    currentIndex = 0
    textLines: string[] = []

    // Events
    onTextLineChange!: ((textLine: string) => void)

    get isShowingText() {
        return this.textLines.length && this.currentIndex > 0
    }

    setTextLines(textLines: string[]) {
        this.currentIndex = 0
        this.textLines = textLines
        this.nextLine();
    }

    nextLine() {
        if (!this.textLines.length || !this.onTextLineChange) {
            return
        }
        const textLine = this.textLines[this.currentIndex++] || ''
        this.onTextLineChange(textLine)
    }
}

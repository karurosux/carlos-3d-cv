import { debounce } from "lodash"
import { useCallback, useEffect, useRef, useState } from "react"
import { DialogTextLinesManager } from "./DialogTextLinesManager"
import { Container } from "../ui/Container"

export function DialogBox() {
    const [textLine, setTextLine] = useState("")
    const textWrapper = useRef<HTMLSpanElement>(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const typewriterCallback = useCallback(
        debounce(typewriter, 300),
        [textLine, textWrapper, typewriter]
    );

    useEffect(() => {
        DialogTextLinesManager.onTextLineChange.push(setTextLine)
    }, [])

    useEffect(() => {
        setTextWrapperText("")
        typewriterCallback()
    }, [textLine, typewriterCallback, textWrapper])

    if (!textLine) {
        return <></>
    }

    return (
        <>
            <Container className="fixed bottom-14 left-6 right-6 text-6xl min-h-[40%]">
                <span ref={textWrapper} className="text-wrapper" />
                <i className="ri-arrow-down-s-fill absolute right-4 bottom-1 animate-pulse animate-bounce" />
            </Container>
            <span className="z-10 fixed bottom-4 animate-pulse select-none text-white left-4 text-2xl right-4 text-center">Press <i className="ri-space" /> to continue.</span>
        </>
    )

    function typewriter(i = 0) {
        if (!textWrapper.current) {
            return
        }

        if (i > textLine.length - 1) {
            DialogTextLinesManager.renderingText = false
            return
        }

        DialogTextLinesManager.renderingText = true
        setTextWrapperText(getTextWrapperText() + textLine[i])
        setTimeout(() => typewriter(i + 1), 30)
    }

    function getTextWrapperText() {
        return textWrapper.current?.innerHTML
    }

    function setTextWrapperText(text: string) {
        if (!textWrapper.current) {
            return
        }
        const textWrapperRef = textWrapper.current as HTMLSpanElement
        textWrapperRef.innerHTML = text
    }
}
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GameManager } from "./GameManager";
import { DialogBox } from "./dialog-system/DialogBox";

export function GameRenderer() {
    const elementRef = useRef<HTMLCanvasElement>(null)
    const clock = useRef<THREE.Clock>()
    const scene = useRef<THREE.Scene>()
    const renderer = useRef<THREE.WebGLRenderer>()
    const gameManager = useRef<GameManager>()
    const [currentTextLine, setTextLine] = useState("");

    useEffect(() => {
        clock.current = new THREE.Clock()
        scene.current = new THREE.Scene()
        scene.current.background = new THREE.Color(0xFF0000)
        
        // Setting up renderer from three js
        renderer.current = new THREE.WebGLRenderer({
            canvas: elementRef.current as HTMLCanvasElement,
            antialias: true
        })
        renderer.current.setSize(elementRef.current?.clientWidth as number, elementRef.current?.clientHeight as number)
        
        // Setting up game manager
        gameManager.current = new GameManager(getAspectRatio(), scene.current)
        gameManager.current.onTextLineChange = setTextLine
        gameManager.current.init()
        
        tick()
    }, [])

    return (
        <>
            <canvas ref={elementRef} className="w-screen h-screen overflow-hidden">
            </canvas>
            <DialogBox text={currentTextLine} />
        </>
    )

    function getAspectRatio() {
        return (elementRef.current?.clientWidth || 1) / (elementRef.current?.clientHeight || 1)
    }

    function performRender() {
        renderer.current?.render(scene.current as THREE.Scene, gameManager.current?.getCamera() as THREE.PerspectiveCamera)
    }

    function tick() {
        requestAnimationFrame(tick)
        const deltaTime = clock.current?.getDelta() as number
        const gameManagerRef = gameManager.current as GameManager

        gameManagerRef.deltaTime = deltaTime
        gameManagerRef.aspectRatio = getAspectRatio()
        gameManagerRef.tick()

        performRender()
    }
}
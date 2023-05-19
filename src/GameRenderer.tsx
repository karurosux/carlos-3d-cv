import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GameManager } from "./GameManager";

export function GameRenderer() {
    const elementRef = useRef<HTMLCanvasElement>(null)
    const clock = useRef<THREE.Clock>()
    const scene = useRef<THREE.Scene>()
    const renderer = useRef<THREE.WebGLRenderer>()
    const gameManager = useRef<GameManager>()

    useEffect(() => {
        clock.current = new THREE.Clock()
        scene.current = new THREE.Scene()
        scene.current.background = new THREE.Color(0xFF0000)
        renderer.current = new THREE.WebGLRenderer({
            canvas: elementRef.current as HTMLCanvasElement,
            antialias: true
        })
        renderer.current.setSize(elementRef.current?.clientWidth as number, elementRef.current?.clientHeight as number)
        gameManager.current = new GameManager(getAspectRatio(), scene.current)
        tick()
    }, [])

    return (
        <canvas ref={elementRef} className="w-screen h-screen overflow-hidden">
        </canvas>
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
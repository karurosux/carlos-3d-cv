import * as THREE from 'three'
import { Character } from './Character';

export type CameraConfig = {
    aspectRatio: number
}

export class CameraManager {
    deltaTime = 0
    lerpSpeed = 3
    cameraOffset: THREE.Vector3 = new THREE.Vector3(0, 0, 3)

    readonly camera: THREE.PerspectiveCamera;

    constructor(private scene: THREE.Scene, private cameraConfig: CameraConfig) {
        this.camera = new THREE.PerspectiveCamera(60, this.cameraConfig.aspectRatio, 0.1, 1000)
        this.camera.position.add(this.cameraOffset)
        this.scene.add(this.camera)
    }

    followCharacter(character: Character) {
        if (this.deltaTime === 0) {
            return
        }
        const playerPosition = character.getPlayerPosition()
        const cameraPosition = playerPosition.clone().add(this.cameraOffset)
        this.camera.lookAt(playerPosition)
        this.camera.position.lerp(cameraPosition, this.lerpSpeed * this.deltaTime)
    }
}
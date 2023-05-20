import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export class Character {
    gltf!: GLTF
    speed = 3
    deltaTime = 0
    loaded = false

    private idleAnimation!: THREE.AnimationClip
    private idleAction!: THREE.AnimationAction
    private walkAnimation!: THREE.AnimationClip
    private walkAction!: THREE.AnimationAction
    private animationMixer!: THREE.AnimationMixer
    private readonly loader = new GLTFLoader()

    constructor(private scene: THREE.Scene) {
        this.loader.load('character.gltf', (gltf) => {
            this.gltf = gltf
            this.setupAnimations()
            this.scene.add(gltf.scene)
            this.loaded = true
        })
    }

    tick() {
        this.animationMixer?.update(this.deltaTime)
    }

    getPlayerPosition(): THREE.Vector3 {
        return this.gltf?.scene?.position || new THREE.Vector3(0, 0, 0)
    }

    moveUp() {
        this.gltf.scene.translateZ(this.getCalculateSpeed())
        this.rotateTowards(180)
        this.fromIdleToWalkAnimation()
    }

    moveDown() {
        this.gltf.scene.translateZ(-this.getCalculateSpeed())
        this.rotateTowards(0)
        this.fromIdleToWalkAnimation()
    }

    moveLeft() {
        this.gltf.scene.translateX(-this.getCalculateSpeed())
        this.rotateTowards(-90)
        this.fromIdleToWalkAnimation()
    }

    moveRight() {
        this.gltf.scene.translateX(this.getCalculateSpeed())
        this.rotateTowards(90)
        this.fromIdleToWalkAnimation()
    }

    stopMovement() {
        this.fromWalkToIdleAnimation()
    }

    private fromWalkToIdleAnimation() {
        if (this.idleAction.isRunning()) {
            return
        }
        if (this.walkAction.isRunning()) {
            this.walkAction.fadeOut(0.5)
        }
        this.idleAction.reset()
            .setEffectiveTimeScale(1)
            .setEffectiveWeight(1)
            .fadeIn(0.5)
            .play()
    }

    private fromIdleToWalkAnimation() {
        if (this.walkAction.isRunning()) {
            return
        }

        this.idleAction.fadeOut(0.5);
        this.walkAction.reset()
            .setEffectiveTimeScale(1)
            .setEffectiveWeight(1)
            .fadeIn(0.5)
            .play()
    }

    private rotateTowards(deg: number) {
        this.gltf.scene.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(deg))
    }

    private getCalculateSpeed() {
        return this.deltaTime * this.speed
    }


    private setupAnimations() {
        this.animationMixer = new THREE.AnimationMixer(this.gltf.scene)

        this.idleAnimation = THREE.AnimationClip.findByName(this.gltf.animations, 'idle_loop')
        this.idleAction = this.animationMixer.clipAction(this.idleAnimation)

        this.walkAnimation = THREE.AnimationClip.findByName(this.gltf.animations, 'walk_loop')
        this.walkAction = this.animationMixer.clipAction(this.walkAnimation)

        this.idleAction.loop = THREE.LoopRepeat

        this.idleAction.timeScale = 1

        this.idleAction.play()
    }
}
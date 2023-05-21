import * as THREE from "three"
import {GLTF, GLTFLoader} from "three/addons/loaders/GLTFLoader.js"

export class Character {
  gltf!: GLTF
  speed = 3
  rotationSpeed = 8
  deltaTime = 0
  loaded = false

  private idleAnimation!: THREE.AnimationClip
  private idleAction!: THREE.AnimationAction
  private walkAnimation!: THREE.AnimationClip
  private walkAction!: THREE.AnimationAction
  private animationMixer!: THREE.AnimationMixer
  private readonly loader = new GLTFLoader()

  constructor(private scene: THREE.Scene) {
    this.loader.load("character.gltf", (gltf) => {
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

  performMovement(x: number, z: number) {
    if (x === 0 && z === 0) {
      this.fromWalkToIdleAnimation()
      return
    }
    const calculatedSpeed = this.getCalculateSpeed()

    this.fromIdleToWalkAnimation()

    this.gltf.scene.translateX(x * calculatedSpeed)
    this.gltf.scene.translateZ(z * calculatedSpeed)

    this.performRotation(x, z)
  }

  private performRotation(x: number, z: number) {
    const currentQuaternion = this.gltf.scene.quaternion
      .clone()
      .setFromEuler(this.gltf.scene.rotation)
    currentQuaternion.x = 0
    currentQuaternion.z = 0

    const targetEuler = this.gltf.scene.rotation.clone()
    targetEuler.x = 0
    targetEuler.z = 0
    targetEuler.y = THREE.MathUtils.degToRad(
      (Math.atan2(z, x) * 180) / Math.PI + 90
    )
    const targetQuaternion = currentQuaternion.clone().setFromEuler(targetEuler)
    const newQuaternion = currentQuaternion
      .clone()
      .slerp(targetQuaternion, 0.05)
    const newEuler = this.gltf.scene.rotation
      .clone()
      .setFromQuaternion(newQuaternion)

    this.gltf.scene.setRotationFromEuler(newEuler)
  }

  private fromWalkToIdleAnimation() {
    if (this.idleAction.isRunning()) {
      return
    }
    if (this.walkAction.isRunning()) {
      this.walkAction.fadeOut(0.5)
    }
    this.idleAction
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.5)
      .play()
  }

  private fromIdleToWalkAnimation() {
    if (this.walkAction.isRunning()) {
      return
    }

    this.idleAction.fadeOut(0.5)
    this.walkAction
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.5)
      .play()
  }

  private getCalculateSpeed() {
    return this.deltaTime * this.speed
  }

  private setupAnimations() {
    this.animationMixer = new THREE.AnimationMixer(this.gltf.scene)

    this.idleAnimation = THREE.AnimationClip.findByName(
      this.gltf.animations,
      "idle_loop"
    )
    this.idleAction = this.animationMixer.clipAction(this.idleAnimation)

    this.walkAnimation = THREE.AnimationClip.findByName(
      this.gltf.animations,
      "walk_loop"
    )
    this.walkAction = this.animationMixer.clipAction(this.walkAnimation)

    this.idleAction.loop = THREE.LoopRepeat

    this.idleAction.timeScale = 1

    this.idleAction.play()
  }
}

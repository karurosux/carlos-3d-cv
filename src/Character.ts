import * as THREE from "three"
import {GLTFModelHandler} from "./GLTFModelHandler"

export class Character extends GLTFModelHandler {
  speed = 1.5
  rotationSpeed = 8
  deltaTime = 0

  private idleAnimation!: THREE.AnimationClip
  private idleAction!: THREE.AnimationAction
  private walkAnimation!: THREE.AnimationClip
  private walkAction!: THREE.AnimationAction
  private animationMixer!: THREE.AnimationMixer
  private raycaster: THREE.Raycaster

  constructor(private scene: THREE.Scene) {
    super("character.gltf")
    this.raycaster = new THREE.Raycaster()
  }

  init(): void {
    this.setupAnimations()
    this.scene.add(this.model)
    this.loaded = true
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

    this.fromIdleToWalkAnimation()
    this.translateMesh(x, z)
    this.performRotation(x, z)
  }

  private translateMesh(x: number, z: number) {
    const calculatedSpeed = this.getCalculateSpeed()
    this.checkRayCollision()
    this.model.translateX(x * calculatedSpeed)
    this.model.translateZ(z * calculatedSpeed)
  }

  private checkRayCollision() {
    const worldDirection = new THREE.Vector3(0, 0, 0)
    const originPosition = this.model.position
      .clone()
      .add(new THREE.Vector3(0, 1, 0))
    this.model.children[0].getWorldDirection(worldDirection)
    const endPosition = originPosition
      .clone()
      .add(worldDirection.multiplyScalar(0.03))

    this.raycaster.set(originPosition, endPosition)
    const intersection = this.raycaster.intersectObjects(this.scene.children)
    console.log("[intersection] ", intersection)
  }

  private performRotation(x: number, z: number) {
    const currentQuaternion = this.model.children[0].quaternion
      .clone()
      .setFromEuler(this.model.children[0].rotation)
    currentQuaternion.x = 0
    currentQuaternion.z = 0

    const targetEuler = this.model.children[0].rotation.clone()
    targetEuler.x = 0
    targetEuler.z = 0
    targetEuler.y = THREE.MathUtils.degToRad(
      (Math.atan2(-z, x) * 180) / Math.PI + 90
    )
    const targetQuaternion = currentQuaternion.clone().setFromEuler(targetEuler)
    const newQuaternion = currentQuaternion.clone().slerp(targetQuaternion, 0.1)
    const newEuler = this.model.children[0].rotation
      .clone()
      .setFromQuaternion(newQuaternion)

    this.model.children[0].setRotationFromEuler(newEuler)
  }

  private fromWalkToIdleAnimation() {
    if (this.idleAction.isRunning()) {
      return
    }
    if (this.walkAction.isRunning()) {
      this.walkAction.fadeOut(0.2)
    }
    this.idleAction
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.2)
      .play()
  }

  private fromIdleToWalkAnimation() {
    if (this.walkAction.isRunning()) {
      return
    }

    this.idleAction.fadeOut(0.2)
    this.walkAction
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.2)
      .play()
  }

  private getCalculateSpeed() {
    return this.deltaTime * this.speed
  }

  private setupAnimations() {
    this.animationMixer = new THREE.AnimationMixer(this.model)

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

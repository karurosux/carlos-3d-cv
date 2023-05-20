import * as THREE from "three"

export class LightsManager {
  private readonly light = new THREE.DirectionalLight(new THREE.Color(0xffb726))
  private readonly ambientLight = new THREE.AmbientLight(
    new THREE.Color(0x404040)
  )

  constructor(private scene: THREE.Scene) {
    this.ambientLight.intensity = 6

    this.scene.add(this.light)
    this.scene.add(this.ambientLight)
  }
}

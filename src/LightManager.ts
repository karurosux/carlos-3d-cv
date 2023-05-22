import * as THREE from "three"

export class LightsManager {
  // private readonly light = new THREE.DirectionalLight(new THREE.Color(0xffb726))
  private readonly pointLight = new THREE.PointLight(
    new THREE.Color(0x8224b5),
    1 ,
    10
  )
  private readonly ambientLight = new THREE.AmbientLight(
    new THREE.Color("0x404040")
  )

  constructor(private scene: THREE.Scene) {
    this.ambientLight.intensity = 0.1

    this.pointLight.intensity = 4
    this.pointLight.position.z = 2
    this.pointLight.position.y = 2
    this.pointLight.castShadow = true
    // this.scene.add(this.light)
    this.scene.add(this.pointLight)
    this.scene.add(this.ambientLight)
  }
}

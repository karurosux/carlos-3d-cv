import {GLTF, GLTFLoader} from "three/addons/loaders/GLTFLoader.js"

export abstract class GLTFModelHandler {
  get model() {
    return this.gltf?.scene
  }

  protected loaded = false
  protected gltf!: GLTF
  private loader = new GLTFLoader()

  constructor(src: string) {
    this.loader.load(src, (gltf) => {
      this.gltf = gltf
      this.loaded = true
      this.init()
    })
  }

  abstract init(): void
}

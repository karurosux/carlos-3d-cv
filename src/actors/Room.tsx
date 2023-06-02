import { MeshPhysicalMaterialProps, useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Radio from "./Radio";
import * as THREE from "three";
import { kebabCase } from "lodash";
import { useEffect } from "react";

function Room() {
  const gltf: GLTF = useLoader(GLTFLoader, "models/room.glb");
  gltf.scene.position.y = 0.2;

  const meshUpdateMap: Record<string, (mesh: THREE.Mesh) => void> = {
    "lamp-cover": (cover) => {
      const material = cover.material as MeshPhysicalMaterialProps;
      material.emissive = new THREE.Color("#ffffff");
      material.emissiveIntensity = 10;
    },
    wall: (wall) => {
      const material = wall.material as MeshPhysicalMaterialProps;
      material.roughness = 1;
    },
    door: (door) => {
      const material = door.material as MeshPhysicalMaterialProps;
      material.roughness = 1;
    },
    floor: (floor) => {
      const material = floor.material as MeshPhysicalMaterialProps;
      material.roughness = 0.1;
      material.specularIntensity = 0.5;
      material.clearcoat = 1;
      material.clearcoatRoughness = 0;
    },
    "thrash-pin": (thrash) => {
      const material = thrash.material as MeshPhysicalMaterialProps;
      material.metalness = 0.7;
      material.roughness = 0.3;
    },
    window: (wdw) => {
      const material = wdw.material as MeshPhysicalMaterialProps;
      material.roughness = 0.1;
    },
    shelve: (shelve) => {
      const material = shelve.material as MeshPhysicalMaterialProps;
      material.roughness = 0.7;
    }
  };

  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj.type === "Mesh") {
        const mesh = obj as THREE.Mesh;
        const name = kebabCase(obj.name);
        const updateFunction = meshUpdateMap[name];
        if (updateFunction) {
          updateFunction(mesh);
        } else {
          console.log(name, " update function not found", mesh.material);
        }
      }
    });
  }, []);

  return (
    <>
      <pointLight
        intensity={0.4}
        position={[0, 1, -2.6]}
        distance={8}
        color="orange"
        castShadow
      />
      <pointLight
        position={[-2, 1, 0]}
        distance={5}
        color="blue"
        intensity={1}
        castShadow
      />
      <pointLight
        position={[1.7, 0.2, -1.7]}
        distance={6}
        color="purple"
        intensity={5}
        castShadow
      />
      <mesh receiveShadow rotation={[0, THREE.MathUtils.degToRad(-45), 0]}>
        <RigidBody
          type="fixed"
          lockRotations
          lockTranslations
          colliders={"trimesh"}
          gravityScale={0}
        >
          <primitive object={gltf.scene} />
        </RigidBody>
      </mesh>
      <Radio />
      <InvisileWall />
    </>
  );
}

function InvisileWall() {
  return <></>;
}

export default Room;

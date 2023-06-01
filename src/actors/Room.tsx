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

  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj.type === "Mesh") {
        const mesh = obj as THREE.Mesh;
        const name = kebabCase(obj.name);
        if (name === "lamp-cover") {
          const material = mesh.material as MeshPhysicalMaterialProps;
          material.emissive = new THREE.Color("#ffffff");
          material.emissiveIntensity = 10;
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

import { PropsWithChildren } from "react";
import * as THREE from "three";

type Props = PropsWithChildren<{
  initialPosition: THREE.Vector3;
}>;

function BaseActor() {}

BaseActor.defaultProps = {
  initialPosition: new THREE.Vector3(0, 0, 0),
} as Partial<Props>;

export default BaseActor;

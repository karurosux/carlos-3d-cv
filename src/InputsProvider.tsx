import { KeyboardControls } from "@react-three/drei";
import { PropsWithChildren } from "react";

export function InputsProvider(props: PropsWithChildren) {
  return (
    <KeyboardControls
      map={[
        { keys: ["w", "ArrowUp"], name: "forward" },
        { keys: ["s", "ArrowDown"], name: "backward" },
        { keys: ["a", "ArrowLeft"], name: "left" },
        { keys: ["d", "ArrowRight"], name: "right" },
        { keys: ["Space"], name: "interact" },
      ]}
    >
      {props.children}
    </KeyboardControls>
  );
}

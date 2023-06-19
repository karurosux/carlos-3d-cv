import { KeyboardControls } from "@react-three/drei";
import { PropsWithChildren } from "react";

export function InputsProvider(props: PropsWithChildren) {
  return (
    <KeyboardControls
      map={[
        { keys: ["w", "W", "ArrowUp"], name: "forward" },
        { keys: ["s", "S", "ArrowDown"], name: "backward" },
        { keys: ["a", "A", "ArrowLeft"], name: "left" },
        { keys: ["d", "D", "ArrowRight"], name: "right" },
        { keys: ["Space"], name: "interact" },
      ]}
    >
      {props.children}
    </KeyboardControls>
  );
}

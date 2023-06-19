import { useState } from "react";
import { RiSpace } from "react-icons/ri";
import { InteractionTextController } from "./InteractionTextController";

export function InteractionText() {
  const [showInteractText, setShowInteractText] = useState(false);

  InteractionTextController.showInteractionText = (show) => {
    if (showInteractText !== show) {
      setShowInteractText(show);
    }
  };

  if (!showInteractText) {
    return <></>;
  }

  return (
    <div className="fixed bottom-10 z-20 w-full flex justify-center">
      <p className="uppercase flex text-lg text-white break-keep whitespace-nowrap animate-pulse">
        Press&nbsp;
        <RiSpace className="mt-2" />
        &nbsp;to interact
      </p>
    </div>
  );
}

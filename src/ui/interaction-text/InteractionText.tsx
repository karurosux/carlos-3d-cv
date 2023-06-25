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
    <div className="fixed z-20 flex justify-center w-full bottom-10">
      <p className="flex text-3xl text-white uppercase break-keep whitespace-nowrap animate-pulse">
        Press&nbsp;
        <RiSpace className="mt-2" />
        &nbsp;to interact
      </p>
    </div>
  );
}

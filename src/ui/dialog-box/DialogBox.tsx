import { useEffect, useState } from "react";
import { DialogBoxController } from "./DialogBoxController";

export function DialogBox() {
  const [textLines, setTextLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [textLines]);

  const currentTextLine = textLines?.[currentIndex];

  DialogBoxController.setTextLines = setTextLines;
  DialogBoxController.nextLine = next;

  function next() {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= textLines.length) {
      setTextLines([]);
      DialogBoxController.onAfterLastLine?.();
      return;
    }

    setCurrentIndex(nextIndex);
  }

  if (!currentTextLine) {
    return <></>;
  }

  return (
    <div
      id="dialog-box-wrapper"
      className="fixed bottom-6 select-none right-6 left-6 p-4 opacity-60 bg-black h-80 border-white border-8 text-white text-6xl z-10"
    >
      <div>{currentTextLine}</div>
    </div>
  );
}

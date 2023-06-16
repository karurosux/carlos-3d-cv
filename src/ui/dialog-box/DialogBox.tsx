import { useEffect, useRef, useState } from "react";
import { DialogBoxController } from "./DialogBoxController";
import { RiSpace, RiArrowDropDownFill } from "react-icons/ri";

export function DialogBox() {
  const divRef = useRef<HTMLDivElement>(null);
  const isTypingRef = useRef(false);
  const [textLines, setTextLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [textLines]);

  const currentTextLine = textLines?.[currentIndex];

  DialogBoxController.setTextLines = setTextLines;
  DialogBoxController.nextLine = next;

  function next() {
    isTypingRef.current = true;
    const nextIndex = currentIndex + 1;

    if (nextIndex >= textLines.length) {
      setTextLines([]);
      DialogBoxController.onAfterLastLine?.();
      return;
    }

    setCurrentIndex(nextIndex);
    isTypingRef.current = false;
  }

  if (!currentTextLine) {
    return <></>;
  }

  return (
    <>
      <div
        id="dialog-box-wrapper"
        className="fixed bottom-24 select-none right-6 left-6 p-4 opacity-60 bg-black h-96 border-white border-8 text-white text-6xl z-10"
      >
        <div ref={divRef}>{currentTextLine}</div>
      </div>
      <div className="fixed bottom-10 z-20 w-full flex justify-center">
        <p className="uppercase flex text-lg text-white break-keep whitespace-nowrap animate-pulse">
          Press&nbsp;
          <RiSpace className="mt-2" />
          &nbsp;to continue
        </p>
      </div>
      <RiArrowDropDownFill className="fixed z-20 bottom-20 right-8 text-8xl text-white animate-pulse animate-bounce" />
    </>
  );
}

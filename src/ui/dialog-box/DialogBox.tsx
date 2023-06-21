import { useEffect, useRef, useState } from "react";
import { DialogBoxController } from "./DialogBoxController";
import { RiSpace, RiArrowDropDownFill } from "react-icons/ri";
import { isMobile } from "../../utils/is-mobile";

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
        className="fixed z-10 p-4 text-white bg-black border-white select-none sm:bottom-10 lg:bottom-24 right-6 left-6 opacity-60 sm:h-32 sm:text-xl lg:h-96 sm:border-2 lg:border-8 lg:text-6xl"
      >
        <div ref={divRef}>{currentTextLine}</div>
      </div>
      <div className="fixed z-20 flex justify-center w-full sm:bottom-2 lg:bottom-10">
        <p className="flex text-white uppercase sm:text-xs lg:text-lg break-keep whitespace-nowrap animate-pulse">
          Press&nbsp;
          <RiSpace className="mt-2" />
          &nbsp;to continue
        </p>
      </div>
      <RiArrowDropDownFill className="fixed z-20 text-white sm:right-5 lg:bottom-20 sm:bottom-8 right-8 sm:text-5xl lg:text-8xl animate-pulse animate-bounce" />
      {isMobile.any() && <span>This is mobile.</span>}
    </>
  );
}

import { useProgress } from "@react-three/drei";
import { useRef, useState } from "react";
import classnNames from "classnames";

const TOTAL_OBJECTS = 9;
const COMPLETE_PERCENTAGE = 100;

export function LoadingPage() {
  const { loaded } = useProgress();
  const fadeOutTriggered = useRef(false);
  const [loadingBarVisible, setLoadingBarVisible] = useState(true);

  const percentage = Math.round((loaded / TOTAL_OBJECTS) * 100);

  if (percentage === COMPLETE_PERCENTAGE && !fadeOutTriggered.current) {
    fadeOutTriggered.current = true;
    setTimeout(() => {
      setLoadingBarVisible(false);
    }, 1500);
  }

  return (
    <div
      className={classnNames([
        "fixed transition-opacity flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-purple-900 text-white p-6 z-20",
        {
          "opacity-0": !loadingBarVisible,
          "opacity-100": loadingBarVisible,
        },
      ])}
    >
      <div className="p-4 w-1/3">
        <div className="text-center mb-4 text-5xl">{percentage}%</div>
        <div id="loading-bar" className="w-full h-4">
          <div
            className="bg-white h-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

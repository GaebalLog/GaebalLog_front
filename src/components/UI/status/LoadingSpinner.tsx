import React from "react";
import { atom, useRecoilState } from "recoil";

export const loadingAtom = atom({
  key: "isVisible",
  default: true,
});

const LoadingSpinner: React.FC<{ isSetTime?: boolean }> = ({ isSetTime }) => {
  const [isVisible, setIsVisible] = useRecoilState(loadingAtom);
  const circleCount = 8;

  React.useEffect(() => {
    if (isSetTime) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      {Array.from({ length: circleCount }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 bg-[#D9D9D9] rounded-full absolute animate-changeColor`}
          style={{
            transform: `rotate(${
              (360 / circleCount) * index - 90
            }deg) translate(20px)`,
            animationDelay: `${index * 0.1}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default LoadingSpinner;

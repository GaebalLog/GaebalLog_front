import React from "react";

const LoadingSpinner = () => {
  const circleCount = 8;

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

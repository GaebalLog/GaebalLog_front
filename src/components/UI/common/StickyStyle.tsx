import React from "react";

const StickyStyle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col flex-grow items-center">
      <div className={`sticky top-[114px]`}>{children}</div>
    </div>
  );
};

export default StickyStyle;

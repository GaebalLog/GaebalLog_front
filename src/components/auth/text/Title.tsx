import React from "react";

const Title: React.FC<{ children: string }> = ({ children }) => {
  return <h1 className="text-[32px] text-center font-hack">{children}</h1>;
};

export default Title;

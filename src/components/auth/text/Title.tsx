import React from "react";

interface titleProps {
  type?: "login";
  children: string;
}
const style = "leading-normal mt-12 mb-[88px]";

const Title: React.FC<titleProps> = ({ type, children }) => {
  return (
    <h1
      className={`text-[32px] text-center font-hack ${
        type === "login" && style
      }`}
    >
      {children}
    </h1>
  );
};

export default Title;

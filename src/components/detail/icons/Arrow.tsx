import React from "react";

const Arrow: React.FC<{ up: boolean; down: boolean }> = ({ up, down }) => {
  let dValue;

  if (up) {
    dValue =
      "M0.000244141 6.40049L1.60024 8.00049L6.40024 3.20049L11.2002 8.00049L12.8002 6.40049L6.40024 0.000488281L0.000244141 6.40049Z";
  } else if (down) {
    dValue =
      "M12.8008 1.6L11.2008 -1.90798e-08L6.40078 4.8L1.60078 -1.33559e-07L0.000781136 1.6L6.40078 8L12.8008 1.6Z";
  }

  return (
    <svg
      width="13"
      height="8"
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={dValue} fill="#967AC3" />
    </svg>
  );
};

export default Arrow;

import React from "react";

const ArrowInNestedComment: React.FC<{ className: string; color?: string }> = ({
  className,
  color,
}) => {
  return (
    <svg
      className={className}
      width="27"
      height="46"
      viewBox="0 0 27 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 38L2 0H1.90735e-06L0 38V40H2H22.2L18.4004 43.7996L20.0004 45.3996L26.4004 38.9996L20.0004 32.5996L18.4004 34.1996L22.2008 38H2Z"
        fill={color || "#D3D3D3"}
      />
    </svg>
  );
};

export default ArrowInNestedComment;

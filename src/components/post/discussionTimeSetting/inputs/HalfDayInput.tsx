import React from "react";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const HalfDayInput: React.FC<props> = ({ value, setValue }) => {
  const toggleValue = () => {
    setValue((prev) => (prev === "오전" ? "오후" : "오전"));
  };

  return (
    <DefaultNumberInput
      type="halfDay"
      value={value}
      handleIncrease={toggleValue}
      handleDecrease={toggleValue}
    />
  );
};

export default HalfDayInput;

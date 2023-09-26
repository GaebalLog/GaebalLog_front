import React from "react";

import useHourController from "@/hooks/TimeSetting/useHourController";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  time: "start" | "end";
}

const HourInput: React.FC<props> = ({ time }) => {
  const {
    hourValue,
    handleIncrease,
    handleDecrease,
    handleInputChange,
    handleBlur,
  } = useHourController(time);

  return (
    <DefaultNumberInput
      type="hour"
      value={hourValue}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default HourInput;

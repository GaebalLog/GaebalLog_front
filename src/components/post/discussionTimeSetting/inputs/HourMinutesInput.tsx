import React from "react";

import useHourMinuteController from "@/hooks/TimeSetting/useHourMinuteController";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  type: "hour" | "minutes";
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const HourMinutesInput: React.FC<props> = ({ type, value, setValue }) => {
  const { handleIncrease, handleDecrease, handleInputChange, handleBlur } =
    useHourMinuteController(type, value + "", setValue);

  return (
    <DefaultNumberInput
      type={type}
      value={value}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default HourMinutesInput;

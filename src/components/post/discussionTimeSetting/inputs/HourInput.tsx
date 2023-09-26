import React from "react";

import useHourController from "@/hooks/TimeSetting/useHourController";
import { TimeContext } from "@/components/provider/TimeSettingProvider";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  time: "start" | "end";
}

const HourInput: React.FC<props> = ({ time }) => {
  const { startHourValue, endHourValue } = React.useContext(TimeContext);
  const { handleIncrease, handleDecrease, handleInputChange, handleBlur } =
    useHourController(time);

  return (
    <DefaultNumberInput
      type="hour"
      value={time === "start" ? startHourValue : endHourValue}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default HourInput;

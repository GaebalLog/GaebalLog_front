import React from "react";

import { TimeContext } from "@/components/provider/TimeSettingProvider";
import useMinutesController from "@/hooks/TimeSetting/useMinutesController";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  time: "start" | "end";
}

const MinutesInput: React.FC<props> = ({ time }) => {
  const { startMinutesValue, endMinutesValue } = React.useContext(TimeContext);
  const { handleIncrease, handleDecrease, handleInputChange, handleBlur } =
    useMinutesController(time);

  return (
    <DefaultNumberInput
      type="minutes"
      value={time === "start" ? startMinutesValue : endMinutesValue}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleInputChange={handleInputChange}
      handleBlur={handleBlur}
    />
  );
};

export default MinutesInput;

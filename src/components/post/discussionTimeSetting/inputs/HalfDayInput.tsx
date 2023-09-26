import React from "react";

import { TimeContext } from "@/components/provider/TimeSettingProvider";

import DefaultNumberInput from "./DefaultNumberInput";

interface props {
  time: "start" | "end";
}

const HalfDayInput: React.FC<props> = ({ time }) => {
  const {
    startHalfDayValue,
    setStartHalfDayValue,
    endHalfDayValue,
    setEndHalfDayValue,
  } = React.useContext(TimeContext);
  const toggleValue = () => {
    if (time === "start") {
      setStartHalfDayValue((prev) => (prev === "오전" ? "오후" : "오전"));
    } else {
      setEndHalfDayValue((prev) => (prev === "오전" ? "오후" : "오전"));
    }
  };

  return (
    <DefaultNumberInput
      type="halfDay"
      value={time === "start" ? startHalfDayValue : endHalfDayValue}
      handleIncrease={toggleValue}
      handleDecrease={toggleValue}
    />
  );
};

export default HalfDayInput;

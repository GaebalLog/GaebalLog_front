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

  const isStart = time === "start";
  const halfDayValue = isStart ? startHalfDayValue : endHalfDayValue;
  const setHalfDayValue = isStart ? setStartHalfDayValue : setEndHalfDayValue;

  const toggleValue = () => {
    setHalfDayValue((prev) => (prev === "오전" ? "오후" : "오전"));
  };

  return (
    <DefaultNumberInput
      type="halfDay"
      testId={time}
      value={halfDayValue}
      handleIncrease={toggleValue}
      handleDecrease={toggleValue}
    />
  );
};

export default HalfDayInput;

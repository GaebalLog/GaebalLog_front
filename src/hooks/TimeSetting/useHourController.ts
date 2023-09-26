import React from "react";

import { TimeContext } from "@/components/provider/TimeSettingProvider";
import TimeSettingManager from "@/utils/util-timeSettingManager";

const useHourController = (time: "start" | "end") => {
  const { startHourValue, setStartHourValue, endHourValue, setEndHourValue } =
    React.useContext(TimeContext);

  const isStart = time === "start";

  // 증감
  const handleIncrease = () => {
    if (isStart) {
      return setStartHourValue((prev) =>
        +prev >= 12 ? String(1) : String(+prev + 1),
      );
    } else
      return setEndHourValue((prev) =>
        +prev >= 12 ? String(1) : String(+prev + 1),
      );
  };

  const handleDecrease = () => {
    if (isStart) {
      return setStartHourValue((prev) =>
        +prev <= 1 ? String(12) : String(+prev - 1),
      );
    } else
      return setEndHourValue((prev) =>
        +prev <= 1 ? String(12) : String(+prev - 1),
      );
  };

  // onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyNumberValue = inputValue.replace(/[^\d]/g, "");
    const truncatedValue = onlyNumberValue.substring(0, 2);
    setfilteredinputValue(truncatedValue);
  };

  const setfilteredinputValue = (truncatedValue: string) => {
    if (+truncatedValue > 12 || +truncatedValue < 0) return;
    if (isStart) return setStartHourValue(truncatedValue);
    else return setEndHourValue(truncatedValue);
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
  };

  const setDefaultIfEmpty = () => {
    const { calculatedStartHour, calculatedEndHour } = new TimeSettingManager();
    const isEmpty = startHourValue === "" || endHourValue === "";
    if (isStart && isEmpty) {
      return setStartHourValue(calculatedStartHour + "");
    } else return setEndHourValue(calculatedEndHour + "");
  };
  const addZeroIfLengthOne = () => {
    const isLength1 = startHourValue.length === 1 || endHourValue.length === 1;
    if (isStart && isLength1) {
      return setStartHourValue(`0${startHourValue}`);
    } else return setEndHourValue(`0${endHourValue}`);
  };

  return { handleIncrease, handleDecrease, handleInputChange, handleBlur };
};

export default useHourController;

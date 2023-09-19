import type React from "react";

import useValueFormatter from "./useValueFormatter";

const useHourMinuteController = (
  type: "hour" | "minutes",
  value: string | number,
  setValue: React.Dispatch<React.SetStateAction<string | number>>,
) => {
  // 증감
  const handleIncrease = () => {
    increaseSetValue[type]();
  };

  const handleDecrease = () => {
    decreaseSetValue[type]();
  };

  const increaseSetValue = {
    hour: () => setValue((prev) => (+prev >= 12 ? 1 : +prev + 1)),
    minutes: () => setValue((prev) => (+prev >= 59 ? 0 : +prev + 1)),
  };
  const decreaseSetValue = {
    hour: () => setValue((prev) => (+prev <= 1 ? 12 : +prev - 1)),
    minutes: () => setValue((prev) => (+prev <= 0 ? 59 : +prev - 1)),
  };

  // onChange
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyNumberValue = inputValue.replace(/[^\d]/g, "");
    const truncatedValue = onlyNumberValue.substring(0, 2);
    setfilteredinputValue(truncatedValue);
  };

  const setfilteredinputValue = (truncatedValue: string) => {
    if (type === "hour" && (+truncatedValue > 12 || +truncatedValue < 0))
      return;
    if (type === "minutes" && (+truncatedValue > 59 || +truncatedValue < 0))
      return;
    setValue(truncatedValue + "");
  };

  // onBlur
  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
  };

  const { setDefaultIfEmpty, addZeroIfLengthOne } = useValueFormatter(
    type,
    value + "",
    setValue,
  );

  return { handleIncrease, handleDecrease, handleInputChange, handleBlur };
};

export default useHourMinuteController;

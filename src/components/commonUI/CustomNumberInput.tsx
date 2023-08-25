import React from "react";

import useIcon from "@/hooks/useIcon";
import { BORDER_COLOR } from "@/constants/global/colors";

interface CustomNumberInputProps {
  type: "halfDay" | "hour" | "minutes" | "month" | "days";
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  type,
  value,
  setValue,
  onChange,
}) => {
  const { getIcon } = useIcon();
  const upArrow = getIcon("upArrow", 10, 10);
  const downArrow = getIcon("downArrow", 10, 10);
  const lastDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
  ).getDate();

  const increaseSetValue = {
    halfDay: () => setValue((prev) => (prev === "오전" ? "오후" : "오전")),
    hour: () => setValue((prev) => (+prev >= 12 ? 1 : +prev + 1)),
    minutes: () => setValue((prev) => (+prev >= 59 ? 0 : +prev + 1)),
    month: () => setValue((prev) => (+prev >= 12 ? 1 : +prev + 1)),
    days: () => setValue((prev) => (+prev >= lastDay ? 1 : +prev + 1)),
  };

  const decreaseSetValue = {
    halfDay: () => setValue((prev) => (prev === "오전" ? "오후" : "오전")),
    hour: () => setValue((prev) => (+prev <= 1 ? 12 : +prev - 1)),
    minutes: () => setValue((prev) => (+prev <= 0 ? 59 : +prev - 1)),
    month: () => setValue((prev) => (+prev <= 1 ? 12 : +prev - 1)),
    days: () => setValue((prev) => (+prev <= 1 ? lastDay : +prev - 1)),
  };

  const handleIncrease = () => {
    increaseSetValue[type]();
  };

  const handleDecrease = () => {
    decreaseSetValue[type]();
  };

  const showValue = () => {
    if (typeof value === "number" && value < 10) return `0${value}`;
    return value;
  };

  const showTimeUnits = () => {
    if (type === "hour") return "시";
    if (type === "minutes") return "분";
    if (type === "month") return "월";
    if (type === "days") return "일";
    return "";
  };

  return (
    <div className={`flex items-center ${BORDER_COLOR.button}`}>
      <input
        className="flex-grow w-[76px] px-4 py-[10px] text-center outline-none"
        value={`${showValue()}${showTimeUnits()}`}
        onChange={onChange}
      />
      <div className="flex flex-col gap-3 pr-1">
        <button data-testid={`${type}_up`} onClick={handleIncrease}>
          {upArrow}
        </button>
        <button data-testid={`${type}_down`} onClick={handleDecrease}>
          {downArrow}
        </button>
      </div>
    </div>
  );
};

export default CustomNumberInput;

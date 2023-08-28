import React from "react";

import useIcon from "@/hooks/useIcon";
import { BORDER_COLOR } from "@/constants/global/colors";

const styles = {
  divBox: `flex items-center ${BORDER_COLOR.button}`,
  input: `w-[76px] px-4 py-[10px] text-center outline-none`,
  buttonBox: `flex flex-col gap-3 pr-1`,
};

interface CustomNumberInputProps {
  type: "halfDay" | "hour" | "minutes" | "month" | "days";
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  daysValue?: string | number;
  monthValue?: string | number;
  setDays?: React.Dispatch<React.SetStateAction<string | number>>;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  type,
  value,
  setValue,
  daysValue,
  monthValue,
  setDays,
}) => {
  const { getIcon } = useIcon();
  const upArrow = getIcon("upArrow", 10, 10);
  const downArrow = getIcon("downArrow", 10, 10);

  const lastDay = (calculateMonth: 0 | -1 | 1) => {
    return new Date(
      new Date().getFullYear(),
      monthValue ? +monthValue + calculateMonth : new Date().getMonth() + 1,
      0,
    ).getDate();
  };

  const increaseSetValue = {
    halfDay: () => setValue((prev) => (prev === "오전" ? "오후" : "오전")),
    hour: () => setValue((prev) => (+prev >= 12 ? 1 : +prev + 1)),
    minutes: () => setValue((prev) => (+prev >= 59 ? 0 : +prev + 1)),
    month: () => setValue((prev) => (+prev >= 12 ? 1 : +prev + 1)),
    days: () => setValue((prev) => (+prev >= lastDay(0) ? 1 : +prev + 1)),
  };

  const decreaseSetValue = {
    halfDay: () => setValue((prev) => (prev === "오전" ? "오후" : "오전")),
    hour: () => setValue((prev) => (+prev <= 1 ? 12 : +prev - 1)),
    minutes: () => setValue((prev) => (+prev <= 0 ? 59 : +prev - 1)),
    month: () => setValue((prev) => (+prev <= 1 ? 12 : +prev - 1)),
    days: () => setValue((prev) => (+prev <= 1 ? lastDay(0) : +prev - 1)),
  };

  const handleIncrease = () => {
    increaseSetValue[type]();
    updateDayWhenMonthChanges(1);
  };

  const handleDecrease = () => {
    decreaseSetValue[type]();
    updateDayWhenMonthChanges(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const onlyNumberValue = inputValue.replace(/[^\d]/g, "");
    const truncatedValue = onlyNumberValue.substring(0, 2);

    if (type === "hour" && (+truncatedValue > 12 || +truncatedValue < 0))
      return;
    if (type === "minutes" && (+truncatedValue > 59 || +truncatedValue < 0))
      return;
    if (type === "month" && (+truncatedValue > 12 || +truncatedValue < 0))
      return;
    if (
      type === "days" &&
      (+truncatedValue > lastDay(0) || +truncatedValue < 0)
    )
      return;

    setValue(truncatedValue);
  };

  const handleBlur = () => {
    setDefaultIfEmpty();
    addZeroIfLengthOne();
    updateDayWhenMonthChanges(0);
  };

  const setDefaultIfEmpty = () => {
    if (value === "") return setValue("01");
  };

  const addZeroIfLengthOne = () => {
    if (typeof value === "string" && value.length === 1) {
      return setValue(`0${value}`);
    }
  };

  const updateDayWhenMonthChanges = (calculateMonth: 0 | -1 | 1) => {
    if (type === "month" && daysValue && +daysValue > lastDay(calculateMonth))
      return setDays && setDays(lastDay(calculateMonth));
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
    <div className={styles.divBox}>
      <input
        data-testid="input"
        className={styles.input}
        readOnly={type === "halfDay"}
        value={`${showValue()}${showTimeUnits()}`}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      <div className={styles.buttonBox}>
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

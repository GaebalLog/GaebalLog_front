import React from "react";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";

interface props {
  type: "halfDay" | "hour" | "minutes" | "year" | "month" | "days";
  value: string | number;
  handleIncrease: () => void;
  handleDecrease: () => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: () => void;
}

const DefaultNumberInput: React.FC<props> = ({
  type,
  value,
  handleIncrease,
  handleDecrease,
  handleInputChange,
  handleBlur,
}) => {
  const styles = {
    divBox: `flex items-center ${BORDER_COLOR.button}`,
    input: `${
      type === "year" ? `w-[97px]` : `w-[76px]`
    } px-4 py-[7.5px] text-[20px] text-center ${BG_COLOR.primary} outline-none`,
    buttonBox: `flex flex-col gap-3 pr-1`,
  };

  const { getIcon } = useIcon();
  const upArrow = getIcon("upArrow", 10, 10);
  const downArrow = getIcon("downArrow", 10, 10);

  const showValue = () => {
    if (typeof value === "number" && value < 10) return `0${value}`;
    return value;
  };

  const showTimeUnits = () => {
    if (type === "hour") return "시";
    if (type === "minutes") return "분";
    if (type === "year") return "년";
    if (type === "month") return "월";
    if (type === "days") return "일";
    return "";
  };

  return (
    <div className={styles.divBox}>
      <input
        data-testid={`${type}_input`}
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

export default DefaultNumberInput;

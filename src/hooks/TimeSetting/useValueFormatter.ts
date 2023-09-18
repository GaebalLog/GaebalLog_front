import type React from "react";

const useValueFormatter = (
  type: "halfDay" | "hour" | "minutes" | "year" | "month" | "days",
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string | number>>,
) => {
  const setDefaultIfEmpty = () => {
    if (
      type === "year" &&
      (+value <= new Date().getFullYear() || value.length < 4)
    ) {
      return setValue(new Date().getFullYear() + "");
    }
    if (type === "hour") return setValue("12");
    if (type === "minutes") return setValue("00");
    if (value === "") {
      return setValue("01");
    }
  };

  const addZeroIfLengthOne = () => {
    if (typeof value === "string" && value.length === 1) {
      return setValue(`0${value}`);
    }
  };

  return { setDefaultIfEmpty, addZeroIfLengthOne };
};

export default useValueFormatter;

import React from "react";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";

import Days from "./Days";
import Week from "./Week";
import Header from "./Header";

interface calendarProps {
  startYearValue: number;
  startMonthValue: number;
  startDateValue: number;
  endYearValue: number;
  endMonthValue: number;
  endDateValue: number;
  setStartYearValue: React.Dispatch<React.SetStateAction<string | number>>;
  setStartMonthValue: React.Dispatch<React.SetStateAction<string | number>>;
  setStartDateValue: React.Dispatch<React.SetStateAction<string | number>>;
  setEndYearValue: React.Dispatch<React.SetStateAction<string | number>>;
  setEndMonthValue: React.Dispatch<React.SetStateAction<string | number>>;
  setEndDateValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const Calendar: React.FC<calendarProps> = ({
  startYearValue,
  startMonthValue,
  startDateValue,
  endYearValue,
  endMonthValue,
  endDateValue,
  setStartYearValue,
  setStartMonthValue,
  setStartDateValue,
  setEndYearValue,
  setEndMonthValue,
  setEndDateValue,
}) => {
  const [selectedYear, setSelectedYear] = React.useState(endYearValue);
  const [selectedMonth, setSelectedMonth] = React.useState(endMonthValue);

  const startDate = {
    startYearValue,
    startMonthValue,
    startDateValue,
    setStartYearValue,
    setStartMonthValue,
    setStartDateValue,
  };
  const endDate = {
    endYearValue,
    endMonthValue,
    endDateValue,
    setEndYearValue,
    setEndMonthValue,
    setEndDateValue,
  };

  const prevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  return (
    <div
      className={`w-[316px] p-4 ${BG_COLOR.primary} ${BORDER_COLOR.button}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Header
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <Week />
      <Days
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default Calendar;

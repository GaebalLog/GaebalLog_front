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
  const startDate = {
    year: startYearValue,
    month: startMonthValue,
    date: startDateValue,
  };
  const endDate = {
    year: endYearValue,
    month: endMonthValue,
    date: endDateValue,
  };
  const [selectedYear, setSelectedYear] = React.useState(endYearValue);
  const [selectedMonth, setSelectedMonth] = React.useState(endMonthValue);

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
      className={`w-[316px] h-[300px] p-4 ${BG_COLOR.primary} ${BORDER_COLOR.button}`}
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
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        startYearValue={startYearValue}
        startMonthValue={startMonthValue}
        startDateValue={startDateValue}
        endYearValue={endYearValue}
        endMonthValue={endMonthValue}
        endDateValue={endDateValue}
        setStartYearValue={setStartYearValue}
        setStartMonthValue={setStartMonthValue}
        setStartDateValue={setStartDateValue}
        setEndYearValue={setEndYearValue}
        setEndMonthValue={setEndMonthValue}
        setEndDateValue={setEndDateValue}
      />
    </div>
  );
};

export default Calendar;

import React from "react";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";

import Days from "./Days";
import Week from "./Week";
import Header from "./Header";

interface calendarProps {
  yearValue: number;
  monthValue: number;
  daysValue: number;
  setYearValue: React.Dispatch<React.SetStateAction<string | number>>;
  setMonthValue: React.Dispatch<React.SetStateAction<string | number>>;
  setDaysValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const Calendar: React.FC<calendarProps> = ({
  yearValue,
  monthValue,
  daysValue,
  setYearValue,
  setMonthValue,
  setDaysValue,
}) => {
  const selectedDate = {
    year: yearValue,
    month: monthValue,
    day: daysValue,
  };
  const [selectedYear, setSelectedYear] = React.useState(yearValue);
  const [selectedMonth, setSelectedMonth] = React.useState(monthValue);
  console.log(yearValue);

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
        selectedDate={selectedDate}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        setYearValue={setYearValue}
        setMonthValue={setMonthValue}
        setDaysValue={setDaysValue}
      />
    </div>
  );
};

export default Calendar;

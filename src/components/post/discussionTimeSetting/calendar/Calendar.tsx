import React from "react";

import { BG_COLOR, BORDER_COLOR } from "@/config/constants/colors";
import { TimeContext } from "@/components/provider/TimeSettingProvider";

import Days from "./Days";
import Week from "./Week";
import Header from "./Header";

const Calendar = () => {
  const { endYearValue, endMonthValue } = React.useContext(TimeContext);
  const [selectedYear, setSelectedYear] = React.useState(+endYearValue);
  const [selectedMonth, setSelectedMonth] = React.useState(+endMonthValue);

  const prevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((prev) => +prev - 1);
    } else {
      setSelectedMonth((prev) => +prev - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((prev) => +prev + 1);
    } else {
      setSelectedMonth((prev) => +prev + 1);
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
      <Days selectedYear={selectedYear} selectedMonth={selectedMonth} />
    </div>
  );
};

export default Calendar;

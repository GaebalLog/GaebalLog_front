import React from "react";

import { TEXT_COLOR } from "@/constants/global/colors";
import useModalController from "@/hooks/useModalController";

const styles = {
  wrapper: `grid grid-cols-7`,
  daysDiv: `h-[34px] flex items-center justify-center`,
  currentDays: `w-[34px] h-[34px] flex items-center justify-center`,
  surroundingDays: `w-[34px] h-[34px] flex items-center justify-center text-gray-400`,
};

interface DayProps {
  selectedDate: { year: number; month: number; day: number };
  selectedYear: number;
  selectedMonth: number;
  prevMonth: () => void;
  nextMonth: () => void;
  setYearValue: React.Dispatch<React.SetStateAction<string | number>>;
  setMonthValue: React.Dispatch<React.SetStateAction<string | number>>;
  setDaysValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const Days: React.FC<DayProps> = ({
  selectedDate,
  selectedYear,
  selectedMonth,
  prevMonth,
  nextMonth,
  setYearValue,
  setMonthValue,
  setDaysValue,
}) => {
  const { closeModal } = useModalController();

  const showDay = React.useMemo(() => {
    const lastMonthDate = new Date(selectedYear, selectedMonth - 1, 0);
    const MonthDate = new Date(selectedYear, selectedMonth, 0);
    const prevDate = lastMonthDate.getDate();
    const prevDay = lastMonthDate.getDay();
    const currentDate = MonthDate.getDate();
    return { prevDate, prevDay, currentDate };
  }, [selectedMonth, selectedYear]);

  const getCurrentDayBorderColor = (day: number) => {
    if (
      selectedDate.year === selectedYear &&
      selectedDate.month === selectedMonth &&
      selectedDate.day === day
    )
      return `rounded-full bg-[#967AC3] ${TEXT_COLOR.inverse}`;
  };

  const synchronizeInputNumber = (day: number) => {
    setYearValue(selectedYear);
    setMonthValue(selectedMonth);
    setDaysValue(day);
    closeModal("calendarModal");
  };

  const returnDays = () => {
    const previousMonthDays = returnPreviousMonthDays();
    const currentMonthDays = returnCurrentMonthDays();
    const nextMonthDays = returnNextMonthDays(
      previousMonthDays.length + currentMonthDays.length,
    );

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const returnPreviousMonthDays = () => {
    const days = [];
    for (
      let p = showDay.prevDay === 6 ? 32 : showDay.prevDate - showDay.prevDay;
      p <= showDay.prevDate;
      p++
    ) {
      days.push(
        <div
          data-testid={`prevMonthDay_${p}`}
          key={`prevMonthDay_${p}`}
          onClick={prevMonth}
          className={styles.daysDiv}
        >
          <p className={styles.surroundingDays}>{p}</p>
        </div>,
      );
    }
    return days;
  };

  const returnCurrentMonthDays = () => {
    const days = [];
    for (let i = 1; i <= showDay.currentDate; i++) {
      days.push(
        <div
          key={i}
          onClick={() => synchronizeInputNumber(i)}
          className={styles.daysDiv}
        >
          <p className={`${styles.currentDays} ${getCurrentDayBorderColor(i)}`}>
            {i}
          </p>
        </div>,
      );
    }
    return days;
  };

  const returnNextMonthDays = (dayArrLength: number) => {
    const days = [];
    for (let n = 1; n <= 42 - dayArrLength; n++) {
      days.push(
        <div
          data-testid={`nextMonthDay_${n}`}
          key={`nextMonthDay_${n}`}
          onClick={nextMonth}
          className={styles.daysDiv}
        >
          <p className={styles.surroundingDays}>{n}</p>
        </div>,
      );
    }
    return days;
  };

  return <div className={styles.wrapper}>{returnDays()}</div>;
};

export default Days;

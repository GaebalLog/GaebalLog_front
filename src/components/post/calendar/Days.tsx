import React from "react";

import { TEXT_COLOR } from "@/constants/global/colors";
import useModalController from "@/hooks/useModalController";
import { CalendarManager } from "@/utils/util-date";

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
  setDateValue: React.Dispatch<React.SetStateAction<string | number>>;
}

const Days: React.FC<DayProps> = ({
  selectedDate,
  selectedYear,
  selectedMonth,
  prevMonth,
  nextMonth,
  setYearValue,
  setMonthValue,
  setDateValue,
}) => {
  const { closeModal } = useModalController();
  const calendarManager = new CalendarManager(selectedYear, selectedMonth);

  const getSelectedDayBorderColor = (day: number) => {
    if (
      selectedDate.year === selectedYear &&
      selectedDate.month === selectedMonth &&
      selectedDate.day === day
    )
      return `rounded-full bg-[#967AC3] ${TEXT_COLOR.inverse}`;
  };

  const synchronizeInputNumber = (day: number) => {
    if (calendarManager.isPastDate(day)) return alert("이미 지난 날짜입니다.");
    setYearValue(selectedYear);
    setMonthValue(selectedMonth);
    setDateValue(day);
    closeModal("calendarModal");
  };

  const returnDays = () => {
    const previousMonthDays = returnPreviousMonthDays();
    const currentMonthDays = returnCurrentMonthDays();
    const sumPrevCurrenDay = previousMonthDays.length + currentMonthDays.length;
    const nextMonthDays = returnNextMonthDays(sumPrevCurrenDay);

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const returnPreviousMonthDays = () => {
    const days = [];
    for (
      let p =
        calendarManager.getPrevMonthLastDay() === 6
          ? 32
          : calendarManager.getPrevMonthLastDate() -
            calendarManager.getPrevMonthLastDay();
      p <= calendarManager.getPrevMonthLastDate();
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
    for (let i = 1; i <= calendarManager.getCurrentMonthLastDate(); i++) {
      days.push(
        <div
          key={i}
          onClick={() => synchronizeInputNumber(i)}
          className={styles.daysDiv}
        >
          <p
            data-testid={`currentMonthDay_${i}`}
            className={`${styles.currentDays} ${getSelectedDayBorderColor(i)}`}
          >
            {i}
          </p>
        </div>,
      );
    }
    return days;
  };

  const returnNextMonthDays = (sumPrevCurrenDay: number) => {
    const days = [];
    for (let n = 1; n <= 42 - sumPrevCurrenDay; n++) {
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

import React from "react";

import useModalController from "@/hooks/useModalController";
import { CalendarManager } from "@/utils/util-date";

const styles = {
  wrapper: `grid grid-cols-7`,
  daysDiv: `h-[34px] flex items-center justify-center`,
  currentDays: `w-[34px] h-[34px] flex items-center justify-center`,
  surroundingDays: `w-[34px] h-[34px] flex items-center justify-center text-gray-400`,
};

interface DayProps {
  selectedDate: { year: number; month: number; date: number };
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
  const calendarManager = new CalendarManager(
    selectedYear,
    selectedMonth,
    selectedDate,
  );

  //
  const synchronizeInputNumber = (day: number) => {
    if (calendarManager.isPastDate(day)) return alert("이미 지난 날짜입니다.");
    setYearValue(selectedYear);
    setMonthValue(selectedMonth);
    setDateValue(day);
    closeModal("calendarModal");
  };

  //
  const returnDays = () => {
    const previousMonthDays = returnPreviousMonthDays();
    const currentMonthDays = returnCurrentMonthDays();
    const nextMonthDays = returnNextMonthDays();
    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const returnPreviousMonthDays = () => {
    return calendarManager.getPreviousMonthDays().map((p) => (
      <div
        data-testid={`prevMonthDay_${p}`}
        key={`prevMonthDay_${p}`}
        onClick={prevMonth}
        className={styles.daysDiv}
      >
        <p className={styles.surroundingDays}>{p}</p>
      </div>
    ));
  };
  const returnCurrentMonthDays = () => {
    return calendarManager.getCurrentMonthDays().map((i) => (
      <div
        key={i}
        onClick={() => synchronizeInputNumber(i)}
        className={styles.daysDiv}
      >
        <p
          data-testid={`currentMonthDay_${i}`}
          className={`${styles.currentDays} ${calendarManager.isSelectedDate(
            i,
          )}`}
        >
          {i}
        </p>
      </div>
    ));
  };
  const returnNextMonthDays = () => {
    const sumPrevCurrentDay = calendarManager.getSumOfPrevAndCurrentDays();
    return calendarManager.getNextMonthDays(sumPrevCurrentDay).map((n) => (
      <div
        data-testid={`nextMonthDay_${n}`}
        key={`nextMonthDay_${n}`}
        onClick={nextMonth}
        className={styles.daysDiv}
      >
        <p className={styles.surroundingDays}>{n}</p>
      </div>
    ));
  };
  //

  return <div className={styles.wrapper}>{returnDays()}</div>;
};

export default Days;

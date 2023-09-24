import React from "react";

import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import CalendarManager from "@/utils/util-calendarManager";

const styles = {
  wrapper: `grid grid-cols-7`,
  daysDiv: `h-[34px] flex items-center justify-center`,
  currentDays: `w-full h-[21px] flex items-center justify-center`,
  surroundingDays: `w-full h-[21px] flex items-center justify-center text-gray-400`,
};

interface DayProps {
  selectedYear: number;
  selectedMonth: number;
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

const Days: React.FC<DayProps> = ({
  selectedYear,
  selectedMonth,
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
  const [selectedDates, setSelectedDates] = React.useState([
    {
      year: startYearValue,
      month: startMonthValue,
      date: startDateValue,
    },
    {
      year: endYearValue,
      month: endMonthValue,
      date: endDateValue,
    },
  ]);

  const calendarManager = new CalendarManager(
    selectedYear,
    selectedMonth,
    endDateValue,
  );

  //
  const handleDateSelection = (day: number) => {
    if (calendarManager.isPastDate(day)) return alert("이미 지난 날짜입니다.");

    const isDateSelected = selectedDates.some(
      (d) =>
        d.year === selectedYear && d.month === selectedMonth && d.date === day,
    );

    if (isDateSelected) {
      setSelectedDates((prev) =>
        prev.filter(
          (d) =>
            !(
              d.year === selectedYear &&
              d.month === selectedMonth &&
              d.date === day
            ),
        ),
      );
    } else if (selectedDates.length < 2) {
      setSelectedDates((prev) => [
        ...prev,
        { year: selectedYear, month: selectedMonth, date: day },
      ]);
    } else if (
      selectedDates.length === 2 &&
      selectedDates[0].year === selectedDates[1].year &&
      selectedDates[0].month === selectedDates[1].month &&
      selectedDates[0].date === selectedDates[1].date
    ) {
      setSelectedDates([
        selectedDates[0],
        { year: selectedYear, month: selectedMonth, date: day },
      ]);
    }
  };

  //
  const returnDays = () => {
    const previousMonthDays = returnPreviousMonthDays();
    const currentMonthDays = returnCurrentMonthDays();
    return [...previousMonthDays, ...currentMonthDays];
  };

  const returnPreviousMonthDays = () => {
    return calendarManager.getPreviousMonthDays().map((p) => (
      <div key={`prevMonthDay_${p}`} className={styles.daysDiv}>
        <p className={styles.surroundingDays} />
      </div>
    ));
  };
  const returnCurrentMonthDays = () => {
    return calendarManager.getCurrentMonthDays().map((i) => {
      const isSameMonthForStartEnd =
        selectedDates[0]?.year &&
        selectedDates[1]?.year &&
        selectedDates[0]?.month &&
        selectedDates[1]?.month &&
        i >= selectedDates[0]?.date &&
        i <= selectedDates[1]?.date;

      const isMonthOfStart =
        selectedYear === selectedDates[0]?.year &&
        selectedMonth === selectedDates[0]?.month &&
        (selectedDates[1]?.year > selectedDates[0]?.year ||
          selectedDates[1]?.month > selectedDates[0]?.month) &&
        i >= selectedDates[0]?.date;

      const isMonthBetweenDates =
        (selectedDates[1] &&
          selectedYear > selectedDates[0]?.year &&
          selectedDates[1]?.year > selectedDates[0]?.year &&
          selectedMonth < selectedDates[1]?.month) ||
        (selectedYear === selectedDates[0]?.year &&
          selectedDates[1]?.year > selectedDates[0]?.year &&
          selectedMonth > selectedDates[0]?.month) ||
        (selectedDates[0]?.year === selectedDates[1]?.year &&
          selectedMonth > selectedDates[0]?.month &&
          selectedMonth < selectedDates[1]?.month);

      const isMonthOfEnd =
        selectedYear === selectedDates[1]?.year &&
        selectedMonth === selectedDates[1]?.month &&
        (selectedDates[1]?.year > selectedDates[0]?.year ||
          selectedDates[1]?.month > selectedDates[0]?.month) &&
        i <= selectedDates[1]?.date;

      const isInitialState =
        selectedDates[0]?.year === selectedDates[1]?.year &&
        selectedDates[0]?.month === selectedDates[1]?.month &&
        selectedDates[0]?.date === selectedDates[1]?.date;

      const isSelected = selectedDates.some(
        (d) =>
          d.year === selectedYear && d.month === selectedMonth && d.date === i,
      );
      return (
        <div
          key={i}
          onClick={() => handleDateSelection(i)}
          className={styles.daysDiv}
        >
          <div
            data-testid={`currentMonthDayStyle_${i}`}
            className={`${styles.currentDays} ${`${
              (isSameMonthForStartEnd ||
                isMonthOfStart ||
                isMonthBetweenDates ||
                isMonthOfEnd) &&
              !isInitialState &&
              BG_COLOR.general04
            }`} ${
              selectedYear === selectedDates[0]?.year &&
              selectedMonth === selectedDates[0]?.month &&
              i === selectedDates[0]?.date &&
              "ml-1 pr-1 rounded-l-full"
            } ${
              selectedYear === selectedDates[1]?.year &&
              selectedMonth === selectedDates[1]?.month &&
              i === selectedDates[1]?.date &&
              "mr-1 pl-1 rounded-r-full"
            }`}
          >
            <p
              data-testid={`currentMonthDay_${i}`}
              className={`${
                isSelected
                  ? `w-[34px] h-[34px] flex justify-center items-center rounded-full bg-[#967AC3] ${TEXT_COLOR.inverse}`
                  : ""
              }`}
            >
              {i}
            </p>
          </div>
        </div>
      );
    });
  };

  React.useEffect(() => {
    const [start, end] = selectedDates.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      if (a.month !== b.month) {
        return a.month - b.month;
      }
      return a.date - b.date;
    });

    if (start) {
      setStartYearValue(start.year);
      setStartMonthValue(start.month);
      setStartDateValue(start.date);
    }
    if (start && !end) {
      setEndYearValue(start.year);
      setEndMonthValue(start.month);
      setEndDateValue(start.date);
    }
    if (end) {
      setEndYearValue(end.year);
      setEndMonthValue(end.month);
      setEndDateValue(end.date);
    }
  }, [selectedDates]);

  return <div className={styles.wrapper}>{returnDays()}</div>;
};

export default Days;

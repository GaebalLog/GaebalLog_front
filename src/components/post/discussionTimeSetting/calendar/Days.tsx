import React from "react";

import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import CalendarManager from "@/utils/util-calendarManager";
import useCalendarController from "@/hooks/TimeSetting/useCalendarController";

const styles = {
  wrapper: `grid grid-cols-7`,
  daysDiv: `h-[34px] flex items-center justify-center`,
  selectedMonthDays: `w-full h-[21px] flex items-center justify-center`,
  otherMonthDays: `w-full h-[21px] flex items-center justify-center text-gray-400`,
  selectedStartDay: `ml-1 pr-1 rounded-l-full`,
  selectedEndDay: `mr-1 pl-1 rounded-r-full`,
  selectedDay: `w-[34px] h-[34px] flex justify-center items-center rounded-full bg-[#967AC3] ${TEXT_COLOR.inverse}`,
};

interface DayProps {
  selectedYear: number;
  selectedMonth: number;
  startDate: {
    startYearValue: number;
    startMonthValue: number;
    startDateValue: number;
    setStartYearValue: React.Dispatch<React.SetStateAction<string | number>>;
    setStartMonthValue: React.Dispatch<React.SetStateAction<string | number>>;
    setStartDateValue: React.Dispatch<React.SetStateAction<string | number>>;
  };
  endDate: {
    endYearValue: number;
    endMonthValue: number;
    endDateValue: number;
    setEndYearValue: React.Dispatch<React.SetStateAction<string | number>>;
    setEndMonthValue: React.Dispatch<React.SetStateAction<string | number>>;
    setEndDateValue: React.Dispatch<React.SetStateAction<string | number>>;
  };
}

const Days: React.FC<DayProps> = ({
  selectedYear,
  selectedMonth,
  startDate,
  endDate,
}) => {
  const { startYearValue, startMonthValue, startDateValue } = startDate;
  const { endYearValue, endMonthValue, endDateValue } = endDate;
  const [selectedDates, setSelectedDates] = React.useState<selectedDates[]>([
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

  const { handleDateSelection } = useCalendarController({
    selectedYear,
    selectedMonth,
    selectedDates,
    setSelectedDates,
    calendarManager,
    startDate,
    endDate,
  });

  const returnDays = () => {
    const previousMonthDays = returnPreviousMonthDays();
    const currentMonthDays = returnSelectedMonthDays();
    return [...previousMonthDays, ...currentMonthDays];
  };

  const returnPreviousMonthDays = () => {
    return calendarManager.getPreviousMonthDays().map((p) => (
      <div key={`prevMonthDay_${p}`} className={styles.daysDiv}>
        <p className={styles.otherMonthDays} />
      </div>
    ));
  };
  const returnSelectedMonthDays = () => {
    return calendarManager.getCurrentMonthDays().map((i) => {
      const isEndDate = calendarManager.isEndDate(selectedDates, i);
      const isSelected = calendarManager.isSelected(selectedDates, i);
      const isStartDate = calendarManager.isStartDate(selectedDates, i);
      const isInitialState = calendarManager.isInitialState(selectedDates);
      const isBetweenSelectedDates = calendarManager.isBetweenSelectedDates(
        selectedDates,
        i,
      );

      return (
        <div
          key={i}
          onClick={() => handleDateSelection(i)}
          className={styles.daysDiv}
        >
          <div
            data-testid={`selectedMonthDayStyle_${i}`}
            className={`${styles.selectedMonthDays} ${`${
              isBetweenSelectedDates && !isInitialState
                ? BG_COLOR.general04
                : ""
            }`} ${isStartDate ? styles.selectedStartDay : ""} ${
              isEndDate ? styles.selectedEndDay : ""
            }`}
          >
            <p
              data-testid={`selectedMonthDay_${i}`}
              className={`${isSelected ? styles.selectedDay : ""}`}
            >
              {i}
            </p>
          </div>
        </div>
      );
    });
  };

  return <div className={styles.wrapper}>{returnDays()}</div>;
};

export default Days;

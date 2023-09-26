import React from "react";

import type CalendarManager from "@/utils/util-calendarManager";
import { TimeContext } from "@/components/provider/TimeSettingProvider";

interface parameter {
  selectedYear: number;
  selectedMonth: number;
  selectedDates: selectedDates[];
  setSelectedDates: React.Dispatch<React.SetStateAction<selectedDates[]>>;
  calendarManager: CalendarManager;
}

const useCalendarController = ({
  selectedYear,
  selectedMonth,
  selectedDates,
  setSelectedDates,
  calendarManager,
}: parameter) => {
  const {
    setStartYearValue,
    setStartMonthValue,
    setStartDateValue,
    setEndYearValue,
    setEndMonthValue,
    setEndDateValue,
  } = React.useContext(TimeContext);

  const handleDateSelection = (day: number) => {
    if (calendarManager.isPastDate(day)) return alert("이미 지난 날짜입니다.");

    const isDateSelected = calendarManager.isSelected(selectedDates, day);

    if (isDateSelected) {
      removeSelectedDate(day);
    } else if (selectedDates.length < 2) {
      addSelectedDate(day);
    } else if (
      selectedDates.length === 2 &&
      isSameDate(selectedDates[0], selectedDates[1])
    ) {
      updateSelectedEndDate(day);
    }
  };

  const isSameDate = (startDate: selectedDates, endDate: selectedDates) => {
    return (
      startDate.year === endDate.year &&
      startDate.month === endDate.month &&
      startDate.date === endDate.date
    );
  };
  const removeSelectedDate = (day: number) => {
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
  };
  const addSelectedDate = (day: number) => {
    setSelectedDates((prev) => [
      ...prev,
      { year: selectedYear, month: selectedMonth, date: day },
    ]);
  };
  const updateSelectedEndDate = (day: number) => {
    setSelectedDates([
      selectedDates[0],
      { year: selectedYear, month: selectedMonth, date: day },
    ]);
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
      setStartYearValue(start.year + "");
      setStartMonthValue(start.month + "");
      setStartDateValue(start.date + "");
    }
    if (start && !end) {
      setEndYearValue(start.year + "");
      setEndMonthValue(start.month + "");
      setEndDateValue(start.date + "");
    }
    if (end) {
      setEndYearValue(end.year + "");
      setEndMonthValue(end.month + "");
      setEndDateValue(end.date + "");
    }
  }, [selectedDates]);

  return { handleDateSelection };
};

export default useCalendarController;

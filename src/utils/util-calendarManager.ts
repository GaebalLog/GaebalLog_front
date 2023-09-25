// import { TEXT_COLOR } from "@/constants/global/colors";

export default class CalendarManager {
  private selectedYear: number;
  private selectedMonth: number;
  private selectedDate: number;

  constructor(
    selectedYear: number,
    selectedMonth: number,
    selectedDate: number,
  ) {
    this.selectedYear = selectedYear;
    this.selectedMonth = selectedMonth;
    this.selectedDate = selectedDate;
  }

  isPastDate(selectedDay: number): boolean {
    const today = new Date();
    const selectedDateInTime = new Date(
      this.selectedYear,
      this.selectedMonth,
      selectedDay,
    ).getTime();
    const todayInTime = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ).getTime();
    return selectedDateInTime < todayInTime;
  }

  getPrevMonth() {
    return new Date(this.selectedYear, this.selectedMonth - 1, 0);
  }

  getCurrentMonth() {
    return new Date(this.selectedYear, this.selectedMonth, 0);
  }

  getPrevMonthLastDate(): number {
    return this.getPrevMonth().getDate();
  }

  getPrevMonthLastDay(): number {
    return this.getPrevMonth().getDay();
  }

  private getCurrentMonthLastDate(): number {
    return this.getCurrentMonth().getDate();
  }

  private isSameMonthForStartEnd(
    selectedDates: selectedDates[],
    i: number,
  ): boolean {
    return (
      this.selectedYear === selectedDates[0]?.year &&
      this.selectedMonth === selectedDates[0]?.month &&
      selectedDates[0]?.year === selectedDates[1]?.year &&
      selectedDates[0]?.month === selectedDates[1]?.month &&
      i >= selectedDates[0]?.date &&
      i <= selectedDates[1]?.date
    );
  }

  private isMonthOfStart(selectedDates: selectedDates[], i: number): boolean {
    return (
      this.selectedYear === selectedDates[0]?.year &&
      this.selectedMonth === selectedDates[0]?.month &&
      (selectedDates[1]?.year > selectedDates[0]?.year ||
        selectedDates[1]?.month > selectedDates[0]?.month) &&
      i >= selectedDates[0]?.date
    );
  }

  private isMonthBetweenDates(selectedDates: selectedDates[]): boolean {
    return (
      (selectedDates[1] &&
        this.selectedYear > selectedDates[0]?.year &&
        selectedDates[1]?.year > selectedDates[0]?.year &&
        this.selectedMonth < selectedDates[1]?.month) ||
      (this.selectedYear === selectedDates[0]?.year &&
        selectedDates[1]?.year > selectedDates[0]?.year &&
        this.selectedMonth > selectedDates[0]?.month) ||
      (selectedDates[0]?.year === selectedDates[1]?.year &&
        this.selectedMonth > selectedDates[0]?.month &&
        this.selectedMonth < selectedDates[1]?.month)
    );
  }

  private isMonthOfEnd(selectedDates: selectedDates[], i: number): boolean {
    return (
      this.selectedYear === selectedDates[1]?.year &&
      this.selectedMonth === selectedDates[1]?.month &&
      (selectedDates[1]?.year > selectedDates[0]?.year ||
        selectedDates[1]?.month > selectedDates[0]?.month) &&
      i <= selectedDates[1]?.date
    );
  }

  isInitialState(selectedDates: selectedDates[]): boolean {
    return (
      selectedDates[0]?.year === selectedDates[1]?.year &&
      selectedDates[0]?.month === selectedDates[1]?.month &&
      selectedDates[0]?.date === selectedDates[1]?.date
    );
  }

  isSelected(selectedDates: selectedDates[], i: number): boolean {
    return selectedDates.some(
      (d) =>
        d.year === this.selectedYear &&
        d.month === this.selectedMonth &&
        d.date === i,
    );
  }

  isBetweenSelectedDates(selectedDates: selectedDates[], i: number): boolean {
    return (
      this.isSameMonthForStartEnd(selectedDates, i) ||
      this.isMonthOfStart(selectedDates, i) ||
      this.isMonthBetweenDates(selectedDates) ||
      this.isMonthOfEnd(selectedDates, i)
    );
  }

  isStartDate(selectedDates: selectedDates[], i: number): boolean {
    return (
      this.selectedYear === selectedDates[0]?.year &&
      this.selectedMonth === selectedDates[0]?.month &&
      i === selectedDates[0]?.date
    );
  }

  isEndDate(selectedDates: selectedDates[], i: number): boolean {
    return (
      this.selectedYear === selectedDates[1]?.year &&
      this.selectedMonth === selectedDates[1]?.month &&
      i === selectedDates[1]?.date
    );
  }

  getPreviousMonthDays(): number[] {
    const days = [];
    for (
      let p =
        this.getPrevMonthLastDay() === 6
          ? 32
          : this.getPrevMonthLastDate() - this.getPrevMonthLastDay();
      p <= this.getPrevMonthLastDate();
      p++
    ) {
      days.push(p);
    }
    return days;
  }

  getCurrentMonthDays(): number[] {
    const days = [];
    for (let i = 1; i <= this.getCurrentMonthLastDate(); i++) {
      days.push(i);
    }
    return days;
  }

  getSumOfPrevAndCurrentDays(): number {
    return (
      this.getPreviousMonthDays().length + this.getCurrentMonthDays().length
    );
  }
}

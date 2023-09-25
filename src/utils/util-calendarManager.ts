import { TEXT_COLOR } from "@/constants/global/colors";

export default class CalendarManager {
  private selectedYear: number;
  private selectedMonth: number;
  private selectedDate: {
    year: number;
    month: number;
    date: number;
  };

  constructor(
    selectedYear: number,
    selectedMonth: number,
    selectedDate: { year: number; month: number; date: number },
  ) {
    this.selectedYear = selectedYear;
    this.selectedMonth = selectedMonth;
    this.selectedDate = selectedDate;
  }

  isPastDate(selectedDay: number): boolean {
    const today = new Date();
    const selectedDateInTime = new Date(
      this.selectedYear,
      this.selectedMonth - 1,
      selectedDay,
    ).getTime();
    const todayInTime = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
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

  isSelectedDate(day: number) {
    if (
      this.selectedDate.year === this.selectedYear &&
      this.selectedDate.month === this.selectedMonth &&
      this.selectedDate.date === day
    )
      return `rounded-full bg-[#967AC3] ${TEXT_COLOR.inverse}`;
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

  getNextMonthDays(sumPrevCurrentDay: number): number[] {
    const days = [];
    for (let n = 1; n <= 42 - sumPrevCurrentDay; n++) {
      days.push(n);
    }
    return days;
  }
}

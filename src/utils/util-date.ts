import { TEXT_COLOR } from "@/constants/global/colors";

export class CalendarManager {
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

  isPastDate(selectedDay: number) {
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

  getPrevMonthLastDate() {
    return this.getPrevMonth().getDate();
  }

  getPrevMonthLastDay() {
    return this.getPrevMonth().getDay();
  }

  getCurrentMonthLastDate() {
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

//
export class DateConvertor {
  private year: number;
  private month: number;
  private date: number;
  private halfDay: string;
  private hour: number;
  private minutes: number;

  constructor(
    year: number,
    month: number,
    date: number,
    halfDay: string,
    hour: number,
    minutes: number,
  ) {
    this.year = year;
    this.month = month;
    this.date = date;
    this.hour = hour;
    this.halfDay = halfDay;
    this.minutes = minutes;
  }

  convertTo24Hour(): number {
    return this.halfDay === "오후" ? +this.hour + 12 : +this.hour;
  }

  convertToISOString() {
    const convertedHour = this.convertTo24Hour();
    return new Date(
      this.year,
      this.month - 1,
      this.date,
      convertedHour,
      this.minutes,
    ).toISOString();
  }
}

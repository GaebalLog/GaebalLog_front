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
  private hour: number;
  private minutes: number;

  constructor(dateTimeString: string) {
    const [datePart, timePart] = dateTimeString.split(" ");

    const [year, month, date] = datePart.split("-").map(Number);
    this.year = year;
    this.month = month;
    this.date = date;

    const [hour, minutes] = timePart.split(":").map(Number);
    this.hour = hour;
    this.minutes = minutes;
  }

  static separatedValues(
    year: number,
    month: number,
    date: number,
    halfDay: string,
    hour: number,
    minutes: number,
  ): DateConvertor {
    const adjustedHour = halfDay === "오후" ? hour + 12 : hour;
    const dateTimeString = `${year}-${month}-${date} ${adjustedHour}:${minutes}`;
    return new DateConvertor(dateTimeString);
  }

  convertToISOString(): string {
    return new Date(
      this.year,
      this.month - 1,
      this.date,
      this.hour,
      this.minutes,
    ).toISOString();
  }

  private calculateTimeGap(): number {
    const createdTime = new Date(
      this.year,
      this.month - 1,
      this.date,
      this.hour,
      this.minutes,
    );
    const now = new Date();
    return now.getTime() - createdTime.getTime();
  }

  private getTimeDifference() {
    const timeGap = this.calculateTimeGap();

    if (timeGap < 0) return "잘못된 시간입니다.";
    if (timeGap < 60 * 1000) return "방금 전";
    if (timeGap < 60 * 60 * 1000)
      return `${Math.floor(timeGap / (60 * 1000))}분 전`;

    return null;
  }

  formatWithDot() {
    const timeDiff = this.getTimeDifference();
    if (timeDiff) return timeDiff;

    return `${this.year}.${this.month}.${this.date}`;
  }

  formatWithLongDate() {
    const timeDiff = this.getTimeDifference();
    if (timeDiff) return timeDiff;

    return `${this.year}년 ${this.month}월 ${this.date}일`;
  }

  formatWithLongTermDifference() {
    const timeGap = this.calculateTimeGap();
    const days = Math.round(timeGap / (24 * 60 * 60 * 1000));

    if (days > 365) return `${Math.round(days / 365)}년 전`;
    if (days > 30) return `${Math.round(days / 30)}달 전`;
    if (days > 7) return `${Math.round(days / 7)}주 전`;
    else return this.getTimeDifference();
  }
}

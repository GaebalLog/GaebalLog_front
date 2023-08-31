export class Today {
  private year: number;
  private month: number;
  private date: number;
  private lastDate: number;

  constructor() {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.date = today.getDate();
    this.lastDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    ).getDate();
  }

  getYear(): number {
    return this.year;
  }

  getMonth(): number {
    return this.month;
  }

  getDate(): number {
    return this.date;
  }

  getLastDate(): number {
    return this.lastDate;
  }
}

//
export class CalendarManager extends Today {
  private selectedYear: number;
  private selectedMonth: number;

  constructor(selectedYear: number, selectedMonth: number) {
    super();
    this.selectedYear = selectedYear;
    this.selectedMonth = selectedMonth;
  }

  getSelectedYear(): number {
    return this.selectedYear;
  }

  getSelectedMonth(): number {
    return this.selectedMonth;
  }

  isPastDate(selectedDay: number) {
    const selectedDateInTime = new Date(
      this.selectedYear,
      this.selectedMonth - 1,
      selectedDay,
    ).getTime();
    const todayInTime = new Date(
      this.getYear(),
      this.getMonth() - 1,
      this.getDate(),
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
}

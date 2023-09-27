class TimeSettingManager {
  currentDate: string;
  currentDatePlus15: string;

  constructor(currentDate?: string, currentDatePlus15?: string) {
    const current = new Date();
    this.currentDate = currentDate || current.toISOString();
    this.currentDatePlus15 =
      currentDatePlus15 ||
      new Date(current.getTime() + 15 * 60 * 1000).toISOString();
  }

  private get parsedStartDate(): Date {
    return new Date(this.currentDate);
  }
  private get parsedEndDate(): Date {
    return new Date(this.currentDatePlus15);
  }

  get calculatedStartHour(): number {
    const hour = this.parsedStartDate.getHours();
    return hour <= 12 ? hour : hour - 12;
  }
  get calculatedEndHour(): number {
    const hour = this.parsedEndDate.getHours();
    return hour <= 12 ? hour : hour - 12;
  }

  get startDateHalfDay(): "오전" | "오후" {
    return this.parsedStartDate.getHours() < 12 ? "오전" : "오후";
  }
  get endDateHalfDay(): "오전" | "오후" {
    return this.parsedEndDate.getHours() < 12 ? "오전" : "오후";
  }

  get startDateMinutes(): number {
    return this.parsedStartDate.getMinutes();
  }
  get endDateMinutes(): number {
    return this.parsedEndDate.getMinutes();
  }

  get startDateYear(): number {
    return this.parsedStartDate.getFullYear();
  }
  get endDateYear(): number {
    return this.parsedEndDate.getFullYear();
  }

  get startDateMonth(): number {
    return this.parsedStartDate.getMonth() + 1;
  }
  get endDateMonth(): number {
    return this.parsedEndDate.getMonth() + 1;
  }

  get startDateDate(): number {
    return this.parsedStartDate.getDate();
  }
  get endDateDate(): number {
    return this.parsedEndDate.getDate();
  }

  get isDifferenceLessThan15Minutes(): boolean {
    const selectedStartDate = this.parsedStartDate.getTime();
    const selectedEndDate = this.parsedEndDate.getTime();

    if (selectedStartDate > selectedEndDate) {
      return false;
    }

    const difference = selectedEndDate - selectedStartDate;
    return difference >= 0 && difference <= 14 * 60 * 1000;
  }
}

export default TimeSettingManager;

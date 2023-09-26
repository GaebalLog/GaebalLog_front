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

  get startTimeHalfDay(): "오전" | "오후" {
    return this.parsedStartDate.getHours() < 12 ? "오전" : "오후";
  }
  get endTimeHalfDay(): "오전" | "오후" {
    return this.parsedEndDate.getHours() < 12 ? "오전" : "오후";
  }

  get startTimeMinutes(): number {
    return this.parsedStartDate.getMinutes();
  }
  get endTimeMinutes(): number {
    return this.parsedEndDate.getMinutes();
  }

  get startTimeYear(): number {
    return this.parsedStartDate.getFullYear();
  }
  get endTimeYear(): number {
    return this.parsedEndDate.getFullYear();
  }

  get startTimeMonth(): number {
    return this.parsedStartDate.getMonth() + 1;
  }
  get endTimeMonth(): number {
    return this.parsedEndDate.getMonth() + 1;
  }

  get startTimeDate(): number {
    return this.parsedStartDate.getDate();
  }
  get endTimeDate(): number {
    return this.parsedEndDate.getDate();
  }
}

export default TimeSettingManager;

class TimeSettingManager {
  currentTime: string;
  currentTimePlus15: string;

  constructor(currentTime?: string, currentTimePlus15?: string) {
    const current = new Date();
    this.currentTime = currentTime || current.toISOString();
    this.currentTimePlus15 =
      currentTimePlus15 ||
      new Date(current.getTime() + 15 * 60 * 1000).toISOString();
  }

  get parsedStartTime(): Date {
    return new Date(this.currentTime);
  }
  get parsedEndTime(): Date {
    return new Date(this.currentTimePlus15);
  }

  get calculatedStartHour(): number {
    const hour = this.parsedStartTime.getHours();
    return hour <= 12 ? hour : hour - 12;
  }
  get calculatedEndHour(): number {
    const hour = this.parsedEndTime.getHours();
    return hour <= 12 ? hour : hour - 12;
  }

  get startTimeHalfDay(): "오전" | "오후" {
    return this.parsedStartTime.getHours() < 12 ? "오전" : "오후";
  }
  get endTimeHalfDay(): "오전" | "오후" {
    return this.parsedEndTime.getHours() < 12 ? "오전" : "오후";
  }

  get startTimeMinutes(): number {
    return this.parsedStartTime.getMinutes();
  }
  get endTimeMinutes(): number {
    return this.parsedEndTime.getMinutes();
  }

  get startTimeYear(): number {
    return this.parsedStartTime.getFullYear();
  }
  get endTimeYear(): number {
    return this.parsedEndTime.getFullYear();
  }

  get startTimeMonth(): number {
    return this.parsedStartTime.getMonth() + 1;
  }
  get endTimeMonth(): number {
    return this.parsedEndTime.getMonth() + 1;
  }

  get startTimeDate(): number {
    return this.parsedStartTime.getDate();
  }
  get endTimeDate(): number {
    return this.parsedEndTime.getDate();
  }
}

export default TimeSettingManager;

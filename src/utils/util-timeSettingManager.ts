class TimeSettingManager {
  currentTime: string;
  currentTimePlus15: string;

  constructor() {
    const current = new Date();
    this.currentTime = current.toISOString();
    this.currentTimePlus15 = new Date(current.getTime() + 15 * 60 * 1000) //
      .toISOString();
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
}

export default TimeSettingManager;

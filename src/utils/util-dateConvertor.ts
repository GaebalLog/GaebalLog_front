export default class DateConvertor {
  private year: number;
  private month: number;
  private date: number;
  private hour: number;
  private minutes: number;

  constructor(dateTimeString?: string) {
    if (!dateTimeString) {
      this.year = 0;
      this.month = 0;
      this.date = 0;
      this.hour = 0;
      this.minutes = 0;
      return;
    }

    if (dateTimeString.includes("T")) {
      const parsedDate = new Date(dateTimeString);
      this.year = parsedDate.getUTCFullYear();
      this.month = parsedDate.getUTCMonth() + 1;
      this.date = parsedDate.getUTCDate();
      this.hour = parsedDate.getUTCHours();
      this.minutes = parsedDate.getUTCMinutes();
    } else {
      const [datePart, timePart] = dateTimeString.split(" ");

      const [year, month, date] = datePart.split("-").map(Number);
      this.year = year;
      this.month = month;
      this.date = date;

      const [hour, minutes] = timePart.split(":").map(Number);
      this.hour = hour;
      this.minutes = minutes;
    }
  }

  static createLocalISOString(
    year: number,
    month: number,
    date: number,
    halfDay: string,
    hour: number,
    minutes: number,
  ): string {
    const adjustedHour = halfDay === "오후" ? hour + 12 : hour;

    const monthStr = String(month).padStart(2, "0");
    const dateStr = String(date).padStart(2, "0");
    const hourStr = String(adjustedHour).padStart(2, "0");
    const minuteStr = String(minutes).padStart(2, "0");

    return `${year}-${monthStr}-${dateStr}T${hourStr}:${minuteStr}:00.000Z`;
  }

  convertToLocalISOString(): string {
    const utcDate = new Date(
      this.year,
      this.month - 1,
      this.date,
      this.hour,
      this.minutes,
    );
    utcDate.setHours(utcDate.getHours() + 9);

    const yearStr = utcDate.getFullYear();
    const monthStr = String(utcDate.getMonth() + 1).padStart(2, "0");
    const dateStr = String(utcDate.getDate()).padStart(2, "0");
    const hourStr = String(utcDate.getHours()).padStart(2, "0");
    const minuteStr = String(utcDate.getMinutes()).padStart(2, "0");

    return `${yearStr}-${monthStr}-${dateStr}T${hourStr}:${minuteStr}:00.000Z`;
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

  private getTimeDifference(): string | null {
    const timeGap = this.calculateTimeGap();

    if (timeGap < 0) return "잘못된 시간입니다.";
    if (timeGap < 60 * 1000) return "방금 전";
    if (timeGap < 60 * 60 * 1000)
      return `${Math.floor(timeGap / (60 * 1000))}분 전`;
    if (timeGap < 24 * 60 * 60 * 1000)
      return `${Math.floor(timeGap / (60 * 60 * 1000))}시간 전`;

    return null;
  }

  formatWithDot(): string {
    const timeDiff = this.getTimeDifference();
    if (timeDiff) return timeDiff;

    return `${this.year}.${this.month}.${this.date}`;
  }

  formatWithLongDate(): string {
    const timeDiff = this.getTimeDifference();
    if (timeDiff) return timeDiff;

    return `${this.year}년 ${this.month}월 ${this.date}일`;
  }

  formatWithLongDateHour(): string {
    return `${this.year}년 ${this.month}월 ${this.date}일 ${this.hour}시`;
  }

  formatWithLongTermDifference(): string | null {
    const timeGap = this.calculateTimeGap();
    const days = Math.round(timeGap / (24 * 60 * 60 * 1000));

    if (days > 365) return `${Math.round(days / 365)}년 전`;
    if (days > 30) return `${Math.round(days / 30)}달 전`;
    if (days > 7) return `${Math.round(days / 7)}주 전`;
    if (days === 0) return this.getTimeDifference();
    else return `${days}일 전`;
  }
}

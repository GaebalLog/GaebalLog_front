interface optionType {
  toString: boolean;
}
const utilConvertTime = (createdAt: string, option?: optionType) => {
  const creatTime = new Date(createdAt);
  const now = new Date();
  const timeGap = now.getTime() - creatTime.getTime();

  if (timeGap < 60 * 60 * 1000)
    return `${Math.abs(Math.floor(timeGap / (60 * 1000)))}분 전`;
  else if (timeGap < 24 * 60 * 60 * 1000) {
    const hours = Math.round(timeGap / (60 * 60 * 1000));
    return `${hours}시간 전`;
  } else {
    if (option && option.toString) {
      const days = Math.round(timeGap / (60 * 60 * 24 * 1000));
      if (days > 365) return `${days / 365}년 전`;
      else if (days > 30) return `${days / 30}달 전`;
      else if (days > 7) return `${days / 7}주 전`;
      else return `${days}일 전`;
    } else {
      const year = creatTime.getUTCFullYear();
      let month = creatTime.getUTCMonth() + 1;
      let day = creatTime.getUTCDate();

      if (month < 10) month = Number("0" + month);
      if (day < 10) day = Number("0" + day);

      return `${year}.${month}.${day}`;
    }
  }
};

export default utilConvertTime;

const utilConvertTime = (createdAt: string) => {
  const creatTime = new Date(createdAt);
  const now = new Date();
  const timeGap = now.getTime() - creatTime.getTime();

  if (timeGap < 24 * 60 * 60 * 1000) {
    const hours = Math.round(timeGap / (60 * 60 * 1000));
    return `${hours}시간 전`;
  } else {
    const year = creatTime.getUTCFullYear();
    let month = creatTime.getUTCMonth() + 1;
    let day = creatTime.getUTCDate();

    if (month < 10) month = Number("0" + month);
    if (day < 10) day = Number("0" + day);

    return `${year}.${month}.${day}`;
  }
};

export default utilConvertTime;

export const utilDateKr = (isodate: string): string => {
  const date = new Date(isodate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하기 때문에 1을 더해야 합니다.
  const day = String(date.getDate()).padStart(2, "0");
  const hour = date.getUTCHours();

  return `${year}년 ${month}월 ${day}일 ${hour}시`;
};

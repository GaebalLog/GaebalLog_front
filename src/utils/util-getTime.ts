/**
 * 시간을 받아서 '몇시 몇분'양식으로 반환하는 함수
 * @param seconds 초단위 시간
 * @example
 * const timeOfLearning = getTime(3600); // 1시간
 */
const getTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let resultTime: string;

  if (hours < 0) resultTime = `${minutes}분`;
  else if (minutes > 0) resultTime = `${hours}시간 ${minutes}분`;
  else resultTime = "참여한지 1분도 안됨 ";

  return resultTime;
};
export default getTime;

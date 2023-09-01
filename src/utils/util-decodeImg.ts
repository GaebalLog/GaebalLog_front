export const utilDecodeImg = (content: string, imgArr: string[]): string => {
  return content.replace(/<IMG \d+>/g, (match) => {
    const matchedNumbers = match.match(/\d+/);

    if (!matchedNumbers) return match; // null 체크를 추가합니다.

    const index = parseInt(matchedNumbers[0], 10) - 1;

    if (index >= 0 && index < imgArr.length) {
      return imgArr[index];
    } else {
      return match;
    }
  });
};

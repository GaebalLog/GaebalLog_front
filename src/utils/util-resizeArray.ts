export const utilResizeArray = (array: object[], size: number) => {
  const results: object[][] = [];

  for (let i = 0; i < array?.length; i += size) {
    results.push(array?.slice(i, i + size));
  }

  return results;
};

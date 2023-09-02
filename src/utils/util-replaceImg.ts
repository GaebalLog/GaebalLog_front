export const utilReplaceImg = (content: string): string => {
  let count = 0;
  const result = content.replace(
    /<img\s+[^>]*?src="data:image\/[a-zA-Z+.-]+;base64,[a-zA-Z0-9+/=]+".*?\/?>/g,
    () => {
      count += 1;
      return `<IMG ${count}>`;
    },
  );
  return result;
};

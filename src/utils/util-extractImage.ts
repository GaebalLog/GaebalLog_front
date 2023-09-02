export const utilExtractImages = (content: string): string[] => {
  const regex = /data:image\/[a-zA-Z+.-]+;base64,[a-zA-Z0-9+/=]+/g;
  const matches = content.match(regex) || [];
  const result = matches.map((match) => `<img src="${match}">`);
  return result;
};

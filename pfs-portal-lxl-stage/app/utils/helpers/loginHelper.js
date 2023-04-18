export const maskMobile = number => {
  number = number.toString();
  return number.length > 6 ? number.replace(/^.{6}/g, 'xxxxxx') : number;
};

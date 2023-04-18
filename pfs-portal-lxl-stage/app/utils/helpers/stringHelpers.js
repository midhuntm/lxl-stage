export function nameToInitials(fullName) {
  const namesArray = fullName.split(' ');
  if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
  return `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(
    0
  )}`;
}

export function camelCaseToSentenceCase(text) {
  let result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const getFirstLetterInUpperCase = text => {
  if (typeof text !== 'string') return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// to capitalize the first letter of a word
export const capitalize = (name) => {
  let lowerCasedName = name.toLowerCase();
  return lowerCasedName.charAt(0).toUpperCase() + lowerCasedName.slice(1);
};

export const isEmpty = (str) => {
  if (typeof str === 'undefined' || str === null || str === '') {
    return true;
  }
  return false;
};

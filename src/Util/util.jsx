export const isEmpty = (obj) => {
  if (typeof obj === 'undefined' || obj === null || obj === '' || obj.length === 0) {
    return true;
  }
  return false;
};

export const isEmpty = (obj) => {
  if (typeof obj === 'undefined' || obj === null || obj === '' || obj.length === 0) {
    return true;
  }
  return false;
};

export const dateUtil = (arg) => {
  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
  const date = new Date(arg + TIME_ZONE).toISOString().split('T')[0];
  return date;
};

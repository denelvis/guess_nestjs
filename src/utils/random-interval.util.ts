export const randomInterval = (max = 20, min = 1): number => {
  return +(Math.random() * (max - min + 1) + min).toFixed(3);
};

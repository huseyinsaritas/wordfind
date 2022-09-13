export const randomItem = <T>(arr: T[]): T => {
  const i = Math.floor(Math.random() * arr.length);
  const item = arr[i];
  return item;
};

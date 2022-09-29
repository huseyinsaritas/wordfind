export const isValidWord = async (word: string) => {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(500); /// waiting 500 milisecond.
  // return word.startsWith("M");
  return true;
};

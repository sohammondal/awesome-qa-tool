export const sleep = (delay: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, delay));

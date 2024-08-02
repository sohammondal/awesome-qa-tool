export const generateUniqueId = (prefix = "") => {
  const timestamp = performance.now().toString(36); // Convert timestamp to base 36
  const random = Math.random().toString(36).substring(2, 9); // Generate a random string
  return prefix + timestamp + random;
};

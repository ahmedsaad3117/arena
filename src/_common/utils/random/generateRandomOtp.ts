export const genRandomOtp = (digit = 6) => {
  const min = 10 ** (digit - 1);
  const max = 10 ** digit - 1;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(randomNumber);
};

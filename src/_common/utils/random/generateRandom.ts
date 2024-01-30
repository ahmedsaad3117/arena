export const genRandomName = (type: string) => {
  const randomNumber = genRandomNumber(100000);
  return `${Date.now()}-${randomNumber}-${type}`;
};
export const genRandomNumber = (digit) => {
  const randomNumber = Math.floor(Math.random() * digit);
  return randomNumber;
};
export const genRandomCode = () => {
  const randomNumber = genRandomNumber(10000);
  return `${Date.now()}-${randomNumber}`;
};

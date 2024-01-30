export const parseStringToFloat = (amount: string | number): number => {
  if (typeof amount === "string") amount = parseFloat(amount);

  return amount;
};

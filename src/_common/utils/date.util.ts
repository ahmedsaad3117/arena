export const formatDate = (oldDate: string) => {
  return `${new Date(oldDate).getDate()}-${
    new Date(oldDate).getMonth() + 1
  }-${new Date(oldDate).getFullYear()}`;
};

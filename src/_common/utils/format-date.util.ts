export const formatDate = (date) => {
  const formatted_date = `${new Date(date).getDate()}-${
    new Date(date).getMonth() + 1
  }-${new Date(date).getFullYear()}`;
  return formatted_date;
};

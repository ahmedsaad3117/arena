export const explodeOrderByQuery = (orderBy: string) => {
  let order = {};
  let [orderByPart, orderTypePart] = orderBy.split(":");
  order[orderByPart] = orderTypePart;
  return order;
};

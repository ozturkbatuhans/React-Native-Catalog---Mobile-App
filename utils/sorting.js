export const SORT_KEYS = {
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
  RATING_DESC: "RATING_DESC",
};

export function applySort(items, sortKey) {
  const arr = [...items];
  switch (sortKey) {
    case SORT_KEYS.PRICE_ASC:
      return arr.sort((a, b) => a.price - b.price);
    case SORT_KEYS.PRICE_DESC:
      return arr.sort((a, b) => b.price - a.price);
    case SORT_KEYS.RATING_DESC:
    default:
      return arr.sort((a, b) => b.rating - a.rating);
  }
}

export function applyFilter(items, { query, inStockOnly, category }) {
  const q = (query || "").trim().toLowerCase();
  return items.filter((p) => {
    const okQuery = q ? String(p.title).toLowerCase().includes(q) : true;
    const okStock = inStockOnly ? Number(p.stock) > 0 : true;
    const okCategory = category && category !== "All" ? p.category === category : true;
    return okQuery && okStock && okCategory;
  });
}

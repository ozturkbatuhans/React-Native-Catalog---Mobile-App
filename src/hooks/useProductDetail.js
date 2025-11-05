import { useEffect, useRef, useState } from "react";

export function useProductDetail(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    console.log("[useProductDetail] mounted, id:", id);
    abortRef.current = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: abortRef.current.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json || null);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.log("[useProductDetail] fetch error:", e.message);
          setError(e);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => {
      console.log("[useProductDetail] unmounted → abort");
      abortRef.current?.abort();
    };
  }, [id]);

  const isEmpty = !loading && !error && !data;
  return { data, loading, error, isEmpty };
}

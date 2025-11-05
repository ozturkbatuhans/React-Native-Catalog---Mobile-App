import { useEffect, useState, useRef } from "react";

export function useProducts() {
  const [data, setData] = useState([]);       
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    console.log("[useProducts] mounted");
    abortRef.current = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        
        // DummyJSON: list endpoint (limit high genoeg)
        const res = await fetch("https://dummyjson.com/products?limit=100", {
          signal: abortRef.current.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const items = Array.isArray(json.products) ? json.products : [];
        setData(items);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.log("[useProducts] fetch error:", e.message);
          setError(e);
          setData([]); 
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => {
      console.log("[useProducts] unmounted → abort fetch if pending");
      abortRef.current?.abort();
    };
  }, []);

  const isEmpty = !loading && !error && data.length === 0;

  return { data, loading, error, isEmpty };
}

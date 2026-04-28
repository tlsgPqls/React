import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setLoading(false);
    };
    load();
  }, [url]);
  return { data, loading };
}

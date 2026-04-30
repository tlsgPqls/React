import { useEffect, useState } from "react";
import type { ApiResponse, Book } from "../types/Book";

export default function useFetch<T>(
  query: string,
  page: number,
  url: string,
  apiKey: string,
) {
  const [documents, setDocuments] = useState<T[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  useEffect(() => {
    if (!query) return;

    const fetchBooks = async () => {
      try {
        const encodedQuery = encodeURIComponent(query);
        const endPoint = `${url}?query=${encodedQuery}&page=${page}`;
        const response = await fetch(endPoint, {
          headers: {
            Authorization: apiKey,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status:${response.status}`);
        }
        const data: ApiResponse<T> = await response.json();
        setDocuments(data.documents);
        setIsEnd(data.meta.is_end);
      } catch (err) {
        console.error("검색중 오류", err);
      }
    };
    fetchBooks();
  }, [query, page, url, apiKey]);
  return { documents, isEnd };
}

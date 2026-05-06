import { useEffect, useState } from "react";
import "./SearchArea.css";
import type { Book, ApiResponse } from "../types/Book";
import SearchBar from "./SearchBar";
import BookList from "./BookList";
import Pagination from "./Pagination";
import useFetch from "../hooks/useFetch";
function SearchArea() {
  // const [documents, setDocuments] = useState<Book[]>([]);
  const [query, SetQuery] = useState<string>("사람"); //초기값 설정
  const [page, setPage] = useState<number>(1);
  // const [isEnd, setIsEnd] = useState<boolean>(false);
  const url = "https://dapi.kakao.com/v3/search/book";
  const apikey = ""; //*
  const { documents, isEnd } = useFetch<Book>(query, page, url, apikey);

  const resetPage = () => {
    setPage(1);
  };
  const onChangeQuery = (q: string) => {
    SetQuery(q);
  };
  const onPrevPage = () => {
    setPage(page - 1);
  };
  const onNextPage = () => {
    setPage(page + 1);
  };

  // useEffect(() => {
  //   if (!query) return;

  //   const fetchBooks = async () => {
  //     try {
  //       const encodedQuery = encodeURIComponent(query);
  //       const endPoint = `https://dapi.kakao.com/v3/search/book?query=${encodedQuery}&page=${page}`;
  //       const response = await fetch(endPoint, {
  //         headers: {
  //           Authorization: ,
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status:${response.status}`);
  //       }
  //       const data: ApiResponse<Book> = await response.json();
  //       setDocuments(data.documents);
  //       setIsEnd(data.meta.is_end);
  //     } catch (err) {
  //       console.error("검색중 오류", err);
  //     }
  //   };
  //   fetchBooks();
  // }, [query, page]);

  return (
    <div className="search-area">
      <SearchBar onChangeQuery={onChangeQuery} resetPage={resetPage} />
      <BookList books={documents} />
      <Pagination
        currentPage={page}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        isEnd={isEnd}
      />
    </div>
  );
}
export default SearchArea;

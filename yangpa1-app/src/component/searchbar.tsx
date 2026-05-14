"use client";
import { useSearchParams, useRouter } from "next/navigation";
import style from "./searchbar.module.css";
import { useState, ChangeEvent, KeyboardEvent } from "react";
export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [search, setSearch] = useState(q || "");
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div className={style.searchbar_container}>
      <input
        type="text"
        placeholder="영화 이름을 입력하세요"
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        value={search}
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}

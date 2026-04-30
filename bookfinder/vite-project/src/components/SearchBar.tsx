import { useRef } from "react";
import "./SearchBar.css";
interface SearchBarProps {
  onChangeQuery: (q: string) => void; //searcharea 바꿀수있는 도구래요
  resetPage: () => void;
}
function SearchBar({ onChangeQuery, resetPage }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearchClick = () => {
    if (!inputRef.current) return;
    onChangeQuery(inputRef.current.value);
    resetPage();
  };
  return (
    <div className="search-bar">
      <input type="text" placeholder="검색어를 입력하세요" ref={inputRef} />
      <button onClick={handleSearchClick}>검색</button>
    </div>
  );
}
export default SearchBar;

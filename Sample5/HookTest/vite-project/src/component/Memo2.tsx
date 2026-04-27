import { useMemo, useState } from "react";
export default function UserMemoTest() {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const list = ["apple", "banana", "grape", "orange"];
  const filtered = useMemo(() => {
    console.log("필터 실행됨");
    return list.filter((item) => item.includes(query));
  }, [query]); //query만 의존

  return (
    <div>
      <h3>검색</h3>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어 입력"
      />
      <h3>관련 없는 상태 변경</h3>
      <button onClick={() => setCount(count + 1)}>count 증가 ({count})</button>
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

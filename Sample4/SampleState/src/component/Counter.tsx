import { useState } from "react";
interface CounterProps {
  init: number;
}

export default function Counter({ init }: CounterProps) {
  // 1. useState는 배열을 반환하며, 소괄호()를 사용해 초기값을 전달합니다.
  // 2. 관습적으로 [상태값, 업데이트함수] 순으로 이름을 정합니다.
  const [count, setCount] = useState<number>(init);

  const handleClick = () => {
    // 3. 상태는 직접 수정할 수 없으며, 반드시 업데이트 함수를 통해 변경해야 합니다.
    setCount(count + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <h1>클릭 카운터</h1>
      <p>현재 클릭 수: {count}</p>
      <button onClick={handleClick}>클릭하세요</button>
    </div>
  );
}

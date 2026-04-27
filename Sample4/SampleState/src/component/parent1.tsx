import { useState } from "react";
import StateCounter from "./child";
import Child1 from "./child1";
import Child2 from "./child2";

export default function CombinedExample() {
  // 카운터 상태
  const [count, setCount] = useState<number>(0);
  const update = (step: number) => {
    if (step === 0) {
      setCount(0); // 리셋 로직
    } else {
      setCount((c) => c + step);
    }
  };

  // 입력 상태
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (value: string) => setInputValue(value);

  return (
    <div style={{ padding: "20px" }}>
      {/* 카운터 섹션 */}
      <section>
        <h2>카운터 예제</h2>
        <p>총 개수: {count}</p>
        <StateCounter step={1} onUpdate={update} />
        <StateCounter step={5} onUpdate={update} />
        <StateCounter step={-1} onUpdate={update} />
        <StateCounter step={0} onUpdate={update} />
      </section>

      <hr />

      {/* State 올리기 섹션 */}
      <section>
        <h1>state 올리기</h1>
        <Child1 onInputChange={handleInputChange} />
        <Child2 value={inputValue} />
      </section>
    </div>
  );
}

import { useState } from "react";
import Child1 from "./child1";
import Child2 from "./child2";

export default function ParentComponent() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };
  return (
    <div>
      <h1>state 올리기</h1>
      <Child1 onInputChange={handleInputChange} />
      <Child2 value={inputValue} />
    </div>
  );
}

import { useState } from "react";
import StateCounter from "./child";

export default function StateParent() {
  const [count, setCount] = useState<number>(0);
  const update = (step: number) => setCount((c) => c + step);
  return (
    <>
      <p>총 개수: {count}</p>
      <StateCounter step={1} onUpdate={update} />
      <StateCounter step={5} onUpdate={update} />
      <StateCounter step={-1} onUpdate={update} />
    </>
  );
}

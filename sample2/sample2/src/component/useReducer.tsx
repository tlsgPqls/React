import { useReducer } from "react";
type Action = "INC" | "DEC";
function countReducer(current: number, action: Action): number {
  if (action === "INC") {
    return current + 1;
  } else if (action === "DEC") {
    return current - 1;
  }
  return current; /*복잡한상태관리 훅*/
}
export default function Counter() {
  const [count, dispatch] = useReducer(countReducer, 0);
  function increase(): void {
    dispatch("INC");
  }
  function decrease(): void {
    dispatch("DEC");
  }
  return (
    <div>
      <input type="button" value="-" onClick={decrease} />
      <input type="button" value="+" onClick={increase} />
      <span> {count}</span>
    </div>
  );
}

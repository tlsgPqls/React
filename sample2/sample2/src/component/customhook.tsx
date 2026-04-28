import { useState } from "react";
export function useToggle(initial: boolean = false) {
  const [value, setvalue] = useState<boolean>(initial);
  const toggle = () => {
    setvalue((prev) => !prev);
  };
  return { value, toggle };
}

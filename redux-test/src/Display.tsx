import { useSelector } from "react-redux";
export default function Display() {
  const count = useSelector((state: { value: number }) => state.value);
  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

import { useToggle } from "./customhook";
export default function Test() {
  const { value, toggle } = useToggle();
  return (
    <div>
      <p>{value ? "ON" : "OFF"}</p>
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

import { useDispatch } from "react-redux";
import { decrease } from "./actions";
export default function CounterB() {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(decrease())}>
        <h1>-</h1>
      </button>
    </div>
  );
}

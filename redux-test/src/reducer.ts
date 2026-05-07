import { INCREASE, DECREASE, type Action, decrease } from "./actions";
export type State = {
  value: number;
};
export default function reducer(state: State = { value: 0 }, action: Action) {
  switch (action.type) {
    case INCREASE:
      return { ...state, value: state.value + 1 };
    case DECREASE:
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}

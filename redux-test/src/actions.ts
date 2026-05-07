export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";
export type Action = { type: "INCREASE" } | { type: "DECREASE" };
export const increase = (): Action => ({
  type: INCREASE,
});
export const decrease = (): Action => ({
  type: DECREASE,
});

import React from "react";

export function Child({ value }: { value: number }) {
  console.log("Child 렌더링");
  return <div>{value}</div>;
}
// export const ChildWithMemo = React.memo(function Child({
//   value,
// }: {
//   value: number;
// }) {
//   console.log("ChildWithMemo 렌더링");
//   return <div>{value}</div>;
// });

function Child1({ value }: { value: number }) {
  console.log("ChildWithMemo 렌더링");
  return <div>{value}</div>;
}

export const ChildWithMemo = React.memo(Child1);

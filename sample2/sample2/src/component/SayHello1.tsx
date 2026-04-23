import React from "react";
import ReactDOM from "react-dom/client";
interface SayHelloProps1 {
  myName: string;
  to: string;
}
export default function SayHello1({ myName, to }: SayHelloProps1) {
  return (
    <>
      <p>안녕하세요. {myName}</p>
      <p>Hello {to}!</p>
    </>
  );
}
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(<SayHello1 myName="오이영" to="React" />);

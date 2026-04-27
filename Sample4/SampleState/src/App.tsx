import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Counter from "./component/Counter";
import ClassCounter from "./component/propp";
import LiveInput from "./component/propp2";
// import ParentComponent from "./component/parent";
import StateParent from "./component/parent1";

function App() {
  return (
    <>
      {/* <Counter init={1} />
      <ClassCounter init={1} />
      <LiveInput /> */}
      {/* <ParentComponent /> */}
      <StateParent />
    </>
  );
}

export default App;

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import CCounter from "./component/Life";
import ExUseEffect, {
  Counter,
  UserList,
  UserList1,
  Test2,
  Test3,
  Test4,
} from "./component/useEffect";
import MovieList from "./component/Movie";
import MovieInfo from "./component2/Movie";
import Test from "./component/useFetch2.tsx";
import ExUseMemo from "./component/Memo";
import UserMemoTest from "./component/Memo2";
import ParentComponent from "./component/Callback";
function App() {
  return (
    <>
      <div>
        {/* <h1>리액트 클래스 컴포넌트 실행</h1> */}
        {/* 2. 컴포넌트를 배치하고 필수 Props인 count를 넘겨줍니다. */}
        {/* <CCounter count={0} />
        <h2>리액트 클래스 UseEffect</h2>
        <ExUseEffect />
        <UserList />
        <UserList1 />
        <Counter />
        <Test /> */}
        {/* <MovieList /> */}
        <MovieInfo />
        <Test />
        {/* <Test /> */}
        {/* <Test2 />
        <Test3 />
        <Test4 /> */}
        {/* <ExUseMemo num={0} />
        <UserMemoTest /> */}
        <ParentComponent />
      </div>
    </>
  );
}

export default App;

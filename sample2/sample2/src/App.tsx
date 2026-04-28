import type { Member } from "./component/member.ts";
import Render from "./component/Render.tsx";
import MemberCard from "./component/MemberCard.tsx";
import Event from "./component/Event.tsx";
import Library from "./component/Library";
import Book from "./component/book";
import Test from "./component/useRef.tsx";
import Counter from "./component/useReducer.tsx";
import "./App.css";
import Login from "./component/useReducer1.tsx";
import DarkOrLight from "./component/Provider.tsx";
const members: Member[] = [
  {
    image:
      "https://image.aladin.co.kr/product/32790/94/cover200/k722936599_1.jpg",
    nick: "한입 크기로 잘라먹는 리액트",
    author: "이정환",
  },
  {
    image:
      "https://image.aladin.co.kr/product/38646/7/cover500/8966265235_1.jpg",
    nick: "처음 배우는 애저",
    author: "김도균",
  },
  {
    image:
      "https://image.aladin.co.kr/product/30678/38/cover500/k552830138_1.jpg",
    nick: "Node.js 교과서",
    author: "조현영",
  },
];

function App() {
  return (
    <>
      {/* <MemberCard member={members[0]}></MemberCard>
      <MemberCard member={members[1]}></MemberCard>
      <MemberCard member={members[2]}></MemberCard>
      <Event type="date" />
      <Event type="time" /> */}
      <div className="App">
        {/* 가져온 컴포넌트를 사용합니다 */}
        {/* <Render /> */}
        {/* <Test /> */}
        {/* <Counter /> */}
        {/* <Login /> */}
        <DarkOrLight />
      </div>
    </>
  );
}
export default App;

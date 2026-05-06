import { useRef, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

// export function Product() {
//   return (
//     <>
//       <h3>상품 페이지 입니다.</h3>
//     </>
//   );
// }
export function NotFound() {
  return (
    <>
      <h1>404 Error</h1>
    </>
  );
}
export function Header() {
  return (
    <>
      <Link to="/">
        <h1>헤더입니다.</h1>
      </Link>
    </>
  );
}
export function Main() {
  return (
    <>
      <h3>안녕하세요. 메인페이지 입니다.</h3>
      <Link to="/product/1">
        {" "}
        <li>1번상품</li>{" "}
      </Link>
      <Link to="/product/2">
        {" "}
        <li>2번상품</li>{" "}
      </Link>
    </>
  );
}

export function Product() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const location = useLocation();
  return (
    <>
      <h3>{id}번 상품 페이지입니다.</h3>
      <p>검색어 q:{q}</p>
      <p>pathname: {location.pathname}</p>
      <p>search: {location.search}</p>
      <p>hash: {location.hash}</p>
    </>
  );
}
export function StateForm() {
  // 폼으로 취급하는 값을 State로 선언
  const [form, setForm] = useState({
    name: "홍길동",
    age: 18,
  });
  // 폼 요소의 변경 사항을 State에 반영
  const handleForm = (e: { target: { name: any; value: any } }) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // [보내기] 버튼으로 로그에 메시지 출력하기
  const show = () => {
    console.log(`안녕하세요!!, ${form.name}（${form.age}세） 님！`);
  };
  console.log("rerendering");

  return (
    <form>
      <div>
        <label htmlFor="name">이름: </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleForm}
          value={form.name}
        />
      </div>
      <div>
        <label htmlFor="age">나이: </label>
        <input
          id="age"
          name="age"
          type="number"
          onChange={handleForm}
          value={form.age}
        />
      </div>
      <div>
        <button type="button" onClick={show}>
          보내기
        </button>
      </div>
      <p>
        {" "}
        안녕하세요, {form.name}（{form.age}세） 님！
      </p>
    </form>
  );
}

export function StateFormUC() {
  // 리액트 요소에 대한 참조 준비
  const name = useRef(null);
  const age = useRef(null);
  // 요소(참조)를 통해 입력값 준비하기
  const show = () => {
    console.log(`안녕하세요, ${name.current.value}
（${age.current.value}세） 님！`);
  };
  return (
    <form>
      {/* 준비된 레퍼런스를 각 요소에 연결 */}
      <div>
        <label htmlFor="name">이름: </label>
        <input
          id="name"
          name="name"
          type="text"
          ref={name}
          defaultValue="홍길동"
        />
      </div>
      <div>
        <label htmlFor="age">나이: </label>
        <input id="age" name="age" type="number" ref={age} defaultValue="18" />
      </div>
      <div>
        <button type="button" onClick={show}>
          보내기
        </button>
      </div>
    </form>
  );
}
import { Child, ChildWithMemo } from "./child";
export default function App1() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  return (
    <div>
      <Child value={count} />
      <ChildWithMemo value={count} />
      <button onClick={() => setCount(count + 1)}>count 증가</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

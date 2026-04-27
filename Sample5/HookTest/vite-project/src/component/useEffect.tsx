import { useEffect, useState } from "react";
export default function ExUseEffect() {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    document.title = `${count}번 클릭했습니다`;
  }, [count]); // 의존성배열, 변경되었을때 useEffect가 실행되어야하는 변수들
  // [](빈배열)일 경우 최초 한번만,생략할때는 랜더링될때마다 실행
  return (
    <div>
      <p>{count}번 클릭했습니다</p>
      <button onClick={() => setCount((prev) => prev + 1)}>클릭</button>
    </div>
  );
}
interface User {
  id: number;
  name: string;
  email: string;
}
export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
export function UserList1() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) {
          throw new Error("요청 실패");
        }
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };
    load();
  }, []);
  if (error) return <p>{error}</p>;
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
export function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("count 변경됨:", count);
  }, [count]); // 의존성 배열에 있는 속성이 바뀔 때마다 실행
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
export function Test() {
  const [time, setTime] = useState<number>(0);
  useEffect(() => {
    console.log("타이머 시작");
    const id = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    //cleanup
    return () => {
      console.log("타이머 정리");
      clearInterval(id);
    };
  }, [time]);
  return <h1>{time}초</h1>;
}
export function Test3() {
  const [time, setTime] = useState<number>(0);
  useEffect(() => {
    console.log("타이머 시작");
    const id = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    //cleanup
  }, [time]);
  return <h1>{time}초</h1>;
}
export function Test4() {
  const [time, setTime] = useState<number>(0);
  useEffect(() => {
    console.log("타이머 시작");
    const id = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    //cleanup
    return () => {
      console.log("타이머 정리");
      clearInterval(id);
    };
  }, []);
  return <h1>{time}초</h1>;
}
export function Test2() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const handleClick = () => {
      setCount((c) => c + 1);
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}

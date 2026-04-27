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

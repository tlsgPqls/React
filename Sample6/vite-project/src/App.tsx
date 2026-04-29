import { useRef, useState } from "react";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import "./App.css";
const mockTodos = [
  {
    id: 0,
    isDone: false,
    content: "Javascript 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "Ai 공부하기",
    createDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "React 공부하기",
    createDate: new Date().getTime(),
  },
];
export interface Todo {
  id: number;
  isDone: boolean;
  content: string;
  createDate: number;
}
function App() {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const idRef = useRef(3);

  const onCreate = (content: string) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createDate: new Date().getTime(),
    };
    setTodos([newItem, ...todos]);
    idRef.current += 1;
  };

  return (
    <>
      <div className="App">
        <Header />
        <TodoEditor onCreate={onCreate} />
        <TodoList todos={todos} />
      </div>
    </>
  );
}

export default App;

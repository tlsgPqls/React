import { useCallback, useMemo, useReducer, useRef, useState } from "react";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import { TodoStateContext, TodoDispatchContext } from "./TodoContext";
import "./App.css";

export interface Todo {
  id: number;
  isDone: boolean;
  content: string;
  createDate: number;
}

type Action =
  | { type: "CREATE"; newItem: Todo }
  | { type: "UPDATE"; targetId: number }
  | { type: "DELETE"; targetId: number };
function reducer(todos: Todo[], action: Action) {
  let result;
  switch (action.type) {
    case "CREATE": {
      result = [action.newItem, ...todos];
      break;
    }
    case "UPDATE": {
      result = todos.map((todo) =>
        todo.id === action.targetId ? { ...todo, isDone: !todo.isDone } : todo,
      );
      break;
    }
    case "DELETE": {
      result = todos.filter((todo) => todo.id !== action.targetId);
      break;
    }
    default:
      result = todos;
  }
  localStorage.setItem("todos", JSON.stringify(result));
  return result;
}
function App() {
  const stored = localStorage.getItem("todos");
  const initTodos: Todo[] = stored ? JSON.parse(stored) : [];
  const [todos, dispatch] = useReducer(reducer, initTodos);
  const initId = Number(localStorage.getItem("todoId") ?? 1);
  const idRef = useRef(initId);

  const onCreate = useCallback((content: string) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createDate: new Date().getTime(),
    };
    // setTodos([newItem, ...todos]);
    dispatch({ type: "CREATE", newItem });
    idRef.current += 1;
    localStorage.setItem("todoId", JSON.stringify(idRef.current));
  }, []);

  const onUpdate = useCallback((targetId: number) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo,
    //   ),
    // );
    dispatch({ type: "UPDATE", targetId });
  }, []);
  const onDelete = useCallback((targetId: number) => {
    // setTodos(todos.filter((todo) => todo.id !== targetId));
    dispatch({ type: "DELETE", targetId });
  }, []);

  const dispatches = useMemo(
    () => ({ onCreate, onUpdate, onDelete }),
    [onCreate, onUpdate, onDelete],
  );
  return (
    <>
      <div className="App">
        <Header />
        <TodoStateContext.Provider value={{ todos }}>
          <TodoDispatchContext.Provider value={dispatches}>
            <TodoEditor />
            <TodoList />
          </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
      </div>
    </>
  );
}

export default App;

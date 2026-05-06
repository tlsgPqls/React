import "./TodoList.css";
import "./TodoItem";
import TodoItem from "./TodoItem";
import { type Todo } from "../App";
import { useContext, useMemo, useState, type ChangeEvent } from "react";
import { TodoStateContext } from "../TodoContext";
// interface TodoListProps {
//   todos: Todo[];
//   onUpdate: (targetId: number) => void;
//   onDelete: (targetId: number) => void;
// }
function TodoList() {
  const [search, setSearch] = useState("");
  const { todos } = useContext(TodoStateContext);
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getSearchResult = () => {
    return search === ""
      ? todos
      : todos.filter((todo) =>
          todo.content.toLowerCase().includes(search.toLowerCase()),
        );
  };
  const analyzeTodo = useMemo(() => {
    console.log("analyzeTodo 호출,,");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);
  const { totalCount, doneCount, notDoneCount } = analyzeTodo;
  return (
    <div className="TodoList">
      <h4>Todo List</h4>
      <div>총갯수:{totalCount}</div>
      <div>완료된 할일:{doneCount}</div>
      <div>완료못한 할일:{notDoneCount}</div>
      <input
        type="text"
        className="searchbar"
        placeholder="검색어를 입력하세요..."
        onChange={onChangeSearch}
      />
      <div>
        {getSearchResult().map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}
export default TodoList;

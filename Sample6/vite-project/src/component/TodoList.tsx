import "./TodoList.css";
import "./TodoItem";
import TodoItem from "./TodoItem";
import { type Todo } from "../App";
interface TodoListProps {
  todos: Todo[];
}
function TodoList({ todos }: TodoListProps) {
  return (
    <div className="TodoList">
      <h4>Todo List</h4>
      <input
        type="text"
        className="searchbar"
        placeholder="검색어를 입력하세요..."
      />
      <div>
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  );
}
export default TodoList;

import "./TodoItem.css";
import { type Todo } from "../App";
interface TodoItemProps {
  todo: Todo;
}
function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className="TodoItem">
      <div className="checkbbox_col">
        <input type="checkbox" checked={todo.isDone} />
      </div>
      <div className="title_col">{todo.content}</div>
      <div className="date_col">
        {new Date(todo.createDate).toLocaleDateString()}
      </div>
      <div className="btn_col">
        <button>삭제</button>
      </div>
    </div>
  );
}
export default TodoItem;

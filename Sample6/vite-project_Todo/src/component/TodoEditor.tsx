import React, { useContext, useRef, useState } from "react";
import "./TodoEditor.css";
import { TodoDispatchContext } from "../TodoContext";
interface TodoEditorProps {
  onCreate: (content: string) => void;
}
function TodoEditor() {
  const { onCreate } = useContext(TodoDispatchContext);
  const [content, setContent] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if (!content) {
      inputRef.current?.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div className="TodoEditor">
      <h4>새로운 Todo 작성하기 ✏️</h4>
      <div className="editor-wrapper">
        <input
          type="text"
          placeholder="새로운 Todo...."
          onChange={onChangeContent}
          ref={inputRef}
          onKeyDown={onKeyDown}
          value={content}
        />
        <button onClick={onSubmit}>후기</button>
      </div>
    </div>
  );
}
export default TodoEditor;

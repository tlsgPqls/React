import React, { useState } from "react";
import "./TodoEditor.css";
interface TodoEditorProps {
  onCreate: (content: string) => void;
}
function TodoEditor({ onCreate }: TodoEditorProps) {
  const [content, setContent] = useState<string>("");
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    onCreate(content);
  };
  return (
    <div className="TodoEditor">
      <h4>새로운 Todo 작성하기 ✏️</h4>
      <div className="editor-wrapper">
        <input
          type="text"
          placeholder="새로운 Todo...."
          onChange={onChangeContent}
        />
        <button onClick={onSubmit}>후기</button>
      </div>
    </div>
  );
}
export default TodoEditor;

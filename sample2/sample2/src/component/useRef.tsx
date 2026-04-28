import { useRef } from "react";
export default function Test() {
  const inputRef = useRef<HTMLInputElement>(null);
  const clickCountRef = useRef<number>(0);
  /*객체의 주소값을 가지고있음 객체안에 있는 value가 바뀜 주소값은 안바뀜 */
  const handleClick = () => {
    inputRef.current?.focus();
    clickCountRef.current += 1;
    console.log(`클릭 횟수: ${clickCountRef.current}`);
  };
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="입력하세요" />
      <button onClick={handleClick}>포커스 및 카운트 증가</button>
    </div>
  );
}

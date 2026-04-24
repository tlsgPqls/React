interface Child1Props {
  onInputChange: (value: string) => void;
}
export default function Child1({ onInputChange }: Child1Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.value);
  };
  return (
    <div>
      <input type="text" onChange={handleChange} placeholder="입력하세요" />
    </div>
  );
}

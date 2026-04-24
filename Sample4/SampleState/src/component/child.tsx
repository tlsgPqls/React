interface StateCounterProps {
  step: number;
  onUpdate: (val: number) => void;
}
export default function StateCounter({ step, onUpdate }: StateCounterProps) {
  const handleClick = () => onUpdate(step);
  return (
    <button className="cnt" onClick={handleClick}>
      <span>{step}</span>
    </button>
  );
}

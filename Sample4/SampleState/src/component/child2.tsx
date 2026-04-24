interface Child2Props {
  value: string;
}
function Child2({ value }: Child2Props) {
  return (
    <div>
      <p>입력된 값: {value}</p>
    </div>
  );
}
export default Child2;

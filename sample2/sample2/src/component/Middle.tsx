import MainContext from "./Main";
export default function Middle() {
  return (
    <div style={{ backgroundColor: "gray", padding: "20px" }}>
      <h1>이것은 Middle 입니다.</h1>
      <MainContext />
    </div>
  );
}

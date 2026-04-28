import { useContext } from "react";
import ThemeContext from "./Context";
export default function MainContext() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const styles: React.CSSProperties = {
    padding: "20px",
    margin: "20px",
    textAlign: "center",
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    border: theme === "light" ? "1px solid #000" : "1px solid #fff",
  };
  return (
    <div style={styles}>
      <p>현재 테마: {theme}</p>
      <button onClick={toggleTheme}>테마 변경</button>
    </div>
  );
}

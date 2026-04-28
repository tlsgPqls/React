import { createContext } from "react";
type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {
    console.log();
  },
});
export default ThemeContext;

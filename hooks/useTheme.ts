import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => useContext(ThemeContext);

export const useThemedStyles = (styles: any) => {
  const { theme } = useTheme();
  return styles(theme);
};
